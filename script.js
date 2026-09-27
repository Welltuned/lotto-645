const results = document.querySelector('#results');
    const button = document.querySelector('#generate');
    const colorFor = n => n <= 10 ? 'c1' : n <= 20 ? 'c2' : n <= 30 ? 'c3' : n <= 40 ? 'c4' : 'c5';
    function makeGame() {
      const nums = new Set();
      while (nums.size < 6) nums.add(Math.floor(Math.random() * 45) + 1);
      return [...nums].sort((a,b) => a-b);
    }
    function generate() {
      results.replaceChildren();
      for (let i=1; i<=5; i++) {
        const row=document.createElement('div'); row.className='game'; row.style.animationDelay=`${(i-1)*55}ms`;
        const label=document.createElement('div'); label.className='game-label'; label.innerHTML=`LUCKY<strong>GAME 0${i}</strong>`;
        const balls=document.createElement('div'); balls.className='balls';
        makeGame().forEach((number,index) => {
          const ball=document.createElement('span'); ball.className=`ball ${colorFor(number)}`; ball.textContent=String(number).padStart(2,'0'); ball.style.animationDelay=`${(i-1)*55+index*45}ms`; balls.append(ball);
        });
        row.append(label,balls); results.append(row);
      }
      button.innerHTML='↻ &nbsp; 다시 생성하기';
    }
    button.addEventListener('click', generate);
    generate();
