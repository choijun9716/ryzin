/**
 * ControlApp - RYZIN 독립 원격 리모컨 전용 애플리케이션
 */

document.addEventListener('DOMContentLoaded', () => {
  let drawnNumbers = [];
  let isAnimating = false;

  const ctrlNumberGrid = document.getElementById('ctrl-number-grid');
  const drawnCountText = document.getElementById('drawn-count-text');

  const btnCtrlOne = document.getElementById('btn-ctrl-one');
  const btnCtrlAll = document.getElementById('btn-ctrl-all');
  const btnCtrlReset = document.getElementById('btn-ctrl-reset');
  const chromaBtns = document.querySelectorAll('.ctrl-bg-btn');

  const selectCtrlCamera = document.getElementById('select-ctrl-camera');
  const inputCtrlSpeed = document.getElementById('input-ctrl-speed');
  const valCtrlSpeed = document.getElementById('val-ctrl-speed');
  const btnCtrlSound = document.getElementById('btn-ctrl-sound');

  for (let i = 1; i <= 45; i++) {
    const btn = document.createElement('button');
    btn.className = 'ctrl-num-btn';
    btn.textContent = i;
    btn.dataset.number = i;

    btn.addEventListener('click', () => {
      if (drawnNumbers.includes(i) || drawnNumbers.length >= 7) return;
      triggerSingleDraw(i);
    });

    ctrlNumberGrid.appendChild(btn);
  }

  function updateDrawnUI() {
    drawnCountText.textContent = `추첨 ${drawnNumbers.length} / 7`;

    const allBtns = ctrlNumberGrid.querySelectorAll('.ctrl-num-btn');
    allBtns.forEach(btn => {
      const num = parseInt(btn.dataset.number);
      if (drawnNumbers.includes(num)) {
        btn.classList.add('drawn');
      } else {
        btn.classList.remove('drawn');
      }
    });
  }

  function triggerSingleDraw(num) {
    if (drawnNumbers.length >= 7 || drawnNumbers.includes(num)) return;

    drawnNumbers.push(num);
    updateDrawnUI();

    const speed = parseFloat(inputCtrlSpeed.value);

    remoteBroadcaster.emit('DRAW_SINGLE', { number: num, speed });
  }

  btnCtrlOne.addEventListener('click', () => {
    if (drawnNumbers.length >= 7) return;
    const available = [];
    for (let i = 1; i <= 45; i++) {
      if (!drawnNumbers.includes(i)) available.push(i);
    }
    const rand = available[Math.floor(Math.random() * available.length)];
    triggerSingleDraw(rand);
  });

  btnCtrlAll.addEventListener('click', () => {
    if (drawnNumbers.length >= 7 || isAnimating) return;

    isAnimating = true;
    btnCtrlAll.disabled = true;
    btnCtrlOne.disabled = true;

    const needed = 7 - drawnNumbers.length;
    const available = [];
    for (let i = 1; i <= 45; i++) {
      if (!drawnNumbers.includes(i)) available.push(i);
    }

    for (let i = available.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [available[i], available[j]] = [available[j], available[i]];
    }

    const picked = available.slice(0, needed);
    let step = 0;
    const intervalMs = parseFloat(inputCtrlSpeed.value) * 1000 + 400;

    function processStep() {
      if (step >= picked.length) {
        isAnimating = false;
        btnCtrlAll.disabled = false;
        btnCtrlOne.disabled = false;
        return;
      }

      triggerSingleDraw(picked[step]);
      step++;

      if (step < picked.length) {
        setTimeout(processStep, intervalMs);
      } else {
        isAnimating = false;
        btnCtrlAll.disabled = false;
        btnCtrlOne.disabled = false;
      }
    }

    processStep();
  });

  btnCtrlReset.addEventListener('click', () => {
    drawnNumbers = [];
    isAnimating = false;
    btnCtrlAll.disabled = false;
    btnCtrlOne.disabled = false;
    updateDrawnUI();

    remoteBroadcaster.emit('RESET');
  });

  chromaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      chromaBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      remoteBroadcaster.emit('CHANGE_BG', { bg: btn.dataset.bg });
    });
  });

  selectCtrlCamera.addEventListener('change', (e) => {
    remoteBroadcaster.emit('CHANGE_CAMERA', { mode: e.target.value });
  });

  inputCtrlSpeed.addEventListener('input', (e) => {
    valCtrlSpeed.textContent = e.target.value;
    remoteBroadcaster.emit('CHANGE_SPEED', { speed: parseFloat(e.target.value) });
  });

  btnCtrlSound.addEventListener('click', () => {
    remoteBroadcaster.emit('TOGGLE_SOUND');
  });

  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

    if (e.code === 'Space') {
      e.preventDefault();
      btnCtrlOne.click();
    } else if (e.key === 'r' || e.key === 'R' || e.key === 'ㄱ') {
      btnCtrlReset.click();
    }
  });
});
