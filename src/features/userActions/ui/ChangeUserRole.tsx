import React from 'react';

import { mapRoleFrom } from '~/features/filtration/model/rolesMapper';
import { useForm } from '~/features/userActions/model';
import { listToOptions } from '~/shared/lib/listToOptions';
import { Button, CustomSelect as Select, Loading } from '~/shared/ui';

export const ChangeUserRole = (props: { userId: string, userRole: string }) => {
    const [ role, , onSubmit] = useForm('role', props.userId, props.userRole);

    if (!role) {
        return (
            <Loading />
        )
    }

    return (
        <form
            className='flex flex-col gap-4 w-full'
            onSubmit={onSubmit}
        >
            <Select
                label="Роль"
                name="role"
                options={listToOptions(['Студент', 'Преподаватель', 'Деканат'])}
                value={mapRoleFrom(role)}
            />
            <Button
                label='Подтвердить'
                type='submit'
            />
        </form>
    )
}