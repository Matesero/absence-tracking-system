import { requester } from './base';

import { getToken } from '~/shared/store/cookie';

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

        return response.data;
    } catch (error) {
        console.log('Accept pass failed', error);
    }
}