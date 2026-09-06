const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  pingTimeout: 30000,
  pingInterval: 25000,
});

// 룸별 동시 접속자 수 추적 (메모리 맵)
const roomViewers = new Map(); // key: liveId, value: Set of socketId

// 헬스체크 및 상태 엔드포인트
app.get('/', (req, res) => {
  let totalConnections = io.engine.clientsCount;
  res.json({
    status: 'online',
    service: 'RYZIN Realtime WebSocket Cluster',
    totalConnections,
    activeRooms: roomViewers.size,
    timestamp: new Date().toISOString(),
  });
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

io.on('connection', (socket) => {
  let currentLiveId = null;
  let userRole = 'viewer';

  // 1. 방송 룸 입장
  socket.on('join_room', ({ liveId, role = 'viewer' }) => {
    if (!liveId) return;

    currentLiveId = String(liveId);
    userRole = role;
    const roomName = `live_${currentLiveId}`;
    socket.join(roomName);

    if (!roomViewers.has(currentLiveId)) {
      roomViewers.set(currentLiveId, new Set());
    }
    roomViewers.get(currentLiveId).add(socket.id);

    const count = roomViewers.get(currentLiveId).size;
    // 룸 접속자 수 브로드캐스트
    io.to(roomName).emit('viewer_count_update', { liveId: currentLiveId, count });
  });

  // 2. 어드민 제어 이벤트 초고속 다이렉트 브로드캐스트 (0.05초 무지연)
  socket.on('admin_control_sync', ({ liveId, payload }) => {
    if (!liveId || !payload) return;
    const roomName = `live_${String(liveId)}`;
    io.to(roomName).emit('live_control_sync', payload);
  });

  // 3. 실시간 채팅 브로드캐스트
  socket.on('send_chat', ({ liveId, chatData }) => {
    if (!liveId || !chatData) return;
    const roomName = `live_${String(liveId)}`;
    io.to(roomName).emit('new_chat', chatData);
  });

  // 4. 하트 및 인터랙션 실시간 브로드캐스트
  socket.on('send_heart', ({ liveId, count = 1 }) => {
    if (!liveId) return;
    const roomName = `live_${String(liveId)}`;
    socket.to(roomName).emit('new_heart', { count });
  });

  // 5. 연결 해제 시 룸 정리
  socket.on('disconnect', () => {
    if (currentLiveId && roomViewers.has(currentLiveId)) {
      const viewerSet = roomViewers.get(currentLiveId);
      viewerSet.delete(socket.id);
      const count = viewerSet.size;

      if (count === 0) {
        roomViewers.delete(currentLiveId);
      } else {
        io.to(`live_${currentLiveId}`).emit('viewer_count_update', { liveId: currentLiveId, count });
      }
    }
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`[RYZIN Socket Server] Running on http://0.0.0.0:${PORT}`);
});
