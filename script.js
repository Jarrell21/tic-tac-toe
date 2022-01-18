const player = () => {
    
};

const gameBoard = (()=>{
    let boardArray = new Array(9);
    
    return { boardArray };
})();

const displayController = (() =>{
    const boxes = document.querySelectorAll('.child');
    const modeXBtn = document.querySelector('#mode-x');
    const modeOBtn = document.querySelector('#mode-o');
    const restartBtn = document.querySelector('#restart-btn');

    modeXBtn.addEventListener('click', ()=> {
        if (gameController.getGameMode() === 'PVP') return;
        modeX();
        });

    modeOBtn.addEventListener('click', ()=>{
        if(gameController.getGameMode() === 'PVP') return;
        modeO();
    });

    boxes.forEach(box => box.addEventListener('click', placeMarker));
    restartBtn.addEventListener('click', clearBoard);
    renderContent();

    let marker = 'X';

    function renderContent(){
        boxes.forEach(box => {
            let index = box.getAttribute('index');
            box.textContent = gameBoard.boardArray[index];
        })
    }
    
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
        if(e.target.textContent !== '') return;
        let index = e.target.getAttribute('index');
        gameBoard.boardArray[index] = marker;
        renderContent();
        if(marker == 'X') modeO();
        else if (marker == 'O') modeX();
    }

    function clearBoard(){
        gameBoard.boardArray = [];
        renderContent();
        modeX();
    }
})();


const gameController = (() => {
    let _gameMode = 'PVP';

    const gameChecker = () => {
        const winnerConditions = [
            [0, 1, 2], [0, 4, 8], [0, 3, 6],
            [1, 4, 7], [2, 5, 8], [3, 4, 5],
            [6, 7, 8], [3, 5, 7]
        ];

        
    }

    const setGameMode = (newMode) => {
        _gameMode = newMode;
    }

    const getGameMode = () => _gameMode;

    return { getGameMode, setGameMode };
})();


