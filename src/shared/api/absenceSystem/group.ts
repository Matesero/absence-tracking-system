import { requester } from './base';

type GetGroupsParams = {
    isDeleted: boolean;
};

export const getList = async (params: GetGroupsParams) => {
    try {
        const response = await requester.get('/group/list', { params });

        return response.data;
    } catch (error) {
        console.log('Get groups failed', error);
    }
};
