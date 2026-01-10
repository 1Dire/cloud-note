// src/pages/three/Post4.jsx
import React from "react";
import LightboxViewer from "../../components/LightboxViewer.jsx";

const Post5 = () => {
    return (
        <div className="prose prose-lg max-w-4xl mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500 mb-8">
             쉐이더로 잔디밭 구현하기
            </h1>

            {/* --- 프롤로그 --- */}
            <p className="mb-6">
                단순한 평면 바닥 대신, 바람에 일렁이는 빽빽한 잔디밭을 구현하면 프로젝트의 공간감이 비약적으로 상승한다.
                이번 포스트에서는 수만 개의 잔디를 성능 저하 없이 렌더링하고, <b>커스텀 셰이더(Custom Shader)</b>를 통해 자연스러운 바람의 결을 만드는 과정을 정리한다.
            </p>

            <div className="not-prose my-6 grid gap-3 sm:grid-cols-2">
                <a
                    href="https://grass-project.vercel.app/"
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
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">grass-project.vercel.app</p>
                        </div>
                    </div>
                </a>
                <a
                    href="https://github.com/1Dire/grass-project"
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
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">1Dire/grass-project</p>
                        </div>
                    </div>
                </a>
            </div>

            {/* --- 핵심 학습 내용 --- */}

            <h3 className="text-xl font-bold mb-2">1. 성능 최적화: Instances</h3>
            <p className="mb-4">
                잔디 하나하나를 별도의 Mesh로 만들면 수만 개를 그릴 때 브라우저가 멈춘다.
                Drei의 <code>&lt;Instances&gt;</code>를 사용하여 동일한 지오메트리를 하나의 <b>Draw Call</b>로 처리했다.
                50,000개 이상의 잔디를 배치해도 안정적인 프레임을 유지하는 핵심 비결이다.
            </p>

            <h3 className="text-xl font-bold mb-2">2. 바람의 결: Simplex Noise</h3>
            <p className="mb-4">
                단순한 <code>sin</code> 함수는 모든 잔디가 똑같이 움직여서 기계적으로 보인다.
                셰이더 코드 내부에 <b>Noise 함수</b>를 구현하여, 잔디밭을 가로지르는 불규칙하고 유기적인 바람의 물결을 표현했다.
            </p>

            <h3 className="text-xl font-bold mb-2">3. 시각적 밀도: 바닥 판과 그라데이션</h3>
            <p className="mb-6">
                사실적인 빽빽함을 위해 두 가지 트릭을 사용했다.
            </p>
            <ul className="mb-6">
                <li><b>Alpha Discard</b>: 사각형 평면을 셰이더로 깎아 위로 갈수록 뾰족한 풀잎 모양을 생성.</li>
                <li><b>Color Gradient</b>: 뿌리 부분은 아주 어둡게(Shadow), 끝부분은 밝게 처리하여 입체감 부여.</li>
                <li><b>Ground Mesh</b>: 잔디 아래에 짙은 색의 바닥판을 깔아 빈틈이 보이지 않게 처리.</li>
            </ul>

            {/* --- 기술 요약 코드 블록 --- */}
            <h2 className="mt-10 mb-4">셰이더 핵심 로직 (GLSL)</h2>
            <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg overflow-x-auto text-sm mb-8">
                <pre><code>{`// Vertex Shader 일부
float wind = noise(vec3(mvPosition.xz * 0.3, uTime * 0.8));
float strength = wind * 1.5;
mvPosition.x += strength * (uv.y * uv.y); // 위로 갈수록 더 많이 휘게 함

// Fragment Shader 일부
float leafLimit = (1.0 - vUv.y) * 0.5;
if (abs(vUv.x - 0.5) > leafLimit) discard; // 삼각형 모양으로 깎기`}</code></pre>
            </div>

            <LightboxViewer src="../three/post5/1.png" alt="잔디"/>
        </div>
    );
};

export default Post5;