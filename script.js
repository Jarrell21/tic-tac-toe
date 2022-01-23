const player = () => {
    
};

const gameBoard = (()=>{
    let boardArray = new Array(9);

    const getField = (number) => {
        return boardArray[number];
    }
    
    return { boardArray, getField };
})();

const gameController = (() => {
    const gameCheck = () => {
        if(gameBoard.boardArray[0] === 'X' && 
            gameBoard.boardArray[1] === 'X' && 
            gameBoard.boardArray[2] === 'X'){
            displayController.boxes.forEach(box => {
                let index = box.getAttribute('index');
                if(index == '0' || index == '1' || index == '2'){
                    box.style.backgroundColor = 'aqua';
                } 
            })
            displayController.declareWinner();
            return 'X';
        }
    };

    return { gameCheck };
})();


const displayController = (() =>{
    const boxes = document.querySelectorAll('.child');
    const modeXBtn = document.querySelector('#mode-x');
    const modeOBtn = document.querySelector('#mode-o');
    const restartBtn = document.querySelector('#restart-btn');
    const popupContainer = document.querySelector('#popUp-container');
    const playAgainBtn = document.querySelector('#play-again');

    
    boxes.forEach(box => box.addEventListener('click', placeMarker));
    restartBtn.addEventListener('click', clearBoard);
    playAgainBtn.addEventListener('click', playAgain);

    let marker = 'X';
    
    function modeX(){
        modeOBtn.classList.remove('active');
        modeXBtn.classList.add('active');
        marker = 'X';
    }

    function modeO(){
        modeXBtn.classList.remove('active');
        modeOBtn.classList.add('active');
        marker = 'O';
    }
    
    function placeMarker(e){
        if(gameController.gameCheck() === 'X') return;
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

    function declareWinner(){
        popupContainer.style.display = 'flex';
    }

    function playAgain(){
        clearBoard();
        popupContainer.style.display = 'none';
    }
    
    return { boxes, declareWinner };
})();




