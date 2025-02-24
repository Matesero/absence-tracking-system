import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { loginPageUi } from '~/pages/login';
import { sharedConfigRouter } from '~/shared/config';

const { LoginPage } = loginPageUi;

const { RouteName } = sharedConfigRouter;

export const AppRouter = () => {
    return (
        <BrowserRouter
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        >
            <Routes>
                <Route path={RouteName.LOGIN_PAGE} element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
};
