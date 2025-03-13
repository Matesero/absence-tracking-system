import React from 'react';

import { Layout } from '~/app/layout';
import { filtrationFeature } from '~/features'
import { useForm } from '~/features/filtration/model'

const { UsersFilter } = filtrationFeature.ui;
const { rolesMapper } = filtrationFeature.model;

interface User {
    id: string;
    fullName: string;
    email: string;
    isBlocked: boolean;
    role: string;
    group?: {
        groupNumber: number;
        isDeleted: boolean;
    };
}

export const UsersListPage = () => {
    const textSize = 'text-xl'
    const [ users, errors, groups, onSubmit ] = useForm();

    return (
        <Layout>
            <div
                className="flex flex-col gap-3 w-full sm:w-4/5 3xl:max-w-screen-full p-5 sm:pt-4 sm:p-4 sm:pb-4 items-center self-start"
            >
                <UsersFilter
                    errors={errors}
                    groups={groups}
                    onSubmit={onSubmit}
                />
                {users && users.map((user: User) => (
                    <div
                        key={user.id}
                        className='flex flex-col w-full p-5 sm:pt-4 sm:p-4 sm:pb-4 bg-white rounded-3xl border-[1px] border-gray-300'
                    >
                        <div className="flex gap-3">
                            <div className="flex gap-1">
                                <p className={textSize}>ФИО:</p>
                                <p className={textSize}>{user.fullName}</p>
                            </div>
                            <div className="flex gap-1">
                                <p className={textSize}>email:</p>
                                <p className={textSize}>{user.email}</p>
                            </div>
                            {user.isBlocked && (
                                <div className="flex">
                                    <p className={`${textSize} text-red-600`}>
                                        ЗАБЛОКИРОВАН
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-3">
                            <div className="flex gap-1">
                                <p className={textSize}>Роль:</p>
                                <p className={textSize}>
                                    {rolesMapper.mapRoleFrom(user.role)}
                                </p>
                            </div>
                            {user.group && (
                                <div className="flex gap-1">
                                    <p className={textSize}>Группа:</p>
                                    <p className={textSize}>
                                        {user.group?.groupNumber}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
};