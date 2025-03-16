import { requester } from './base';

import { getToken } from '~/shared/store/cookie';

type DownloadFileParams = {
    requestId: string;
    fileId: string;
}

export const downloadFile = async (params: DownloadFileParams) => {
    try {
        const token = getToken();

        const response = await requester.get('/file/download', {
            params,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            responseType: 'arraybuffer',
        });

        return response.data;
    } catch (error) {
        console.log('Download file failed', error);
    }
}