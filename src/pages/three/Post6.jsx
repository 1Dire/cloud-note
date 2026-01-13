// src/pages/three/Post4.jsx
import React from "react";
import LightboxViewer from "../../components/LightboxViewer.jsx";

const Post6 = () => {
    return (
        <div className="prose prose-lg max-w-4xl mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500 mb-8">
                쉐이더로 잔디밭 구현하기2
            </h1>

            {/* --- 프롤로그 --- */}
            <p className="mb-6">
                이전에 핵심 요소만 찾아서 만들었지만 지금은 비주얼적으로 좀더 개선해서 만들었다.
                다음은 만약 구름이 하늘에 있다고 가정하면 구름이 지나갈때 풀이 그림자 지거나 지형을 좀더 울퉁불퉁 하게 만들고  강, 땅, 풀밭 이렇게 평지에서 좀더 다이나믹하게 만들어볼예정이다.
            </p>

            <div className="not-prose my-6 grid gap-3 sm:grid-cols-2">
                <a
                    href="https://cartoon-grass-p3jg.vercel.app/"
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
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">cartoon-project.vercel.app</p>
                        </div>
                    </div>
                </a>
                <a
                    href="https://github.com/1Dire/cartoon-grass"
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
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">1Dire/cartoon-project</p>
                        </div>
                    </div>
                </a>
            </div>


            <LightboxViewer src="../three/post6/1.png" alt="잔디"/>
        </div>
    );
};

export default Post6;