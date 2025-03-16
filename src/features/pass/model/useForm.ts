import { useEffect, useState } from 'react';

import { absenceSystemApi } from '~/shared/api';

const pass = absenceSystemApi.pass;

export const useForm = (id: string) => {
    const [data, setData] = useState()

    useEffect(() => {
        const getPassById = async () => {
            const response = await pass.getById(id);
            console.log(response);
            setData(response);
        };
        
        getPassById();
    }, [id]);

    return data;
}