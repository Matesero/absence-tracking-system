import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { getProfile, logout } from '~/shared/api/absenceSystem/user';
import { userSlice, useAppDispatch } from '~/shared/store';

const userSelectors = userSlice.selectors;

type Props = {
    redirectPath: string;
};

export const ProtectedRoute = ({ redirectPath = '/login' }: Props) => {
    const isAuth = useSelector(userSelectors.isAuth);
    const navigate = useNavigate();
    const appDispatch = useAppDispatch();

    useEffect(() => {
        const fetchProfile = async () => {
            if (isAuth) {
                try {
                    await appDispatch(getProfile());
                } catch (error) {
                    console.log('Error fetch profile', error)
                    appDispatch(logout());
                }
            } else {
                navigate(redirectPath);
            }
        };

        fetchProfile();
    }, [isAuth]);

    if (!isAuth) {
        return null;
    }

    return <Outlet />;
};
