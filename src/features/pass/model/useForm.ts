import { FormEventHandler, useEffect, useState } from 'react';

import { schema } from './schema';
import { mapStatusTo } from './statusMapper';

import { absenceSystemApi } from '~/shared/api';


const pass = absenceSystemApi.pass;
const file = absenceSystemApi.file;
const deanery = absenceSystemApi.deanery;

export const useForm = (id: string) => {
    const [data, setData] = useState()

    useEffect(() => {
        const getPassById = async () => {
            const response = await pass.getById(id);
            setData(response);
        };
        
        getPassById();
    }, [id]);

    const downloadFile = async (fileId: string, fileName : string) => {
        const response = await file.downloadFile(
            {
                requestId: id,
                fileId,
            }
        );

        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();

        URL.revokeObjectURL(url);
        document.body.removeChild(link);
    };

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const dataParse = schema.safeParse(Object.fromEntries(formData));

        if (dataParse.success) {
            const { data } = dataParse;
            
            const status = mapStatusTo(data.status);

            await deanery.acceptPass(id, { isAccepted: status });
        }
    }

    return [data, downloadFile, onSubmit] as const;
}