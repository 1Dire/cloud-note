// src/components/SideBar.jsx
import React from "react";
import {
    Sidebar, SidebarItem, SidebarItemGroup, SidebarItems, SidebarCollapse,
} from "flowbite-react";
import {LuNotebookPen} from "react-icons/lu";
import {Link, useLocation} from "react-router-dom";
import {kubernetesRoutes} from "../routes/kubernetesRoutes.jsx";
import {FaHashtag} from "react-icons/fa6";
import {ecsRoutes} from "../routes/ecsRoutes.jsx";
import {IoIosCloudOutline} from "react-icons/io";
import {AiOutlineKubernetes} from "react-icons/ai";
import {GoBook} from "react-icons/go";
import {cloudeRoutes} from "../routes/cloudeRoutes.jsx";
import {planRoutes} from "../routes/planRoutes.jsx";

const SideBar = ({isOpen, onClose}) => {
    const {pathname} = useLocation();
    const activeClass = "!text-white !bg-indigo-600 dark:!bg-sky-600";

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
                    {/* 로고 */}
                    <div
                        className="px-4 py-6 flex items-center justify-center mb-6 gap-2 border-b border-gray-200 dark:border-gray-600">
                        <img src="/logo.png" alt="App Logo" className="w-15 h-15"/>
                        <span className="text-indigo-500 font-bold text-xl">Dire</span>
                        <span className="text-sky-500 font-bold text-xl">Note</span>
                    </div>

                    <SidebarItems>
                        <SidebarItemGroup>
                            <SidebarItem
                                as={Link}
                                to="/"
                                icon={() => <FaHashtag className={pathname === "/" ? "text-white" : ""}/>}
                                className={`custom-sidebar-item ${pathname === "/" ? activeClass : ""}`}
                                onClick={onClose}
                            >
                                Tag
                            </SidebarItem>
                        </SidebarItemGroup>

                        <SidebarItemGroup>
                            <SidebarCollapse icon={LuNotebookPen} label="Plan">
                                {planRoutes.map(({path, label}) => (<SidebarItem
                                        key={path}
                                        as={Link}
                                        to={path}
                                        className={`custom-sidebar-item ${pathname === path ? activeClass : ""}`}
                                        onClick={onClose}
                                    >
                                        {label}
                                    </SidebarItem>))}
                            </SidebarCollapse>
                        </SidebarItemGroup>

                        <SidebarItemGroup>
                            <SidebarCollapse icon={IoIosCloudOutline} label="Cloud">
                                {cloudeRoutes.map(({path, label}) => (<SidebarItem
                                        key={path}
                                        as={Link}
                                        to={path}
                                        className={`custom-sidebar-item ${pathname === path ? activeClass : ""}`}
                                        onClick={onClose}
                                    >
                                        {label}
                                    </SidebarItem>))}
                            </SidebarCollapse>
                        </SidebarItemGroup>

                        <SidebarItemGroup>
                            <SidebarCollapse icon={AiOutlineKubernetes} label="Kubernetes">
                                {kubernetesRoutes.map(({path, label}) => (<SidebarItem
                                        key={path}
                                        as={Link}
                                        to={path}
                                        className={`custom-sidebar-item ${pathname === path ? activeClass : ""}`}
                                        onClick={onClose}
                                    >
                                        {label}
                                    </SidebarItem>))}
                            </SidebarCollapse>
                        </SidebarItemGroup>

                        <SidebarItemGroup>
                            <SidebarCollapse icon={GoBook} label="ESC 배포">
                                {ecsRoutes.map(({path, label}) => (<SidebarItem
                                        key={path}
                                        as={Link}
                                        to={path}
                                        className={`custom-sidebar-item ${pathname === path ? activeClass : ""}`}
                                        onClick={onClose}
                                    >
                                        {label}
                                    </SidebarItem>))}
                            </SidebarCollapse>
                        </SidebarItemGroup>
                    </SidebarItems>
                </Sidebar>
            </div>
        </>);
};

export default SideBar;