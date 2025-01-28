let curSelected;

function goTo(page) {
    let path = `./${page}.html`;
    document.location.href = path;
}

function download() {
    const puzzleEl = document.getElementById('container');
    const randomNumber = Math.floor( Math.random() * 1000000000 );
    document.body.style.setProperty("--border", "none");
    document.body.style.setProperty("--maxSize", "1012.5px");
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
    document.body.style.setProperty("--maxSize", "90vmin");
    document.body.style.setProperty("--border", "calc( var(--unitOne) / 4 )");
}

function openModal(type) {
    const modal = document.getElementById('modal');
    document.body.style.setProperty('--modalScale', '1');
    if(type=='difficulty') {
        const elSelected = document.getElementsByClassName('selected')[0].getAttribute('id');
        curSelected = parseInt(elSelected[elSelected.length-1])-1;
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    document.body.style.setProperty('--modalScale', '0');
}

function selectDifficulty(id) {
    const elDifficulty = document.getElementsByClassName('difficultyDiv');
    elDifficulty[curSelected].classList.remove('selected');
    elDifficulty[id].classList.add('selected');
    curSelected = id;
}

function setDifficulty() {
    difficulty = curSelected;
    closeModal();

    const buttonDifficulty = document.getElementById('difficulty');
    buttonDifficulty.style.setProperty('background-position-x', `calc((0px - var(--unitFour)*${difficulty}))`);
}