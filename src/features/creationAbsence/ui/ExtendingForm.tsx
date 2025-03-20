import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

import { FormWrapper } from './FormWrapper';
import { useForm } from '../model';

import { sharedConfigTypes } from '~/shared/config'
import {
    InputField,
    CustomDatepicker as Datepicker,
    Button,
    Upload,
} from '~/shared/ui';


type Props = {
    handleFetchAbsences: () => void;
    onCancelClick: () => void;
    absence: sharedConfigTypes.Pass
};

export const ExtendingForm = ({ handleFetchAbsences, onCancelClick, absence }: Props) => {
    const [errors, onSubmit, handleFileChange] = useForm('extension');
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (isSubmitted && Object.keys(errors).length === 0 && onCancelClick) {
            handleFetchAbsences();
            onCancelClick();
        }

        setIsSubmitted(false);
    }, [errors, isSubmitted]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (onSubmit) {
            await onSubmit(event);
            setIsSubmitted(true);
        }
    };

    const formattedStart = format(absence.dateStart, 'd MMMM yyyy', { locale: ru });
    const formattedEnd = format(absence.dateEnd, 'd MMMM yyyy', { locale: ru });

    return (
        <FormWrapper title={`Продление заявки #${absence.id.split('-')[0]}`} onSubmit={handleSubmit}>
            <>
                <p className={`flex gap-1 ${absence} text-xl font-semibold`}>
                    Текущий период:
                    <span>{`${formattedStart} - ${formattedEnd}`}</span>
                </p>
                <input value={absence.id} hidden name="requestId" />
                <input value={dayjs(absence.dateEnd).format('DD.MM.YYYY')} hidden name="dateEnd" />
                <Datepicker
                    label="Новая дата окончания"
                    name="dateNewEnd"
                    error={errors?.dateNewEnd}
                />
                <InputField label="Причина продления" name="message" type="text" />
                <Upload onChange={handleFileChange} />
                <div className="flex flex-row gap-5">
                    <Button label="Продлить" type="submit" />
                    <Button
                        label="Отмена"
                        type="button"
                        bgColor="bg-primary-gray"
                        onClick={onCancelClick}
                    />
                </div>
            </>
        </FormWrapper>
    );
};
