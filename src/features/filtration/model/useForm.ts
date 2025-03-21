import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { FormEventHandler, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { schema, zod2errors } from './schema';
import { mapRoleTo } from '../model/rolesMapper';

import { absenceSystemApi } from '~/shared/api';
import { getUsers } from '~/shared/api/absenceSystem/user';
import { userSlice } from '~/shared/store';
import { toast } from 'react-toastify';

type ErrorsType = { [key: string]: string };

type Props = 'users' | 'absences' | 'report';

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
                    size: 100000,
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

        const getUsersList = async () => {
            const response = await getUsers();
            setUsers(response.content);
        };

        getGroups();

        if (typeList === 'absences' && userRole) {
            getAbsences();
        }

        if (typeList === 'users' && userRole) {
            getUsersList();
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
                size: 100000,
                sort: '',
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

            if (typeList === 'report') {
                try {
                    if (dateStart && dateEnd && groupNumbers?.length > 0) {
                        const response = await pass.getReport({
                            dateStart,
                            dateEnd,
                            groupIds: groupNumbers,
                        });

                        if (response.data) {
                            const fileName = `report ${format(dateStart, 'dd-MM-yyyy', { locale: ru })} - ${format(dateEnd, 'dd-MM-yyyy', { locale: ru })}.xlsx`;

                            const blob = new Blob([response.data], {
                                type: response.headers['content-type'] || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Тип файла (Excel)
                            });

                            const loadingToastId = toast.loading('Скачивание началось', {
                                position: 'bottom-right',
                                autoClose: false,
                            });

                            const url = window.URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', fileName);
                            document.body.appendChild(link);

                            link.click();

                            setTimeout(() => {
                                toast.update(loadingToastId, {
                                    render: 'Загрузка завершена!',
                                    type: 'success',
                                    isLoading: false,
                                    autoClose: 3000,
                                });

                                window.URL.revokeObjectURL(url);
                                document.body.removeChild(link);
                            }, 1000);
                        }
                    } else {
                        setErrors({
                            dateStart: dateStart ? '' : 'Поле является обязательным',
                            dateEnd: dateEnd ? '' : 'Поле является обязательным',
                            groupNumbers: groupNumbers?.length ? '' : 'Поле является обязательным',
                        });                    }
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
