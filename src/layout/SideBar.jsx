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

import { IoMdPricetag } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { LuNotebookPen } from "react-icons/lu";
import { FaPenClip } from "react-icons/fa6";

const SideBar = ({ isOpen, onClose }) => {
    const { pathname } = useLocation();

    const activeClass = "!text-white !bg-indigo-600 dark:!bg-sky-600";

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
                    {/* 로고 */}
                    <div className="px-4 py-6 flex items-center justify-center mb-6 gap-2 border-b border-gray-200 dark:border-gray-600">
                        <img src="/logo.png" alt="App Logo" className="w-15 h-15" />
                        <span className="text-indigo-500 font-bold text-xl">Dire</span>
                        <span className="text-sky-500 font-bold text-xl">Note</span>
                    </div>

                    <SidebarItems>
                        <SidebarItemGroup>
                            <SidebarItem
                                as={Link}
                                to="/"
                                icon={IoMdPricetag}
                                className={pathname === "/" ? activeClass : ""}
                                onClick={onClose}
                            >
                                Tag
                            </SidebarItem>
                        </SidebarItemGroup>

                        <SidebarItemGroup>
                            <SidebarCollapse icon={LuNotebookPen} label="Plan">
                                <SidebarItem
                                    as={Link}
                                    to="/day1"
                                    className={pathname === "/day1" ? activeClass : ""}
                                    onClick={onClose}
                                >
                                    Day 1
                                </SidebarItem>
                                <SidebarItem
                                    as={Link}
                                    to="/day2"
                                    className={pathname === "/day2" ? activeClass : ""}
                                    onClick={onClose}
                                >
                                    Day 2
                                </SidebarItem>
                                <SidebarItem
                                    as={Link}
                                    to="/day3"
                                    className={pathname === "/day3" ? activeClass : ""}
                                    onClick={onClose}
                                >
                                    Day 3
                                </SidebarItem>
                            </SidebarCollapse>
                        </SidebarItemGroup>

                        <SidebarItemGroup>
                            <SidebarCollapse icon={FaPenClip} label="Note">
                                <SidebarItem
                                    as={Link}
                                    to="/whatIsCloud"
                                    className={pathname === "/whatIsCloud" ? activeClass : ""}
                                    onClick={onClose}
                                >
                                    클라우드란 무엇인가?
                                </SidebarItem>
                                <SidebarItem
                                    as={Link}
                                    to="/createEC2"
                                    className={pathname === "/createEC2" ? activeClass : ""}
                                    onClick={onClose}
                                >
                                    EC2 인스턴스 생성
                                </SidebarItem>
                                <SidebarItem
                                    as={Link}
                                    to="/sshConection"
                                    className={pathname === "/sshConection" ? activeClass : ""}
                                    onClick={onClose}
                                >
                                    SSH 접속
                                </SidebarItem>
                                <SidebarItem
                                    as={Link}
                                    to="/createRDS"
                                    className={pathname === "/createRDS" ? activeClass : ""}
                                    onClick={onClose}
                                >
                                    RDS 인스턴스 생성
                                </SidebarItem>
                                <SidebarItem
                                    as={Link}
                                    to="/rdsConection"
                                    className={pathname === "/rdsConection" ? activeClass : ""}
                                    onClick={onClose}
                                >
                                    RDS 인스턴스 연결
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
