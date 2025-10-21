import React, {useMemo, useState} from "react";
import {Github, Linkedin, Mail, Rocket, Sparkles, Globe} from "lucide-react";

/* ===== 기본 프로필 & 링크 ===== */
const NAME = "이상우";
const GITHUB_USERNAME = "1Dire";
const PROFILE_IMG = `https://github.com/${GITHUB_USERNAME}.png`;
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;
const PORTFOLIO_MAIN = "https://1dire.github.io/Main/";
const EMAIL = "dkdkdltkddn@naver.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/sangwoo-lee-06418b280/";

/* ===== 요약 지표 ===== */
const STATS = [
    {k: "총 경력", v: "3년 9개월", sub: "Frontend · UI Engineering"},
    {k: "프로젝트", v: "10+개", sub: "기업/기관 구축"},
    {k: "반응형", v: "100%", sub: "모바일 · 데스크톱"},
];

/* ===== 대표 하이라이트 ===== */
const HIGHLIGHTS = [
    {
        title: "SK C&C · 탄소중립 NetZero / Centero",
        bullets: [
            "Next.js + TypeScript 기반 트랜잭션 UX 설계",
            "거래/발급/추적 UI 고도화 및 성능 최적화",
            "Spring Boot 백엔드 연동 규약 정립",
        ],
        tags: ["Next.js", "TypeScript", "Performance", "ESG"],
        href: "#skcc",
    },
    {
        title: "신한은행 · ARS 멀티모달 시스템",
        bullets: [
            "React 표준 컴포넌트/템플릿 설계",
            "KT AI 챗봇 프레임워크 연동",
            "시나리오 기반 동적 UI 상태 관리",
        ],
        tags: ["React", "Design System", "AI", "UX"],
        href: "#shinhan",
    },
    {
        title: "현대중공업 · 도시가스 에너지 모니터링",
        bullets: [
            "Vue 3 + ECharts 실시간 대시보드",
            "WebSocket 스트리밍 데이터 처리",
            "사용량 가시화 및 알림 UX",
        ],
        tags: ["Vue 3", "ECharts", "WebSocket", "Dashboard"],
        href: "#hhi",
    },
];

/* ===== 전체 이력 ===== */
const PROJECTS = [
    {
        id: "kcb",
        company: "KCB",
        title: "비즈그라운드 파트너 플랫폼",
        role: "신규 구독형 플랫폼 퍼블리싱 및 JSP 개발",
        contrib: [
            "포토샵 시안 100% 반영 퍼블리싱",
            "JSP 개발 및 일부 Spring Boot 기능(게시판/회원관리) 구현",
        ],
        stack: ["HTML", "CSS", "jQuery", "JSP", "Spring Boot", "Oracle"],
    },
    {
        id: "skcc",
        company: "SK C&C",
        title: "탄소중립 NetZero / Centero",
        role: "블록체인 기반 탄소배출권 거래소 프론트엔드",
        contrib: [
            "Next.js 기반 UI 구조화, 거래/발급/추적 플로우 설계",
            "성능 최적화 및 백엔드 연동 규약 정의",
        ],
        stack: ["Next.js", "TypeScript", "Spring Boot", "MSSQL"],
    },
    {
        id: "shinhan",
        company: "신한은행",
        title: "ARS 멀티모달 시스템",
        role: "KT AI 프레임워크 기반 고객센터 UI",
        contrib: [
            "시나리오 기반 템플릿/컴포넌트 개발",
            "표준 UI/UX 설계 및 상태 관리",
        ],
        stack: ["React", "JavaScript", "CSS", "jQuery"],
    },
    {
        id: "hhi",
        company: "현대중공업",
        title: "도시가스 에너지 모니터링",
        role: "사내 실시간 모니터링 웹 서비스",
        contrib: [
            "Vue 3 + ECharts 대시보드 구현",
            "WebSocket 실시간 스트림 연동",
        ],
        stack: ["Vue 3", "ECharts", "Spring Boot", "MSSQL", "WebSocket"],
    },
    {
        id: "mes",
        company: "SmartWebMES",
        title: "제조/생산 현장 맞춤형 MES",
        role: "실시간 모니터링/현장 UX 컴포넌트",
        contrib: ["요구 기반 Vue 컴포넌트 설계", "실시간 현황 가시화 및 알림"],
        stack: ["Vue 3", "ECharts", "Spring Boot", "PostgreSQL", "WebSocket"],
    },
    {
        id: "soa",
        company: "SOA Closet",
        title: "일본 타깃 커머스",
        role: "UX/UI 디자인 & 개발",
        contrib: ["메인 배너 디자인", "국가별 UX 설계"],
        stack: ["PHP", "HTML", "CSS", "JavaScript", "jQuery"],
        link: "https://soacloset.cafe24.com/shop2",
    },
    {
        id: "else",
        company: "그 외 제작/유지보수",
        title: "기업 웹사이트",
        role: "디자인 + 퍼블리싱 + 개발",
        contrib: [
            "ELSCOM 사내 홈페이지 + 전자 카탈로그",
            "항성산업사/광원무역/탈렌트 LNG 반응형 사이트",
            "퍼스널 모빌리티/캠핑장/각종 행사 페이지",
        ],
        stack: ["HTML", "CSS", "JavaScript"],
        links: [
            {name: "ELSCOM", url: "http://www.elscom.co.kr"},
            {name: "항성산업사", url: "http://www.hangseong.co.kr"},
            {name: "Talent LNG", url: "http://talent-tl.com"},
        ],
    },
];

/* ===== 유틸 · 컴포넌트 ===== */
const SectionTitle = ({kicker, children, id}) => (
    <div id={id} className="mb-6">
        {kicker ? (
            <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                {kicker}
            </p>
        ) : null}
        <h2 className="text-xl sm:text-2xl font-bold">{children}</h2>
    </div>
);

const Chip = ({active, onClick, children}) => (
    <button
        onClick={onClick}
        className={
            "px-3 py-1.5 rounded-full text-xs font-medium border transition " +
            (active
                ? "border-indigo-400 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200 dark:border-indigo-700"
                : "border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800/60")
        }
    >
        {children}
    </button>
);

const Card = ({children, className = ""}) => (
    <div
        className={
            "group rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/60 p-5 hover:shadow transition-transform duration-200 hover:-translate-y-0.5 " +
            className
        }
    >
        {children}
    </div>
);

export default function Home() {
    /* 배경 애니메이션 */
    const gradientCss =
        "@keyframes gradient-x {0%,100% {background-position: 0% 50%;} 50% {background-position: 100% 50%;}} .animate-gradient-x {background-size: 200% 200%; animation: gradient-x 6s ease infinite;}";

    /* 스택 필터 */
    const FILTERS = ["All", "React", "Next.js", "Vue", "TypeScript"];
    const [filter, setFilter] = useState("All");
    const filteredProjects = useMemo(() => {
        if (filter === "All") return PROJECTS;
        return PROJECTS.filter((p) => p.stack.some((s) => s.includes(filter)));
    }, [filter]);

    return (
        <div
            className="min-h-[100dvh] relative bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-950 text-zinc-900 dark:text-zinc-50">
            <style dangerouslySetInnerHTML={{__html: gradientCss}}/>

            {/* 배경 데코 */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10"
            >
                <div
                    className="absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-indigo-400/30 to-emerald-400/30 blur-3xl"/>
                <div
                    className="absolute top-1/3 -left-24 h-[360px] w-[360px] rounded-full bg-gradient-to-br from-pink-400/20 to-purple-400/20 blur-3xl"/>
                <div
                    className="absolute inset-0 [mask-image:radial-gradient(600px_300px_at_50%_0%,#000_40%,transparent_70%)]"/>
            </div>

            {/* 고정 네비 */}


            {/* ===== Hero ===== */}
            <section id="top" className="mx-auto max-w-6xl px-6 pt-16 pb-10 sm:pt-24 sm:pb-14">
                <div className="grid items-center gap-10 md:grid-cols-[auto,1fr]">
                    <div className="flex justify-center md:justify-start">
                        <img
                            src={PROFILE_IMG}
                            alt={`${NAME} GitHub 프로필`}
                            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-indigo-500 shadow-md"
                        />
                    </div>

                    <div>
                        <div className="flex flex-wrap gap-2">
                            <p className="inline-flex items-center gap-2 rounded-full border border-zinc-200/60 dark:border-zinc-700/70 px-3 py-1 text-[11px] font-medium text-zinc-600 dark:text-zinc-300">
                                <Sparkles className="h-3.5 w-3.5"/>
                                사용자 중심 인터랙션을 설계하는 프론트엔드 개발자
                            </p>
                            <p className="inline-flex items-center gap-2 rounded-full border border-indigo-300/80 dark:border-indigo-700/70 px-3 py-1 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300">
                                빠르고 명확한 UX · 데이터 감각 · 실전형 문제해결
                            </p>
                        </div>

                        <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              <span
                  className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 animate-gradient-x">
                코드로 디자인을, 디자인으로 경험을 만듭니다
              </span>

                            <span
                                className="block mt-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                   프론트엔드 포트폴리오 · {NAME}
              </span>
                        </h1>


                        <div className="mt-6 flex flex-wrap gap-3" id="contacts">
                            <a
                                href={`mailto:${EMAIL}`}
                                className="inline-flex items-center gap-2 rounded-2xl border border-zinc-300 dark:border-zinc-700 px-4 py-2.5 text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                            >
                                <Mail className="h-4 w-4"/> 연락하기
                            </a>
                            <a
                                href={GITHUB_URL}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-2xl border border-zinc-300 dark:border-zinc-700 px-4 py-2.5 text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                            >
                                <Github className="h-4 w-4"/> GitHub
                            </a>
                            <a
                                href={PORTFOLIO_MAIN}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-2xl border border-indigo-300 dark:border-indigo-700 px-4 py-2.5 text-sm font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                            >
                                <Globe className="h-4 w-4"/> Portfolio(Main)
                            </a>

                        </div>
                    </div>
                </div>

                {/* 숫자 지표 */}
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {STATS.map((s) => (
                        <Card key={s.k}>
                            <p className="text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                {s.k}
                            </p>
                            <p className="mt-1 text-2xl font-extrabold">{s.v}</p>
                            <p className="text-sm text-zinc-600 dark:text-zinc-300">{s.sub}</p>
                        </Card>
                    ))}
                </div>
            </section>

            {/* ===== 프로젝트 하이라이트 ===== */}
            <section className="mx-auto max-w-6xl px-6 py-10">
                <SectionTitle id="highlights" kicker="Highlights">
                    프로젝트 하이라이트
                </SectionTitle>
                <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {HIGHLIGHTS.map((c) => (
                        <a key={c.title} href={c.href} className="block">
                            <Card className="h-full">
                                <h3 className="font-semibold leading-snug">{c.title}</h3>
                                <ul className="mt-3 space-y-1 text-sm text-zinc-600 dark:text-zinc-300">
                                    {c.bullets.map((b, i) => (
                                        <li key={i}>• {b}</li>
                                    ))}
                                </ul>
                                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                                    {c.tags.map((t) => (
                                        <span
                                            key={t}
                                            className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5"
                                        >
                      {t}
                    </span>
                                    ))}
                                </div>
                            </Card>
                        </a>
                    ))}
                </div>
            </section>

            {/* ===== 주요 이력 + 스택 필터 ===== */}
            <section className="mx-auto max-w-6xl px-6 py-10">
                <SectionTitle id="projects" kicker="Experience">
                    주요 이력
                </SectionTitle>

                <div className="flex flex-wrap gap-2 mb-5">
                    {FILTERS.map((f) => (
                        <Chip key={f} active={f === filter} onClick={() => setFilter(f)}>
                            {f}
                        </Chip>
                    ))}
                </div>

                <div className="grid gap-4">
                    {filteredProjects.map((p) => (
                        <Card key={p.id}>
                            <div className="flex items-start justify-between gap-4">
                                <h3 className="text-base sm:text-lg font-semibold">
                                    {p.company} · {p.title}
                                </h3>
                                <div className="hidden sm:flex gap-2 flex-wrap">
                                    {p.stack.slice(0, 4).map((t) => (
                                        <span
                                            key={t}
                                            className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[11px]"
                                        >
                      {t}
                    </span>
                                    ))}
                                </div>
                            </div>

                            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                                {p.role}
                            </p>
                            <ul className="mt-3 space-y-1 text-sm text-zinc-700 dark:text-zinc-200">
                                {p.contrib.map((c, i) => (
                                    <li key={i}>• {c}</li>
                                ))}
                            </ul>

                            {/* Stack (mobile) */}
                            <div className="mt-3 flex sm:hidden flex-wrap gap-2 text-xs">
                                {p.stack.map((t) => (
                                    <span
                                        key={t}
                                        className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5"
                                    >
                    {t}
                  </span>
                                ))}
                            </div>

                            {/* 링크 */}
                            {p.link ? (
                                <div className="mt-3">
                                    <a
                                        href={p.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-xs underline underline-offset-4 text-indigo-600 dark:text-indigo-300"
                                    >
                                        사이트 바로가기
                                    </a>
                                </div>
                            ) : null}

                            {Array.isArray(p.links) && p.links.length > 0 ? (
                                <div className="mt-3 flex flex-wrap gap-3">
                                    {p.links.map((l) => (
                                        <a
                                            key={l.url}
                                            href={l.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-xs underline underline-offset-4 text-indigo-600 dark:text-indigo-300"
                                        >
                                            {l.name}
                                        </a>
                                    ))}
                                </div>
                            ) : null}
                        </Card>
                    ))}
                </div>
            </section>

            {/* ===== 활동 & 포트폴리오 ===== */}
            <section className="mx-auto max-w-6xl px-6 py-10">
                <SectionTitle kicker="Activity">활동 & 포트폴리오</SectionTitle>
                <div className="mt-6 flex flex-col items-center gap-6">
                    <img
                        src={`https://ghchart.rshah.org/${GITHUB_USERNAME}`}
                        alt="GitHub 잔디"
                        className="w-full max-w-3xl border rounded-lg shadow"
                    />
                    <div className="flex flex-wrap justify-center gap-3">
                        <a
                            href={GITHUB_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-2xl border border-zinc-300 dark:border-zinc-700 px-4 py-2.5 text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                        >
                            <Github className="h-4 w-4"/> GitHub
                        </a>
                        <a
                            href={PORTFOLIO_MAIN}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-2xl border border-indigo-300 dark:border-indigo-700 px-4 py-2.5 text-sm font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                        >
                            <Globe className="h-4 w-4"/> Portfolio(Main)
                        </a>
                    </div>
                </div>
            </section>

            {/* ===== 푸터 ===== */}
            <footer className="mx-auto max-w-6xl px-6 py-12 text-center text-sm text-zinc-500 dark:text-zinc-400">
                <p>© 2025 {NAME} · Frontend Portfolio</p>
            </footer>
        </div>
    );
}