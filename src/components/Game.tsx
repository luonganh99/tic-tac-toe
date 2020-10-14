import React, { useEffect, useState } from 'react';
import Board from './Board';
import MoveList from './MoveList';

type History =  {
    squares: Array<string | null>;
    currentPosition: number | null;
}

const Game: React.FC = () => {
    const [history, setHistory] = useState<History[]>([{squares: Array(9).fill(null), currentPosition: null}]);
    const [xIsNext, setXIsNext] = useState(true);
    const [stepNumber, setStepNumber] = useState(0);
    const [isAscending, setIsAscending] = useState(true);
    const [wonLine, setWonLine] = useState<number[]>([]);
    const [status, setStatus] = useState('');

    useEffect(() => {
        const currentSquare = [...history[stepNumber].squares];
        const result = calculateWinner(currentSquare);
    
        if (result) {
            setStatus('Winner is ' + result.winner);
            setWonLine(result.wonLine);
        } else if (!currentSquare.includes(null)) {
            setStatus('Draw');
        } else {
            setStatus('Next player is ' + (xIsNext ? 'X' : 'O'));
        }

    }, [history, stepNumber, xIsNext]);

    const handleCheckClick = (i: number): void => {
        const updatedHistory = history.slice(0, stepNumber + 1);
        const currentSquares = [...updatedHistory[stepNumber].squares];

        if (calculateWinner(currentSquares) || currentSquares[i]) {
            return;
        }

        currentSquares[i] = xIsNext ? 'X' : 'O';
        updatedHistory.push({squares: currentSquares, currentPosition: i});
        setHistory(updatedHistory);
        setXIsNext(!xIsNext);
        setStepNumber(updatedHistory.length - 1);
    }

    const handleJumpToClick = (move : number) => {
        setStepNumber(move);
        setXIsNext(move % 2 === 0);
        setWonLine([]);
    }

    const handleSortClick = () => {
        setIsAscending(!isAscending);
    }
    
    return (
        <div className='game'>
                <div className='game-title'>Tic Tac Toe</div>
                <div className="game-status">{status}</div>
                <div className='game-btn'>
                    <button className='btn' onClick={() => handleSortClick()}>Sort</button>
                </div>
                <div className="game-container">
                    <div className='game-board'>
                        <Board onClick={(i) => handleCheckClick(i)} currentSquare={history[stepNumber].squares}  wonLine={wonLine} />
                    </div>
                    <div className='game-info'>
                        <MoveList history={history} stepNumber={stepNumber} onJumpToClick={handleJumpToClick} isAscending={isAscending} />
                    </div>
                </div>
        </div>
    );
};

const calculateWinner = (currentSquare: Array<string | null>) : ({winner: string | null, wonLine: Array<number>} | null) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (currentSquare[a] && currentSquare[a] === currentSquare[b] && currentSquare[a] === currentSquare[c]) {
            return {
                winner: currentSquare[a],
                wonLine: [a, b, c],
            };
        }
    }
    return null;
}
 
export default Game;