import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { widgetNavbarUi } from '~/widgets/navbar';
const { Navbar } = widgetNavbarUi;

export const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex items-center justify-center flex-grow">
                <Outlet />
            </div>
            <ToastContainer />
        </div>
    );
};
