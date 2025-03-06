import axios, { AxiosError } from 'axios';

import { sharedConfigEnvs } from '~/shared/config';

const { API_HOST } = sharedConfigEnvs;

export const requester = axios.create({
    baseURL: API_HOST,
});

requester.interceptors.response.use(
    // потом сделать
    (response) => response,
    (error: AxiosError) => {
        if (error.response) {
            const { status } = error.response;

            switch (status) {
                case 400:
                    break;
            }
        }

        return Promise.reject(error);
    },
);
