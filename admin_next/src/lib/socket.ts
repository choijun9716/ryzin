import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const getLiveSocket = (liveId: string): Socket => {
  if (!socket) {
    socket = io('https://ryzin-live-chat.fly.dev', {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on('connect', () => {
      console.log('[Admin Next Socket] Connected to cluster for live:', liveId);
      socket?.emit('join_room', { liveId, role: 'admin' });
    });
  }
  return socket;
};

export const broadcastToCluster = (liveId: string, payload: any) => {
  if (!socket || !socket.connected) {
    socket = getLiveSocket(liveId);
  }
  if (socket && socket.connected) {
    socket.emit('admin_control_sync', { liveId, payload });
  }
};
