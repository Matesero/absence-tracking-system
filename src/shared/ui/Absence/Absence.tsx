import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import React from 'react';

import { sharedConfigTypes } from '~/shared/config';

export const Absence = ({
    user,
    userRole,
    dateStart,
    dateEnd,
    minioFiles,
    extendPassTimeRequests,
    isAccepted,
}: sharedConfigTypes.Pass & { userRole: string }) => {
    const textSize = 'text-xl';

    const formattedStart = format(dateStart, 'd MMMM yyyy', { locale: ru });
    const formattedEnd = format(dateEnd, 'd MMMM yyyy', { locale: ru });

    return (
        <div className="flex flex-col w-full p-5 sm:pt-4 sm:p-4 sm:pb-4 bg-white rounded-3xl border-[1px] border-gray-300">
            <div className="flex justify-between">
                <div className="flex gap-3">
                    <p className={`flex gap-1 ${textSize} font-semibold`}>
                        ФИО:
                        <span>{user.fullName}</span>
                    </p>
                    <p className={`flex gap-1 ${textSize}`}>
                        Роль:
                        <span className={textSize}>
                            {userRole.toLowerCase()}
                        </span>
                    </p>
                </div>
                <p
                    className={`flex gap-1 ${textSize} ${isAccepted ? 'text-green-500' : 'text-primary-orange'}`}
                >
                    {isAccepted ? 'Принято' : 'На рассмотрении'}
                </p>
            </div>
            <p className={`flex gap-1 ${textSize}`}>
                Период:
                <span
                    className={textSize}
                >{`${formattedStart} - ${formattedEnd}`}</span>
            </p>
            {minioFiles.length > 0 && (
                <p className={'flex gap-1 text-lg text-primary-gray'}>
                    Прикрепленные файлы:
                    <span>{minioFiles.length}</span>
                </p>
            )}
            {extendPassTimeRequests.length > 0 && (
                <p
                    className={
                        'flex gap-1 text-lg text-primary-gray leading-[1.2]'
                    }
                >
                    Запросы на продление:
                    <span>{extendPassTimeRequests.length}</span>
                </p>
            )}
        </div>
    );
};
