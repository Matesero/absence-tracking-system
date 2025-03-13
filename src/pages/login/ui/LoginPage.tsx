import React from 'react';

import { authorizationFeature } from '~/features';

const { LoginForm } = authorizationFeature.ui;

export const LoginPage = () => {
    return (
        <LoginForm />
    );
};
