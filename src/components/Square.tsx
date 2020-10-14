import React from 'react';

type Props = {
    onClick: () => void;
    value: string | null;
    isHighlight: boolean;
}

const Square: React.FC<Props> = ({onClick, value, isHighlight}) => {
    return (
        <button onClick={onClick} className={'square ' + (isHighlight ? ' highlight' : '')}>
            {value}
        </button>
    );
};

export default Square;