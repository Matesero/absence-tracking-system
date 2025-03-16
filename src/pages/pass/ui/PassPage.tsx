import { useSelector } from 'react-redux';

import { TeacherUi } from './TeacherUi';

import { userSlice } from '~/shared/store';

const { selectors } = userSlice;

export const PassPage = () => {
    const user = useSelector(selectors.user);

    return (
        <div
            className="flex flex-col gap-3 w-full sm:w-4/5 3xl:max-w-screen-full p-5 sm:pt-4 sm:p-4 sm:pb-4 items-center self-start"
        >
            <div className="rounded-3xl w-full border-[1px] border-gray-300 drop-shadow-lg self-start mt-2">
                <div className="bg-primary-gray p-2 pl-4 rounded-t-lg text-white font-semibold">
                    Пропуск
                </div>
                <div className="bg-white p-4 rounded-b-lg shadow-md flex flex-col gap-4">
                    {user?.role === 'teacher' && (
                        <TeacherUi />
                    )}
                </div>
            </div>
        </div>
    )
}