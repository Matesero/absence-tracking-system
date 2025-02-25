import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { loginPageUi } from '~/pages/login';
import { registrationPageUi } from '~/pages/registration';
import { sharedConfigRouter } from '~/shared/config';

const { LoginPage } = loginPageUi;
const { RegistrationPage } = registrationPageUi;

const { RouteName } = sharedConfigRouter;

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={RouteName.LOGIN_PAGE} element={<LoginPage />} />
                <Route path={RouteName.REGISTRATION_PAGE} element={<RegistrationPage />} />
            </Routes>
        </BrowserRouter>
    );
};
