console.log('Welcome to Tic Tac Toe')
let music = new Audio("source/8bitMusic.mp3")
let move = new Audio("source/switchTurn.mp3")
let gameover = new Audio("source/gameover.wav")
let drawVid = document.getElementById('drawMeme')
let turn = "X"
let isgameover = false;

document.getElementById('restart').addEventListener('click', () =>{
    location.reload()
})

// Function to change the turn
const changeTurn = ()=> {
    return turn === "X" ? "O" : "X"
}

// Function to check for a Winner
const checkWin = () =>{
    let boxtexts = document.getElementsByClassName('boxtext')
    let wins =[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    wins.forEach(e =>{
        if((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) &&
           (boxtexts[e[2]].innerText === boxtexts[e[1]].innerText) &&
           (boxtexts[e[0]].innerText !== "")){
        document.querySelector('.info').innerText = boxtexts[e[0]].innerText + " WON"
        document.querySelector('img').style.display = 'block'
        isgameover = true;
        music.pause()
        
        boxtexts[e[0]].classList.add('winner');
        boxtexts[e[1]].classList.add('winner');
        boxtexts[e[2]].classList.add('winner');


        }else if(!isgameover && checkDraw()) {
            isgameover = true;
            document.querySelector('.info').innerText = "It's a DRAW";
            drawVid.style.display = 'block';
            drawVid.play()
        }
    }
    
    )
}

// Function to check for a draw
const checkDraw = () => {
    let boxtexts = document.getElementsByClassName('boxtext');
    for (let boxtext of boxtexts) {
        if (boxtext.innerText === "") {
            return false; // If any box is empty, it's not a draw
        }
    }
    return true; // All boxes are filled, it's a draw
};




//Game Logic
// music.play()
music.volume = 0.5
let boxes = document.getElementsByClassName('box');
Array.from(boxes).forEach(element =>{
    let boxtextInfo = element.querySelector('.boxtext')
    element.addEventListener('click', () =>{
        move.play();
        if(boxtextInfo.innerText === "" && !isgameover){
            boxtextInfo.innerText = turn;
            turn = changeTurn();
            checkWin();
            // checkDraw();
            if(!isgameover){
                document.getElementsByClassName("info")[0].innerText = `Turn of ${turn} `;

            }
        }
    })
})