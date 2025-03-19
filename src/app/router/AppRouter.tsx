import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout } from '~/app/layout';
import { ProtectedRoute } from '~/app/router/ProtectedRoute';
import { loginPageUi } from '~/pages/login';
import { mainPageUi } from '~/pages/main';
import { profilePageUi } from '~/pages/profile';
import { registrationPageUi } from '~/pages/registration';
import { reportPageUi } from '~/pages/report';
import { usersListPageUi } from '~/pages/users-list';
import { sharedConfigRouter } from '~/shared/config';

const { LoginPage } = loginPageUi;
const { MainPage } = mainPageUi;
const { RegistrationPage } = registrationPageUi;
const { ProfilePage } = profilePageUi;
const { ReportPage } = reportPageUi;
const { UsersListPage } = usersListPageUi;

const { RouteName } = sharedConfigRouter;

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route
                        path={RouteName.LOGIN_PAGE}
                        element={<LoginPage />}
                    />
                    <Route
                        path={RouteName.REGISTRATION_PAGE}
                        element={<RegistrationPage />}
                    />

                    <Route path={RouteName.MAIN_PAGE} element={<MainPage />} />

                    <Route element={<ProtectedRoute />}>
                        <Route
                            path={RouteName.PROFILE_PAGE}
                            element={<ProfilePage />}
                        />

                        <Route
                            path={RouteName.USERS_LIST_PAGE}
                            element={<UsersListPage />}
                        />

                        <Route
                            path={RouteName.REPORT_PAGE}
                            element={<ReportPage />}
                        />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
