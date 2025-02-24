import axios, { AxiosError } from 'axios';

import { sharedConfigEnvs } from '~/shared/config';

const { MEDICAL_SYSTEM_HOST } = sharedConfigEnvs;

export const medicalSystemRequester = axios.create({
    baseURL: MEDICAL_SYSTEM_HOST,
});

medicalSystemRequester.interceptors.response.use(
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
