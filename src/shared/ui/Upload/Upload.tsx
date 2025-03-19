import React, { useState, useRef, useEffect } from 'react';

import { ItemFile } from './ItemFile';

type Props = {
    label?: string;
    error?: string;
    placeholder?: string;
    onChange?: (files: FileList | null) => void;
};

export const Upload = ({ label, error, placeholder, onChange }: Props) => {
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            const newFiles = Array.from(selectedFiles);
            setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        }
    };

    useEffect(() => {
        if (onChange) {
            const fileList = new DataTransfer();
            files.forEach((file) => fileList.items.add(file));
            onChange(fileList.files);
        }
    }, [files]);

    const handleRemoveFile = (index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
    };

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="flex flex-col mt-2">
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
                className={`relative flex bg-white w-fit h-12 items-center border-s border-t border-e border-b ${error ? 'border-red-500' : 'border-primary-gray'} rounded-lg overflow-hidden transition-all duration-300 !focus:outline-none!overflow-y-hidden hover:border-gray-400 cursor-pointer`}
                onClick={handleClick}
            >
                <input
                    type="file"
                    placeholder={placeholder}
                    className="hidden"
                    multiple
                    onChange={handleFileChange}
                    ref={fileInputRef}
                />
                <span className="px-4 text-gray-500">
                    {placeholder || 'Добавить файл'}
                </span>
            </div>

            {files.length > 0 && (
                <div className="mt-2">
                    <p className="text-black text-lg font-semibold">
                        Загруженные файлы:
                    </p>
                    <ul>
                        {files.map((file, index) => (
                            <ItemFile
                                key={index}
                                file={file}
                                index={index}
                                onRemove={handleRemoveFile}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
