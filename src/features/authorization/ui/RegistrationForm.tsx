import React, { useEffect, useState } from 'react';

import { FormWrapper } from './FormWrapper';
import { useForm } from '../model';

import { absenceSystemApi } from '~/shared/api';
import { listToOptions } from '~/shared/lib/listToOptions';
import { Button, InputField, CustomSelect as Select } from '~/shared/ui';

const group = absenceSystemApi.group;

export const RegistrationForm = () => {
    const [errors, onSubmit] = useForm('register');
    const [groups, setGroups] = useState<string[]>([]);

    useEffect(() => {
        const getGroups = async () => {
            const groupsList = await group.getList({ isDeleted: false });

            setGroups(groupsList.map((item) => item.groupNumber));
        };

        getGroups();
    }, []);

    return (
        <FormWrapper title={'Регистрация'} onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
                <InputField
                    type="text"
                    label="ФИО"
                    name="fullname"
                    placeholder={'Иванов Иван Иванович'}
                    error={errors?.['fullname'] ?? ''}
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
                    placeholder={'name@example.com'}
                    error={errors?.['email'] ?? ''}
                />
                <InputField
                    label="Пароль"
                    name="password"
                    placeholder={'∗∗∗∗∗∗∗'}
                    type="password"
                    error={errors?.['password'] ?? ''}
                />
            </div>
            {/*<Error error={errors?.['response'] || ''} />*/}
            <div className="flex flex-col gap-3">
                <Button label="Зарегистрироваться" type="submit" />
            </div>
        </FormWrapper>
    );
};
