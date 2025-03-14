import React, { useCallback, useEffect, useState } from 'react';
import Select from 'react-tailwindcss-select';

type Option = {
    label: string;
    value: string;
};

type Props = {
    label?: string;
    name: string;
    options: Option[];
    error?: string;
    disabled?: boolean;
    value?: string;
    isMultiple?: boolean;
};

export const CustomSelect = ({
    label,
    name,
    options,
    error,
    disabled,
    value,
    isMultiple,
}: Props) => {
    const [selectedValue, setValue] = useState<Option | null>(null);

    const handleChange = useCallback((value) => {
        setValue(value);
    }, []);

    useEffect(() => {
        if (value && options) {
            options.forEach((option) => {
                if (option.value === value) {
                    setValue(option);
                }
            });
        }
    }, [value, options]);

    const selectedToString = useCallback(() => {
        let value = '';

        if (Array.isArray(selectedValue)) {
            selectedValue.forEach((selValue) => {
                value += `${selValue.value};`;
            });
        } else if (selectedValue !== null) {
            value = selectedValue.value;
        }

        return value;
    }, [selectedValue]);

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

            <Select
                onChange={handleChange}
                options={options}
                value={selectedValue}
                isClearable
                placeholder=""
                isDisabled={disabled}
                isMultiple={isMultiple}
                classNames={{
                    menuButton: (value) => {
                        const isDisabled = value?.isDisabled;
                        return `flex flex-row h-12 border-s border-t border-e border-b px-1 text-xl ${!selectedValue ? 'text-gray-400' : 'text-black'} items-center ${error ? 'border-red-500' : 'border-primary-gray'} rounded-lg transition-all duration-300 !focus:outline-none !overflow-y-hidden ${isDisabled ? 'cursor-default' : 'cursor-pointer'} hover:border-gray-400 focus:border-primary-gray-500 focus:ring-blue-500/20`;
                    },
                    menu: 'absolute z-10 w-full bg-white shadow-lg border rounded-lg py-1 mt-1.5 text-sm text-gray-100',
                    listItem: (value) => {
                        const isSelected = value?.isSelected;
                        return `block transition duration-200 p-1 px-2 text-xl cursor-pointer select-none truncate rounded ${isSelected ? 'text-white bg-blue-500' : 'text-gray-500 hover:bg-blue-100 hover:text-blue-500'}`;
                    },
                }}
            />

            <input value={selectedToString()} name={name} type="hidden" />
        </div>
    );
};
