import React, { useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Sidebar = (props) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = () => {
        Cookies.remove('token'); // Remove the token from cookies
        navigate('/login'); // Redirect to the login page
    };

    const navigation = [
        {
            href: '/manage-posts',
            name: 'Posts',
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
        }
    ];

    const navsFooter = [
        {
            href: 'javascript:void(0)',
            name: 'Logout',
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>,
            action: handleLogout
        }
    ];

    return (
        <>
            {/* Mobile menu button */}
            <button onClick={toggleSidebar} className="sm:hidden fixed top-4 left-4 z-20 bg-gray-100 p-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>

            {/* Sidebar */}
            <nav
                className={`fixed top-0 left-0 w-64 h-full bg-white border-r shadow-lg transform duration-200 z-10 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } sm:translate-x-0`}
            >
                <div className="flex flex-col h-full">
                    <div className="h-20 flex items-center px-8">
                        <a href="javascript:void(0)" className="flex-none">
                            <img src="https://floatui.com/logo.svg" width={140} className="mx-auto" alt="Logo" />
                        </a>
                    </div>
                    <div className="flex-1 flex flex-col h-full overflow-auto">
                        <ul className="px-4 text-sm font-medium flex-1">
                            {navigation.map((item, idx) => (
                                <li key={idx}>
                                    <a href={item.href} className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 duration-150">
                                        <div className="text-gray-500">{item.icon}</div>
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div>
                            <ul className="px-4 pb-4 text-sm font-medium">
                                {navsFooter.map((item, idx) => (
                                    <li key={idx}>
                                        <button onClick={item.action} className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 duration-150">
                                            <div className="text-gray-500">{item.icon}</div>
                                            {item.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <div className="py-4 px-4 border-t">
                                <div className="flex items-center gap-x-4">
                                    <img src="https://randomuser.me/api/portraits/women/79.jpg" className="w-12 h-12 rounded-full" alt="User profile" />
                                    <div>
                                        <span className="block text-gray-700 text-sm font-semibold">Alivika Tony</span>
                                        <a href="javascript:void(0)" className="block mt-px text-gray-600 hover:text-indigo-600 text-xs">
                                            View profile
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main content */}
            <div className={`sm:ml-64 p-4 ${isSidebarOpen ? 'ml-64' : ''}`}>
                {props.childComponent}
            </div>
        </>
    );
};

export default Sidebar;