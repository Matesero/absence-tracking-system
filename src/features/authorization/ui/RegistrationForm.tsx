import React from 'react';

import { FormWrapper } from './FormWrapper';
import { useForm } from '../model';

import { listToOptions } from '~/shared/lib/listToOptions';
import { Button, InputField, CustomSelect as Select } from '~/shared/ui';

export const RegistrationForm = () => {
    const [errors, groups, onSubmit] = useForm('register');

    return (
        <FormWrapper title={'Регистрация'} onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
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
            <div className="flex flex-col gap-3">
                <Button label="Зарегистрироваться" type="submit" />
            </div>
        </FormWrapper>
    );
};
