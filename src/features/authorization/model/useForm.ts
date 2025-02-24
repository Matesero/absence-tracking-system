import { FormEventHandler, useState } from 'react';

import { schema, zod2errors } from './schema.ts';

type Props = 'register' | 'login';

type ErrorsType = { [key: string]: string };

export type FormResult = readonly [
    boolean,
    ErrorsType,
    FormEventHandler<HTMLFormElement>,
];

export const useForm = (formType: Props): FormResult => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<ErrorsType>({});

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        setErrors({});
        const formData = new FormData(e.currentTarget);
        const dataParse = schema.safeParse(
            Object.fromEntries(formData));

        if (dataParse.success) {
            const { data } = dataParse;
            const {
                email,
                password,
                name,
            } = data;

            switch (formType){
                case 'login':
                    if (
                        email &&
                        password
                    ) {
                        const response;
                    }
            }
        } else {
            setErrors(zod2errors(dataParse.error));
        }
    }

    return [isLoading, errors, onSubmit] as const;
}