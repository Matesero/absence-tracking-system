import React, { useEffect } from 'react';

import { useForm } from '../model';

export const LoginForm = () => {
    const [{ errors }, onSubmit] = useForm('login');

    return (
        <FormWrapper title={'Логин'} onSubmit={onSubmit}>

        </FormWrapper>
    )
}