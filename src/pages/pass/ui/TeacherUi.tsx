export const TeacherUi = () => {
    const textSize = 'text-xl';

    return (
        <>
            <div className="flex gap-1">
                <p className={textSize}>ФИО:</p>
                <p className={textSize}>Иванов Иван Иванович</p>
            </div>
            <div className="flex gap-1">
                <p className={textSize}>Группа:</p>
                <p className={textSize}>972303</p>
            </div>
            <div className="flex gap-1">
                <p className={textSize}>Файлы:</p>
                <p className={textSize}>file.pdf</p>
            </div>
            <div className="flex gap-1">
                <p className={textSize}>С:</p>
                <p className={textSize}>14.03.2025</p>
            </div>
            <div className="flex gap-1">
                <p className={textSize}>По:</p>
                <p className={textSize}>15.03.2025</p>
            </div>
            <div className="flex flex-col gap-4">
                <p className={textSize}>Комментарий:</p>
                <div
                    className="flex flex-col w-full p-5 sm:pt-4 sm:p-4 sm:pb-4 bg-white rounded-3xl border-[1px] border-gray-300"
                >
                    <p className={textSize}>Извините, я больше так не буду</p>
                </div>
            </div>
            <div className="flex gap-1">
                <p className={textSize}>Статус:</p>
                <p className={textSize}>На рассмотрении</p>
            </div>
        </>
    )
}