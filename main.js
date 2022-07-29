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
const p1Score = _('#p1Score');
const p2Score = _('#p2Score');
const drwScore = _('#drwScore');
const container = _('.container');
const blanket = _('.blanket');
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

playerBtn.addEventListener('click', () => {
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
                    blanket.style.display = 'block';
                    setTimeout(() => {
                        resultModal.style.display = 'flex';
                        result.textContent = p2.textContent + ' ' + 'WINS!'
                        emoji1.style.display = 'block';
                        p2Score.textContent++
                    }, 500)
                } else {
                    blanket.style.display = 'block';
                    setTimeout(() => {
                        element.removeEventListener('click', gameLogic);
                        resultModal.style.display = 'flex';
                        result.textContent = p1.textContent + ' ' + 'WINS!'
                        emoji1.style.display = 'block';
                        p1Score.textContent++
                    }, 500)
                }
            }, 500)
        } else if (count == 9) {
            blanket.style.display = 'block';
            element.removeEventListener('click', gameLogic);
            console.log('Game Ended')
            setTimeout(() => {
                resultModal.style.display = 'flex';
                result.textContent = "IT'S A TIE!"
                emoji2.style.display = 'block';
                drwScore.textContent++
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
}

start.addEventListener('click', () => {
    blanket.style.display = 'none';
    for (let i = 0; i < box.length; i++) {
        const element = box[i];

        element.textContent = '';
        p1Score.textContent = 0;
        p2Score.textContent = 0;
        drwScore.textContent = 0;
        check.checked = true;
        count = 0
    }
});

restart.addEventListener('click', () => {
    blanket.style.display = 'none';
    for (let i = 0; i < box.length; i++) {
        const element = box[i];
        element.textContent = '';
        check.checked = true
        count = 0
    }
});






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



