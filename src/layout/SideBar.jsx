import React from "react";
import {
    Sidebar, SidebarItem, SidebarItemGroup, SidebarItems,
} from "flowbite-react";
import {
    HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards,
} from "react-icons/hi";

const SideBar = ({isOpen, onClose}) => {
    return (<>
        {/* 모바일 오버레이 */}
        <div
            className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity ${isOpen ? "block" : "hidden"}`}
            onClick={onClose}
        />

        {/* 사이드바 */}
        <div
            className={`fixed top-0 left-0 z-50 min-h-screen w-64 transition-transform transform
        bg-white dark:bg-gray-800
        shadow-xl
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:block`}
        >
            <Sidebar aria-label="Sidebar Navigation" className="h-full">
                {/* 로고 섹션 */}
                <div
                    className="px-4 py-6 flex items-center justify-center mb-6 gap-2 border-b border-gray-200 dark:border-gray-600">
                    <img src="/logo.png" alt="App Logo" className="w-8 h-8"/>
                    <span className="text-indigo-500 font-bold text-xl">Dire</span>
                    <span className="text-sky-500 font-bold text-xl">Note</span>
                </div>

                {/* 메뉴 목록 */}
                <SidebarItems>
                    <SidebarItemGroup>
                        <SidebarItem href="#" icon={HiChartPie}>Dashboard</SidebarItem>

                    </SidebarItemGroup>
                    <SidebarItemGroup>

                    </SidebarItemGroup>
                </SidebarItems>
            </Sidebar>
        </div>
    </>);
};

export default SideBar;
