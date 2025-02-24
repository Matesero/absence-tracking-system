import React from 'react';
import { useNavigate } from 'react-router-dom';

import TSUIcon from '~/shared/assets/images/TSU.svg';
import { sharedConfigRouter } from '~/shared/config';

const { RouteName } = sharedConfigRouter;

export const Navbar = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => navigate({ pathname: RouteName.LOGIN_PAGE });

    return (
        <nav>
            <div className="mx-auto bg-primary-tuftsBlue">
                <div className="flex mx-auto justify-between w-11/12">
                    <div className="flex items-center gap-16 my-2">
                        <div className="flex gap-4 items-center">
                            <img
                                src={TSUIcon}
                                className="h-14 w-14"
                                alt="scullIcon"
                            />
                            <span className="text-white hidden xl:block text-2xl font-semibold">
                                Пропуски ТГУ
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="hidden xs:flex items-center gap-10">
                            <div className="text-white text-2xl">
                                <a
                                    onClick={handleLoginClick}
                                    className="cursor-pointer font-semibold"
                                >
                                    Войти
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
