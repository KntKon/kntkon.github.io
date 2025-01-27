const answerEl = [ 'answer1', 'answer2', 'answer3', 'answer4', 'answer5' ];

let values = [
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ]
]

let answers = [];
let populated = { Hor:[ 2, 2, 2 ], Ver:[ 2, 2, 2 ] };
let curPopulated = [];

const puzzleEl = document.getElementById('puzzle');

function populateValues() {
    for(let i=0; i<3; i++) {
        for(let j=0; j<3; j++) {
            if(i<2 && j<2) {
                values[i][j] = genNumber(1, 24);
            } else if(i==2 && j<2) {
                values[i][j] = values[0][j] + values[1][j];
            } else if(i<2 && j==2) {
                values[i][j] = values[i][0] + values[i][1];
            } else {
                values[i][j] = values[i][0] + values[i][1];
            }
        }
    }
}

function createShownValues() {
        let randX = genNumber(0,2);
        let randY = genNumber(0,2);

        if(curPopulated.includes(`${randX}-${randY}`)){
            createShownValues(); return;
        }

        let newRandX = genDifferentNumber(0,2,randX);
        let newRandY = genDifferentNumber(0,2,randY);

        curPopulated.push(`${randX}-${randY}`);
        curPopulated.push(`${newRandX}-${randY}`);
        curPopulated.push(`${randX}-${newRandY}`);

        populated.Hor[randX] -= 2;
        populated.Hor[newRandX]--;

        populated.Ver[randY] -= 2;
        populated.Ver[newRandY]--;

        let lastRandX = genDifferentNumber(0,2,populated.Hor.indexOf(0));
        let lastRandY = genDifferentNumber(0,2,populated.Ver.indexOf(0));
        curPopulated.push(`${lastRandX}-${lastRandY}`);
}

function promptValue(event) {
    const index = event.target.getAttribute('id');
    const el = document.getElementById(index);
    let answer = window.prompt(`Value of ${index} = `);
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

function genDifferentNumber(min, max, curr) {
    const range = max-min;
    const number = Math.round( Math.random()*range )+min;

    if(number == curr) {
        return genDifferentNumber(min, max, curr);
    } else {
        return number;
    }
}

function drawOnGrid() {
    for(let i=0; i<3; i++) {
        for(let j=0; j<3; j++) {
            if(curPopulated.includes(`${i}-${j}`)) {
                puzzleEl.children[(i*10+j*2)].innerText = values[i][j];
            } else {
                const el = document.createElement('button');
                el.classList.add('answerButton');
                el.setAttribute('id', `answer${document.getElementsByClassName('answerButton').length+1}`);
                el.setAttribute('data-content', '');
                answers.push(values[i][j]);
                puzzleEl.children[(i*10+j*2)].appendChild(el);
            }
        }
    }
}

function generatePuzzle() {
    populateValues();
    createShownValues();

    drawOnGrid();
    
    for(let i=0; i<answerEl.length; i++) {
        const el = document.getElementById(`${answerEl[i]}`);
        el.addEventListener('click', promptValue);
    }
}

function resetPuzzle() {
    
    const ansButton = document.getElementsByClassName('answerButton');
    const ansLength = ansButton.length;
    for(let x=0; x<ansLength; x++) {
        ansButton[0].remove();
    }

    answers = [];
    populated = { Hor:[ 2, 2, 2 ], Ver:[ 2, 2, 2 ] };
    curPopulated = [];

    for(let i=0; i<3; i++) {
        for(let j=0; j<3; j++) {
            puzzleEl.children[(i*10+j*2)].innerHTML = '';
        }
    }

    const finishButton = document.getElementById('finish');
    finishButton.innerText = 'Confirm';
    finishButton.setAttribute('data-content', 'Confirm');
    finishButton.setAttribute('onclick', `checkAnswers()`);

    generatePuzzle();
}

function checkAnswers() {
    const ansButton = document.getElementsByClassName('answerButton');
    for(let x=0; x<ansButton.length; x++) {
        const userAnswer = parseInt(ansButton[x].innerText);
        if(userAnswer == answers[x])
            ansButton[x].classList.add('correct');
        else {
            ansButton[x].innerText = answers[x];
            ansButton[x].setAttribute('data-content', answers[x]);
            ansButton[x].classList.add('incorrect');
        }
    }
    const finishButton = document.getElementById('finish');
    finishButton.innerText = 'Play Again';
    finishButton.setAttribute('data-content', 'Play Again');
    finishButton.setAttribute('onclick', `resetPuzzle()`);
}

generatePuzzle();