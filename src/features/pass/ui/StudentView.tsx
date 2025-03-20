import dayjs from 'dayjs';
import React, {FormEventHandler, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useForm } from '~/features/pass/model';
import { absenceSystemApi } from '~/shared/api';
import { convertDateFrom } from '~/shared/lib/dateConverter';
import { Button, InputField, CustomDatepicker as DatePicker, Loading } from '~/shared/ui';

const pass = absenceSystemApi.pass;

type Props = {
    id: string;
};

type ExtendProps = {
    id: string;
    parentId: string;
    dateEnd: string;
    minioFiles: [
        {
            id: string,
            name: string,
        }
    ]
    message?: string;
    isAccepted?: boolean;
    downloadFile: any;
    onExtendSubmit: any;
}

const textSize = 'text-xl';

const ExtendView = (data : ExtendProps) => {
    const [formValues, setFormValues] = useState(data);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);

    useEffect(() => {
        setFormValues(data);
    }, [data]);

    const handleCancel = () => {
        setFormValues(data);
        setIsEditing((prevIsEditing) => !prevIsEditing);
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setFormValues(await data.onExtendSubmit(data.id)(e));
        setIsEditing(false);
    };

    const onDelete = async () => {
        try {
            await pass.deleteExtendById(data.id);
            setIsDeleted(true);
        } catch {
            toast.error('Не удалось удалить заявку на продление пропуска');
        }
    }

    if (isDeleted) {
        return null;
    }

    return (
        <div
            key={data.id}
            className={`${textSize} flex flex-col gap-4 ml-4 self-start p-5 sm:pt-4 sm:p-4 sm:pb-4 bg-white rounded-3xl border-[1px] border-gray-300`}
        >
            <form
                onSubmit={handleSubmit}
                className={'flex flex-col gap-4'}
            >
                <div className="w-fit">
                    <DatePicker
                        label='По:'
                        name='dateEnd'
                        value={isEditing ? undefined : dayjs(formValues.dateEnd)}
                        disabled={!isEditing}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <p className={textSize}>Файлы:</p>
                    {data.minioFiles.map((minioFile) => (
                        <button
                            key={minioFile.id}
                            className={`${textSize} ml-4 self-start underline`}
                            onClick={async () => {
                                await data.downloadFile(minioFile.id, minioFile.name)
                            }}
                        >
                            {minioFile.name}
                        </button>
                    ))}
                </div>
                <InputField
                    label='Комментарий:'
                    name='message'
                    type='text'
                    value={isEditing ? undefined : formValues.message}
                    disabled={!isEditing}
                />
                <div className='flex gap-1'>
                    <p>Статус:</p>
                    <p className={textSize}>
                        {data.isAccepted === true ? (
                            <>Принят</>
                        ) : data.isAccepted === false ? (
                            <>Отклонен</>
                        ) : (
                            <>На рассмотрении</>
                        )}
                    </p>
                </div>
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
        </div>
    )
}

export const StudentView = ({ id }: Props) => {
    const [data, downloadFile, onSubmit, onExtendSubmit] = useForm(id, 'student');
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
            <Loading/>
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
            <div className="flex flex-col gap-4">
                <p className={textSize}>Заявки на продление:</p>
                <div className="flex flex-col gap-4">
                    {data.extendPassTimeRequests.map((extendPassTimeRequest) => (
                        <ExtendView
                            key={extendPassTimeRequest.id}
                            id={extendPassTimeRequest.id}
                            parentId={id}
                            dateEnd={extendPassTimeRequest.dateEnd}
                            minioFiles={extendPassTimeRequest.minioFiles}
                            isAccepted={extendPassTimeRequest.isAccepted}
                            message={extendPassTimeRequest.message}
                            downloadFile={downloadFile}
                            onExtendSubmit={onExtendSubmit}
                        />
                    ))}
                </div>
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