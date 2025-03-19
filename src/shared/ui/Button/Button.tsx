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
            className={`${bgColor || 'bg-primary-tuftsBlue'} text-nowrap !important  text-${textColor || 'white'} p-2.5 rounded-lg text-xl w-full bg-green`}
        >
            {label}
        </button>
    );
};
