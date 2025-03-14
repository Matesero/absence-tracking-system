import { createSlice } from '@reduxjs/toolkit';

import {
    getProfile,
    logout,
    patchProfile,
} from '~/shared/api/absenceSystem/user';
import { sharedConfigTypes } from '~/shared/config';
import { checkToken, removeToken } from '~/shared/store/cookie';

type State = {
    user: sharedConfigTypes.User | null;
    isAuth: boolean;
    isLoading: boolean;
};

const initialState: State = {
    user: null,
    isAuth: checkToken(),
    isLoading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsAuth: (state) => {
            state.isAuth = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProfile.pending, (state: State) => {
                state.user = null;
                state.isLoading = true;
            })
            .addCase(getProfile.fulfilled, (state: State, action) => {
                state.isAuth = true;
                state.user = action.payload;
                state.isLoading = false;
            })
            .addCase(getProfile.rejected, (state: State) => {
                state.isAuth = false;
                state.user = null;
                state.isLoading = false;
            });

        builder.addCase(logout.fulfilled, (state: State) => {
            removeToken();
            state.isAuth = false;
            state.user = null;
        });

        builder.addCase(patchProfile.fulfilled, (state: State, action) => {
            state.user = action.payload;
        });
    },
});

export const { setIsAuth } = userSlice.actions;
export const userReducer = userSlice.reducer;
