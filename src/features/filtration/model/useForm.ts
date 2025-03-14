import { FormEventHandler, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { schema, zod2errors } from './schema';
import { mapRoleTo } from '../model/rolesMapper';

import { absenceSystemApi } from '~/shared/api';
import { getUsers } from '~/shared/api/absenceSystem/user';
import { userSlice } from '~/shared/store';

type ErrorsType = { [key: string]: string };

type Props = 'users' | 'absences';

const group = absenceSystemApi.group;
const pass = absenceSystemApi.pass;
const { selectors } = userSlice;

export const useForm = (typeList: Props) => {
    const userRole = useSelector(selectors.user)?.role;
    const [users, setUsers] = useState([]);
    const [absences, setAbsences] = useState([]);
    const [errors, setErrors] = useState<ErrorsType>({});
    const [groups, setGroups] = useState<string[]>([]);

    useEffect(() => {
        const getGroups = async () => {
            const groupsList = await group.getList({ isDeleted: false });

            setGroups(groupsList.map((item) => item.groupNumber));
        };

        const getAbsences = async () => {
            const params = {
                pageable: {
                    page: 0,
                    size: 10,
                    sort: '',
                },
            };

            if (userRole !== 'student') {
                const response = await pass.getList(params);

                setAbsences(response.content);
            } else {
                const response = await pass.getMyList(params);

                setAbsences(response.content);
            }
        };

        getGroups();

        if (typeList === 'absences' && userRole) {
            getAbsences();
        }
    }, [userRole, typeList]);

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
            const dateStart = data.dateStart || undefined;
            const dateEnd = data.dateEnd || undefined;
            const date = data.date || undefined;
            const groupNumbers = data.groupNumbers || undefined;
            const isAccepted = data.isAccepted;
            const pageable = {
                page: 0,
                size: 10,
                sort: 'ASC',
            };

            if (typeList === 'users') {
                try {
                    const response = await getUsers(
                        email,
                        isBlocked,
                        fullName,
                        groupNumber,
                        role,
                    );

                    setUsers(response.content);
                } catch (error) {
                    setErrors({ response: error.toString() });
                }
            }

            if (typeList === 'absences') {
                try {
                    if (userRole !== 'student') {
                        const response = await pass.getList({
                            userSearchString: fullName,
                            dateStart,
                            dateEnd,
                            date,
                            groupNumber: groupNumbers,
                            isAccepted,
                            pageable,
                        });

                        setAbsences(response.content);
                    } else {
                        const response = await pass.getMyList({
                            isAccepted,
                            pageable,
                        });

                        setAbsences(response.content);
                    }
                } catch (error) {
                    setErrors({ response: error.toString() });
                }
            }
        } else {
            setErrors(zod2errors(dataParse.error));
        }
    };

    return [users, absences, errors, groups, onSubmit] as const;
};
