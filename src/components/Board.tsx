import React from 'react';
import Square from './Square';

type Props = {
    onClick: (i: number) => void;
    currentSquare: Array<string | null>;
    wonLine: number[];
}

const Board: React.FC<Props> = ({currentSquare, wonLine, onClick}) => {
    const renderSquare = (i: number, isHighlight: boolean) : JSX.Element =>  {
        return <Square key={i} isHighlight={isHighlight} value={currentSquare[i]} onClick={() => onClick(i)} />
    }
    
    let board = Array(3).fill(null);

    return (
        <>
            {board.map((rowEl, i) => {
                let row = Array(3).fill(null);
                return <div key={i} className="board-row">
                    {row.map((colEl, j) => {
                        let pos = 3 * i + j;
                        if (wonLine.includes(pos)) {
                            return renderSquare(pos, true);
                        } else {
                            return renderSquare(pos, false)
                        }
                    })}
                </div>
            })}
        </>
    );
};

export default Board;