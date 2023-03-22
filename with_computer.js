function _(query) {
    return document.querySelector(query)
}

const easy = _('#easy');
const hard = _('#hard');
const gameBtn2 = _('.gameBtn2');
const gamePlayPanel = _('.gamePlayPanel');
const main = _('.main2');

const playerBtn = _('#playerBtn');
const inputModal = _('#inputModal');
const buffer = _('#buffer');
const input1 = _('#input1');
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
const whichPlayer = _('.whichPlayer');
const turn = _('.turn');
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

let isGameEnded = false;
let gameStarted = false;

let xText = "X";
let oText = "O";

let arr1 = []
let arr2 = []
let arr3 = []


let p1Score = _('#p1Score');
let p2Score = _('#p2Score');
let drwScore = _('#drwScore');



easy.addEventListener('click', (e) => {
    let target = e.target;
    gamePlayPanel.style.display = 'none';
    main.style.display = 'block';

    // Set the scores to localStorage
    let exist = JSON.parse(localStorage.getItem('easyResults'))

    turn.textContent = 'Your';

    const addScore = (player1_score, draw_score, player2_score) => {
        let resultStore = {
            player1: player1_score,
            draws: draw_score,
            player2: player2_score
        }

        localStorage.setItem("easyResults", JSON.stringify(resultStore))

        return { player1_score, draw_score, player2_score }
    }

    let playStore = JSON.parse(localStorage.getItem('easyResults')) || []


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
                inputModal.style.display = 'none';
            }, 500)
            container.style.pointerEvents = 'all';
        }
    })


    check.checked = true
    let count = 0
    let randbox = 9

    function computerTurn() {
        if (isGameEnded) {
            buffer.style.display = 'none';
            return
        } else {
            count++
            let random = Math.floor(Math.random() * randbox)
            let elem = []
            box.forEach((el, i) => {
                if (el.innerHTML == '')
                    elem.push(el)
            })
            setTimeout(() => {
                check.checked = true
                randbox--;
                elem[random].innerHTML = oText;
                whichPlayer.firstElementChild.textContent = "Your Turn";
                container.style.pointerEvents = 'all';
            }, 2000);
            setTimeout(() => {
                gameLogics();
                buffer.style.display = 'none'
            }, 2500);
        }
    }

    let playersTurn = true;

    for (let i = 0; i < box.length; i++) {
        const element = box[i];
        const gameLogic = (e) => {
            if (!gameStarted)
                gameStarted = true;
                container.style.pointerEvents = 'none';
            count++
            while (count < 12) {
                if (element.textContent != '') {
                    return
                } else {
                    check.checked = false
                    whichPlayer.firstElementChild.textContent = p2.textContent + "'s Turn";
                    element.textContent = xText;
                    container.style.pointerEvents = 'none';
                    randbox--;
                }
                break;
            }
            gameLogics();
            setTimeout(() => {
                buffer.style.display = 'flex'
                computerTurn()
            }, 500);
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
            if (isGameEnded || !gameStarted) {
                container.style.pointerEvents = 'all';
                element.textContent = '';
                p1Score.textContent = 0;
                p2Score.textContent = 0;
                drwScore.textContent = 0;
                check.checked = true;
                count = 0
                isGameEnded = false
                randbox = 9
                for (const children of slashHold.children) {
                    children.style.display = 'none';
                }
                localStorage.easyResults = JSON.stringify({ player1: "0", draws: "0", player2: "0" })
            }
        });

        restart.addEventListener('click', () => {
            if (isGameEnded) {
                container.style.pointerEvents = 'all';
                for (let i = 0; i < box.length; i++) {
                    const elements = box[i];
                    elements.textContent = '';
                }
                element.textContent = '';
                if (!playersTurn) {
                    setTimeout(() => {
                        container.style.pointerEvents = 'none';
                        computerTurn()
                    }, 500)
                }
                check.checked = true
                count = 0
                isGameEnded = false
                randbox = 9

                for (const children of slashHold.children) {
                    children.style.display = 'none';
                }
            }
        });
    }


    function gameLogics() {
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
            isGameEnded = true;
            gameStarted = false;
            setTimeout(() => {
                if (check.checked == true) {
                    container.style.pointerEvents = 'none';
                    setTimeout(() => {
                        resultModal.style.display = 'flex';
                        result.textContent = p2.textContent + ' ' + 'WINS!'
                        emoji1.style.display = 'block';
                        p2Score.textContent++

                        if (playersTurn) {
                            playersTurn = false;
                        } else {
                            playersTurn = true;
                        }

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
                        resultModal.style.display = 'flex';
                        if (p1.textContent == 'You')
                            result.textContent = "You Win!"
                        else
                            result.textContent = p1.textContent + ' ' + 'WINS!'
                        emoji1.style.display = 'block';
                        emoji2.style.display = 'none';
                        p1Score.textContent++

                        if (playersTurn) {
                            playersTurn = false;
                        } else {
                            playersTurn = true;
                        }

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
            isGameEnded = true;
            gameStarted = false;
            setTimeout(() => {
                resultModal.style.display = 'flex';
                result.textContent = "IT'S A TIE!"
                emoji2.style.display = 'block';
                emoji1.style.display = 'none';
                drwScore.textContent++;

                if (playersTurn) {
                    playersTurn = false;
                } else {
                    playersTurn = true;
                }

                // Store the results at the end of the game
                addScore(
                    p1Score.innerText,
                    drwScore.innerText,
                    p2Score.innerText
                )
            }, 500)
        }
        return isGameEnded
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
})


hard.addEventListener('click', (e) => {
    // alert('The Hard version is still in progress and unavailable for now. Please try the Easy version!')
    let target = e.target;
    gamePlayPanel.style.display = 'none';
    main.style.display = 'block';

    // Set the scores to localStorage
    let exist = JSON.parse(localStorage.getItem('hardResults'))

    turn.textContent = 'Your';

    const addScore = (player1_score, draw_score, player2_score) => {
        let resultStore2 = {
            player1: player1_score,
            draws: draw_score,
            player2: player2_score
        }

        localStorage.setItem("hardResults", JSON.stringify(resultStore2))

        return { player1_score, draw_score, player2_score }
    }

    let playStore = JSON.parse(localStorage.getItem('hardResults')) || []


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
                inputModal.style.display = 'none';
            }, 500)
            container.style.pointerEvents = 'all';
        }
    })


    check.checked = true
    let count = 0
    let randbox = 9;

    function computerTurn() {
        if (isGameEnded) {
            buffer.style.display = 'none';
            return
        } else {
            count++
            let random = Math.floor(Math.random() * randbox)
            var elem = []
            box.forEach((el, i) => {
                if (el.innerHTML == '')
                    elem.push(el)
                randbox = elem.length
            })
            check.checked = true
            randbox--;
            let hardArray1 = [box[0], box[1], box[2]]
            let hardArray2 = [box[3], box[4], box[5]]
            let hardArray3 = [box[6], box[7], box[8]]
            let hardArray4 = [box[0], box[4], box[8]]
            let hardArray5 = [box[2], box[4], box[6]]
            let hardArray6 = [box[0], box[3], box[6]]
            let hardArray7 = [box[1], box[4], box[7]]
            let hardArray8 = [box[2], box[5], box[8]]
            let O_outcome = 0;
            let X_outcome = 0;

            let motherArray = [];
            motherArray.push(hardArray1, hardArray2, hardArray3, hardArray4, hardArray5, hardArray6, hardArray7, hardArray8);
            setTimeout(() => {
                let hasTwo = false;
                let hasTwoOs = false
                for (let mod of motherArray) {
                    for (let pair of mod) {
                        if (pair.innerText === 'X') {
                            O_outcome--;
                            X_outcome++;
                            console.log(X_outcome);
                            console.log(pair);
                        } else if (pair.innerText === 'O') {
                            O_outcome++;
                            X_outcome--;
                            console.log(O_outcome);
                            console.log(pair);
                        }
                    }
                    if (O_outcome === 2) {
                        if (mod.length !== new Set(mod.textContent).size) {
                            console.log('Two Os found!');
                            hasTwo = true;
                            hasTwoOs = true;
                            console.log(mod);
                            for (let found of mod) {
                                if (found.textContent === '' && found.textContent !== 'X') {
                                    found.textContent = 'O'
                                }
                            }
                            break;
                        }
                    } else if (hasTwoOs === false) {
                        console.log('has two Os is ' + hasTwoOs);
                        if (X_outcome === 2) {
                            if (mod.length !== new Set(mod.textContent).size) {
                                console.log('Two Exes found!');
                                hasTwo = true;
                                console.log(mod);
                                for (let found of mod) {
                                    if (found.textContent === '' && found.textContent !== 'O') {
                                        found.textContent = 'O'
                                    }
                                }
                                break;
                            }
                        }
                    }
                    O_outcome = 0;
                    X_outcome = 0;
                    hasTwo = false;
                }
                if (!hasTwo) {
                    console.log('No Two Exes found');
                    randbox--;
                    elem[random].innerHTML = oText;
                }
            }, 2000);
            setTimeout(() => {
                gameLogics();
                buffer.style.display = 'none'
                container.style.pointerEvents = 'all';
                whichPlayer.firstElementChild.textContent = "Your Turn";
            }, 2500);
        }
    }

    let playersTurn = true;

    for (let i = 0; i < box.length; i++) {
        const element = box[i];
        const gameLogic = (e) => {
            if (!gameStarted)
                gameStarted = true;
            container.style.pointerEvents = 'none';
            count++
            while (count < 12) {
                if (element.textContent != '') {
                    return
                } else {
                    element.textContent = xText;
                    check.checked = false;
                    whichPlayer.firstElementChild.textContent = p2.textContent + "'s Turn";
                    randbox--;
                }
                break;
            }
            gameLogics();
            setTimeout(() => {
                buffer.style.display = 'flex';
                container.style.pointerEvents = 'none';
                computerTurn()
            }, 500);
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
            if (isGameEnded || !gameStarted) {
                console.log('hey');
                container.style.pointerEvents = 'all';
                for (let i = 0; i < box.length; i++) {
                    const elements = box[i];
                    elements.textContent = '';
                }
                p1Score.textContent = 0;
                p2Score.textContent = 0;
                drwScore.textContent = 0;
                check.checked = true;
                count = 0
                isGameEnded = false
                randbox = 9
                for (const children of slashHold.children) {
                    children.style.display = 'none';
                }
                localStorage.hardResults = JSON.stringify({ player1: "0", draws: "0", player2: "0" })
            }
        });

        restart.addEventListener('click', () => {
            if (isGameEnded) {
                container.style.pointerEvents = 'all';
                for (let i = 0; i < box.length; i++) {
                    const elements = box[i];
                    elements.textContent = '';
                }
                element.textContent = '';
                if (!playersTurn) {
                    setTimeout(() => {
                        container.style.pointerEvents = 'none';
                        computerTurn()
                    }, 500)
                }
                count = 0
                isGameEnded = false
                randbox = 9

                for (const children of slashHold.children) {
                    children.style.display = 'none';
                }
            }
            console.log('playersTurn is ' + playersTurn);
        });
    }

    function gameLogics() {
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
            isGameEnded = true;
            gameStarted = false;
            setTimeout(() => {
                if (check.checked == true) {
                    container.style.pointerEvents = 'none';
                    setTimeout(() => {
                        resultModal.style.display = 'flex';
                        result.textContent = p2.textContent + ' ' + 'WINS!'
                        emoji1.style.display = 'block';
                        p2Score.textContent++

                        if (playersTurn) {
                            playersTurn = false;
                        } else {
                            playersTurn = true;
                        }

                        // Store the results at the end of the game
                        addScore(
                            p1Score.innerText,
                            drwScore.innerText,
                            p2Score.innerText
                        )
                    }, 500)
                } else {
                    container.style.pointerEvents = 'none';
                    setTimeout(() => {
                        resultModal.style.display = 'flex';
                        if (p1.textContent == 'You')
                            result.textContent = "You Win!"
                        else
                            result.textContent = p1.textContent + ' ' + 'WINS!'
                        emoji1.style.display = 'block';
                        emoji2.style.display = 'none';
                        p1Score.textContent++

                        if (playersTurn) {
                            playersTurn = false;
                        } else {
                            playersTurn = true;
                        }

                        // Store the results at the end of the game
                        addScore(
                            p1Score.innerText,
                            drwScore.innerText,
                            p2Score.innerText
                        )
                    }, 500)
                }
            }, 500)
        } else if (count == 9) {
            container.style.pointerEvents = 'none';
            isGameEnded = true
            gameStarted = false;
            setTimeout(() => {
                resultModal.style.display = 'flex';
                result.textContent = "IT'S A TIE!"
                emoji2.style.display = 'block';
                emoji1.style.display = 'none';
                drwScore.textContent++

                if (playersTurn) {
                    playersTurn = false;
                } else {
                    playersTurn = true;
                }

                // Store the results at the end of the game
                addScore(
                    p1Score.innerText,
                    drwScore.innerText,
                    p2Score.innerText
                )
            }, 500)
        }
        return isGameEnded
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
})









