const results = document.querySelector('#results');
const button = document.querySelector('#generate');
const luckyInput = document.querySelector('#lucky-number');
const luckyRandomBtn = document.querySelector('#lucky-random');
const luckyClearBtn = document.querySelector('#lucky-clear');

const colorFor = n => n <= 10 ? 'c1' : n <= 20 ? 'c2' : n <= 30 ? 'c3' : n <= 40 ? 'c4' : 'c5';

function getLuckyNumber() {
  if (!luckyInput) return null;
  const val = parseInt(luckyInput.value, 10);
  if (!isNaN(val) && val >= 1 && val <= 45) {
    return val;
  }
  return null;
}

function makeGame(forcedLuckyNum = null) {
  const nums = new Set();
  if (forcedLuckyNum !== null) {
    nums.add(forcedLuckyNum);
  }
  while (nums.size < 6) {
    nums.add(Math.floor(Math.random() * 45) + 1);
  }
  return [...nums].sort((a, b) => a - b);
}

function generate() {
  results.replaceChildren();
  const luckyNum = getLuckyNumber();

  // 행운의 숫자가 있으면 5게임 중 3~5게임(최소 3게임 보장)을 무작위로 선택하여 포함
  const luckyGameIndices = new Set();
  if (luckyNum !== null) {
    // 3, 4, 5 게임 중 무작위 개수 결정 (최소 3게임 보장)
    const targetCount = Math.floor(Math.random() * 3) + 3;
    const shuffled = [1, 2, 3, 4, 5].sort(() => Math.random() - 0.5);
    shuffled.slice(0, targetCount).forEach(idx => luckyGameIndices.add(idx));
  }

  for (let i = 1; i <= 5; i++) {
    const shouldIncludeLucky = luckyGameIndices.has(i);
    const gameNumbers = makeGame(shouldIncludeLucky ? luckyNum : null);
    const hasLuckyBall = luckyNum !== null && gameNumbers.includes(luckyNum);

    const row = document.createElement('div');
    row.className = `game ${hasLuckyBall ? 'has-lucky' : ''}`;
    row.style.animationDelay = `${(i - 1) * 55}ms`;

    const label = document.createElement('div');
    label.className = 'game-label';
    label.innerHTML = `LUCKY<strong>GAME 0${i}</strong>${hasLuckyBall ? '<span class="lucky-badge">★ 행운수</span>' : ''}`;

    const balls = document.createElement('div');
    balls.className = 'balls';

    gameNumbers.forEach((number, index) => {
      const isLuckyBall = luckyNum !== null && number === luckyNum;
      const ball = document.createElement('span');
      ball.className = `ball ${colorFor(number)} ${isLuckyBall ? 'is-lucky' : ''}`;
      ball.textContent = String(number).padStart(2, '0');
      ball.style.animationDelay = `${(i - 1) * 55 + index * 45}ms`;
      if (isLuckyBall) {
        ball.title = `행운의 숫자: ${number}`;
      }
      balls.append(ball);
    });

    row.append(label, balls);
    results.append(row);
  }

  button.innerHTML = '↻ &nbsp; 다시 생성하기';
}

if (luckyRandomBtn) {
  luckyRandomBtn.addEventListener('click', () => {
    luckyInput.value = Math.floor(Math.random() * 45) + 1;
    generate();
  });
}

if (luckyClearBtn) {
  luckyClearBtn.addEventListener('click', () => {
    luckyInput.value = '';
    generate();
  });
}

if (luckyInput) {
  luckyInput.addEventListener('input', () => {
    const val = parseInt(luckyInput.value, 10);
    if (val > 45) luckyInput.value = 45;
    if (val < 1 && luckyInput.value !== '') luckyInput.value = 1;
  });

  luckyInput.addEventListener('change', generate);
  luckyInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      generate();
    }
  });
}

button.addEventListener('click', generate);
generate();

