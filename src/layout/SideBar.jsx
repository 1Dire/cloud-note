// src/components/SideBar.jsx
import React from "react";
import {
    Sidebar,
    SidebarItem,
    SidebarItemGroup,
    SidebarItems,
    SidebarCollapse,
} from "flowbite-react";
import {IoMdPricetag} from "react-icons/io";
import {LuNotebookPen} from "react-icons/lu";
import {FaPenClip, FaBook} from "react-icons/fa6";
import {Link, useLocation} from "react-router-dom";
import {noteRoutes} from "../routes/noteRoutes.jsx";
import {blogRoutes} from "../routes/blogRoutes.jsx";

const SideBar = ({isOpen, onClose}) => {
    const {pathname} = useLocation();
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
                        <img src="/logo.png" alt="App Logo" className="w-15 h-15"/>
                        <span className="text-indigo-500 font-bold text-xl">Dire</span>
                        <span className="text-sky-500 font-bold text-xl">Note</span>
                    </div>

                    <SidebarItems>
                        <SidebarItemGroup>
                            <SidebarItem
                                as={Link}
                                to="/"
                                icon={() => <IoMdPricetag className={pathname === "/" ? "text-white" : ""}/>}
                                className={`custom-sidebar-item ${pathname === "/" ? activeClass : ""}`}
                                onClick={onClose}
                            >
                                Tag
                            </SidebarItem>
                        </SidebarItemGroup>

                        <SidebarItemGroup>
                            <SidebarCollapse icon={LuNotebookPen} label="Plan">
                                {["day1", "day2", "day3", "day4", "day5", "day6", "day7"].map(day => (
                                    <SidebarItem
                                        key={day}
                                        as={Link}
                                        to={`/${day}`}
                                        className={`custom-sidebar-item ${pathname === `/${day}` ? activeClass : ""}`}
                                        onClick={onClose}
                                    >
                                        {`Day ${day.replace("day", "")}`}
                                    </SidebarItem>
                                ))}
                            </SidebarCollapse>
                        </SidebarItemGroup>

                        <SidebarItemGroup>
                            <SidebarCollapse icon={FaPenClip} label="Note">
                                {noteRoutes.map(({path, label}) => (
                                    <SidebarItem
                                        key={path}
                                        as={Link}
                                        to={path}
                                        className={`custom-sidebar-item ${pathname === path ? activeClass : ""}`}
                                        onClick={onClose}
                                    >
                                        {label}
                                    </SidebarItem>
                                ))}
                            </SidebarCollapse>
                        </SidebarItemGroup>

                        <SidebarItemGroup>
                            <SidebarCollapse icon={FaBook} label="Blog">
                                {blogRoutes.map(({path, label}) => (
                                    <SidebarItem
                                        key={path}
                                        as={Link}
                                        to={path}
                                        className={`custom-sidebar-item ${pathname === path ? activeClass : ""}`}
                                        onClick={onClose}
                                    >
                                        {label}
                                    </SidebarItem>
                                ))}
                            </SidebarCollapse>
                        </SidebarItemGroup>
                    </SidebarItems>
                </Sidebar>
            </div>
        </>
    );
};

export default SideBar;