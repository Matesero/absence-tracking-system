import { createAsyncThunk } from '@reduxjs/toolkit';

import { requester } from './base';

import { sharedConfigTypes } from '~/shared/config';
import { cookieService } from '~/shared/store';

export const getProfile = createAsyncThunk<sharedConfigTypes.User, void>(
    'user/getProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await requester.get('/user/profile', {
                headers: {
                    Authorization: `Bearer ${cookieService.getToken()}`,
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
        const token = cookieService.getToken();

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
    { [key: string]: string | number }
>('user/patchProfile', async (params, { rejectWithValue }) => {
    try {
        const response = await requester.patch('/user/profile', params, {
            headers: {
                Authorization: `Bearer ${cookieService.getToken()}`,
            },
        });
        console.log(response);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
