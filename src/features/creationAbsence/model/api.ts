import { absenceSystemApi } from '~/shared/api';
import { getToken } from '~/shared/store/cookie';

const { requester } = absenceSystemApi.base;

type CreateNewParams = {
    dateStart: Date;
    dateEnd: Date;
    message: string | undefined;
    files: FileList | undefined;
};

export const createNew = async ({
    dateStart,
    dateEnd,
    message,
    files,
}: CreateNewParams) => {
    const formData = new FormData();
    const token = getToken();

    formData.append('dateStart', dateStart.toISOString());
    formData.append('dateEnd', dateEnd.toISOString());
    formData.append('message', message || '');

    if (files){
        Array.from(files).forEach((file) => {
            formData.append('files', file, file.name);
        });
    }

    try {
        const response = await requester.post('/pass/request', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.log('Create new', error);
    }
};

type CreateExtensionParams = {
    requestId: string;
    dateEnd: Date;
    message: string | undefined;
    files: FileList | undefined;
};

export const createExtension = async ({
                                          requestId,
                                          dateEnd,
                                          message,
                                          files,
                                      }: CreateExtensionParams) => {
    const formData = new FormData();
    const token = getToken();

    formData.append('dateEnd', dateEnd.toISOString());
    formData.append('message', message || '');

    if (files) {
        Array.from(files).forEach((file) => {
            formData.append('files', file, file.name);
        });
    }

    try {
        const response = await requester.post(`/pass/request/${requestId}/extend`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.log('Extension', error);
    }
};
