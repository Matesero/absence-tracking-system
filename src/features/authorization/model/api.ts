import { absenceSystemApi } from '~/shared/api';
import { cookieService } from '~/shared/store';

const requester = absenceSystemApi.medicalSystemRequester;

type LoginParams = {
    email: string;
    password: string;
};

type RegisterParams = {
    fullname: string;
    email: string;
    password: string;
}

export const login = async (params: LoginParams) => {
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

export const register = async (params: RegisterParams) => {
    try {
        const response = await requester.post('/auth/register', params);

        const token = response.data.token;

        if (token) {
            cookieService.setToken(token);
        }
    } catch (error) {
        console.log('Register failed', error);
    }
}