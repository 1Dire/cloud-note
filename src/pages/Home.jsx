import React from "react";
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  Rocket,
  Sparkles,
  Globe,
} from "lucide-react";

// ===== 프로필 & 링크 (이력서 기반) =====
const NAME = "이상우";
const GITHUB_USERNAME = "1Dire";
const PROFILE_IMG = `https://github.com/${GITHUB_USERNAME}.png`;
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;
const PORTFOLIO_MAIN = "https://1dire.github.io/Main/";

const EMAIL = "dkdkdltkddn@naver.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/sangwoo-lee-06418b280/";

// ===== 요약 지표 =====
const STATS = [
  { k: "총 경력", v: "3년 9개월", sub: "웹 개발 & 퍼블리싱" },
  { k: "프로젝트", v: "10+", sub: "기업/기관 수행" },
  { k: "엔터프라이즈", v: "3+", sub: "SK C&C·신한·현대중공업" },
  { k: "반응형", v: "100%", sub: "모바일·데스크톱 대응" },
  { k: "데이터", v: "100만+", sub: "시각화 대시보드" },
  { k: "e커머스", v: "실운영", sub: "카페24·해외 타깃" },
];

// ===== 케이스 스터디 =====
const CASE_STUDIES = [
  {
    title: "SK C&C · 탄소배출권 거래소(NetZero/Centero)",
    bullets: [
      "Next.js + TypeScript 기반 프론트엔드",
      "발급·거래·추적 UI 설계 및 성능 최적화",
      "Spring Boot 백엔드와 연동 구조 정립",
    ],
    tags: ["Next.js", "TypeScript", "Performance", "ESG"],
    href: "#skcc",
  },
  {
    title: "신한은행 · ARS 멀티모달 상담",
    bullets: [
      "React 표준 UI/UX 컴포넌트 개발",
      "KT AI 프레임워크 연동(음성·텍스트)",
      "시나리오 기반 동적 UI 로직",
    ],
    tags: ["React", "Figma", "Design System", "AI"],
    href: "#shinhan",
  },
  {
    title: "현대중공업 · 에너지 모니터링",
    bullets: [
      "Vue 3 + ECharts 실시간 대시보드",
      "WebSocket 스트리밍 데이터",
      "도시가스 사용량 모니터링 UI",
    ],
    tags: ["Vue 3", "WebSocket", "ECharts", "Dashboard"],
    href: "#hhi",
  },
];

export default function Home() {
  // gradient animation css (컴포넌트 로컬 적용)
  const gradientCss = `@keyframes gradient-x {0%,100% {background-position: 0% 50%;} 50% {background-position: 100% 50%;}} .animate-gradient-x {background-size: 200% 200%; animation: gradient-x 6s ease infinite;}`;

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 text-zinc-900 dark:text-zinc-50">
      <style dangerouslySetInnerHTML={{ __html: gradientCss }} />

      {/* ===== Hero: 가치제안 + 프로필 ===== */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-14 sm:pt-28 sm:pb-20">
        <div className="grid items-center gap-10 md:grid-cols-[auto,1fr]">
          {/* 프로필 이미지 */}
          <div className="flex justify-center md:justify-start">
            <img
              src={PROFILE_IMG}
              alt={`${NAME} GitHub 프로필`}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-indigo-500 shadow-md"
            />
          </div>

          {/* 텍스트 블록 */}
          <div>
            <div className="flex flex-wrap gap-2">
              <p className="inline-flex items-center gap-2 rounded-full border border-zinc-200/60 dark:border-zinc-700/70 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300">
                <Sparkles className="h-3.5 w-3.5" /> 사용자 경험을 극대화하는
                프론트엔드 개발자
              </p>
              <p className="inline-flex items-center gap-2 rounded-full border border-indigo-300/80 dark:border-indigo-700/70 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                독학으로 시작해 실전으로 확장
              </p>
            </div>
            <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 animate-gradient-x">
                해보고 싶은 건 무엇이든 시도하는
              </span>
              <span className="block mt-2 text-zinc-800 dark:text-zinc-100">
                크리에이티브한 사람,
              </span>
              <span className="block mt-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                인터랙티브하고 직관적인 것을 만듭니다
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl">
              퍼블리싱과 UI 경험을 바탕으로 빠르고 명확한 UX를 설계합니다.
              <span className="font-semibold">독학으로</span> 시작해, 실제
              현장에서 문제를 풀며 역량을 확장해 왔습니다. 웹 3D를 사용자 문제
              해결로 연결하는 실용적인 실험을 즐깁니다.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 rounded-2xl border border-zinc-300 dark:border-zinc-700 px-4 py-2.5 text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
              >
                <Mail className="h-4 w-4" /> 연락하기
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-zinc-300 dark:border-zinc-700 px-4 py-2.5 text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>

              <a
                href={PORTFOLIO_MAIN}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-indigo-300 dark:border-indigo-700 px-4 py-2.5 text-sm font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
              >
                <Globe className="h-4 w-4" /> Portfolio(Main)
              </a>
            </div>
          </div>
        </div>

        {/* 숫자 지표 */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STATS.map((s) => (
            <div
              key={s.k}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 p-5"
            >
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{s.k}</p>
              <p className="mt-1 text-2xl font-extrabold">{s.v}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                {s.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 스토리 섹션: 문제 → 해결 → 배움 ===== */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-r from-indigo-50 to-sky-50 dark:from-indigo-950/40 dark:to-sky-950/20 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold">
            실전에서 시작한 학습
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-700 dark:text-zinc-200 leading-relaxed">
            전화로만 예약을 받던 친척 펜션의 문제를 해결하기 위해 PHP 기반 예약
            사이트를 직접 개발했습니다. MySQL로 예약 데이터를 관리하고, 문자
            메시지 전송 API를 연동했습니다. 실제 운영자의 요구를 반복 반영하는
            과정에서{" "}
            <span className="font-semibold">
              “기술은 사용자의 불편을 해결하기 위해 존재한다”
            </span>
            는 원칙을 체득했습니다.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-sm text-zinc-700 dark:text-zinc-200">
            <li className="flex items-start gap-2">
              <Rocket className="mt-0.5 h-4 w-4" /> 예약/재고/문자 알림
              파이프라인 설계
            </li>
            <li className="flex items-start gap-2">
              <Rocket className="mt-0.5 h-4 w-4" /> 관리자 UX 단순화: 빈번 작업
              우선 배치
            </li>
            <li className="flex items-start gap-2">
              <Rocket className="mt-0.5 h-4 w-4" /> 오류·중복 방지 유효성 검증과
              로그 설계
            </li>
            <li className="flex items-start gap-2">
              <Rocket className="mt-0.5 h-4 w-4" /> 실사용자 피드백 루프로 지속
              개선
            </li>
          </ul>
        </div>
      </section>

      {/* ===== 케이스 스터디(기업/금융) ===== */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="text-xl sm:text-2xl font-bold">
          대기업·금융권 프로젝트 하이라이트
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.map((c) => (
            <a
              key={c.title}
              href={c.href}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 p-5 hover:shadow-sm transition"
            >
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
            </a>
          ))}
        </div>
      </section>

      {/* ===== 성장 루틴 ===== */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="text-xl sm:text-2xl font-bold">성장 루틴</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 p-5">
            <h3 className="font-semibold">학업·이론</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              고려사이버대학교 소프트웨어공학과(편입) 4학년 재학. 낮에는 실무,
              저녁·주말에는 자료구조·설계 등 CS 학습으로 기초를 강화합니다.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 p-5">
            <h3 className="font-semibold">언어·커뮤니케이션</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              2023년 8월부터 영어 회화 학습을 꾸준히 진행. 미국 여행에서 실사용
              경험을 쌓았고, 글로벌 협업 역량을 키우고 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* ===== e커머스/UX ===== */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="text-xl sm:text-2xl font-bold">
          e커머스에서 배운 사용자 중심 UX
        </h2>
        <div className="mt-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 p-5">
          <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-200 leading-relaxed">
            고등학생 때 네이버 "NKNK SHOP"을 직접 운영해 월 10만 원 이상의
            수익을 경험했고, 이후 일본 시장 타깃 쇼핑몰 개발에 참여하며 국적별
            구매 패턴 분석을 바탕으로 맞춤 UI/UX를 설계했습니다. 실운영 경험을
            토대로 관리자 화면을 직관적으로 구성했습니다.
          </p>
        </div>
      </section>

      {/* ===== GitHub 잔디 & 포트폴리오 ===== */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="text-xl sm:text-2xl font-bold text-center">
          활동 & 포트폴리오
        </h2>
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
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a
              href={PORTFOLIO_MAIN}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-indigo-300 dark:border-indigo-700 px-4 py-2.5 text-sm font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
            >
              <Globe className="h-4 w-4" /> Portfolio(Main)
            </a>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="mx-auto max-w-6xl px-6 py-12 text-center text-sm text-zinc-500 dark:text-zinc-400">
        <p>© 2025 {NAME} · UX-Driven Frontend</p>
      </footer>
    </div>
  );
}
