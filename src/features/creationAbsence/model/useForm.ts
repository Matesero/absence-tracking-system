import { FormEventHandler, useState } from 'react';

import { createNew } from './api';
import { schema, zod2errors } from './schema';

type Props = 'new' | 'extension';

type ErrorsType = { [key: string]: string };

export type FormResult = readonly [
    ErrorsType,
    FormEventHandler<HTMLFormElement>,
    (files: FileList) => void,
];

export const useForm = (formType: Props): FormResult => {
    const [errors, setErrors] = useState<ErrorsType>({});
    const [files, setFiles] = useState<FileList>();

    const handleFileChange = (selectedFiles: FileList | null) => {
        setFiles(selectedFiles);
    };

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        setErrors({});
        const formData = new FormData(e.currentTarget);
        const dataParse = schema.safeParse(Object.fromEntries(formData));

        if (dataParse.success) {
            const { data } = dataParse;
            const { dateStart, dateEnd, message } = data;

            switch (formType) {
                case 'new':
                    if (dateStart && dateEnd) {
                        try {
                            console.log(dateStart, dateEnd, message, files);
                            await createNew({
                                dateStart,
                                dateEnd,
                                message,
                                files,
                            });
                        } catch (error) {
                            setErrors({ response: error.toString() });
                        }
                    }
                    break;

                case 'extension':
                    if (dateStart && dateEnd) {
                        try {
                        } catch (error) {
                            setErrors({ response: error.toString() });
                        }
                    }

                    break;
            }
            setFiles(null);
        } else {
            setErrors(zod2errors(dataParse.error));
        }
    };

    return [errors, onSubmit, handleFileChange] as const;
};
