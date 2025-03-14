import React from 'react';

import { listToOptions } from '~/shared/lib/listToOptions';
import { Button, CustomSelect as Select, InputField } from '~/shared/ui';

export const UsersFilter = ({ errors, groups, onSubmit }) => {
    return (
        <div className="rounded-3xl w-full border-[1px] border-gray-300 drop-shadow-lg">
            <form onSubmit={onSubmit}>
                <div className="bg-primary-gray p-2 pl-4 rounded-t-lg text-white font-semibold">
                    Фильтры
                </div>
                <div className="bg-white p-4 rounded-b-lg shadow-md flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <InputField
                            type="text"
                            label="ФИО"
                            name="fullName"
                            placeholder={'Иванов Иван Иванович'}
                            error={errors?.['fullName'] ?? ''}
                        />
                        <Select
                            label="Группа"
                            name="groupNumber"
                            error={errors?.['groupNumber'] ?? ''}
                            options={listToOptions(groups)}
                        />
                        <InputField
                            type="text"
                            label="Email"
                            name="email"
                            placeholder={'email@example.com'}
                            error={errors?.['email'] ?? ''}
                        />
                        <Select
                            label="Роль"
                            name="role"
                            options={listToOptions([
                                'Студент',
                                'Преподаватель',
                                'Деканат',
                                'Админ',
                            ])}
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center mt-4">
                            <input
                                type="checkbox"
                                name="blocked"
                                className="mr-2 size-7"
                            />
                            <label
                                htmlFor="blocked"
                                className="text-xl text-gray-700"
                            >
                                Показать заблокированных
                            </label>
                        </div>
                        <div>
                            <Button label="Применить" type="submit" />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
