const player = () => {
    
};

// Module that contains the array storage of the game board
const gameBoard = (()=>{
    let boardArray = new Array(9);
    
    return { boardArray };
})();

// Module that contains the algorithm for checking the game winner
const gameController = (() => {

    const gameCheck = () => {
        checkForTie();

        const rows = [[0,1,2], [3,4,5], [6,7,8]];
        
        if(gameBoard.boardArray[0] === 'X' && 
            gameBoard.boardArray[1] === 'X' && 
            gameBoard.boardArray[2] === 'X'){
            
        }
        else if(gameBoard.boardArray[0] === 'X' && 
            gameBoard.boardArray[4] === 'X' && 
            gameBoard.boardArray[8] === 'X'){
            
        }
        
    };

    const checkForTie = () => {
        for(let i = 0; i < 9; i++){
            if(gameBoard.boardArray[i] == null){
                
                break;
            }
        }
    };

    return { gameCheck };
})();

// Module that controls every display in the page
const displayController = (() =>{
    const boxes = document.querySelectorAll('.box');
    const markerX = document.querySelector('#marker-x');
    const markerO = document.querySelector('#marker-o');
    const restartBtn = document.querySelector('#restart-btn');
    
    boxes.forEach(box => box.addEventListener('click', placeMarker));
    restartBtn.addEventListener('click', clearBoard);

    let marker = 'X';
    
    function modeX(){
        markerO.classList.remove('active');
        markerX.classList.add('active');
        marker = 'X';
    }

    function modeO(){
        markerX.classList.remove('active');
        markerO.classList.add('active');
        marker = 'O';
    }
    
    function placeMarker(e){
        if(e.target.textContent !== '') return;
        let index = e.target.getAttribute('index');
        gameBoard.boardArray[index] = marker;
        renderContent();
        
        if(marker == 'X') modeO();
        else if (marker == 'O') modeX();
    }

    function renderContent(){
        boxes.forEach(box => {
            let index = box.getAttribute('index');
            box.textContent = gameBoard.boardArray[index];
            box.style.backgroundColor = '';
        })
        gameController.gameCheck();
    }

    function clearBoard(){
        gameBoard.boardArray = new Array(9);
        renderContent();
        modeX();
    }
    
    return { boxes };
})();




