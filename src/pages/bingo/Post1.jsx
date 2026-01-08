import React from "react";
import BlockCode from "@/components/BlockCode";
import LightboxViewer from "../../components/LightboxViewer.jsx";

const Post1 = () => {
    return (
        <div className="prose prose-lg max-w-4xl mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide">
            <h1 className="text-4xl font-black text-indigo-600 dark:text-sky-500 mb-8">
                멀티 팀 빙고 게임 개발기 #1: 대기실(Lobby) 설계
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-400">
                <strong>최대 8명이 참여하는 팀전 빙고 게임</strong>을 만들 예정이다.
                첫 번째 단계로 게임의 첫인상인 메인 화면과 대기실 UI를 React와 Tailwind CSS로 구현하며 고민했던 지점들을 기록한다.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">1. 메인 화면</h2>
            <p>
                사용자가 처음 마주하는 메인 화면은 군더더기 없이 게임 시작과 닉네임 설정에 집중할 수 있도록 구성했다.
                특히 <strong>모바일 환경</strong>을 고려하여 엄지손가락이 닿기 편한 위치에 주요 버튼을 배치했다.
            </p>
            {/* 메인 화면 이미지 설명 레이아웃 */}
            <div className="flex justify-center w-full">
                <LightboxViewer src="../bingo/post1/1.png" alt="메인화면" />
            </div>


            <h2 className="text-2xl font-bold mt-12 mb-4">2. 대기실 UI/UX 컨셉</h2>
            <p>
                일반적인 웹 앱보다는 <strong>모바일 게임의 인터페이스</strong> 느낌을 내기 위해 노력했다.
                강렬한 인상을 주기 위해 <code>font-black</code>과 <code>italic</code>을 적절히 사용했고,
                레드팀과 블루팀의 시각적 분리를 확실히 했다.
            </p>
            {/* 대기실 화면 이미지 설명 레이아웃 */}
            <LightboxViewer src="../bingo/post1/2.png" alt="대기실" />

            <ul className="list-disc ml-6 space-y-2">
                <li><strong>Red vs Blue:</strong> 팀별 고유 컬러를 테두리와 배경에 적용</li>
                <li><strong>반응형 프레임:</strong> 모바일 최적화 규격(430x844) 내부에서 동작하도록 설계</li>
                <li><strong>시각적 피드백:</strong> 빈 슬롯은 점선(Dashed)으로, 입장한 유저는 입체적인 카드로 표현</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">3. 주요 기능 구현</h2>

            <h3 className="text-xl font-bold text-indigo-500">개별 프로필 아이콘</h3>
            <p>
                유저마다 개성을 부여하기 위해 객체 배열 구조를 사용하여 닉네임 옆에 고유의 이모지 아이콘을 배치했다.
                향후 포트나이트 UEFN 연동 시 아바타 데이터를 매칭할 수 있는 확장성을 고려했다.
            </p>

            <h3 className="text-xl font-bold text-indigo-500">방장 권한 및 레디 시스템</h3>
            <p>
                방장(Host)에게만 보이는 <strong>강퇴(Kick) 버튼</strong>과 유저의 현재 상태를 알리는
                <strong>READY 배지</strong>를 추가했다. 애니메이션(Pulse)을 활용해 대기 상태의 생동감을 주었다.
            </p>

            <div className="my-8">
                <h4 className="text-sm font-bold text-slate-400 mb-2 uppercase italic">Lobby UI Code Snippet</h4>
                <BlockCode
                    code={`// 플레이어 상태에 따른 동적 클래스 적용 예시
<div className={\`h-16 border rounded-2xl flex items-center px-3 \${
  player.isReady ? "bg-red-50 border-red-200" : "bg-white"
}\`}>
  {player.isReady && <ReadyBadge />}
  {isHost && !player.isHost && <KickButton />}
</div>`}
                    language="javascript"
                />
            </div>

            <div className="not-prose my-10 grid gap-3 sm:grid-cols-1">
                <a
                    href="https://github.com/1Dire/bingo"
                    target="_blank"
                    rel="noreferrer"
                    className="group block rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-5 bg-white/60 dark:bg-zinc-900/60 backdrop-blur hover:-translate-y-0.5 hover:shadow-lg transition-all"
                >
                    <div className="flex items-center gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                                <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.41-1.34-1.79-1.34-1.79-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.77-1.6-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.64.24 2.86.12 3.16.77.84 1.24 1.9 1.24 3.22 0 4.61-2.8 5.62-5.47 5.92.43.37.82 1.1.82 2.22 0 1.6-.01 2.89-.01 3.28 0 .32.22.7.83.58A12 12 0 0 0 12 .5z"/>
                            </svg>
                        </span>
                        <div>
                            <p className="font-semibold m-0">GitHub Repository</p>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 m-0 leading-none">https://github.com/1Dire/bingo</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default Post1;