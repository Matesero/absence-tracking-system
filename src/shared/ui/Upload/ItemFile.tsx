import React from 'react';

type Props = {
    file: File;
    index: number;
    onRemove: (index: number) => void;
};

export const ItemFile = ({ file, index, onRemove }: Props) => {
    return (
        <li className="flex items-center justify-between p-2 border-b">
            <span>{file.name}</span>
            <button
                type="button"
                className="text-red-600 hover:text-red-800"
                onClick={() => onRemove(index)}
            >
                Убрать
            </button>
        </li>
    );
};
