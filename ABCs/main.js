let values = {};
const answerEl = [ 'answer1', 'answer2', 'answer3' ];

function init() {
    for(let i=0; i<answerEl.length; i++) {
        const el = document.getElementById(`${answerEl[i]}`);
        el.addEventListener('click', promptValue);
    }
    generatePuzzle();
}

function promptValue(event) {
    const index = event.target.getAttribute('id');
    const el = document.getElementById(index);
    const letter = String.fromCharCode(65 + (answerEl.indexOf(index)));
    let answer = window.prompt(`Value of ${letter} = `);
    if(answer != parseInt(answer) || parseInt(answer) < 0) answer = 0;
    if(parseInt(answer) > 99) answer = 99;
    el.innerText = parseInt(answer);
    el.setAttribute('data-content', `${parseInt(answer)}`);
}

function genNumber(min, max) {
    const range = max-min;
    const number = Math.round( Math.random()*range )+min;
    return number;
}

function populateBoard() {
    const pairs = [ 'AB', 'AC', 'BC' ];
    for(let i=0; i<pairs.length; i++){
        let currentPair = `${pairs[i]}`;
        const el = { e1:document.getElementById(`${currentPair}1`), e2:document.getElementById(`${currentPair}2`) }
        const total = `${values[currentPair[0]]+values[currentPair[1]]}`;
        el.e1.className = el.e2.className = "numberDiv";
        el.e1.classList.add(`number_${total[0]}`);
        if(total[1])
            el.e2.classList.add(`number_${total[1]}`);
        else
            el.e2.classList.add(`number_n`);
    }
}

function resetButtons() {
    for(let i=0; i<answerEl.length; i++) {
        const el = document.getElementById(`${answerEl[i]}`);
        el.setAttribute('data-content', '');
        el.innerText = '';
        if(el.classList.contains('correct'))
            el.classList.remove('correct');
        if(el.classList.contains('incorrect'))
            el.classList.remove('incorrect');

    }
}

function checkAnswers() {
    for(let i=0; i<answerEl.length; i++) {
        const el = document.getElementById(`${answerEl[i]}`);
        const letter = String.fromCharCode(65 + (answerEl.indexOf(answerEl[i])));
        const userAnswer = parseInt(el.innerText);
        if(userAnswer == values[letter]) {
            el.classList.add('correct');
        } else {
            el.classList.add('incorrect');
            el.innerText = values[letter];
            el.setAttribute('data-content', values[letter]);
        }
    }
    const finishEl = document.getElementById('finish');
    finishEl.innerText = 'Play Again';
    finishEl.setAttribute('data-content', 'Play Again');
    finishEl.setAttribute('onclick', 'generatePuzzle()');
}

function generatePuzzle() {
    const finishEl = document.getElementById('finish');
    finishEl.innerText = 'Confirm';
    finishEl.setAttribute('data-content', 'Confirm');
    finishEl.setAttribute('onclick', 'checkAnswers()');

    values = { A:genNumber(1, 30), B:genNumber(1, 30), C:genNumber(1, 30) };

    resetButtons();
    populateBoard();
}

init();

function download() {
    const randomNumber = Math.floor( Math.random() * 1000000000 );
    document.body.style.setProperty("--maxSize", "960px");
    html2canvas(puzzleEl).then(function(canvas) {
        document.body.appendChild(canvas);

        canvas.setAttribute('id', 'imageDL');
        const image = canvas.toDataURL("image/png", 1.0);
        const link = document.createElement("a");
        link.download = `${randomNumber}_puzzle.png`;
        link.href = image;
        link.click();
        document.getElementById('imageDL').remove();
    });
    document.body.style.setProperty("--maxSize", "82.76vmin");
}

function goBack() {
    document.location.href = '../index.html';
}