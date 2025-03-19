import { absenceSystemApi } from '~/shared/api';
import { getToken } from '~/shared/store/cookie';

const { requester } = absenceSystemApi.base;

type CreateNewParams = {
    dateStart: Date;
    dateEnd: Date;
    message: string;
    files: FileList;
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
    formData.append('message', message);

    Array.from(files).forEach((file) => {
        formData.append('files', file, file.name);
    });

    try {
        const response = await requester.post('/pass/request', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response;
    } catch (error) {
        console.log('Create new', error);
    }
};

type CreateExtensionParams = {
    requestId: string;
    dateStart: string;
    dateEnd: string;
    message: string;
    files: FileList;
};

export const createExtension = async (params: CreateExtensionParams) => {
    try {
        await requester.post(
            `/pass/request/${params.requestId}/extend`,
            params,
        );
    } catch (error) {
        console.log('Create extension', error);
    }
};
