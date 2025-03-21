import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { sharedConfigTypes } from '~/shared/config';

export const Absence = ({
                            user,
                            userRole,
                            id,
                            dateStart,
                            dateEnd,
                            minioFiles,
                            extendPassTimeRequests,
                            isAccepted,
                            onExtendClick,
                        }: sharedConfigTypes.Pass & { userRole: string, onExtendClick: () => void }) => {
    const navigate = useNavigate();
    const textSize = 'text-xl';

    const formattedStart = format(dateStart, 'd MMMM yyyy', { locale: ru });
    const formattedEnd = format(dateEnd, 'd MMMM yyyy', { locale: ru });

    const handleExtendClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        onExtendClick();
    };

    const handleRequestClick = (event: React.MouseEvent, requestId: string) => {
        event.stopPropagation();
        navigate(`/passes/${requestId}`);
    };

    return (
        <div className="flex flex-col w-full p-5 sm:pt-4 sm:p-4 sm:pb-4 bg-white rounded-3xl border-[1px] border-gray-300" onClick={() => navigate(`/passes/${id}`)}>
            <div className="flex justify-between">
                <div className="flex gap-3">
                    <p className={`flex gap-1 ${textSize} font-semibold`}>
                        Заявка
                        <span>#{id.split('-')[0]}</span>
                    </p>
                </div>
                <div
                    className={`flex flex-row font-semibold text-primary-tuftsBlue ${textSize} gap-4`}
                >
                    {userRole === 'student' && isAccepted && (
                        <button onClick={handleExtendClick}>Продлить</button>
                    )}
                    <p
                        className={`flex gap-1 ${isAccepted === null ? 'text-primary-orange' : isAccepted ? 'text-green-500' : 'text-red-500'}`}
                    >
                        {isAccepted === null
                            ? 'На рассмотрении'
                            : isAccepted
                                ? 'Принято'
                                : 'Отклонено'}
                    </p>
                </div>
            </div>
            {userRole !== 'student' &&
                <p className={`flex gap-1 ${textSize}`}>
                    ФИО:
                    <span>{user.fullName}</span>
                </p>
            }
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
                <div>
                    <p className="flex gap-1 text-lg text-primary-gray leading-[1.2]">
                        Запросы на продление:
                    </p>

                    {extendPassTimeRequests.map((request, index) => (
                        <p
                            className="ms-10 mt-1 flex text-lg rounded-3xl px-3 font-semibold justify-between border-b-2 p-0.5 transition-colors duration-300 hover:bg-gray-300 hover:cursor-pointer"
                            key={index}
                            onClick={(event) => handleRequestClick(event, id)}
                        >
                            До {format(request.dateEnd, 'd MMMM yyyy', {
                                locale: ru,
                            })}
                            <span
                                className={
                                    request.isAccepted === null
                                        ? 'text-primary-orange'
                                        : request.isAccepted
                                            ? 'text-green-500'
                                            : 'text-red-500'
                                }
                            >
                                {request.isAccepted === null
                                    ? 'На рассмотрении'
                                    : request.isAccepted
                                        ? 'Принято'
                                        : 'Отклонено'}
                            </span>
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};