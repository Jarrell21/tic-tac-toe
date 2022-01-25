// Module that contains the array storage of the game board
const gameBoard = (()=>{
    let boardArray = [];
    
    return { boardArray };
})();

// Module that contains the algorithm for checking the game winner
const gameController = (() => {

    // Function that checks the boardArray for row winning combinations
    const checkForRows = () => {
        for(let i = 0; i < 7; i=i+3){
            if(gameBoard.boardArray[i] == 'X' &&
                gameBoard.boardArray[i+1] == 'X' &&
                gameBoard.boardArray[i+2] == 'X'){
                    displayController.highlight(i, (i+1),(i+2), 'yellow');
                    return 'X';
                }
            else if(gameBoard.boardArray[i] == 'O' &&
                    gameBoard.boardArray[i+1] == 'O' &&
                    gameBoard.boardArray[i+2] == 'O'){
                        displayController.highlight(i, (i+1),(i+2), 'aqua');
                        return 'O';
                }
        }
        return;
    };

    // Function that checks the boardArray for column winning combinations
    const checkForCols = () => {
        for(let i = 0; i < 3; i++){
            if(gameBoard.boardArray[i] == 'X' &&
                gameBoard.boardArray[i+3] == 'X' &&
                gameBoard.boardArray[i+6] == 'X'){
                    displayController.highlight(i, (i+3), (i+6), 'yellow');
                    return 'X';
                }
            else if(gameBoard.boardArray[i] == 'O' &&
                    gameBoard.boardArray[i+3] == 'O' &&
                    gameBoard.boardArray[i+6] == 'O'){
                        displayController.highlight(i, (i+3), (i+6), 'aqua');
                        return 'O';
                }
        }
        return;
    };

    // Function that checks the boardArray for diagonal winning combinations
    const checkForDiagonals = () => {
        if(gameBoard.boardArray[0] == 'X' &&
            gameBoard.boardArray[4] == 'X' &&
            gameBoard.boardArray[8] == 'X'){
                displayController.highlight(0, 4, 8, 'yellow');
                return 'X';
            }
        else if(gameBoard.boardArray[2] == 'X' &&
                gameBoard.boardArray[4] == 'X' &&
                gameBoard.boardArray[6] == 'X'){
                    displayController.highlight(2, 4, 6, 'yellow');
                    return 'X';
                }
        else if(gameBoard.boardArray[0] == 'O' &&
                gameBoard.boardArray[4] == 'O' &&
                gameBoard.boardArray[8] == 'O'){
                    displayController.highlight(0, 4, 8, 'aqua');
                    return 'O';
            }
        else if(gameBoard.boardArray[2] == 'O' &&
                gameBoard.boardArray[4] == 'O' &&
                gameBoard.boardArray[6] == 'O'){
                    displayController.highlight(2, 4, 6, 'aqua');
                    return 'O';
                }
        return;
    };

    // Function that checks the board array for a tie game
    const checkForTie = () => {
        for(let i = 0; i < 9; i++){
            if(gameBoard.boardArray[i] == undefined) return false;
        }
        return true;
    };

    return { checkForTie, checkForRows, checkForCols, checkForDiagonals };
})();

// Module that controls every display in the page
const displayController = (() =>{
    const boxes = document.querySelectorAll('.box');
    const markerX = document.querySelector('#marker-x');
    const markerO = document.querySelector('#marker-o');
    const restartBtn = document.querySelector('#restart-btn');
    const winnerContainer = document.querySelector('#winner-container');
    const winnerP = document.querySelector('#winner');
    
    boxes.forEach(box => box.addEventListener('click', placeMarker));
    restartBtn.addEventListener('click', clearBoard);

    let marker = 'X';
    
    // modeX and modeO are functions that highlights the next-
    // player's turn
    function modeX(){
        markerO.classList.remove('active-o');
        markerX.classList.add('active-x');
        marker = 'X';
    }

    function modeO(){
        markerX.classList.remove('active-x');
        markerO.classList.add('active-o');
        marker = 'O';
    }

    // Function that allows the user to put a marker on each box on the-
    // board when clicked
    function placeMarker(e){
        if(winnerContainer.style.display === 'block') return;
        if(e.target.textContent !== '') return;
        let index = e.target.getAttribute('index');
        gameBoard.boardArray[index] = marker;
        renderContent();
        
        if(marker == 'X') modeO();
        else if (marker == 'O') modeX();
    }

    // Function that displays each marker on the box from the-
    // user input
    function renderContent(){
        boxes.forEach(box => {
            let index = box.getAttribute('index');
            box.textContent = gameBoard.boardArray[index];
            box.style.backgroundColor = '';
        })
        declareWinner();
    }

    // Function that clears the board in the page and hides the-
    // winner of the previous game 
    function clearBoard(){
        winnerContainer.style.display = 'none';
        gameBoard.boardArray = [];
        renderContent();
        modeX();
    }

    // Function that highlights the boxes of the winning combination of the winning player
    function highlight(num1, num2, num3, color){
        boxes.forEach(box => {
            let index = box.getAttribute('index');
            if(index == num1 || index == num2 || index == num3){
                box.style.backgroundColor = color;
            }
        })
    }

    // Function that displays the winner of the game in the page
    function declareWinner(){
        if(gameBoard.boardArray.length < 5) return;
        if(gameController.checkForRows() === 'X' ||
            gameController.checkForCols() === 'X' || 
            gameController.checkForDiagonals() === 'X'){
            winnerP.textContent = 'Player X wins!';
            winnerP.style.backgroundColor = 'yellow';
            winnerContainer.style.display = 'block';
        }
        else if(gameController.checkForRows() === 'O' ||
                gameController.checkForCols() === 'O' || 
                gameController.checkForDiagonals() === 'O'){
            winnerP.textContent = 'Player O wins!';
            winnerP.style.backgroundColor = 'aqua';
            winnerContainer.style.display = 'block';
        }

        else if(gameController.checkForTie() === true){
            winnerP.textContent = "It's a TIE!";
            winnerP.style.backgroundColor = 'dimgray';
            winnerContainer.style.display = 'block';
        }
    }

    return { highlight };
    
})();




