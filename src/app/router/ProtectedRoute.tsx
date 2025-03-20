import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { getProfile, logout } from '~/shared/api/absenceSystem/user';
import { RouteName } from '~/shared/config/router';
import { userSlice, useAppDispatch } from '~/shared/store';

const userSelectors = userSlice.selectors;

type Props = {
    redirectPath: string;
};

export const ProtectedRoute = ({ redirectPath = RouteName.MAIN_PAGE }: Props) => {
    const isAuth = useSelector(userSelectors.isAuth);
    const user = useSelector(userSelectors.user);
    const navigate = useNavigate();
    const location = useLocation();
    const appDispatch = useAppDispatch();

    useEffect(() => {
        const fetchProfile = async () => {
            if (isAuth && !user) {
                try {
                    await appDispatch(getProfile());
                } catch (error) {
                    console.log('Error fetch profile', error);
                    appDispatch(logout());
                }
            } else if (!isAuth) {
                navigate(redirectPath);
            }
        };

        fetchProfile();
    }, [isAuth]);

    const checkRole = () => {
        if (!isAuth) {
            navigate(redirectPath);
        }

        if (isAuth && user && user.role === 'student') {
            navigate(redirectPath);
        }
    };

    useEffect(() => {
        switch (location.pathname) {
            case RouteName.REPORT_PAGE:
                checkRole();
                break;

            case RouteName.USERS_LIST_PAGE:
                checkRole();
                break;
        }
    }, [user]);

    if (!isAuth) {
        return null;
    }

    return <Outlet />;
};
