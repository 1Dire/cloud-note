// src/components/SideBar.jsx
import React, { useEffect } from "react";
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

// 아이콘
import {
  FaHouse, FaLaptop, FaTag, FaBookOpen, FaCloud, FaSitemap, FaServer,
  FaGithub, FaArrowUpRightFromSquare, FaXmark,
} from "react-icons/fa6";
import { SiKubernetes ,SiThreedotjs} from "react-icons/si";
import {threeRoutes} from "../routes/threeRoutes.jsx";

const SideBar = ({ isOpen = false, onClose = () => {} }) => {
  const { pathname } = useLocation();
  const activeClass = "!text-white !bg-indigo-600 dark:!bg-sky-600";

  // 모바일에서 패널 열렸을 때만 문서 스크롤 잠금
  useEffect(() => {
    const el = document.documentElement;
    const prev = el.style.overflow;
    if (isOpen) el.style.overflow = "hidden";
    return () => { el.style.overflow = prev; };
  }, [isOpen]);

  const NavBlocks = (
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
        {/* Three.js */}
        <SidebarItemGroup>
            <SidebarCollapse icon={SiThreedotjs} label="Three.js">
                {threeRoutes.map(({ path, label }) => (
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
  );

  return (
    <>
      {/* 데스크톱: 좌측 고정 패널 */}
      <div className="hidden md:block w-64 shrink-0 h-[100dvh] sticky top-0
                      bg-white dark:bg-gray-800 shadow-xl z-30">
        <Sidebar aria-label="Sidebar Navigation" className="h-full">
          <Link
            to="/"
            className="px-4 py-6 flex items-center justify-center mb-6 gap-2 border-b border-gray-200 dark:border-gray-600"
          >
            <img src="/logo.png" alt="App Logo" className="w-10 h-10" />
            <span className="text-indigo-500 font-bold text-xl">Dire</span>
            <span className="text-sky-500 font-bold text-xl">Note</span>
          </Link>
          {NavBlocks}
        </Sidebar>
      </div>

      {/* 모바일: 오버레이 + 슬라이드 패널 */}
      <div className={`md:hidden fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}>
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}
          onClick={onClose}
        />
        {/* Panel */}
        <div
          className={`absolute left-0 top-0 h-[100dvh] w-72 bg-white dark:bg-gray-800 shadow-xl
                      flex flex-col transform transition-transform duration-200
                      ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
          role="dialog" aria-modal="true"
        >
          {/* Header */}
          <div className="shrink-0 px-4 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <Link to="/" onClick={onClose} className="flex items-center gap-2">
              <img src="/logo.png" alt="App Logo" className="w-10 h-10" />
              <div className="flex items-baseline gap-1">
                <span className="text-indigo-500 font-bold text-xl">Dire</span>
                <span className="text-sky-500 font-bold text-xl">Note</span>
              </div>
            </Link>
            <button
              onClick={onClose}
              aria-label="Close sidebar"
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaXmark />
            </button>
          </div>

          {/* Scrollable Nav */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            <Sidebar aria-label="Mobile Sidebar" className="w-full h-full">
              {NavBlocks}
            </Sidebar>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;