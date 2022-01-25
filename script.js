// Module that contains the array storage of the game board
const gameBoard = (()=>{
    let boardArray = new Array(9);
    
    return { boardArray };
})();

// Module that contains the algorithm for checking the game winner
const gameController = (() => {

    const checkForRows = () => {
        for(let i = 0; i < 7; i=i+3){
            if(gameBoard.boardArray[i] == 'X' &&
                gameBoard.boardArray[i+1] == 'X' &&
                gameBoard.boardArray[i+2] == 'X'){
                    return 'X';
                }
            else if(gameBoard.boardArray[i] == 'O' &&
                gameBoard.boardArray[i+1] == 'O' &&
                gameBoard.boardArray[i+2] == 'O'){
                    return 'O';
                }
        }
        return false;
    };

    const checkForTie = () => {
        for(let i = 0; i < 9; i++){
            if(gameBoard.boardArray[i] == undefined) return false;
        }
        return true;
    };

    return { checkForTie, checkForRows };
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

    // function that clears the board in the page and hides the-
    // winner of the game last round
    function clearBoard(){
        winnerContainer.style.display = 'none';
        gameBoard.boardArray = new Array(9);
        renderContent();
        modeX();
    }

    // Function that displays the winner of the game in the page
    function declareWinner(){
        if(gameController.checkForRows() === 'X'){
            winnerP.textContent = 'Player X wins!';
            winnerP.style.backgroundColor = 'yellow';
            winnerContainer.style.display = 'block';
        }
        else if(gameController.checkForRows() === 'O'){
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
    
    return { boxes, declareWinner };
})();




