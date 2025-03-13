import { FormEventHandler, useEffect, useState } from 'react';

import { schema, zod2errors } from './schema';
import { mapRoleTo } from '../model/rolesMapper';

import { absenceSystemApi } from '~/shared/api';
import { getUsers } from '~/shared/api/absenceSystem/user';

type ErrorsType = { [key: string]: string };

const group = absenceSystemApi.group;

export const useForm = () => {
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState<ErrorsType>({});
    const [groups, setGroups] = useState<string[]>([]);

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
            const email = data.email || undefined;
            const isBlocked = data.blocked || false;
            const fullName = data.fullName || undefined;
            const groupNumber = data.groupNumber || undefined;
            const role = data.role ? mapRoleTo(data.role) : undefined;

            try {
                const response = await getUsers(
                    email,
                    isBlocked,
                    fullName,
                    groupNumber,
                    role
                );

                setUsers(response.content);
            } catch (error) {
                setErrors({ response: error.toString() });
            }
        } else {
            setErrors(zod2errors(dataParse.error));
        }
    };

    console.log(users);

    return [users, errors, groups, onSubmit] as const;
};
