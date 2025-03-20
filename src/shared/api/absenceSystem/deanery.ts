import { requester } from './base';

import { getToken } from '~/shared/store/cookie';
import { toast } from 'react-toastify';

type AcceptPassParams = {
    isAccepted: boolean;
}

export const acceptPass = async (requestId: string, params: AcceptPassParams) => {
    try {
        const token = getToken();

        const response = await requester.put(`/dean/pass/request/${requestId}`,
            null,
            {
                params,
                headers: {
                    Authorization: `Bearer ${token}`,
            },
        });

        toast.success('Изменения сохранены', {
            position: 'bottom-right',
        });

        return response.data;
    } catch (error) {
        console.log('Accept pass failed', error);
    }
}

export const acceptPassExtend = async (requestId: string, params: AcceptPassParams) => {
    try {
        const token = getToken();

        const response = await requester.put(`/dean/pass/request/extend/${requestId}`,
            null,
            {
                params,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

        toast.success('Изменения сохранены', {
            position: 'bottom-right',
        });

        return response.data;
    } catch (error) {
        console.log('Accept pass failed', error);
    }
}