import { FormEventHandler, useState } from 'react';

import { login } from './api.ts';
import { schema, zod2errors } from './schema.ts';

type Props = 'register' | 'login';

type ErrorsType = { [key: string]: string };

export type FormResult = readonly [
    ErrorsType,
    FormEventHandler<HTMLFormElement>,
];

export const useForm = (formType: Props): FormResult => {
    const [errors, setErrors] = useState<ErrorsType>({});

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        setErrors({});
        const formData = new FormData(e.currentTarget);
        const dataParse = schema.safeParse(Object.fromEntries(formData));

        if (dataParse.success) {
            const { data } = dataParse;
            const { email, password } = data;

            switch (formType) {
                case 'login':
                    if (email && password) {
                        try {
                            await login({ email, password });
                        } catch (error) {
                            setErrors({ request: error.toString() });
                        }
                    }
            }
        } else {
            setErrors(zod2errors(dataParse.error));
        }
    };

    return [errors, onSubmit] as const;
};
