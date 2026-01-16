// src/pages/three/Post7.jsx
import React from "react";
import LightboxViewer from "../../components/LightboxViewer.jsx";

const Post7 = () => {
    return (
        <div className="prose prose-lg max-w-4xl mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500 mb-8">
                React Three Fiber로 구현한 Synthwave
            </h1>

            {/* --- 프롤로그 --- */}
            <p className="mb-6">
                이번 프로젝트는 80년대 레트로 감성이 물씬 풍기는 <strong>Synthwave(신스웨이브)</strong> 스타일의 3D 씬이다.
                단순한 이미지가 아니라, <strong>React Three Fiber</strong>와 <strong>Shader(GLSL)</strong>를 활용해 무한히 펼쳐지는 그리드 지형과
                이글거리는 레트로 태양을 구현했다.
            </p>


            <div className="not-prose my-6 grid gap-3 sm:grid-cols-2">
                <a
                    href="https://cyber-grid-zeta.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="group block rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-5 bg-white/60 dark:bg-zinc-900/60 backdrop-blur hover:-translate-y-0.5 hover:shadow-lg transition-all"
                >
                    <div className="flex items-center gap-3">
            <span
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-sky-900/40 dark:text-sky-300">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </span>
                        <div>
                            <p className="font-semibold">Live Demo</p>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">cyber-grid-zeta.vercel.app</p>
                        </div>
                    </div>
                </a>
                <a
                    href="https://github.com/1Dire/cyber-grid"
                    target="_blank"
                    rel="noreferrer"
                    className="group block rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-5 bg-white/60 dark:bg-zinc-900/60 backdrop-blur hover:-translate-y-0.5 hover:shadow-lg transition-all"
                >
                    <div className="flex items-center gap-3">
            <span
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path
                  d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.41-1.34-1.79-1.34-1.79-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.77-1.6-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.64.24 2.86.12 3.16.77.84 1.24 1.9 1.24 3.22 0 4.61-2.8 5.62-5.47 5.92.43.37.82 1.1.82 2.22 0 1.6-.01 2.89-.01 3.28 0 .32.22.7.83.58A12 12 0 0 0 12 .5z"/></svg>
            </span>
                        <div>
                            <p className="font-semibold">GitHub Repository</p>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">1Dire/cyber-grid</p>
                        </div>
                    </div>
                </a>
            </div>


            <LightboxViewer src="../three/post7/1.png" alt="Synthwave Grid 결과물"/>

            <p className="mt-8 text-sm text-zinc-500">
                * Cind 폰트와 이중 외곽선(Double Outline) 스타일을 적용하여 레트로 게임 UI 느낌을 강조했다.
            </p>
        </div>
    );
};

export default Post7;