import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout } from '~/shared/api/absenceSystem/user';
import BarsIcon from '~/shared/assets/images/Bars.svg';
import TSUIcon from '~/shared/assets/images/TSU.svg';
import { sharedConfigRouter } from '~/shared/config';
import { useAppDispatch, userSlice } from '~/shared/store';

const { RouteName } = sharedConfigRouter;
const { selectors } = userSlice;

export const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const sidebarRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
    const addDispatch = useAppDispatch();
    const user = useSelector(selectors.user);

    const handleLoginClick = () => navigate(RouteName.LOGIN_PAGE);
    const handleProfileClick = () => navigate(RouteName.PROFILE_PAGE);
    const handleHomeClick = () => navigate(RouteName.MAIN_PAGE);
    const handleUsersClick = () => navigate(RouteName.USERS_LIST_PAGE);
    const handleReportClick = () => navigate(RouteName.REPORT_PAGE);
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

            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node) &&
                isSidebarOpen
            ) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    });

    return (
        <nav>
            <div className="mx-auto bg-primary-tuftsBlue">
                <div className="flex mx-auto justify-between w-11/12">
                    <div className="flex items-center gap-7 my-2">
                        <div className="flex gap-4 items-center hover:cursor-pointer" onClick={handleHomeClick}>
                            <img
                                src={TSUIcon}
                                className="h-14 w-14"
                                alt="TsuIcon"
                            />
                            <span className="text-white hidden xl:block text-2xl font-semibold">
                                Пропуски ТГУ
                            </span>
                        </div>
                        <a className="text-white hidden lg:block text-xl ms-2 font-semibold hover:cursor-pointer" onClick={handleHomeClick}>
                            Пропуски
                        </a>
                        {user?.role !== 'student' &&
                            <>
                                <a className="text-white hidden lg:block text-xl ms-2 font-semibold hover:cursor-pointer"
                                   onClick={handleUsersClick}>
                                    Пользователи
                                </a>
                                <a className="text-white hidden lg:block text-xl font-semibold hover:cursor-pointer"
                                   onClick={handleReportClick}>
                                    Отчёт
                                </a>
                            </>
                        }
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
                                                setIsDropdownOpen(
                                                    (prevState) => !prevState,
                                                )
                                            }
                                            className="text-white text-2xl font-semibold"
                                        >
                                            {user?.fullName}
                                        </button>
                                        {isDropdownOpen && (
                                            <ul className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white text-black rounded-custom shadow-lg z-20 w-40">
                                                <li>
                                                    <a
                                                        onClick={
                                                            handleProfileClick
                                                        }
                                                        className="block text-xl text-center w-full px-6 py-3 rounded-t-custom text-black hover:bg-gray-200 cursor-pointer"
                                                    >
                                                        Профиль
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        onClick={
                                                            handleLogoutClick
                                                        }
                                                        className="block text-xl text-center w-full px-6 py-3 rounded-b-custom text-black hover:bg-gray-200 cursor-pointer"
                                                    >
                                                        Выход
                                                    </a>
                                                </li>
                                            </ul>
                                        )}
                                    </div>
                                )}
                            {isSidebarOpen && (
                                <div
                                    ref={sidebarRef}
                                    className="fixed lg:hidden top-0 right-0 h-screen w-56 bg-white bg-opacity-35 backdrop-blur-xl shadow-lg z-50 flex flex-col"
                                >
                                    <button
                                        onClick={() => setIsSidebarOpen(false)}
                                        className="p-8 pb-2 self-end"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="40"
                                            viewBox="0 96 960 960"
                                            width="40"
                                            fill="black"
                                        >
                                            <path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
                                        </svg>
                                    </button>
                                    <ul className="flex flex-col w-full mt-4">
                                        <li>
                                            <a
                                                onClick={handleProfileClick}
                                                className="block w-full px-6 py-3 text-black hover:bg-gray-200 cursor-pointer"
                                            >
                                                Профиль
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                onClick={handleHomeClick}
                                                className="block w-full px-6 py-3 text-black hover:bg-gray-200 cursor-pointer"
                                            >
                                                Пропуски
                                            </a>
                                        </li>
                                        {user?.role !== 'student' &&
                                            <>
                                                <li>
                                                    <a
                                                        onClick={handleUsersClick}
                                                        className="block w-full px-6 py-3 text-black hover:bg-gray-200 cursor-pointer"
                                                    >
                                                        Пользователи
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        onClick={handleReportClick}
                                                        className="block w-full px-6 py-3 text-black hover:bg-gray-200 cursor-pointer"
                                                    >
                                                        Отчёт
                                                    </a>
                                                </li>
                                            </>
                                        }
                                        <li>
                                            <a
                                                onClick={handleLogoutClick}
                                                className="block w-full px-6 py-3 text-black hover:bg-gray-200 cursor-pointer"
                                            >
                                                Выход
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            )}

                                {user && (
                                    <div className="lg:hidden flex items-center">
                                        <button
                                            onClick={() =>
                                                setIsSidebarOpen((prevState) => !prevState)
                                            }
                                        >
                                            <img
                                                src={BarsIcon}
                                                className="h-6"
                                                alt="TsuIcon"
                                            />
                                        </button>
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
