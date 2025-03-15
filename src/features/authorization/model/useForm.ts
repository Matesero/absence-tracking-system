import { FormEventHandler, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from './api.ts';
import { register } from './api.ts';
import { schema, zod2errors } from './schema.ts';

import { absenceSystemApi } from '~/shared/api';
import { patchProfile } from '~/shared/api/absenceSystem/user';
import { RouteName } from '~/shared/config/router';
import { useAppDispatch } from '~/shared/store';
import { setIsAuth } from '~/shared/store/user/store';

type Props = 'register' | 'login' | 'profile';

type ErrorsType = { [key: string]: string };

export type FormResult = readonly [
    ErrorsType,
    string[],
    FormEventHandler<HTMLFormElement>,
];

const group = absenceSystemApi.group;

export const useForm = (formType: Props): FormResult => {
    const [errors, setErrors] = useState<ErrorsType>({});
    const [groups, setGroups] = useState<string[]>([]);
    const navigate = useNavigate();
    const appDispatch = useAppDispatch();

    useEffect(() => {
        const getGroups = async () => {
            const groupsList = await group.getList({ isDeleted: false });

            setGroups(groupsList.map((item) => item.groupNumber));
        };

        getGroups();
    }, []);

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        setErrors({});
        const formData = new FormData(e.currentTarget);
        const dataParse = schema.safeParse(Object.fromEntries(formData));

        if (dataParse.success) {
            const { data } = dataParse;
            const { email, password, fullName, groupNumber } = data;

            switch (formType) {
                case 'login':
                    if (email && password) {
                        try {
                            const successful = await login({ email, password });

                            if (successful) {
                                appDispatch(setIsAuth());
                                navigate(RouteName.MAIN_PAGE);
                            }
                        } catch (error) {
                            setErrors({ response: error.toString() });
                        }
                    }
                    break;

                case 'register':
                    if (fullName && email && password) {
                        try {
                            const successful = await register({
                                fullName,
                                groupNumber,
                                email,
                                password,
                            });

                            if (successful) {
                                appDispatch(setIsAuth());
                                navigate(RouteName.MAIN_PAGE);
                            }
                        } catch (error) {
                            setErrors({ response: error.toString() });
                        }
                    }
                    break;

                case 'profile':
                    if (fullName && email) {
                        try {
                            appDispatch(
                                patchProfile({
                                    fullName,
                                    groupNumber,
                                    email,
                                }),
                            );
                        } catch (error) {
                            setErrors({ response: error.toString() });
                        }
                    }
                    break;
            }
        } else {
            setErrors(zod2errors(dataParse.error));
        }
    };

    return [errors, groups, onSubmit] as const;
};
