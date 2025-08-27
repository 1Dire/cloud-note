// src/components/SideBar.jsx
import React from "react";
import {
    Sidebar, SidebarItem, SidebarItemGroup, SidebarItems, SidebarCollapse,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";

// 라우트들
import { kubernetesRoutes } from "../routes/kubernetesRoutes.jsx";
import { ecsRoutes } from "../routes/ecsRoutes.jsx";
import { cloudeRoutes } from "../routes/cloudeRoutes.jsx";
import { planRoutes } from "../routes/planRoutes.jsx";
import { gitActionRoutes } from "../routes/gitActionRoutes.jsx";

// 아이콘은 fa6로 통일
import {
    FaHouse,
    FaLaptop,
    FaTag,
    FaBookOpen,
    FaCloud,
    FaSitemap,
    FaServer,
    FaGithub,
    FaArrowUpRightFromSquare,
} from "react-icons/fa6";
import { SiKubernetes } from "react-icons/si";
const SideBar = ({ isOpen, onClose }) => {
    const { pathname } = useLocation();
    const activeClass = "!text-white !bg-indigo-600 dark:!bg-sky-600";

    return (
        <>
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
                    {/* 로고 (홈으로 이동) */}
                    <Link
                        to="/"
                        onClick={onClose}
                        className="px-4 py-6 flex items-center justify-center mb-6 gap-2 border-b border-gray-200 dark:border-gray-600"
                    >
                        <img src="/logo.png" alt="App Logo" className="w-15 h-15" />
                        <span className="text-indigo-500 font-bold text-xl">Dire</span>
                        <span className="text-sky-500 font-bold text-xl">Note</span>
                    </Link>

                    <SidebarItems>
                        {/* 홈 */}
                        <SidebarItemGroup>
                            <SidebarItem
                                as={Link}
                                to="/"
                                icon={() => <FaHouse className={pathname === "/" ? "text-white" : ""} />}
                                className={`custom-sidebar-item ${pathname === "/" ? activeClass : ""}`}
                                onClick={onClose}
                            >
                                Home
                            </SidebarItem>
                        </SidebarItemGroup>

                        {/* 외부 포트폴리오 */}
                        <SidebarItemGroup>
                            <SidebarItem
                                as="a"
                                href="https://1dire.github.io/Main/"
                                target="_blank"
                                rel="noopener noreferrer"
                                icon={() => <FaLaptop />}
                                onClick={onClose}
                            >
                <span className="flex items-center gap-2">
                  포트폴리오
                  <FaArrowUpRightFromSquare className="text-xs opacity-70" />
                </span>
                            </SidebarItem>
                        </SidebarItemGroup>

                        {/* 태그 */}
                        <SidebarItemGroup>
                            <SidebarItem
                                as={Link}
                                to="/tag"
                                icon={() => <FaTag className={pathname === "/tag" ? "text-white" : ""} />}
                                className={`custom-sidebar-item ${pathname === "/tag" ? activeClass : ""}`}
                                onClick={onClose}
                            >
                                Tag
                            </SidebarItem>
                        </SidebarItemGroup>

                        {/* Plan */}
                        <SidebarItemGroup>
                            <SidebarCollapse icon={FaBookOpen} label="Plan">
                                {planRoutes.map(({ path, label }) => (
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

                        {/* Cloud */}
                        <SidebarItemGroup>
                            <SidebarCollapse icon={FaCloud} label="Cloud">
                                {cloudeRoutes.map(({ path, label }) => (
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

                        {/* Kubernetes */}
                        <SidebarItemGroup>
                            <SidebarCollapse icon={SiKubernetes} label="Kubernetes">
                                {kubernetesRoutes.map(({ path, label }) => (
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

                        {/* ECS 배포 */}
                        <SidebarItemGroup>
                            <SidebarCollapse icon={FaServer} label="ECS 배포">
                                {ecsRoutes.map(({ path, label }) => (
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

                        {/* GitHub Actions */}
                        <SidebarItemGroup>
                            <SidebarCollapse icon={FaGithub} label="gitAction">
                                {gitActionRoutes.map(({ path, label }) => (
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