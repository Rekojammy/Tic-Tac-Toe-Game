function _(query) {
    return document.querySelector(query)
}

const twoplayers = _('#twoplayers');
const computer = _('#computer');
const gameBtn1 = _('.gameBtn1');
const gamePlayPanel = _('.gamePlayPanel');
const main = _('.main1');

const playerBtn = _('#playerBtn');
const inputModal = _('#inputModal');
const input1 = _('#input1');
const input2 = _('#input2');
const check = _('#check');
const resultModal = _('#resultModal');
const result = _('#result');
const restart = _('#restart');
const start = _('#start');
const container = _('.container');
const resultClose = _('#resultClose');
const p1 = _('.p1');
const p2 = _('.p2');
const emoji1 = _('.emoji1');
const emoji2 = _('.emoji2');
const input1Btn = _('.input1Btn');
const input2Btn = _('.input2Btn');
const whichPlayer = _('.whichPlayer');
const box = document.querySelectorAll('.box');

const hori1 = _('.hori1');
const hori2 = _('.hori2');
const hori3 = _('.hori3');
const verti1 = _('.verti1');
const verti2 = _('.verti2');
const verti3 = _('.verti3');
const diagonstroke = _('.diagonstroke');
const slashstroke = _('.slashstroke');
const slashHold = _('.slashHold');

let xText = "X";
let oText = "O";

let arr1 = []
let arr2 = []
let arr3 = []

let isGameEnded = false;
let gameStarted = false;

let p1Score = _('#p1Score')
let p2Score = _('#p2Score') 
let drwScore = _('#drwScore') 



// Set the scores to localStorage
let exist = JSON.parse(localStorage.getItem('results'))

gameBtn1.addEventListener('click', (e) => {
    let target = e.target;
    if (target.id == 'twoplayers') {
        gamePlayPanel.style.display = 'none';
        main.style.display = 'block';
    }

    if (target.id == 'computer') {
        window.location.href = './with_computer.html';
    }
})

const addScore = (player1_score, draw_score, player2_score) => {
    let resultStore = {
        player1: player1_score,
        draws: draw_score,
        player2: player2_score
    }

    localStorage.setItem("results", JSON.stringify(resultStore))

    return { player1_score, draw_score, player2_score }
}

let playStore = JSON.parse(localStorage.getItem('results')) || []


if (!exist) {
    p1Score.innerText = 0
    drwScore.innerText = 0
    p2Score.innerText = 0
} else {
        p1Score.innerText = playStore.player1;
        drwScore.innerText = playStore.draws;
        p2Score.innerText = playStore.player2;
}



playerBtn.addEventListener('click', () => { 
    container.style.pointerEvents = 'none';
    inputModal.style.display = 'flex';
    input1.style.display = 'block';
    input1Btn.style.display = 'block';
    input2.style.display = 'none';
    input2Btn.style.display = 'none';
})

resultClose.addEventListener('click', () => {
    resultModal.style.display = 'none';
});

inputModal.addEventListener('click', (e) => {
    let target = e.target
    if (target.classList.contains('close')) {
        inputModal.style.display = 'none';
        container.style.pointerEvents = 'all';
    }
    if (target.classList.contains('input1Btn')) {
        p1.textContent = input1.value
        setTimeout(() => {
            input1.style.display = 'none';
            input1Btn.style.display = 'none';
            input2.style.display = 'block';
            input2Btn.style.display = 'block';
        }, 500)
    }
    if (target.classList.contains('input2Btn')) {
        p2.textContent = input2.value
        setTimeout(() => {
            inputModal.style.display = 'none';
        }, 500)
        container.style.pointerEvents = 'all';
    }
})

check.checked = true
let count = 0

for (let i = 0; i < box.length; i++) {
    const element = box[i];
    const gameLogic = (e) => {
        if (!gameStarted)
            gameStarted = true;
        count++
        while (count < 12) {
            if (element.textContent != '') {
                return
            } else {
                if (count % 2 == 0) {
                    check.checked = true
                    whichPlayer.firstElementChild.textContent = p1.textContent + "'s Turn...";
                    element.textContent = oText;
                } else {
                    check.checked = false
                    whichPlayer.firstElementChild.textContent = p2.textContent + "'s Turn...";
                    element.textContent = xText;
                }
            }
            break;
        }

        
        if (arrAreEqual(arr1))
            hori1.style.display = 'block';
        if (arrAreEqual(arr2))
            hori2.style.display = 'block';
        if (arrAreEqual(arr3))
            hori3.style.display = 'block';
        if (col1AreEqual(arr1))
            verti1.style.display = 'block';
        if (col2AreEqual(arr1))
            verti2.style.display = 'block';
        if (col3AreEqual(arr1))
            verti3.style.display = 'block';
        if (fslashAreEqual(arr1))
            slashstroke.style.display = 'block';
        if (bslashAreEqual(arr1))
            diagonstroke.style.display = 'block';
        if (arrAreEqual(arr1) == true || arrAreEqual(arr2) == true || arrAreEqual(arr3) == true
            || col1AreEqual() == true || col2AreEqual() == true || col3AreEqual() == true
            || fslashAreEqual() == true || bslashAreEqual() == true) {
                gameStarted = false;
            setTimeout(() => {
                if (check.checked == true) {
                    container.style.pointerEvents = 'none';
                    setTimeout(() => {
                        resultModal.style.display = 'flex';
                        result.textContent = p2.textContent + ' ' + 'WINS!'
                        emoji1.style.display = 'block';
                        p2Score.textContent++
                        isGameEnded = true;

                        // Store the results at the end of the game
                        addScore(
                            p1Score.innerText,
                            drwScore.innerText,
                            p2Score.innerText
                        )
                    }, 10)
                } else {
                    container.style.pointerEvents = 'none';
                    setTimeout(() => {
                        element.removeEventListener('click', gameLogic);
                        resultModal.style.display = 'flex';
                        result.textContent = p1.textContent + ' ' + 'WINS!'
                        emoji1.style.display = 'block';
                        emoji2.style.display = 'none';
                        p1Score.textContent++
                        isGameEnded = true;

                        // Store the results at the end of the game
                        addScore(
                            p1Score.innerText,
                            drwScore.innerText,
                            p2Score.innerText
                        )
                    }, 10)
                }
            }, 500)
        } else if (count == 9) {
            container.style.pointerEvents = 'none';
            element.removeEventListener('click', gameLogic);
            setTimeout(() => {
                resultModal.style.display = 'flex';
                result.textContent = "IT'S A TIE!"
                emoji2.style.display = 'block';
                emoji1.style.display = 'none';
                drwScore.textContent++
                isGameEnded = true;

                // Store the results at the end of the game
                addScore(
                    p1Score.innerText,
                    drwScore.innerText,
                    p2Score.innerText
                )
            }, 500)
        }
    }
    element.addEventListener('click', gameLogic);
    

    arr1[0] = box[0]
    arr1[1] = box[1]
    arr1[2] = box[2]

    arr2[0] = box[3]
    arr2[1] = box[4]
    arr2[2] = box[5]

    arr3[0] = box[6]
    arr3[1] = box[7]
    arr3[2] = box[8]

    start.addEventListener('click', () => {
        if(isGameEnded || !gameStarted) {
        container.style.pointerEvents = 'all';
            element.textContent = '';
            p1Score.textContent = 0;
            p2Score.textContent = 0;
            drwScore.textContent = 0;
            check.checked = true;
            count = 0
            setTimeout(() => {
                element.addEventListener('click', gameLogic);
            },100)
            
            for (const children of slashHold.children) {
                children.style.display = 'none';
            }
            localStorage.results = JSON.stringify({ player1: "0", draws: "0", player2: "0" })
        }
    });
    
    restart.addEventListener('click', () => {
        if(isGameEnded) {
        container.style.pointerEvents = 'all';
            element.textContent = '';
            check.checked = true
            count = 0
            setTimeout(() => {
                element.addEventListener('click', gameLogic);
            },100)
            
            for (const children of slashHold.children) {
                children.style.display = 'none';
            }
        }
    });
}








function arrIsFull(array) {
    if (array[0].textContent != "" && array[1].textContent != "" && array[2].textContent != "") {
        return true
    } else {
        return false
    }
}
function bslashIsFull() {
    if (arr1[0].textContent != "" && arr2[1].textContent != "" && arr3[2].textContent != "") {
        return true
    } else {
        return false
    }
}
function fslashIsFull() {
    if (arr1[2].textContent != "" && arr2[1].textContent != "" && arr3[0].textContent != "") {
        return true
    } else {
        return false
    }
}


function arrAreEqual(array) {
    const result = array.every(element => {
        if (element.textContent != '' && element.textContent === array[0].textContent) {
            return true;
        }
    });
    return result;
}
function col1AreEqual() {
    if (box[0].textContent != '' && box[3].textContent != '' && box[6].textContent != '') {
        if (box[0].textContent == box[3].textContent && box[0].textContent == box[6].textContent) {
            return true
        } else {
            return false
        }
    }
}
function col2AreEqual() {
    if (box[1].textContent != '' && box[4].textContent != '' && box[7].textContent != '') {
        if (box[1].textContent == box[4].textContent && box[1].textContent == box[7].textContent) {
            return true
        } else {
            return false
        }
    }
}
function col3AreEqual() {
    if (box[2].textContent != '' && box[5].textContent != '' && box[8].textContent != '') {
        if (box[2].textContent == box[5].textContent && box[2].textContent == box[8].textContent) {
            return true
        } else {
            return false
        }
    }
}
function fslashAreEqual() {
    if (box[0].textContent != '' && box[4].textContent != '' && box[8].textContent != '') {
        if (box[0].textContent == box[4].textContent && box[0].textContent == box[8].textContent) {
            return true
        } else {
            return false
        }
    }
}
function bslashAreEqual() {
    if (box[2].textContent != '' && box[4].textContent != '' && box[6].textContent != '') {
        if (box[2].textContent == box[4].textContent && box[2].textContent == box[6].textContent) {
            return true
        } else {
            return false
        }
    }
}
