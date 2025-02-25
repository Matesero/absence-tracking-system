import React from 'react';

import { FormWrapper } from './FormWrapper';
import { useForm } from '../model';

import { Button, InputField } from '~/shared/ui';

export const RegistrationForm = () => {
    const [errors, onSubmit] = useForm('register');

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
}