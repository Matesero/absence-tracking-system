import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { sharedConfigEnvs } from '~/shared/config';

const { API_HOST } = sharedConfigEnvs;

export const requester = axios.create({
    baseURL: API_HOST,
});

requester.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response) {
            const { data } = error.response;
            const { errorDetails, message } = data;

            if (errorDetails.keys) {
                for (const key in errorDetails) {
                    toast.error(errorDetails[key], {
                        position: 'bottom-right',
                    });
                }
            } else {
                toast.error(message, {
                    position: 'bottom-right',
                });
            }
        }

        return Promise.reject(error);
    },
);
