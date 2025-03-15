import { createAsyncThunk } from '@reduxjs/toolkit';

import { requester } from './base';

import { sharedConfigTypes } from '~/shared/config';
import { getToken } from '~/shared/store/cookie';

export const getProfile = createAsyncThunk<sharedConfigTypes.User, void>(
    'user/getProfile',
    async (_, { rejectWithValue }) => {
        const token = getToken();

        try {
            const response = await requester.get('/user/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

export const logout = createAsyncThunk<void, void>(
    'user/logout',
    async (_, { rejectWithValue }) => {
        const token = getToken();

        try {
            await requester.post(
                '/auth/logout',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const patchProfile = createAsyncThunk<
    sharedConfigTypes.User,
    { [key: string]: string | number | undefined }
>('user/patchProfile', async (params, { rejectWithValue }) => {
    const token = getToken();

    try {
        const response = await requester.patch('/user/profile', params, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const getUsers = async (
    email?: string,
    isBlocked?: boolean,
    fullName?: string,
    groupNumber?: number,
    role?: string,
) => {
    try {
        const token = getToken();

        const response = await requester.get('/user', {
            params: {
                email,
                isBlocked,
                fullName,
                groupNumber,
                role,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.log(error);
    }
};
