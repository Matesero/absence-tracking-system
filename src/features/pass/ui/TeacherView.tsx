import { useForm } from '../model'

import { convertDateFrom } from '~/shared/lib/dateConverter';

type Props = {
    id: string;
};

export const TeacherView = ({ id }: Props) => {
    const textSize = 'text-xl';
    const [data, downloadFile] = useForm(id);

    if (data === undefined) {
        return null;
    }

    return (
        <>
            <div className="flex gap-1">
                <p className={textSize}>ФИО:</p>
                <p className={textSize}>{data.user.fullName}</p>
            </div>
            <div className="flex gap-1">
                <p className={textSize}>Email:</p>
                <p className={textSize}>{data.user.email}</p>
            </div>
            <div className="flex gap-1">
                <p className={textSize}>Группа:</p>
                <p className={textSize}>{data.user.group.groupNumber}</p>
            </div>
            <div className="flex flex-col gap-1">
                <p className={textSize}>Файлы:</p>
                {data.minioFiles.map((minioFile) => (
                    <button
                        key={minioFile.id}
                        className={`${textSize} ml-4 self-start underline`}
                        onClick={async () => {
                            await downloadFile(minioFile.id, minioFile.name)
                        }}
                    >
                        {minioFile.name}
                    </button>
                ))}
            </div>
            <div className="flex gap-1">
                <p className={textSize}>С:</p>
                <p className={textSize}>{convertDateFrom(data.dateStart)}</p>
            </div>
            <div className="flex gap-1">
                <p className={textSize}>По:</p>
                <p className={textSize}>{convertDateFrom(data.dateEnd)}</p>
            </div>
            {data.message && (
                <div className="flex flex-col gap-4">
                    <p className={textSize}>Комментарий:</p>
                    <div
                        className="flex flex-col w-full p-5 sm:pt-4 sm:p-4 sm:pb-4 bg-white rounded-3xl border-[1px] border-gray-300"
                    >
                        <p className={textSize}>{data.message}</p>
                    </div>
                </div>
            )}
            {data.extendPassTimeRequests && (
                <div className="flex flex-col gap-4">
                    <p className={textSize}>Заявки на продление:</p>
                    {data.extendPassTimeRequests.map((extendPassTimeRequest) => (
                        <div
                            key={extendPassTimeRequest.id}
                            className={`${textSize} flex flex-col gap-4 ml-4 min-w-96 self-start p-5 sm:pt-4 sm:p-4 sm:pb-4 bg-white rounded-3xl border-[1px] border-gray-300`}
                        >
                            <div className='flex gap-1'>
                                <p>До:</p>
                                <p>{convertDateFrom(extendPassTimeRequest.dateEnd)}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className={textSize}>Файлы:</p>
                                {extendPassTimeRequest.minioFiles.map((minioFile) => (
                                    <button
                                        key={minioFile.id}
                                        className={`${textSize} ml-4 self-start underline`}
                                        onClick={async () => {
                                            await downloadFile(minioFile.id, minioFile.name)
                                        }}
                                    >
                                        {minioFile.name}
                                    </button>
                                ))}
                            </div>
                            <div className='flex gap-1'>
                                <p>Статус:</p>
                                <p className={textSize}>
                                    {extendPassTimeRequest.isAccepted === true ? (
                                        <>Принят</>
                                    ) : extendPassTimeRequest.isAccepted === false ? (
                                        <>Отклонен</>
                                    ) : (
                                        <>На рассмотрении</>
                                    )}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="flex gap-1">
                <p className={textSize}>Статус:</p>
                <p className={textSize}>
                    {data.isAccepted === true ? (
                        <>Принят</>
                    ) : data.isAccepted === false ? (
                        <>Отклонен</>
                    ) : (
                        <>На рассмотрении</>
                    )}
                </p>
            </div>
        </>
    )
}