/**
 * DisplayApp - RYZIN OBS 3D 송출 화면 전용 애플리케이션 수신기
 */

document.addEventListener('DOMContentLoaded', () => {
  const lotto3D = new Lotto3DEngine('canvas-container');
  
  let drawnNumbers = [];
  let currentSpeed = 2.5;

  const ballsDisplayContainer = document.getElementById('balls-display-container');

  function getBallColorClass(num) {
    if (num <= 10) return 'ball-color-yellow';
    if (num <= 20) return 'ball-color-blue';
    if (num <= 30) return 'ball-color-red';
    if (num <= 40) return 'ball-color-gray';
    return 'ball-color-green';
  }

  function updateBottomDisplaySlot(slotIndex, num) {
    const slotElem = ballsDisplayContainer.querySelector(`.ball-slot[data-index="${slotIndex}"]`);
    if (slotElem) {
      const colorCls = getBallColorClass(num);
      slotElem.className = `ball-slot ball-active ${colorCls}`;
      slotElem.textContent = num;
    }
  }

  function resetDisplayBar() {
    drawnNumbers = [];
    const slots = ballsDisplayContainer.querySelectorAll('.ball-slot');
    slots.forEach((slot, idx) => {
      slot.className = idx === 6 ? 'ball-slot bonus-slot' : 'ball-slot';
      slot.innerHTML = `<span>${idx === 6 ? '보너스' : idx + 1}</span>`;
    });
    lotto3D.reset();
  }

  remoteBroadcaster.on('DRAW_SINGLE', (payload) => {
    const { number, speed } = payload;
    if (drawnNumbers.length >= 7 || drawnNumbers.includes(number)) return;

    const slotIndex = drawnNumbers.length;
    drawnNumbers.push(number);

    const duration = speed || currentSpeed;

    audioManager.playPop();
    audioManager.playRoll(duration);

    lotto3D.drawSingleNumber(number, slotIndex, duration - 0.3, () => {
      audioManager.playRack();
      updateBottomDisplaySlot(slotIndex, number);

      if (drawnNumbers.length === 7) {
        setTimeout(() => audioManager.playFanfare(), 300);
      }
    });
  });

  remoteBroadcaster.on('RESET', () => {
    resetDisplayBar();
  });

  remoteBroadcaster.on('CHANGE_BG', (payload) => {
    document.body.className = `display-mode ${payload.bg}`;
  });

  remoteBroadcaster.on('CHANGE_CAMERA', (payload) => {
    lotto3D.setCameraMode(payload.mode);
  });

  remoteBroadcaster.on('CHANGE_SPEED', (payload) => {
    currentSpeed = payload.speed;
  });

  remoteBroadcaster.on('TOGGLE_SOUND', () => {
    audioManager.toggleMute();
  });
});
