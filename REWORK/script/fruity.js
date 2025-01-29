let baseFruits, fruits, equations, computed = [];
let minNumber, maxNumber, minGenNumber, maxGenNumber;
let difficulty = 0;

// DONE
function genNum(min, max) {
    const totalNumbers = Math.floor(max-min);
    let number = Math.floor(Math.random()*totalNumbers)+Math.floor(min);
    if(number == 0) { number = 1; }

    return number;
}

// DONE
function genMlt(_difficulty) {
    let numbers = [];
    switch(_difficulty) {
        case 0:     // EASY
            numbers = [1,1,1,1,1,1,1,1,1,1, 2,2,2,2,2];
            break;
        case 1:     // BEGINER
            numbers = [1,1,1,1,1, 2,2,2, 3];
            break;
        case 2:     // MEDIUM
            numbers = [1, 2, 3];
            break;
        case 3:     // HARD
            numbers = [1, 2,2,2, 3,3,3,3,3];
            break;
        case 4:     // EXPERT
            numbers = [2,2,2,2,2, 3,3,3,3,3,3,3,3,3,3];
            break;
    }
    const _rand = Math.round(Math.random()*(numbers.length-1));
    return numbers[_rand];
}

// DONE
function genOpe(_difficulty) {
    let operations = [];
    switch(_difficulty) {
        case 0:     // EASY
            operations = ['+'];
            break;
        case 1:     // BEGINER
            operations = ['+', '*'];
            break;
        case 2:     // MEDIUM
            operations = ['+', '+', '+', '*', '*', '*', '-'];
            break;
        case 3:     // HARD
            operations = ['+', '*', '-'];
            break;
        case 4:     // EXPERT
            operations = ['+', '*', '-', '/'];
            break;
    }
    const _rand = Math.round(Math.random()*(operations.length-1));
    return operations[_rand];
}

// DONE
function genMinMax(_difficulty) {
    switch(_difficulty) {
        case 0:     // EASY
            minNumber = 1;
            maxNumber = 30;
            minGenNumber = 1;
            maxGenNumber = 30;
            break;
        case 1:     // BEGINER
            minNumber = 1;
            maxNumber = 99;
            minGenNumber = 1;
            maxGenNumber = 48;
            break;
        case 2:     // MEDIUM
            minNumber = 1;
            maxNumber = 99;
            minGenNumber = -10;
            maxGenNumber = 48;
            break;
        case 3:     // HARD
            minNumber = -99;
            maxNumber = 99;
            minGenNumber = -48;
            maxGenNumber = 48;
            break;
        case 4:     // EXPERT
            minNumber = -99;
            maxNumber = 999;
            minGenNumber = -48;
            maxGenNumber = 99;
            break;
    }
}

// DONE
function pickFruits() {
    let tempArray = [...baseFruits];
    for(let n=0; n<3; n++) {
        const totalNumbers = tempArray.length;
        const number = genNum(0, (totalNumbers-1));
        fruits.push(tempArray[number]);
        tempArray.splice(number, 1);
    }
}

// DONE
function genFruits() {
    baseFruits = [
        { name: 'Watml', value: genNum(minGenNumber, maxGenNumber), id: 0 },
        { name: 'Straw', value: genNum(minGenNumber, maxGenNumber), id: 1 },
        { name: 'Banan', value: genNum(minGenNumber, maxGenNumber), id: 2 },
        { name: 'Apple', value: genNum(minGenNumber, maxGenNumber), id: 3 },
        { name: 'Lemon', value: genNum(minGenNumber, maxGenNumber), id: 4 },
        { name: 'Ornge', value: genNum(minGenNumber, maxGenNumber), id: 5 },
        { name: 'Grape', value: genNum(minGenNumber, maxGenNumber), id: 6 },
        { name: 'Kiwis', value: genNum(minGenNumber, maxGenNumber), id: 7 },
    ];
}

// DONE
function gen1stEq(_difficulty) {
    let _opeDifficulty;
    if(_difficulty <= 1) _opeDifficulty = 0;
    else _opeDifficulty = 1;
    equations.push([]);
    equations[0][0] = genMlt(_difficulty); equations[0][1] = 0; equations[0][2] = genOpe(_opeDifficulty);
    equations[0][3] = genMlt(_difficulty); equations[0][4] = 0; equations[0][5] = genOpe(_opeDifficulty);
    equations[0][6] = genMlt(_difficulty); equations[0][7] = 0; equations[0][8] = '=';
}

// DONE
function gen2ndEq(_difficulty) {
    const position = genNum(0, 2);
    equations.push([]);
    equations[1][0] = genMlt(_difficulty); equations[1][1] = 0; equations[1][2] = genOpe(_difficulty);
    equations[1][3] = genMlt(_difficulty); equations[1][4] = 0; equations[1][5] = genOpe(_difficulty);
    equations[1][6] = genMlt(_difficulty); equations[1][7] = 0; equations[1][8] = '=';
    equations[1][(position*3+1)] = 1;
}

// DONE
function gen3rdEq(_difficulty) {
    const position = genNum(0, 2);
    equations.push([]);
    equations[2][0] = genMlt(_difficulty); equations[2][1] = 1; equations[2][2] = genOpe(_difficulty);
    equations[2][3] = genMlt(_difficulty); equations[2][4] = 1; equations[2][5] = genOpe(_difficulty);
    equations[2][6] = genMlt(_difficulty); equations[2][7] = 1; equations[2][8] = '=';
    equations[2][(position*3+1)] = 2;
}

// DONE
function gen4thEq(_difficulty) {
    const threeFruits = genNum(1, 2)-1;
    if(threeFruits) {
        let tempFruits = [0, 1, 2];
        let fruitsOrder = [];
        for(let n=0; n<3; n++) {
            const number = genNum(1, tempFruits.length)-1;
            fruitsOrder.push(tempFruits[number]);
            tempFruits.splice(number, 1);
        }
        equations.push([]);
        equations[3][0] = genMlt(_difficulty); equations[3][1] = fruitsOrder[0]; equations[3][2] = genOpe(_difficulty);
        equations[3][3] = genMlt(_difficulty); equations[3][4] = fruitsOrder[1]; equations[3][5] = genOpe(_difficulty);
        equations[3][6] = genMlt(_difficulty); equations[3][7] = fruitsOrder[2]; equations[3][8] = '=';
    } else {
        const position = genNum(1, 3)-1;
        equations.push([]);
        equations[3][0] = genMlt(_difficulty); equations[3][1] = 0; equations[3][2] = genOpe(_difficulty);
        equations[3][3] = genMlt(_difficulty); equations[3][4] = 0; equations[3][5] = genOpe(_difficulty);
        equations[3][6] = genMlt(_difficulty); equations[3][7] = 0; equations[3][8] = '=';
        equations[3][(position*3+1)] = 2;
    }
}

// DONE
function computeEquations() {
    const eq1 = equations[0]; const eq2 = equations[1]; const eq3 = equations[2]; const eq4 = equations[3];
    const equation1 = `${eq1[0]}*${fruits[eq1[1]].value} ${eq1[2]} ${eq1[3]}*${fruits[eq1[4]].value} ${eq1[5]} ${eq1[6]}*${fruits[eq1[7]].value}`;
    const equation2 = `${eq2[0]}*${fruits[eq2[1]].value} ${eq2[2]} ${eq2[3]}*${fruits[eq2[4]].value} ${eq2[5]} ${eq2[6]}*${fruits[eq2[7]].value}`;
    const equation3 = `${eq3[0]}*${fruits[eq3[1]].value} ${eq3[2]} ${eq3[3]}*${fruits[eq3[4]].value} ${eq3[5]} ${eq3[6]}*${fruits[eq3[7]].value}`;
    const equation4 = `${eq4[0]}*${fruits[eq4[1]].value} ${eq4[2]} ${eq4[3]}*${fruits[eq4[4]].value} ${eq4[5]} ${eq4[6]}*${fruits[eq4[7]].value}`;
    computed.push(equation1, equation2, equation3, equation4);
}

// DONE
function drawPuzzle() {

    const elFruits = document.getElementsByClassName('puzzleFruits');
    for(let i=0; i<elFruits.length-1; i++) {
        const _mult = equations[Math.floor(i/3)][(i%3)*3];
        const _id = equations[Math.floor(i/3)][(i%3)*3+1];
        elFruits[i].classList.add(`fruit${fruits[_id].name}${_mult}`);
    }

    const elSigns = document.getElementsByClassName('puzzleSigns');
    for(let i=0; i<elSigns.length; i++) {
        let _sign = equations[Math.floor(i/3)][(i%3)*3+2];
        if(_sign == "+")
            _sign = 'signPlus';
        else if(_sign == "-")
            _sign = 'signMins';
        else if(_sign == "=")
            _sign = 'signEqul';
        else if(_sign == "*")
            _sign = 'signMult';
        else if(_sign == "/")
            _sign = 'signDivi';
        else if(_sign == "?")
            _sign = 'signQues';
        else
            _sign = 'signQues';
        elSigns[i].classList.add(`${_sign}`);
    }

    let _values = [];
    for(let i=0; i<3; i++){
        const eq = `${eval(computed[i])}`;
        _values.push( [] );
        for(let n=0; n<eq.length; n++){
            _values[i].push(eq[n]);
        }
    }

    const elNumbers = document.getElementsByClassName('puzzleNumbers');
    for(let i=0; i<elNumbers.length; i++) {
        const _id = Math.floor(i/3);
        const _data = i%3;
        const _number = _values[_id][_data];
        if(_number){
            elNumbers[i].classList.add(`numb${_number}`);
        } else {
            elNumbers[i].classList.add(`numbN`);
        }
    }

    const elAnsFruits = document.getElementsByClassName('answerFruits');
    for(let i=0; i<elAnsFruits.length; i++) {
        if(i<elAnsFruits.length-1)
            elAnsFruits[i].classList.add(`fruit${fruits[i].name}1`);

        elAnsFruits[i].setAttribute(`onclick`, `answerPrompt(${i})`);
    }
}

// DONE
function answerPrompt(_id) {
    let elButtons = document.getElementsByClassName('answerFruits');
    let answer = 0;
    if(_id<3)
        answer = window.prompt(`Fruit #${_id+1} is equal to ...`);
    else
        answer = window.prompt(`Total is equal to ...`);

    if(answer != parseInt(answer))
        answer = 0;
    if(answer > 999)
        answer = 999;
    if(answer < -99)
        answer = -99;

    elButtons[_id].innerText = answer;
    //elButtons[_id].setAttribute('data-content', `${parseInt(answer)}`);
}

// DONE
function checkResults() {
    const elButtons = document.getElementsByClassName('answerFruits');
    fruits.push( { name:'total', value:eval(computed[elButtons.length-1]) } );
    for(let i=0; i<elButtons.length; i++) {
        const userInput = parseInt(elButtons[i].innerText);
        const answer = fruits[i].value;
        if(userInput == answer) {
            elButtons[i].classList.add('correct');
        } else {
            elButtons[i].classList.add('incorrect');
            elButtons[i].innerText = answer;
        }
    }

    const button = document.getElementById('divAnswerFinal');
    button.innerText = 'Play Again';
    button.setAttribute('onclick', 'reload()');
    //button.setAttribute('data-content', `Confirm`);
}

// DONE
function resetButton() {
    const elFruits = document.getElementsByClassName('puzzleFruits');
    for(let i=0; i<elFruits.length-1; i++) {
        elFruits[i].className = 'divFour puzzleFruits';
    }

    const elSigns = document.getElementsByClassName('puzzleSigns');
    for(let i=0; i<elSigns.length; i++) {
        elSigns[i].className = 'divTwo puzzleSigns';
    }

    const elNumbers = document.getElementsByClassName('puzzleNumbers');
    for(let i=0; i<elNumbers.length; i++) {
        elNumbers[i].className = 'divTwo puzzleNumbers';
    }

    const elAnsFruits = document.getElementsByClassName('answerFruits');
    for(let i=0; i<elAnsFruits.length; i++) {
        elAnsFruits[i].className = 'button answerFruits';
        if(i<elAnsFruits.length-1)
            elAnsFruits[i].classList.add('divAnswerFourSmall');
        else
            elAnsFruits[i].classList.add('divAnswerFourMedium');
        elAnsFruits[i].setAttribute(`onclick`, ` `);
        elAnsFruits[i].innerText = '';
    }

    const button = document.getElementById('divAnswerFinal');
    button.innerText = 'Confirm';
    button.setAttribute('onclick', `checkResults()`);
    //button.setAttribute('data-content', `Confirm`);
}

// DONE
function reload() {
    fruits=[]; equations=[]; computed=[]; baseFruits=[];
    resetButton();
    generatePuzzle();
}

// UNTOUCHED
function generatePuzzle() {
    genMinMax(difficulty);
    genFruits();
    pickFruits();

    gen1stEq(difficulty);
    gen2ndEq(difficulty);
    gen3rdEq(difficulty);
    gen4thEq(difficulty);

    computeEquations();

    if(eval(computed[0])>maxNumber || eval(computed[1])>maxNumber || eval(computed[2])>maxNumber || eval(computed[3])>maxNumber) { reload(); return; }
    if(eval(computed[0])<minNumber || eval(computed[1])<minNumber || eval(computed[2])<minNumber || eval(computed[3])<minNumber) { reload(); return; }
    if( eval(computed[0]) != Math.floor(eval(computed[0])) || eval(computed[1]) != Math.floor(eval(computed[1])) ) { reload(); return; }
    if( eval(computed[2]) != Math.floor(eval(computed[2])) || eval(computed[3]) != Math.floor(eval(computed[3])) ) { reload(); return; }


    drawPuzzle();
}