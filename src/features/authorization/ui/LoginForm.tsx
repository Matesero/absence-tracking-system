import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { FormWrapper } from './FormWrapper';
import { useForm } from '../model';

import { sharedConfigRouter } from '~/shared/config';
import { Button, InputField } from '~/shared/ui';

const { RouteName } = sharedConfigRouter;

export const LoginForm = () => {
    const [errors, onSubmit] = useForm('login');

    const navigate = useNavigate();
    const handleRegisterClick = useCallback(() => {
        navigate({ pathname: RouteName.REGISTRATION_PAGE });
    }, [navigate]);

    return (
        <FormWrapper title={'Вход'} onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
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
                <Button label="Войти" type="submit" />
                <Button
                    label="Зарегистрироваться"
                    bgColor="primary-gray"
                    onClick={handleRegisterClick}
                />
            </div>
        </FormWrapper>
    );
};
