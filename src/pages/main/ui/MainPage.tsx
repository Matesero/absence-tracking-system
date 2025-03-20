import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { absenceEntity } from '~/entities';
import { filtrationFeature, creationFeature } from '~/features';
import { useForm } from '~/features/filtration/model';
import { getProfile } from '~/shared/api/absenceSystem/user';
import { sharedConfigTypes } from '~/shared/config';
import { RouteName } from '~/shared/config/router';
import { useAppDispatch } from '~/shared/store';
import { userSlice } from '~/shared/store';
import { Loading } from '~/shared/ui';

const { selectors } = userSlice;
const { AbsencesFilter } = filtrationFeature.ui;
const { rolesMapper } = filtrationFeature.model;
const { CreationForm, ExtendingForm } = creationFeature.ui;
const { Absence } = absenceEntity.ui;

export const MainPage = () => {
    const user = useSelector(selectors.user);
    const isAuth = useSelector(selectors.isAuth);
    const isLoading = useSelector(selectors.isLoading);
    const navigate = useNavigate();
    const appDispatch = useAppDispatch();
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [passExtended, setPassExtended] = useState<sharedConfigTypes.Pass | undefined>(undefined)
    const formRef = useRef<HTMLFormElement>(null);
    const [, absences, errors, groups, onSubmit] = useForm('absences');

    useEffect(() => {
        const fetchProfile = async () => {
            await appDispatch(getProfile());
        };

        if (isAuth && !user) {
            fetchProfile();
        }
    }, []);

    const handleRegisterClick = useCallback(() => {
        navigate(RouteName.REGISTRATION_PAGE);
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    const handeFetchAbsences = () => {
        formRef.current.requestSubmit();
    };

    return (
        <div
            className={`flex flex-col gap-3 w-full sm:w-4/5 3xl:max-w-screen-full p-5 sm:pt-4 sm:p-4 sm:pb-4 items-center ${isAuth && 'self-start'}`}
        >
            {!isAuth ? (
                <>
                    <h1 className="text-4xl font-bold text-primary-darkSea">
                        Добро пожаловать в систему пропусков ТГУ
                    </h1>
                    <span>
                        Еще нет аккаунта?{' '}
                        <a
                            onClick={handleRegisterClick}
                            className="text-primary-tuftsBlue text-lg hover:underline cursor-pointer"
                        >
                            Зарегистрироваться
                        </a>
                    </span>
                </>
            ) : (
                <>
                    {isCreating && user?.role === 'student' && (
                        <CreationForm
                            handleFetchAbsences={handeFetchAbsences}
                            onCancelClick={() => setIsCreating(false)}
                        />
                    )}

                    {passExtended && user?.role === 'student' && (
                        <ExtendingForm
                            handleFetchAbsences={handeFetchAbsences}
                            onCancelClick={() => setPassExtended(undefined)}
                            absence={passExtended}
                        />
                    )}

                    <AbsencesFilter
                        ref={formRef}
                        errors={errors}
                        groups={groups}
                        onSubmit={onSubmit}
                        userRole={user?.role}
                        onCreatingClick={() => setIsCreating(true)}
                    />
                    {absences?.map((absence) => (
                        <Absence
                            {...absence}
                            userRole={rolesMapper.mapRoleFrom(
                                absence.user.role,
                            )}
                            onExtendClick={() => setPassExtended(absence)}
                            key={absence.id}
                        />
                    ))}
                </>
            )}
        </div>
    );
};
