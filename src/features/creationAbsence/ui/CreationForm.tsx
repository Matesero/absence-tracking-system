import { useEffect, useState } from 'react';

import { FormWrapper } from './FormWrapper';
import { useForm } from '../model';

import {
    InputField,
    CustomDatepicker as Datepicker,
    Button,
    Upload,
} from '~/shared/ui';

type Props = {
    onCancelClick: () => void;
};

export const CreationForm = ({ onCancelClick }: Props) => {
    const [errors, onSubmit, handleFileChange] = useForm('new');
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (isSubmitted && Object.keys(errors).length === 0 && onCancelClick) {
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

    return (
        <FormWrapper title={'Создание'} onSubmit={handleSubmit}>
            <>
                <Datepicker
                    label="Начало"
                    name="dateStart"
                    error={errors?.dateStart}
                />
                <Datepicker
                    label="Конец"
                    name="dateEnd"
                    error={errors?.dateEnd}
                />
                <InputField label="Сообщение" name="message" type="text" />
                <Upload onChange={handleFileChange} />
                <div className="flex flex-row gap-5">
                    <Button label="Создать" type="submit" />
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
