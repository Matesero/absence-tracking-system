import React, { useState } from 'react';

type Props = {
    label?: string;
    name: string;
    type: 'text' | 'password';
    error?: string;
    placeholder?: string;
};

export const InputField = ({
    label,
    name,
    type,
    error,
    placeholder,
}: Props) => {
    const [show, setShow] = useState(type === 'text');

    return (
        <div className="flex flex-col gap-1">
            <div className="flex flex-row items-center">
                {label && (
                    <p className="text-black text-lg font-semibold">{label} </p>
                )}

                {error && (
                    <p className="text-sm text-red-600 mt-1 ml-2 font-medium">
                        {error}
                    </p>
                )}
            </div>
            <div
                className={`relative flex bg-white h-12 items-center border-s border-t border-e border-b ${error ? 'border-red-500' : 'border-primary-gray'} rounded-lg overflow-hidden transition-all duration-300 !focus:outline-none!overflow-y-hidden hover:border-gray-400 `}
            >
                <input
                    type={show ? 'text' : 'password'}
                    placeholder={placeholder}
                    className="w-full px-4 text-xl bg-transparent outline-none "
                    name={name}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={() => setShow((prevShow) => !prevShow)}
                        className="absolute right-3 text-sm text-gray-600 hover:text-blue-500"
                    >
                        {show ? 'Скрыть' : 'Показать'}
                    </button>
                )}
            </div>
        </div>
    );
};
