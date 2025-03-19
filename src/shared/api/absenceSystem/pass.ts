import { requester } from './base';

import { sharedConfigTypes } from '~/shared/config';
import { getToken } from '~/shared/store/cookie';

type GetAbsencesParams = {
    userId?: string;
    userSearchString?: string;
    dateStart?: Date;
    dateEnd?: Date;
    date?: Date;
    groupNumber?: number[];
    isAccepted?: boolean;
    pageable: sharedConfigTypes.Pageable;
};

export const getList = async (params: GetAbsencesParams) => {
    try {
        const token = getToken();

        const requestParams = {
            ...params,
            page: params.pageable.page,
            size: params.pageable.size,
            sort: params.pageable.sort,
        };

        delete requestParams.pageable;

        const response = await requester.get('/pass/request/pageable', {
            params: requestParams,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.log('Get absences failed', error);
        throw error; // Пробрасываем ошибку для обработки в вызывающем коде
    }
};

export const getMyList = async (params: GetAbsencesParams) => {
    try {
        const token = getToken();

        const requestParams = {
            ...params,
            page: params.pageable.page,
            size: params.pageable.size,
            sort: params.pageable.sort,
        };

        delete requestParams.pageable;

        const response = await requester.get('/pass/request/my/pageable', {
            params: requestParams,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.log('Get absences failed', error);
    }
};
