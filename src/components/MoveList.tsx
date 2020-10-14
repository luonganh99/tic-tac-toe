import React from 'react';

type History =  {
    squares: Array<string | null>;
    currentPosition: number | null;
}

type Props = {
    history: History[];
    isAscending: boolean;
    onJumpToClick: (move: number) => void;
}

const MoveList: React.FC<Props> = ({history, isAscending, onJumpToClick}) => {
    let moves : Array<JSX.Element> = [];

    const renderMoves = (step: History, move: number) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        const X = step.currentPosition ? Math.floor(step.currentPosition / 3) : '';
        const Y = step.currentPosition ? step.currentPosition % 3 : '';
        moves.push(<li key={move}>
            <button className='btn btn-primary' onClick={() => onJumpToClick(move)}>{desc} {step.currentPosition && `(${X} - ${Y})`}</button>
        </li>)
    }

    if (isAscending) {
        for(let move = 0; move < history.length; move++) {
            renderMoves(history[move], move);
        }
    } else {
       for(let move = history.length - 1; move >=0; move--) {
           renderMoves(history[move], move);
       }
    }

    return (
        <div>
            <div className="moves-title">Move List</div>
            <ul className="moves">
                {moves}
            </ul>

        </div>
    );
};

export default MoveList;