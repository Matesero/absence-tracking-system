import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';

import 'dayjs/locale/ru';

type Props = {
    label?: string;
    name: string;
    error?: string;
    disabled?: boolean;
};

export const CustomDatepicker = ({ label, name, error, disabled }: Props) => {
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
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="ru"
                >
                    <DatePicker
                        name={name}
                        disabled={disabled}
                        slotProps={{
                            field: {
                                clearable: true,
                                variant: 'outlined',
                                style: {
                                    width: '100%',
                                },
                                sx: {
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            border: 'none',
                                        },
                                        '&:hover fieldset': {
                                            border: 'none',
                                        },
                                        '&.Mui-focused fieldset': {
                                            border: 'none',
                                            outline: 'none',
                                        },
                                    },
                                },
                            },
                        }}
                    />
                </LocalizationProvider>
            </div>
        </div>
    );
};
