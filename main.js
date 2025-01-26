let baseFruits = [];
let fruits = [];
let equations = [];
let computed = [];

let minNumber = 1;
let maxNumber = 9;

const puzzleEl = document.getElementById('puzzle');
const answerEl = document.getElementById('answer');

function genNum(min, max) {
    const totalNumbers = max-min;
    const number = Math.round(Math.random()*totalNumbers)+min;
    return number;
}

function genMlt(level) {
    let numbers = [];
    switch(level) {
        case 0:
            numbers = [1,1,1,1,1,1,1,1,1,1, 2,2,2,2,2, 3];
            break;
        case 1:
            numbers = [1,1,1,1,1, 2,2,2, 3];
            break;
        case 2:
            numbers = [1, 2, 3];
            break;
        case 3:
            numbers = [1, 2,2,2, 3,3,3,3,3];
            break;
        case 4:
            numbers = [1, 2,2,2,2,2, 3,3,3,3,3,3,3,3,3,3];
            break;
    }

    const number = Math.round(Math.random()*(numbers.length-1));
    return numbers[number];
}

function genOpe(mode) {
    let operations = [];
    switch(mode) {
        case 0:
            operations = ['+'];
            break;
        case 1:
            operations = ['+', '-'];
            break;
        case 2:
            operations = ['+', '*'];
            break;
        case 3:
            operations = ['+', '*', '-'];
            break;
        default:
            return '+';
    }
    const number = Math.round(Math.random()*(operations.length-1));
    return operations[number];
}

function pickFruits() {
    let tempArray = baseFruits;
    for(let n=0; n<3; n++) {
        const totalNumbers = tempArray.length;
        const number = genNum(0, (totalNumbers-1));
        fruits.push(tempArray[number]);
        tempArray.splice(number, 1);
    }
}

function genFruits() {
    baseFruits = [
        { name: 'watermelon', value: genNum(minNumber, maxNumber), zwName: '西瓜' },
        { name: 'strawberry', value: genNum(minNumber, maxNumber), zwName: '草莓' },
        { name: 'banana',     value: genNum(minNumber, maxNumber), zwName: '香蕉' },
        { name: 'apple',      value: genNum(minNumber, maxNumber), zwName: '苹果' },
        { name: 'lemon',      value: genNum(minNumber, maxNumber), zwName: '柠檬' },
        { name: 'orange',     value: genNum(minNumber, maxNumber), zwName: '橙子' },
        { name: 'grape',      value: genNum(minNumber, maxNumber), zwName: '葡萄' },
        { name: 'kiwi',       value: genNum(minNumber, maxNumber), zwName: '猕猴桃' },
    ];
}

function gen1stEq(mltLevel, opeLevel) {
    if(opeLevel == 0 || opeLevel == 2) opeLevel=0;
    else opeLevel=1;
    equations.push([]);
    equations[0][0] = genMlt(mltLevel); equations[0][1] = 0; equations[0][2] = genOpe(opeLevel);
    equations[0][3] = genMlt(mltLevel); equations[0][4] = 0; equations[0][5] = genOpe(opeLevel);
    equations[0][6] = genMlt(mltLevel); equations[0][7] = 0; equations[0][8] = '=';
}

function gen2ndEq(mltLevel, opeLevel) {
    const position = genNum(0, 2);
    equations.push([]);
    equations[1][0] = genMlt(mltLevel); equations[1][1] = 0; equations[1][2] = genOpe(opeLevel);
    equations[1][3] = genMlt(mltLevel); equations[1][4] = 0; equations[1][5] = genOpe(opeLevel);
    equations[1][6] = genMlt(mltLevel); equations[1][7] = 0; equations[1][8] = '=';
    equations[1][(position*3+1)] = 1;
}

function gen3rdEq(mltLevel, opeLevel) {
    const position = genNum(0, 2);
    equations.push([]);
    equations[2][0] = genMlt(mltLevel); equations[2][1] = 1; equations[2][2] = genOpe(opeLevel);
    equations[2][3] = genMlt(mltLevel); equations[2][4] = 1; equations[2][5] = genOpe(opeLevel);
    equations[2][6] = genMlt(mltLevel); equations[2][7] = 1; equations[2][8] = '=';
    equations[2][(position*3+1)] = 2;
}

function gen4thEq(mltLevel, opeLevel) {
    const threeFruits = genNum(0, 1);
    if(threeFruits) {
        let tempFruits = [0, 1, 2];
        let fruitsOrder = [];
        for(let n=0; n<3; n++) {
            const number = genNum(0, tempFruits.length-1);
            fruitsOrder.push(tempFruits[number]);
            tempFruits.splice(number, 1);
        }
        equations.push([]);
        equations[3][0] = genMlt(mltLevel); equations[3][1] = fruitsOrder[0]; equations[3][2] = genOpe(opeLevel);
        equations[3][3] = genMlt(mltLevel); equations[3][4] = fruitsOrder[1]; equations[3][5] = genOpe(opeLevel);
        equations[3][6] = genMlt(mltLevel); equations[3][7] = fruitsOrder[2]; equations[3][8] = '=';
    } else {
        const position = genNum(0, 2);
        equations.push([]);
        equations[3][0] = genMlt(mltLevel); equations[3][1] = 0; equations[3][2] = genOpe(opeLevel);
        equations[3][3] = genMlt(mltLevel); equations[3][4] = 0; equations[3][5] = genOpe(opeLevel);
        equations[3][6] = genMlt(mltLevel); equations[3][7] = 0; equations[3][8] = '=';
        equations[3][(position*3+1)] = 2;
    }
}

function computeEquations() {
    const eq1 = equations[0]; const eq2 = equations[1]; const eq3 = equations[2]; const eq4 = equations[3];
    const equation1 = `${eq1[0]}*${fruits[eq1[1]].value} ${eq1[2]} ${eq1[3]}*${fruits[eq1[4]].value} ${eq1[5]} ${eq1[6]}*${fruits[eq1[7]].value}`;
    const equation2 = `${eq2[0]}*${fruits[eq2[1]].value} ${eq2[2]} ${eq2[3]}*${fruits[eq2[4]].value} ${eq2[5]} ${eq2[6]}*${fruits[eq2[7]].value}`;
    const equation3 = `${eq3[0]}*${fruits[eq3[1]].value} ${eq3[2]} ${eq3[3]}*${fruits[eq3[4]].value} ${eq3[5]} ${eq3[6]}*${fruits[eq3[7]].value}`;
    const equation4 = `${eq4[0]}*${fruits[eq4[1]].value} ${eq4[2]} ${eq4[3]}*${fruits[eq4[4]].value} ${eq4[5]} ${eq4[6]}*${fruits[eq4[7]].value}`;
    computed.push(equation1, equation2, equation3, equation4);
}

function result(id, eq,) {
    let DOM = ``;
    if(id==3) {
        DOM = `<img src="./img/signs/question.png" />`;
    } else {
        for(let n=0; n<eq.length; n++){
            DOM += `<img src="./img/numbers/${eq[n]}.png" />`
        }
    }
    return DOM;
}

function drawPuzzle() {
    for(let n=0; n<=3; n++){
        let index = n;
        if(index != 4) {
            const div = document.createElement('div');
    
            const el = document.createElement('img');
            el.src = `./img/fruits/${equations[index][0]}_${fruits[equations[index][1]].name}.png`
            div.appendChild(el);
    
            const el2 = document.createElement('img');
            switch(equations[index][2]) {
                default:
                    el2.src = `./img/signs/${equations[index][2]}.png`;
                    break;
                case '/':
                    el2.src = `./img/signs/div.png`;
                    break;
                case '*':
                    el2.src = `./img/signs/x.png`;
                    break;
            }
            div.appendChild(el2);
    
            const el3 = document.createElement('img');
            el3.src = `./img/fruits/${equations[index][3]}_${fruits[equations[index][4]].name}.png`
            div.appendChild(el3);
    
            const el4 = document.createElement('img');
            switch(equations[index][5]) {
                default:
                    el4.src = `./img/signs/${equations[index][5]}.png`;
                    break;
                case '/':
                    el4.src = `./img/signs/div.png`;
                    break;
                case '*':
                    el4.src = `./img/signs/x.png`;
                    break;
            }
            div.appendChild(el4);
    
            const el5 = document.createElement('img');
            el5.src = `./img/fruits/${equations[index][6]}_${fruits[equations[index][7]].name}.png`
            div.appendChild(el5);
    
            const el6 = document.createElement('img');
            el6.src = `./img/signs/${equations[index][8]}.png`;
            div.appendChild(el6);
    
            div.innerHTML += result(index, `${eval(computed[index])}`, 1);
            puzzleEl.appendChild(div);
        } else {
            const div = document.createElement('div');
    
            div.innerHTML += `<img src="./img/fruits/1_${fruits[0].name}.png" /><img src="./img/signs/=.png" /><img src="./img/signs/none.png" />`;
            div.innerHTML += `<img src="./img/fruits/1_${fruits[1].name}.png" /><img src="./img/signs/=.png" /><img src="./img/signs/none.png" />`;
            div.innerHTML += `<img src="./img/fruits/1_${fruits[2].name}.png" /><img src="./img/signs/=.png" /><img src="./img/signs/none.png" />`;
           
            puzzleEl.appendChild(div);
        }
    }
}

function drawAnswer() {
    const height = 75;
    const div = document.createElement('div');

    div.innerHTML += `<img src="./img/fruits/1_${fruits[0].name}.png" height="${height}" /><img src="./img/signs/=.png" height="${height}" /><img src="./img/numbers/${fruits[0].value}.png" height="${height}" />`;
    div.innerHTML += `<div class="smallDivider"></div>`;
    div.innerHTML += `<img src="./img/fruits/1_${fruits[1].name}.png" height="${height}" /><img src="./img/signs/=.png" height="${height}" /><img src="./img/numbers/${fruits[1].value}.png" height="${height}" />`;
    div.innerHTML += `<div class="smallDivider"></div>`;
    div.innerHTML += `<img src="./img/fruits/1_${fruits[2].name}.png" height="${height}" /><img src="./img/signs/=.png" height="${height}" /><img src="./img/numbers/${fruits[2].value}.png" height="${height}" />`;
    div.innerHTML += `<div class="smallDivider"></div>`;
    div.innerHTML += `<img src="./img/signs/question.png" height="${height}" /><img src="./img/signs/=.png" height="${height}" />`;
    const answer = `${eval(computed[3])}`;
    for(let n=0; n<answer.length; n++){
        div.innerHTML += `<img src="./img/numbers/${answer[n]}.png" height="${height}" />`;
    }
    answerEl.appendChild(div);
}

function generatePuzzle() {
    document.getElementById('puzzle').innerHTML = '';
    genFruits();
    pickFruits();

    // (Multiplicateur, Operation) //
    gen1stEq(0, 2);
    gen2ndEq(0, 2);
    gen3rdEq(0, 2);
    gen4thEq(0, 2);

    computeEquations();

    if(eval(computed[0])>9999 || eval(computed[1])>9999 || eval(computed[2])>9999) {
        reload(); return;
    }

    //console.log(`${fruits[0].name} => ${fruits[0].value}`);
    //console.log(`${fruits[1].name} => ${fruits[1].value}`);
    //console.log(`${fruits[2].name} => ${fruits[2].value}`);
    //console.log(`Answer => ${eval(computed[3])}`);

    drawPuzzle();
    //drawAnswer();

    let elButtons = document.getElementsByClassName('buttonsAnsw');
    for(let b=0; b<elButtons.length; b++) {
        elButtons[b].setAttribute('onclick', `test(${b})`);
        const image = document.getElementById(`image${b+1}`);
        if(b<3) {
            elButtons[b].style.backgroundImage = `url('./img/fruits/1_${fruits[b].name}.png')`;
        } else {
            elButtons[b].style.backgroundImage = `url('./img/fruits/question.png')`;
        }
    }
}

function download() {
    const randomNumber = Math.floor( Math.random() * 1000000000 );
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
    html2canvas(answerEl).then(function(canvas) {
        document.body.appendChild(canvas);
        canvas.setAttribute('id', 'imageDL');
        const image = canvas.toDataURL("image/png", 1.0);
        const link = document.createElement("a");
        link.download = `${randomNumber}_answer.png`;
        link.href = image;
        link.click();
        document.getElementById('imageDL').remove();
    });
}

function test(index) {
    let elButtons = document.getElementsByClassName('buttonsAnsw');
    let answer = 0;
    if(index<3) {
        answer = window.prompt(`${fruits[index].zwName} = ?`, '???');
    } else {
        answer = window.prompt(`最终答案 = ?`, '???');
    }

    if(answer != parseInt(answer))
        answer = 0;

    elButtons[index].lastChild.innerText = parseInt(answer);
}

function checkResults() {
    let elButtons = document.getElementsByClassName('buttonsAnsw');
    for(let b=0; b<elButtons.length; b++) {
        if(b<3) {
            const userAnswer = document.getElementById(`ans${b+1}`).innerText;
            const answer = fruits[b].value;

            if(userAnswer != answer) {
                //console.log(`${fruits[b].name} is wrong. Your answer: ${userAnswer}, actual answer: ${answer}`);
                elButtons[b].classList.add('incorrect');
                elButtons[b].lastChild.innerText = answer;
            } else {
                elButtons[b].classList.add('correct');
            }
        } else {
            const userAnswer = document.getElementById(`ans${b+1}`).innerText;
            const answer = eval(computed[3]);

            if(userAnswer != answer) {
                //console.log(`Final answer is wrong. Your answer: ${userAnswer}, actual answer: ${answer}`);
                elButtons[b].classList.add('incorrect');
                elButtons[b].lastChild.innerText = answer;
            } else {
                elButtons[b].classList.add('correct');
            }
        }
    }
}

function resetButton() {
    let elButtons = document.getElementsByClassName('buttonsAnsw');
    for(let b=0; b<elButtons.length; b++) {
        if(elButtons[b].classList.contains('incorrect'))
            elButtons[b].classList.remove('incorrect');
        if(elButtons[b].classList.contains('correct'))
            elButtons[b].classList.remove('correct');

        document.getElementById(`ans${b+1}`).innerText = '...';
    }
}

function reload() {
    fruits=[]; equations=[]; computed=[]; baseFruits=[];
    puzzleEl.innerHTML = '';
    resetButton();

    generatePuzzle();
}

reload();