import { absenceSystemApi } from '~/shared/api';
import { cookieService } from '~/shared/store';

const { requester } = absenceSystemApi.base;

type LoginParams = {
    email: string;
    password: string;
};

type RegisterParams = {
    fullname: string;
    groupNumber?: number;
    email: string;
    password: string;
};

export const login = async (params: LoginParams): Promise<string> => {
    try {
        const response = await requester.post('/auth/login', params);

        const token = response.data.token;

        if (token) {
            cookieService.setToken(token);
        }
    } catch (error) {
        console.log('Login failed', error);
    }
};

export const register = async (params: RegisterParams): Promise<string> => {
    try {
        const response = await requester.post('/auth/registration', params);

        const token = response.data.token;

        if (token) {
            cookieService.setToken(token);
        }
    } catch (error) {
        console.log('Register failed', error);
    }
};
