import { useForm } from '../model'

import { absenceSystemApi } from '~/shared/api';
import { convertDateFrom } from '~/shared/lib/dateConverter';

const file = absenceSystemApi.file;

type Props = {
    id: string;
};

export const TeacherView = ({ id }: Props) => {
    const textSize = 'text-xl';
    const data = useForm(id);

    const downloadFile = async (fileId: string, fileName : string) => {
        const response = await file.downloadFile(
            {
                requestId: id,
                fileId,
            }
        );

        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();

        URL.revokeObjectURL(url);
        document.body.removeChild(link);
    };

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
            <div className="flex gap-1">
                <p className={textSize}>Статус:</p>
                <p className={textSize}>
                    {data.isAccepted && (
                        <>Принят</>
                    )} : <>На рассмотрении</>
                </p>
            </div>
        </>
    )
}