// src/pages/three/Post3.jsx
import React from "react";

const Post3 = () => {
    return (
        <div className="prose prose-lg max-w-4xl mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500 mb-8">
                웹에서 자동차를 직접 운전하기: Rapier 물리 + R3F 컨트롤
            </h1>

            {/* --- 프롤로그 --- */}
            <p className="mb-6">
                게임 같은 상호작용을 웹에 더하면 곧장 즐거운 사용자 경험이 된다. 이번 포스트에서는
                사용자가 <b>키보드(방향키)</b>와 <b>모바일 조이스틱</b>으로 자동차를 직접 운전할 수 있는
                데모를 간단히 소개한다. 핵심은 <b>평지 물리엔진</b>과 <b>차량 뼈대</b>를 세우고,
                입력에 따라 차량이 가·감속/회전/브레이크하도록 구성한 것이다.
            </p>
            <p className="mb-6">
                참고한 아이디어는 Three.js의 Rapier 차량 컨트롤러 예제이며
                (<a href="https://threejs.org/examples/?q=rapi#physics_rapier_vehicle_controller" target="_blank" rel="noreferrer">vehicle_controller</a>),
                실제 구현은 내 요구에 맞춰 <b>별도 구조로 커스터마이즈</b>했다.

            </p>

            {/* --- 데모 --- */}
            <div className="not-prose my-6 grid gap-3 sm:grid-cols-2">
                <a
                    href="https://three-car.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="group block rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-5 bg-white/60 dark:bg-zinc-900/60 backdrop-blur hover:-translate-y-0.5 hover:shadow-lg transition-all"
                >
                    <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-sky-900/40 dark:text-sky-300">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </span>
                        <div>
                            <p className="font-semibold">Live Demo</p>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">three-car.vercel.app</p>
                        </div>
                    </div>
                </a>
                <a
                    href="https://github.com/1Dire/three-car"
                    target="_blank"
                    rel="noreferrer"
                    className="group block rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-5 bg-white/60 dark:bg-zinc-900/60 backdrop-blur hover:-translate-y-0.5 hover:shadow-lg transition-all"
                >
                    <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.41-1.34-1.79-1.34-1.79-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.77-1.6-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.64.24 2.86.12 3.16.77.84 1.24 1.9 1.24 3.22 0 4.61-2.8 5.62-5.47 5.92.43.37.82 1.1.82 2.22 0 1.6-.01 2.89-.01 3.28 0 .32.22.7.83.58A12 12 0 0 0 12 .5z"/></svg>
            </span>
                        <div>
                            <p className="font-semibold">GitHub Repository</p>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">1Dire/three-car</p>
                        </div>
                    </div>
                </a>
            </div>

            {/* --- 핵심 요약 --- */}
            <h2 className="mt-10 mb-4">핵심 요약</h2>
            <ul className="mb-6">
                <li><b>입력 통합</b>: 키보드(방향키/WASD)와 모바일 조이스틱 입력을 하나의 드라이브 신호(가속·조향·브레이크)로 통합.</li>
                <li><b>경량 물리</b>: Rapier로 차체를 단일 바디로 두고 전진/후진, 회전, 브레이크만 간결하게 구성.</li>
                <li><b>브레이크 강화</b>: 정지 감각을 개선하기 위해 속도 성분 감쇠 중심으로 처리.</li>
                <li><b>모델 교체</b>: 박스 메시에서 GLTF 차량 모델로 교체해 몰입감 향상. 바퀴 회전/요(Yaw) 보간으로 감각 개선.</li>
            </ul>

            {/* --- 조작법 --- */}
            <h2 className="mt-10 mb-4">조작법</h2>
            <ul className="mb-6">
                <li><b>PC</b>: 방향키 또는 WASD, 스페이스바(브레이크)</li>
                <li><b>모바일</b>: 화면 조이스틱(좌/우 조향, 전/후 가속), 별도 브레이크 버튼</li>
            </ul>

            {/* --- 기술 메모 (아주 간단) --- */}
            <h2 className="mt-10 mb-4">기술 메모</h2>
            <ul className="mb-12">
                <li>시각용 바닥과 충돌용 바닥을 분리해 성능/유지보수 최적화.</li>
                <li>물리 디버그는 URL에 <code>#debug</code>를 붙여 토글.</li>
                <li>세부 구현은 저장소 버전과 다를 수 있음(데모 우선 커스터마이즈).</li>
            </ul>
        </div>
    );
};

export default Post3;