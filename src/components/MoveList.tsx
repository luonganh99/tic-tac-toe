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

    const renderMoves = (move: number) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        moves.push(<li key={move}>
            <button className='btn btn-primary' onClick={() => onJumpToClick(move)}>{desc}</button>
        </li>)
    }

    if (isAscending) {
        for(let move = 0; move < history.length; move++) {
            renderMoves(move);
        }
    } else {
       for(let move = history.length - 1; move >=0; move--) {
           renderMoves(move);
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