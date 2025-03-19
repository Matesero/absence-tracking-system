import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useForm } from '~/features/pass/model';
import { absenceSystemApi } from '~/shared/api';
import { Button, InputField, CustomDatepicker as DatePicker, Loading } from '~/shared/ui';
import error = toast.error;

const pass = absenceSystemApi.pass;

type Props = {
    id: string;
};

export const StudentView = ({ id }: Props) => {
    const textSize = 'text-xl';
    const [data, downloadFile, onSubmit] = useForm(id, 'student');
    const [formValues, setFormValues] = useState(data);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        setFormValues(data);
    }, [data]);

    const handleCancel = () => {
        setFormValues(data);
        setIsEditing((prevIsEditing) => !prevIsEditing);
    };

    const onDelete = async () => {
        try {
            await pass.deleteById(id);
            navigate('/');
        } catch {
            toast.error('Не удалось удалить заявку');
        }
    }

    if (!data || !formValues) {
        return (
            <Loading />
        );
    }

    return (
        <>
            <div className="flex gap-1">
                <p className={textSize}>ФИО:</p>
                <p className={textSize}>{data.user.fullName}</p>
            </div>
            <div className="flex gap-1">
                <p className={textSize}>Email:</p>
                <p className={textSize}>{data.user.email}</p>
            </div>
            <div className="flex gap-1">
                <p className={textSize}>Группа:</p>
                <p className={textSize}>{data.user.group.groupNumber}</p>
            </div>
            <form
                className='flex flex-col gap-4'
                onSubmit={(e) => {
                    onSubmit(e);
                    setIsEditing(false);
                }}
            >
                <div className="flex flex-col gap-1">
                    <p className={textSize}>Файлы:</p>
                    {data.minioFiles.map((minioFile) => (
                        <button
                            key={minioFile.id}
                            className={`${textSize} ml-4 self-start underline`}
                            onClick={async () => {
                                await downloadFile(minioFile.id, minioFile.name)
                            }}
                        >
                            {minioFile.name}
                        </button>
                    ))}
                </div>
                <div className="w-fit">
                    <DatePicker
                        label='С:'
                        name='dateStart'
                        value={isEditing ? undefined : dayjs(formValues.dateStart)}
                        disabled={!isEditing}
                    />
                </div>
                <div className="w-fit">
                    <DatePicker
                        label='По:'
                        name='dateEnd'
                        value={isEditing ? undefined : dayjs(formValues.dateEnd)}
                        disabled={!isEditing}
                    />
                </div>
                <InputField
                    label='Комментарий:'
                    name='message'
                    type='text'
                    value={isEditing ? undefined : formValues.message}
                    disabled={!isEditing}
                />
                {data.isAccepted === null && (
                    <div className="flex flex-col gap-2">
                        {isEditing && (
                            <Button label="Сохранить изменения" type="submit"/>
                        )}
                        <Button
                            label={isEditing ? 'Отмена' : 'Редактировать'}
                            bgColor={isEditing ? 'primary-gray' : 'primary-orange'}
                            onClick={handleCancel}
                        />
                        <Button
                            label='Удалить'
                            bgColor='red-500'
                            onClick={onDelete}
                        />
                    </div>
                )}
            </form>
        </>
    )
}