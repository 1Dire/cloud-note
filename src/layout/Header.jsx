import React from "react";
import { AiOutlineMenu } from "react-icons/ai";

const Header = ({ setSidebarOpen }) => {
    return (
        <header className="h-16 md:hidden flex items-center px-4 bg-white dark:bg-gray-900 dark:text-white shadow-sm border-b">
            <button
                className="text-2xl text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors"
                onClick={() => setSidebarOpen(true)}
                aria-label="Toggle sidebar"
            >
                <AiOutlineMenu />
            </button>
        </header>
    );
};

export default Header;
