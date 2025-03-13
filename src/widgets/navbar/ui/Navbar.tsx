import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout } from '~/shared/api/absenceSystem/user';
import TSUIcon from '~/shared/assets/images/TSU.svg';
import { sharedConfigRouter } from '~/shared/config';
import { useAppDispatch, userSlice } from '~/shared/store';

const { RouteName } = sharedConfigRouter;
const { selectors } = userSlice;

export const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
    const addDispatch = useAppDispatch();
    const user = useSelector(selectors.user);

    const handleLoginClick = () => navigate(RouteName.LOGIN_PAGE);
    const handleProfileClick = () => navigate(RouteName.PROFILE_PAGE);
    const handleLogoutClick = () => addDispatch(logout());

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                isDropdownOpen
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ ]);

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
                                {!user ? (
                                    <a
                                        onClick={handleLoginClick}
                                        className="cursor-pointer font-semibold"
                                    >
                                        Войти
                                    </a>
                                ) : (
                                    <div
                                        className="relative hidden lg:block"
                                        ref={dropdownRef}
                                    >
                                        <button
                                            onClick={() =>
                                                setIsDropdownOpen(prevState => !prevState)
                                            }
                                            className="text-white text-2xl font-semibold"
                                        >
                                            {user?.fullName}
                                        </button>
                                        {isDropdownOpen && (
                                            <ul className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white text-black rounded-custom shadow-lg z-20 w-40">
                                                <li>
                                                    <a
                                                        onClick={handleProfileClick}
                                                        className="block text-xl text-center w-full px-6 py-3 rounded-t-custom text-black hover:bg-gray-200 cursor-pointer"
                                                    >
                                                        Профиль
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        onClick={handleLogoutClick}
                                                        className="block text-xl text-center w-full px-6 py-3 rounded-b-custom text-black hover:bg-gray-200 cursor-pointer"
                                                    >
                                                        Выход
                                                    </a>
                                                </li>
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
