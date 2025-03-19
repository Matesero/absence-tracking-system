import React, { FormEventHandler } from 'react';

import { sharedConfigTypes } from '~/shared/config';
import { listToOptions } from '~/shared/lib/listToOptions';
import {
    Button,
    CustomSelect as Select,
    InputField,
    CustomDatepicker as Datepicker,
} from '~/shared/ui';

type Props = {
    errors: sharedConfigTypes.Error;
    groups: string[];
    onSubmit: FormEventHandler<HTMLFormElement>;
    userRole: sharedConfigTypes.Roles;
    onCreatingClick: () => void;
};

export const AbsencesFilter = ({
    errors,
    groups,
    onSubmit,
    userRole,
    onCreatingClick,
}: Props) => {
    return (
        <div className="rounded-3xl w-full border-[1px] border-gray-300 drop-shadow-lg">
            <form onSubmit={onSubmit}>
                <div className="bg-primary-gray p-2 pl-4 rounded-t-lg text-white font-semibold">
                    Фильтры
                </div>
                <div className="bg-white p-4 rounded-b-lg shadow-md flex flex-col gap-4">
                    {userRole !== 'student' && (
                        <div className="grid grid-cols-2 gap-4">
                            <InputField
                                type="text"
                                label="ФИО"
                                name="fullName"
                                placeholder={'Иванов Иван Иванович'}
                                error={errors?.['fullName'] ?? ''}
                            />
                            <Select
                                label="Группы"
                                name="groupNumbers"
                                isMultiple
                                error={errors?.['groupNumbers'] ?? ''}
                                options={listToOptions(groups)}
                            />
                            <Datepicker
                                label="Начальная дата"
                                name="dateStart"
                                error={errors?.['dateStart'] ?? ''}
                            />
                            <Datepicker
                                label="Конечная дата"
                                name="dateEnd"
                                error={errors?.['dateEnd'] ?? ''}
                            />
                        </div>
                    )}
                    <div className="grid grid-cols-2 justify-between">
                        <div className="grid grid-cols-2 gap-4">
                            <Select
                                label="Статус"
                                name="isAccepted"
                                error={errors?.['isAccepted'] ?? ''}
                                options={listToOptions([
                                    'Принятые',
                                    'Отклоненные',
                                ])}
                            />

                            {/*<Select*/}
                            {/*    label="Сортировка"*/}
                            {/*    name="sort"*/}
                            {/*    error={errors?.['sort'] ?? ''}*/}
                            {/*    options={listToOptions(['Сначала', 'Сначала'])}*/}
                            {/*/>*/}
                        </div>

                        <div className="flex w-fit items-end justify-self-end gap-4">
                            {userRole === 'student' && (
                                <Button
                                    label="Создать пропуск"
                                    type="button"
                                    bgColor="bg-green-600"
                                    onClick={onCreatingClick}
                                />
                            )}
                            <Button label="Применить" type="submit" />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
