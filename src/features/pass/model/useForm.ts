import { FormEventHandler, useEffect, useState } from 'react';

import { schema } from './schema';
import { mapStatusTo } from './statusMapper';

import { absenceSystemApi } from '~/shared/api';

const pass = absenceSystemApi.pass;
const file = absenceSystemApi.file;
const deanery = absenceSystemApi.deanery;

export const useForm = (id: string, formType?: string) => {
    const [data, setData] = useState();

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

            if (formType === 'deanery') {
                if (data.status) {
                    const status = mapStatusTo(data.status);
                    await deanery.acceptPass(id, { isAccepted: status });
                }
            }

            if (formType === 'student') {
                const newData = await pass.updateById(id, {
                    dateStart: data.dateStart,
                    dateEnd: data.dateEnd,
                    message: data.message,
                })

                if (newData) {
                    setData(newData);
                }
            }
        }
    }

    const onExtendSubmit = (extendId: string): FormEventHandler<HTMLFormElement> =>
        async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const dataParse = schema.safeParse(Object.fromEntries(formData));

        if (dataParse.success) {
            const { data } = dataParse;

            switch (formType) {
                case 'deanery':
                    if (data.status) {
                        const status = mapStatusTo(data.status);
                        await deanery.acceptPassExtend(extendId, { isAccepted: status });
                    }
                    break;

                case 'student':
                    return await pass.updateExtendById(extendId, { dateEnd: data.dateEnd, message: data.message });
            }
        }
    }


    return [data, downloadFile, onSubmit, onExtendSubmit] as const;
}