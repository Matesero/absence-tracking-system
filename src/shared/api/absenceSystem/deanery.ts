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

export const blockUser = async (userId: string, params: { isBlocked: boolean }) => {
    try {
        const token = getToken();

        const response = await requester.put(`/dean/block/user/${userId}`,
            null,
            {
                params,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

        return response.data;
    } catch (error) {
        console.log('Accept pass failed', error);
    }
}

export const changeRole = async (userId: string, params: { role: string }) => {
    try {
        const token = getToken();
        const response = await requester.patch(`/user/${userId}/role`,
            null, {
                params,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

        return response.data;
    } catch (error) {
        console.log('Update role failed', error);
    }
}