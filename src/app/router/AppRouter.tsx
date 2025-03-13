import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout } from '~/app/layout';
import { ProtectedRoute } from '~/app/router/ProtectedRoute';
import { loginPageUi } from '~/pages/login';
import { profilePageUi } from '~/pages/profile';
import { registrationPageUi } from '~/pages/registration';
import { usersListPageUi } from '~/pages/users-list';
import { sharedConfigRouter } from '~/shared/config';

const { LoginPage } = loginPageUi;
const { RegistrationPage } = registrationPageUi;
const { ProfilePage } = profilePageUi;
const { UsersListPage } = usersListPageUi;

const { RouteName } = sharedConfigRouter;

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path={RouteName.LOGIN_PAGE} element={<LoginPage />} />
                    <Route
                        path={RouteName.REGISTRATION_PAGE}
                        element={<RegistrationPage />}
                    />

                    <Route element={<ProtectedRoute />}>
                        <Route
                            path={RouteName.PROFILE_PAGE}
                            element={<ProfilePage />}
                        />
                    </Route>
                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route
                        path={RouteName.USERS_LIST_PAGE}
                        element={<UsersListPage />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
