function _(query) {
    return document.querySelector(query)
}

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


let xText = "X";
let oText = "O";

let arr1 = []
let arr2 = []
let arr3 = []

let isGameEnded = false;

let p1Score = _('#p1Score')
let p2Score = _('#p2Score') 
let drwScore = _('#drwScore') 

// Set the scores to localStorage
let exist = JSON.parse(localStorage.getItem('results'))


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
    console.log('no result');
} else {
        p1Score.innerText = playStore.player1;
        drwScore.innerText = playStore.draws;
        p2Score.innerText = playStore.player2;
        console.log('result dey');
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
        count++
        while (count < 12) {
            if (element.textContent != '') {
                console.log('it is')
                return
            } else {
                console.log(count)
                if (count % 2 == 0) {
                    console.log('odd')
                    check.checked = true
                    whichPlayer.firstElementChild.textContent = p1.textContent + "'s Turn...";
                    element.textContent = oText;
                } else {
                    console.log('even')
                    check.checked = false
                    whichPlayer.firstElementChild.textContent = p2.textContent + "'s Turn...";
                    element.textContent = xText;
                }
            }
            break;
        }

        if (arrAreEqual(arr1) == true || arrAreEqual(arr2) == true || arrAreEqual(arr3) == true
            || col1AreEqual() == true || col2AreEqual() == true || col3AreEqual() == true
            || fslashAreEqual() == true || bslashAreEqual() == true) {
            console.log('Game Ended')
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
            console.log('Game Ended')
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
            localStorage.clear();
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



console.log(whichPlayer.firstElementChild.textContent)


