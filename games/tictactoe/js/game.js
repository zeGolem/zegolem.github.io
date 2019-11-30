var currentPlayer = 'o';
var htmlCircle = '<div class="circle"></div>';
var htmlCross = '<img class="cross" src="res/x.svg"/>';
var slots = document.querySelectorAll("div.slot");

var DOMBoard = document.getElementById("game-board");
var currentBoard = [' ', ' ', ' ',
    ' ', ' ', ' ',
    ' ', ' ', ' ',];
const cleanBoardHtml = DOMBoard.innerHTML;

var gameEndedMessage = "";


function onSlotClick(event) {
    var element = event.target;
    if (element.innerHTML == "" && element.parentNode.className != "slot") {
        var slotID = parseInt(element.id.substring(5)) - 1;
        var htmlToAdd = currentPlayer == 'O' ? htmlCircle : htmlCross;
        element.innerHTML = htmlToAdd;
        currentBoard[slotID] = currentPlayer;
        currentPlayer = currentPlayer == 'O' ? 'X' : 'O';
    }
    if (checkGameEnded()) {
        handleGameEnd();
    }
}

function resetBoard() {
    DOMBoard.innerHTML = cleanBoardHtml;
    slots = document.querySelectorAll("div.slot");
    slots.forEach(slot => {
        slot.addEventListener('click', onSlotClick)
    })
    currentBoard = [' ', ' ', ' ',
                    ' ', ' ', ' ',
                    ' ', ' ', ' ',];
}

function handleGameEnd() {
    console.log(gameEndedMessage);
    alert(gameEndedMessage);
    resetBoard();
}

function checkGameEnded() {

    if (currentBoard[0] === currentBoard[1] && currentBoard[1] === currentBoard[2] && currentBoard[1] != ' ') {
        gameEndedMessage = currentBoard[0] + " wins";
        return true;
    }

    if (currentBoard[3] === currentBoard[4] && currentBoard[4] === currentBoard[5] && currentBoard[4] != ' ') {
        gameEndedMessage = currentBoard[3] + " wins";
        return true;
    }

    if (currentBoard[6] === currentBoard[7] && currentBoard[7] === currentBoard[8] && currentBoard[7] != ' ') {
        gameEndedMessage = currentBoard[6] + " wins";
        return true;
    }

    if (currentBoard[2] === currentBoard[4] && currentBoard[4] === currentBoard[6] && currentBoard[4] != ' ') {
        gameEndedMessage = currentBoard[2] + " wins";
        return true;
    }

    if (currentBoard[8] === currentBoard[4] && currentBoard[4] === currentBoard[0] && currentBoard[4] != ' ') {
        gameEndedMessage = currentBoard[8] + " wins";
        return true;
    }

    if (currentBoard[0] === currentBoard[3] && currentBoard[3] === currentBoard[6] && currentBoard[3] != ' ') {
        gameEndedMessage = currentBoard[0] + " wins";
        return true;
    }

    if (currentBoard[1] === currentBoard[4] && currentBoard[4] === currentBoard[7] && currentBoard[4] != ' ') {
        gameEndedMessage = currentBoard[1] + " wins";
        return true;
    }

    if (currentBoard[2] === currentBoard[5] && currentBoard[5] === currentBoard[8] && currentBoard[5] != ' ') {
        gameEndedMessage = currentBoard[2] + " wins";
        return true;
    }

    var isBoardFull = true;
    currentBoard.forEach((s) => {
        if (s == ' ') {
            isBoardFull = false;
        }
    })

    if (isBoardFull) {
        console.log('board full !')
        gameEndedMessage = "Draw !"
        return true;
    }
    return false;
}

slots.forEach(slot => {
    slot.addEventListener('click', onSlotClick)
})