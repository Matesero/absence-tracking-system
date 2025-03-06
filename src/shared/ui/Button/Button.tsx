import React, { MouseEventHandler } from 'react';

type Props = {
    label?: string;
    type?: 'submit' | 'button';
    textColor?: string;
    bgColor?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Button = ({ label, type, textColor, bgColor, onClick }: Props) => {
    return (
        <button
            type={type || 'button'}
            onClick={onClick}
            className={`bg-${bgColor || 'primary-tuftsBlue'} !important  text-${textColor || 'white'} p-2.5 rounded-lg text-xl w-full`}
        >
            {label}
        </button>
    );
};
