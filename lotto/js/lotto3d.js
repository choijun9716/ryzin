/**
 * Lotto3DEngine - RYZIN 3D 로또 모션 엔진
 * 에어 블로워 물리(Air Blower Physics), PBR 재질, 롤링 동역학 및 탄성 바운싱 연출
 */

class Lotto3DEngine {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    
    // Core Three.js components
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    
    // Objects
    this.chamberBalls = []; // 챔버 내부 바람 믹싱 공 45개
    this.activeDrawnBalls = []; // 현재 트랙 롤링 중인 공
    this.landedBalls = []; // 랙 안착 완료된 공
    this.trackCurve = null;
    this.rackSlots = [];
    
    // Physics Parameters
    this.chamberCenter = new THREE.Vector3(0, 5, 0);
    this.chamberRadius = 2.9;
    this.blowerForce = 0.18; // 하단 에어 분사 힘

    // Animation & Camera Controls
    this.isDrawing = false;
    this.cameraMode = 'cinematic';
    this.defaultCamPos = new THREE.Vector3(0, 5.2, 17.5);
    this.targetCamPos = new THREE.Vector3(0, 5.2, 17.5);
    this.targetCamLook = new THREE.Vector3(0, 1.2, 0);

    // Realistic Lotto Colors
    this.colors = {
      yellow: { main: '#F59E0B', dark: '#B45309', light: '#FEF3C7' },
      blue:   { main: '#2563EB', dark: '#1E40AF', light: '#DBEAFE' },
      red:    { main: '#DC2626', dark: '#991B1B', light: '#FEE2E2' },
      gray:   { main: '#374151', dark: '#111827', light: '#E5E7EB' },
      green:  { main: '#059669', dark: '#065F46', light: '#D1FAE5' }
    };

    this.init();
  }

  init() {
    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera (시야각 FOV 48도)
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(48, aspect, 0.1, 100);
    this.camera.position.copy(this.defaultCamPos);

    // 3. Renderer with High PBR & Soft Shadows
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.container.appendChild(this.renderer.domElement);

    // 4. Controls
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2 + 0.02;
    this.controls.target.set(0, 1.2, 0);

    // 5. Realistic Studio Lighting
    this.setupLighting();

    // 6. Build Realistic Machine Architecture
    this.buildMachineStructure();

    // 7. Create 45 Blower Mixing Balls
    this.createChamberBalls();

    // 8. Event Listener & Render Loop
    window.addEventListener('resize', () => this.onWindowResize());
    this.animate();
  }

  setupLighting() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    this.scene.add(ambientLight);

    const keyLight = new THREE.SpotLight(0xffffff, 2.2);
    keyLight.position.set(12, 22, 16);
    keyLight.angle = Math.PI / 4;
    keyLight.penumbra = 0.6;
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.00008;
    this.scene.add(keyLight);

    const rimLight = new THREE.SpotLight(0x6366f1, 1.8);
    rimLight.position.set(-14, 16, -12);
    rimLight.angle = Math.PI / 3;
    this.scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xfff7ed, 0.8, 20);
    fillLight.position.set(0, 2, 6);
    this.scene.add(fillLight);
  }

  buildMachineStructure() {
    // A. 믹싱 챔버
    const chamberGeo = new THREE.SphereGeometry(this.chamberRadius, 48, 48);
    const chamberMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.2,
      roughness: 0.05,
      metalness: 0.05,
      transmission: 0.95,
      ior: 1.52,
      thickness: 1.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      side: THREE.DoubleSide
    });
    const chamber = new THREE.Mesh(chamberGeo, chamberMat);
    chamber.position.copy(this.chamberCenter);
    this.scene.add(chamber);

    // 하단 에어 노즐
    const nozzleGeo = new THREE.CylinderGeometry(0.8, 1.4, 1.0, 32);
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.92,
      roughness: 0.15
    });
    const nozzle = new THREE.Mesh(nozzleGeo, metalMat);
    nozzle.position.set(0, 2.2, 0);
    nozzle.castShadow = true;
    this.scene.add(nozzle);

    const baseGeo = new THREE.CylinderGeometry(2.4, 3.2, 0.8, 32);
    const base = new THREE.Mesh(baseGeo, metalMat);
    base.position.set(0, 1.3, 0);
    base.receiveShadow = true;
    this.scene.add(base);

    // B. 나선형 트랙 (첫 번째 슬롯 입구로 정밀 연결되는 튜브 레일)
    const points = [
      new THREE.Vector3(0, 2.1, 0),
      new THREE.Vector3(0.4, 1.8, 1.0),
      new THREE.Vector3(2.8, 1.4, 1.6),
      new THREE.Vector3(3.4, 1.1, -0.8),
      new THREE.Vector3(0.5, 0.85, -2.6),
      new THREE.Vector3(-2.8, 0.7, -1.2),
      new THREE.Vector3(-4.5, 0.58, 1.8),
      new THREE.Vector3(-4.8, 0.48, 5.5) // 첫 번째 슬롯 바로 옆 입구 도착!
    ];

    this.trackCurve = new THREE.CatmullRomCurve3(points, false, 'centripetal', 0.5);

    const tubeGeo = new THREE.TubeGeometry(this.trackCurve, 120, 0.58, 24, false);
    const tubeMat = new THREE.MeshPhysicalMaterial({
      color: 0x6366f1,
      emissive: 0x312e81,
      emissiveIntensity: 0.35,
      transparent: true,
      opacity: 0.55,
      roughness: 0.05,
      metalness: 0.15,
      transmission: 0.82,
      ior: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      side: THREE.DoubleSide
    });
    const tube = new THREE.Mesh(tubeGeo, tubeMat);
    this.scene.add(tube);

    // 하이테크 LED 메탈 브래킷 지지대 구조물
    const bracketGroup = new THREE.Group();
    const bracketMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.85,
      roughness: 0.25
    });
    const ledMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1
    });

    const sampleTValues = [0.18, 0.38, 0.58, 0.78, 0.95];
    sampleTValues.forEach(tVal => {
      const pos = this.trackCurve.getPointAt(tVal);
      const tangent = this.trackCurve.getTangentAt(tVal);

      const bracketHolder = new THREE.Group();
      bracketHolder.position.copy(pos);

      const pillarGeo = new THREE.BoxGeometry(0.12, 0.5, 0.22);
      const pillar = new THREE.Mesh(pillarGeo, bracketMat);
      pillar.position.y = -0.3;
      bracketHolder.add(pillar);

      const cradleGeo = new THREE.CylinderGeometry(0.62, 0.62, 0.1, 16, 1, true, 0, Math.PI);
      const cradle = new THREE.Mesh(cradleGeo, bracketMat);
      cradle.rotation.z = Math.PI / 2;
      bracketHolder.add(cradle);

      const ledGeo = new THREE.BoxGeometry(0.16, 0.04, 0.26);
      const ledPin = new THREE.Mesh(ledGeo, ledMat);
      ledPin.position.y = -0.06;
      bracketHolder.add(ledPin);

      const axis = new THREE.Vector3(0, 0, 1);
      bracketHolder.quaternion.setFromUnitVectors(axis, tangent);

      bracketGroup.add(bracketHolder);
    });
    this.scene.add(bracketGroup);

    // C. 정면 안착 랙
    const rackGroup = new THREE.Group();
    const slotCount = 7;
    const startX = -4.5;
    const stepX = 1.5;

    this.rackSlots = [];

    for (let i = 0; i < slotCount; i++) {
      const isBonus = (i === 6);
      const posX = startX + (i * stepX) + (isBonus ? 0.6 : 0);
      const pos = new THREE.Vector3(posX, 0.3, 5.6);
      this.rackSlots.push(pos);

      const ringGeo = new THREE.TorusGeometry(0.54, 0.065, 16, 36);
      const ringMat = new THREE.MeshStandardMaterial({
        color: isBonus ? 0xf59e0b : 0x94a3b8,
        metalness: 0.95,
        roughness: 0.1
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.copy(pos);
      ring.position.y = 0.04;
      ring.receiveShadow = true;
      rackGroup.add(ring);
    }
    this.scene.add(rackGroup);

    const floorGeo = new THREE.PlaneGeometry(40, 40);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.22 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    this.scene.add(floor);
  }

  createBallTexture(number) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    let theme = this.colors.yellow;
    if (number >= 11 && number <= 20) theme = this.colors.blue;
    else if (number >= 21 && number <= 30) theme = this.colors.red;
    else if (number >= 31 && number <= 40) theme = this.colors.gray;
    else if (number >= 41 && number <= 45) theme = this.colors.green;

    const bgGrad = ctx.createLinearGradient(0, 0, 1024, 512);
    bgGrad.addColorStop(0, theme.light);
    bgGrad.addColorStop(0.3, theme.main);
    bgGrad.addColorStop(1, theme.dark);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 512);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    for (let i = 0; i < 2000; i++) {
      const rx = Math.random() * 1024;
      const ry = Math.random() * 512;
      ctx.fillRect(rx, ry, 2, 2);
    }

    const drawBadge = (cx, cy) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 125, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.lineWidth = 6;
      ctx.strokeStyle = theme.main;
      ctx.stroke();

      ctx.fillStyle = '#0F172A';
      ctx.font = '900 130px "Montserrat", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(number.toString(), cx, cy + 4);
    };

    drawBadge(256, 256);
    drawBadge(768, 256);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  createBallMesh(number) {
    const ballGeo = new THREE.SphereGeometry(0.48, 36, 36);
    const texture = this.createBallTexture(number);

    const ballMat = new THREE.MeshPhysicalMaterial({
      map: texture,
      roughness: 0.18,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9
    });

    const ballMesh = new THREE.Mesh(ballGeo, ballMat);
    ballMesh.castShadow = true;
    ballMesh.receiveShadow = true;
    ballMesh.userData = { number: number };

    return ballMesh;
  }

  createChamberBalls() {
    this.chamberBalls.forEach(b => this.scene.remove(b.mesh));
    this.chamberBalls = [];

    for (let i = 1; i <= 45; i++) {
      const mesh = this.createBallMesh(i);
      
      const r = Math.random() * 2.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      mesh.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        5 + r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );

      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.12,
        Math.random() * 0.15 + 0.05,
        (Math.random() - 0.5) * 0.12
      );

      const rotAxis = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
      const rotSpeed = Math.random() * 0.15 + 0.05;

      this.scene.add(mesh);
      this.chamberBalls.push({ mesh, velocity, rotAxis, rotSpeed });
    }
  }

  drawSingleNumber(number, slotIndex, duration = 2.5, onComplete = null) {
    let ballMesh = null;
    const foundIdx = this.chamberBalls.findIndex(b => b.mesh.userData.number === number);

    if (foundIdx !== -1) {
      ballMesh = this.chamberBalls[foundIdx].mesh;
      this.chamberBalls.splice(foundIdx, 1);
    } else {
      ballMesh = this.createBallMesh(number);
      this.scene.add(ballMesh);
    }

    const targetSlot = this.rackSlots[slotIndex];

    const activeBall = {
      mesh: ballMesh,
      slotIndex: slotIndex,
      targetSlot: targetSlot,
      progress: 0,
      duration: duration,
      startTime: performance.now(),
      onComplete: onComplete
    };

    this.activeDrawnBalls.push(activeBall);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const now = performance.now();

    // 1. 에어 블로워 물리
    this.chamberBalls.forEach(b => {
      const distFromBottom = b.mesh.position.y - 2.5;
      if (distFromBottom < 1.5) {
        b.velocity.y += this.blowerForce * (1.5 - distFromBottom);
      }

      b.velocity.y -= 0.006;
      b.mesh.position.add(b.velocity);
      b.mesh.rotateOnAxis(b.rotAxis, b.rotSpeed);

      const distFromCenter = b.mesh.position.distanceTo(this.chamberCenter);
      if (distFromCenter > this.chamberRadius - 0.5) {
        const normal = new THREE.Vector3().subVectors(b.mesh.position, this.chamberCenter).normalize();
        b.velocity.reflect(normal).multiplyScalar(0.85);
        b.mesh.position.copy(this.chamberCenter).add(normal.multiplyScalar(this.chamberRadius - 0.52));
      }
    });

    // 2. 롤링 및 탄성 착지 물리
    for (let i = this.activeDrawnBalls.length - 1; i >= 0; i--) {
      const ball = this.activeDrawnBalls[i];
      const elapsed = (now - ball.startTime) / 1000;
      ball.progress = Math.min(elapsed / ball.duration, 1.0);

      const t = ball.progress;

      if (t < 0.82) {
        const trackT = t / 0.82;
        const easedT = trackT * trackT;

        const currentPos = this.trackCurve.getPointAt(easedT);
        const tangent = this.trackCurve.getTangentAt(easedT);

        ball.mesh.position.copy(currentPos);

        const rollAxis = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
        const rollSpeed = 0.42;
        ball.mesh.rotateOnAxis(rollAxis, rollSpeed);

        if (this.cameraMode === 'cinematic' && i === this.activeDrawnBalls.length - 1) {
          this.targetCamPos.set(currentPos.x + 5.2, currentPos.y + 3.8, currentPos.z + 9.8);
          this.targetCamLook.set(currentPos.x * 0.5, currentPos.y, currentPos.z);
        }
      } else {
        const landT = (t - 0.82) / 0.18;
        const lastTrackPos = this.trackCurve.getPointAt(1.0);

        const bounceAmplitude = 0.35 * Math.exp(-5 * landT) * Math.abs(Math.sin(Math.PI * 3 * landT));

        const lerpPos = new THREE.Vector3().lerpVectors(lastTrackPos, ball.targetSlot, landT);
        lerpPos.y += bounceAmplitude;

        ball.mesh.position.copy(lerpPos);

        ball.mesh.rotation.x = THREE.MathUtils.lerp(ball.mesh.rotation.x, 0, 0.25);
        ball.mesh.rotation.y = THREE.MathUtils.lerp(ball.mesh.rotation.y, 0, 0.25);
        ball.mesh.rotation.z = THREE.MathUtils.lerp(ball.mesh.rotation.z, 0, 0.25);

        if (this.cameraMode === 'cinematic' && i === this.activeDrawnBalls.length - 1) {
          this.targetCamPos.set(0, 4.8, 16.5);
          this.targetCamLook.set(0, 0.8, 4.0);
        }
      }

      if (ball.progress >= 1.0) {
        ball.mesh.position.copy(ball.targetSlot);
        ball.mesh.rotation.set(0, 0, 0);

        if (ball.onComplete) ball.onComplete();

        this.landedBalls.push(ball.mesh);
        this.activeDrawnBalls.splice(i, 1);
      }
    }

    // 3. 카메라 모드 보간
    if (this.cameraMode === 'front') {
      this.targetCamPos.set(0, 4.5, 17.5);
      this.targetCamLook.set(0, 1.0, 3.0);
    } else if (this.cameraMode === 'track') {
      this.targetCamPos.set(6.5, 4.2, 11.5);
      this.targetCamLook.set(0, 1.0, 2.0);
    } else if (this.cameraMode === 'top') {
      this.targetCamPos.set(0, 16.5, 1.2);
      this.targetCamLook.set(0, 4.5, 0);
    }

    this.camera.position.lerp(this.targetCamPos, 0.06);
    this.controls.target.lerp(this.targetCamLook, 0.06);
    this.controls.update();

    // 4. Render
    this.renderer.render(this.scene, this.camera);
  }

  setCameraMode(mode) {
    this.cameraMode = mode;
  }

  reset() {
    this.activeDrawnBalls = [];
    this.landedBalls.forEach(mesh => this.scene.remove(mesh));
    this.landedBalls = [];
    this.createChamberBalls();
    this.cameraMode = 'cinematic';
    this.targetCamPos.copy(this.defaultCamPos);
    this.targetCamLook.set(0, 1.2, 0);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
