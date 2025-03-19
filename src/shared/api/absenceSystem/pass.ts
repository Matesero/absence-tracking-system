import qs from 'qs';

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

type UpdateAbsenceParams = {
    dateStart?: Date;
    dateEnd?: Date;
    message?: string;
}

export const getList = async (params: GetAbsencesParams) => {
    try {
        const token = getToken();

        const response = await requester.get('/pass/request/pageable', {
            params,
            paramsSerializer: (params) =>
                qs.stringify(params, { arrayFormat: 'comma' }),
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.log('Get absences failed', error);
    }
};

export const getMyList = async (params: GetAbsencesParams) => {
    try {
        const token = getToken();

        const response = await requester.get('/pass/request/my/pageable', {
            params,
            paramsSerializer: (params) =>
                qs.stringify(params, { arrayFormat: 'comma' }),
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.log('Get absences failed', error);
    }
};

export const getById = async (passRequestId: string) => {
    try {
        const token = getToken();

        const response = await requester.get(`/pass/request/${passRequestId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.log('Get absence by id failed', error);
    }
}

export const updateById = async (passRequestId: string,
                                 params: UpdateAbsenceParams) => {
    try {
        const token = getToken();

        const response = await requester.patch(`/pass/request/${passRequestId}`,
            params, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.log('Update absence failed', error);
    }
}

export const deleteById = async (passRequestId: string) => {
    try {
        const token = getToken();

        const response = await requester.delete(`/pass/request/${passRequestId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.log('Delete absence by id failed', error);
    }
}