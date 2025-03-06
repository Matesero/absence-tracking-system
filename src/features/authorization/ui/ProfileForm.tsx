import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { FormWrapper } from './FormWrapper';
import { useForm } from '../model';

import { logout } from '~/shared/api/absenceSystem/user';
import { listToOptions } from '~/shared/lib/listToOptions';
import { useAppDispatch, userSlice } from '~/shared/store';
import {
    Button,
    InputField,
    CustomSelect as Select,
    Loading,
} from '~/shared/ui';

const { selectors } = userSlice;

export const ProfileForm = () => {
    const user = useSelector(selectors.user);
    const [formValues, setFormValues] = useState(user);
    const [errors, groups, onSubmit] = useForm('profile');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const appDispatch = useAppDispatch();

    useEffect(() => {
        setFormValues(user);
    }, [user]);

    const handleCancel = () => {
        setFormValues(user);
        setIsEditing((prevIsEditing) => !prevIsEditing);
    };

    const handleLogout = () => {
        appDispatch(logout());
    };

    if (!user || !formValues) {
        return <Loading />;
    }

    return (
        <FormWrapper title={'Профиль'} onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
                <InputField
                    type="text"
                    label="ФИО"
                    name="fullName"
                    value={isEditing ? undefined : formValues.fullName}
                    placeholder={'Иванов Иван Иванович'}
                    disabled={!isEditing}
                    error={errors?.['fullName'] ?? ''}
                />
                <Select
                    label="Группа"
                    name="groupNumber"
                    value={isEditing ? undefined : formValues.group.groupNumber}
                    error={errors?.['groupNumber'] ?? ''}
                    disabled={!isEditing}
                    options={listToOptions(groups)}
                />
                <InputField
                    type="text"
                    label="Email"
                    name="email"
                    value={isEditing ? undefined : formValues.email}
                    placeholder={'name@example.com'}
                    disabled={!isEditing}
                    error={errors?.['email'] ?? ''}
                />
            </div>
            <div className="flex flex-col gap-2">
                {isEditing && (
                    <Button label="Сохранить изменения" type="submit" />
                )}
                <Button
                    label={isEditing ? 'Отмена' : 'Редактировать'}
                    bgColor={isEditing ? 'primary-gray' : 'primary-orange'}
                    onClick={handleCancel}
                />
                <Button
                    label="Выйти из аккаунта"
                    bgColor="primary-red"
                    onClick={handleLogout}
                />
            </div>
        </FormWrapper>
    );
};
