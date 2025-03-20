import { FormEventHandler, useState } from 'react';

import { schema } from './schema';

import { mapRoleTo } from '~/features/filtration/model/rolesMapper';
import { absenceSystemApi } from '~/shared/api';

const deanery = absenceSystemApi.deanery;

type Props = 'block' | 'role';

export const useForm = (typeForm: Props, userId: string, userRole?: string,
                        isBlocked?: boolean) => {
    const [role, setRole] = useState(userRole);
    const [blocked, setBlocked] = useState(isBlocked);

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const dataParse = schema.safeParse(Object.fromEntries(formData));

        if (dataParse.success) {
            const { data } = dataParse;

            const userRole = data.role || undefined;

            switch (typeForm) {
                case 'block':
                    if (blocked !== undefined) {
                        await deanery.blockUser(userId, { isBlocked: !blocked });
                        setBlocked(!blocked);
                    }
                    break;

                case 'role':
                    if (userRole !== undefined) {
                        await deanery.changeRole(userId, { role: mapRoleTo(userRole) });
                        setRole(userRole);
                    }
                    break;
            }
        }
    }

    return [role, blocked, onSubmit] as const;
}