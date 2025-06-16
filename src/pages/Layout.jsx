import React, {useEffect, useState} from 'react';
import SideBar from "../layout/SideBar.jsx";
import Header from "../layout/Header.jsx";
import Contents from "../layout/Contents.jsx";
import {FloatingDarkModeToggle} from "../components/FloatingDarkModeToggle.jsx";

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const root = window.document.documentElement;
        darkMode ? root.classList.add("dark") : root.classList.remove("dark");
    }, [darkMode]);
    return (
        <div className="flex h-full min-h-screen bg-gray-100 dark:bg-gray-800">
            <SideBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}/>
            <div className="flex-1 flex flex-col relative">
                <Header setSidebarOpen={setSidebarOpen}/>
                <Contents/>
            </div>
            <FloatingDarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode}/>
        </div>
    );
}

export default Layout;
