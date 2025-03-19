import React, { FormEventHandler } from 'react';

import { sharedConfigTypes } from '~/shared/config';
import { listToOptions } from '~/shared/lib/listToOptions';
import {
    Button,
    CustomSelect as Select,
    CustomDatepicker as Datepicker,
} from '~/shared/ui';

type Props = {
    errors: sharedConfigTypes.Error;
    groups: string[];
    onSubmit: FormEventHandler<HTMLFormElement>;
};

export const ReportFilter = ({
                                   errors,
                                   groups,
                                   onSubmit,
                               }: Props) => {
    return (
        <div className="rounded-3xl w-full border-[1px] border-gray-300 drop-shadow-lg">
            <form onSubmit={onSubmit}>
                <div className="bg-primary-gray p-2 pl-4 rounded-t-lg text-white font-semibold">
                    Фильтры
                </div>
                <div className="bg-white p-4 rounded-b-lg shadow-md flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
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
                        <Select
                            label="Группы"
                            name="groupNumbers"
                            isMultiple
                            error={errors?.['groupNumbers'] ?? ''}
                            options={listToOptions(groups)}
                        />

                        <div className="flex justify-end">
                            <div className="flex w-fit items-end justify-self-end gap-4">
                                <Button label="Сгенерировать" type="submit" />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
