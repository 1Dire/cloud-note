import React from "react";
import {
    Sidebar,
    SidebarItem,
    SidebarItemGroup,
    SidebarItems,
    SidebarCollapse,
} from "flowbite-react";
import {
    HiArrowSmRight,
    HiChartPie,
    HiInbox,
    HiShoppingBag,
    HiTable,
    HiUser,
    HiViewBoards,
} from "react-icons/hi";

import {IoMdPricetag} from "react-icons/io";
import {Link} from "react-router-dom";
import {LuNotebookPen} from "react-icons/lu";
import {FaPenClip} from "react-icons/fa6";

const SideBar = ({isOpen, onClose}) => {
    return (
        <>
            {/* 모바일 오버레이 */}
            <div
                className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity ${
                    isOpen ? "block" : "hidden"
                }`}
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
                    <div
                        className="px-4 py-6 flex items-center justify-center mb-6 gap-2 border-b border-gray-200 dark:border-gray-600">
                        <img src="/logo.png" alt="App Logo" className="w-15 h-15"/>
                        <span className="text-indigo-500 font-bold text-xl">Dire</span>
                        <span className="text-sky-500 font-bold text-xl">Note</span>
                    </div>

                    {/* 메뉴 목록 */}
                    <SidebarItems>
                        <SidebarItemGroup>
                            <SidebarItem as={Link} to="/" icon={IoMdPricetag}>
                                Tag
                            </SidebarItem>
                        </SidebarItemGroup>

                        <SidebarItemGroup>
                            <SidebarCollapse icon={LuNotebookPen} label="Plan">
                                <SidebarItem as={Link} to="/day1">
                                    Day 1
                                </SidebarItem>
                                <SidebarItem as={Link} to="/day2">
                                    Day 2
                                </SidebarItem>
                            </SidebarCollapse>
                        </SidebarItemGroup>

                        <SidebarItemGroup>
                            <SidebarCollapse icon={FaPenClip} label="Note">
                                <SidebarItem as={Link} to="/whatIsCloud">
                                    클라우드란 무엇인가?
                                </SidebarItem>
                                <SidebarItem as={Link} to="/createEC2">
                                    EC2 인스턴스 생성
                                </SidebarItem>
                            </SidebarCollapse>
                        </SidebarItemGroup>
                    </SidebarItems>
                </Sidebar>
            </div>
        </>
    );
};

export default SideBar;
