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
import {Link, useLocation} from "react-router-dom";
import {LuNotebookPen} from "react-icons/lu";
import {FaPenClip} from "react-icons/fa6";
import KubernetesAdvancedDemo from "../pages/note/KubernetesAdvancedDemo.jsx";
import ReplicationControllerDemo from "../pages/note/ReplicationControllerDemo.jsx";
import PodStatus from "../pages/note/PodStatus.jsx";
import PodLifecycle from "../pages/note/PodLifecycle.jsx";
import Secret from "../pages/note/Secret.jsx";
import WordPressDemo from "../pages/note/WordPressDemo.jsx";
import KubernetesDashboard from "../pages/note/KubernetesDashboard.jsx";

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
                                icon={() => <IoMdPricetag className={pathname === "/" ? "text-white" : ""}/>}
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
                                <SidebarItem
                                    as={Link}
                                    to="/day4"
                                    className={pathname === "/day4" ? activeClass : ""}
                                    onClick={onClose}
                                >
                                    Day 4
                                </SidebarItem>
                                <SidebarItem
                                    as={Link}
                                    to="/day5"
                                    className={pathname === "/day5" ? activeClass : ""}
                                    onClick={onClose}
                                >
                                    Day 5
                                </SidebarItem>
                                <SidebarItem
                                    as={Link}
                                    to="/day6"
                                    className={pathname === "/day6" ? activeClass : ""}
                                    onClick={onClose}
                                >
                                    Day 6
                                </SidebarItem>
                                <SidebarItem
                                    as={Link}
                                    to="/day7"
                                    className={pathname === "/day7" ? activeClass : ""}
                                    onClick={onClose}
                                >
                                    Day 7
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
                                <SidebarItem
                                    as={Link}
                                    to="/whatIsDocker"
                                    className={pathname === "/whatIsDocker" ? activeClass : ""}
                                    onClick={onClose}
                                >
                                    도커란 무엇인가?
                                </SidebarItem>
                                <SidebarItem
                                    as={Link}
                                    to="/whatIsKubernetes"
                                    className={pathname === "/whatIsKubernetes" ? activeClass : ""}
                                    onClick={onClose}
                                >
                                    쿠버네티스란 무엇인가?
                                </SidebarItem>
                                <SidebarItem
                                    as={Link}
                                    to="/podAndService"
                                    className={pathname === "/podAndService" ? activeClass : ""}
                                    onClick={onClose}
                                >
                                    쿠버네티스의 파드와 서비스
                                </SidebarItem>
                                <SidebarItem
                                    as={Link}
                                    to="/replicaSetAndDeployment"
                                    className={pathname === "/replicaSetAndDeployment" ? activeClass : ""}
                                    onClick={onClose}
                                >
                                    ReplicaSet과 <br/> Deployment란?
                                </SidebarItem>

                                <SidebarItem
                                    as={Link}
                                    to="/kubernetesSummary"
                                    className={pathname === "/kubernetesSummary" ? activeClass : ""}
                                    onClick={onClose}
                                >
                                    쿠버네티스 핵심 리소스 <br/>한눈에 보기
                                </SidebarItem>
                                <SidebarItem
                                    as={Link}
                                    to="/whatIsMinikube"
                                    className={pathname === "/whatIsMinikube" ? activeClass : ""}
                                    onClick={onClose}
                                >
                                    Minikube란 무엇인가?
                                </SidebarItem>

                                <SidebarItem
                                    as={Link}
                                    to="/kopsOnAWS"
                                    className={pathname === "/kopsOnAWS" ? activeClass : ""}
                                    onClick={onClose}
                                >
                                    Kops로 AWS에 쿠버네티스<br/>클러스터 구성하기
                                </SidebarItem>


                                <SidebarItem
                                    as={Link}
                                    to="/kopsSetupGuide"
                                    className={pathname === "/kopsSetupGuide" ? activeClass : ""}
                                    onClick={onClose}
                                >
                                    Kops 클러스터 구성 <br/> AWS & DNS 설정 가이드
                                </SidebarItem>
                                <SidebarItem
                                    as={Link}
                                    to="/kubernetesAdvancedDemo"
                                    className={pathname === "/kubernetesAdvancedDemo" ? activeClass : ""}
                                    onClick={onClose}
                                >
                                    쿠버네티스고급 명령어 및 <br/>클러스터 내 통신
                                </SidebarItem>

                                <SidebarItem
                                    as={Link}
                                    to="/replicationControllerDemo"
                                    className={pathname === "/replicationControllerDemo" ? activeClass : ""}
                                    onClick={onClose}
                                >
                                    ReplicationController <br/>수평 확장 데모
                                </SidebarItem>
                                <SidebarItem
                                    as={Link}
                                    to="/healthCheck"
                                    className={pathname === "/healthCheck" ? activeClass : ""}
                                    onClick={onClose}
                                >
                                    헬스 체크
                                </SidebarItem>
                                <SidebarItem
                                    as={Link}
                                    to="/livenessReadiness"
                                    className={pathname === "/livenessReadiness" ? activeClass : ""}
                                    onClick={onClose}
                                >
                                    Liveness와 <br/>Readiness Probe
                                </SidebarItem>
                                <SidebarItem
                                    as={Link}
                                    to="/podStatus"
                                    className={pathname === "/podStatus" ? activeClass : ""}
                                    onClick={onClose}
                                >
                                    파드(Pod)의 상태 이해하기
                                </SidebarItem>
                                <SidebarItem
                                    as={Link}
                                    to="/podLifecycle"
                                    className={pathname === "/podLifecycle" ? activeClass : ""}
                                    onClick={onClose}
                                >
                                    파드 수명 주기
                                </SidebarItem>

                                <SidebarItem
                                    as={Link}
                                    to="/secret"
                                    className={pathname === "/secret" ? activeClass : ""}
                                    onClick={onClose}
                                >
                                    쿠버네티스 시크릿
                                </SidebarItem>
                                <SidebarItem
                                    as={Link}
                                    to="/wordPressDemo"
                                    className={pathname === "/wordPressDemo" ? activeClass : ""}
                                    onClick={onClose}
                                >
                                    워드프레스 데모
                                </SidebarItem>
                                <SidebarItem
                                    as={Link}
                                    to="/kubernetesDashboard"
                                    className={pathname === "/kubernetesDashboard" ? activeClass : ""}
                                    onClick={onClose}
                                >
                                    쿠버네티스 웹 UI 대시보드
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
