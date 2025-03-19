import React, { FormEventHandler, ReactNode } from 'react';

type Props = {
    title: string;
    onSubmit: FormEventHandler<HTMLFormElement>;
    onClick?: (e: React.MouseEvent) => void;
    children: ReactNode;
    className?: string;
    error?: string;
};

export const FormWrapper = ({
    title,
    onSubmit,
    onClick,
    children,
    className,
}: Props) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[1px] bg-black bg-opacity-15 z-50">
            <div
                className={`${className} flex flex-col w-4/5 sm:w-4/5 max-w-xl 3xl:max-w-screen-sm p-5 sm:pt-4 sm:p-4 sm:pb-4 bg-white rounded-3xl border border-gray-300 drop-shadow-lg`}
                onClick={onClick}
            >
                <p className="text-2xl sm:text-xl font-arial font-semibold cursor-default mb-1 text-center">
                    {title}
                </p>
                <form onSubmit={onSubmit} className="flex flex-col gap-3">
                    {children}
                </form>
            </div>
        </div>
    );
};
