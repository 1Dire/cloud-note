// src/pages/three/post8.jsx
import React from "react";
import LightboxViewer from "../../components/LightboxViewer.jsx";

const Post8 = () => {
    return (
        <div className="prose prose-lg max-w-4xl mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500 mb-8">
                React Three Fiber로 구현한 3D Audio Visualizer
            </h1>

            {/* --- 프롤로그 --- */}
            <p className="mb-6">
                이번 프로젝트는 음악의 주파수(Frequency)를 분석하여 실시간으로 반응하는 <strong>3D 오디오 비주얼라이저</strong>다.
                <strong>React Three Fiber</strong>와 <strong>Web Audio API</strong>를 활용했으며, 비트에 맞춰 쿵쿵거리는 카메라 무빙(Bass Bounce)과
                눈부신 네온 글로우(Bloom) 효과를 통해 몰입감을 극대화했다.
            </p>

            {/* --- 링크 섹션 --- */}
            <div className="not-prose my-6 grid gap-3 sm:grid-cols-2">
                <a
                    href="https://visualizer-demo-ten.vercel.app/"
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
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">visualizer-demo-ten.vercel.app</p>
                        </div>
                    </div>
                </a>
                <a
                    href="https://github.com/1Dire/visualizer-demo"
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
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">1Dire/visualizer-demo</p>
                        </div>
                    </div>
                </a>
            </div>

            {/* --- 메인 이미지 --- */}
            <LightboxViewer src="../three/post8/1.png" alt="Audio Visualizer 결과물"/>

            {/* --- 구현 원리 설명 --- */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-6 flex items-center gap-2">
                    <span className="text-indigo-500">🛠</span> 구현 원리 (Technical Details)
                </h2>

                <div className="space-y-8">
                    {/* 1. Audio Frequency */}
                    <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-700/50">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                            1. 주파수 데이터 추출 (Audio Analysis)
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-7">
                            <code>THREE.AudioAnalyser</code>를 사용하여 오디오 소스로부터 실시간 주파수 데이터(Frequency Data)를 추출한다.
                            이 데이터는 0~255 사이의 배열로 반환되며, 이를 매 프레임(<code>useFrame</code>)마다 가져와 막대의 높이(Scale)와 색상(Color)에 반영하여 시각화한다.
                        </p>
                    </div>

                    {/* 2. InstancedMesh */}
                    <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-700/50">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                            2. 렌더링 최적화 (InstancedMesh)
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-7">
                            64개 이상의 막대(Bar)를 개별 Mesh로 그리면 드로우 콜(Draw Call)이 증가해 성능이 저하된다.
                            이를 방지하기 위해 <strong>InstancedMesh</strong>를 사용하여 하나의 지오메트리와 머티리얼을 공유하고,
                            GPU 연산을 통해 수십 개의 막대를 단 한 번의 드로우 콜로 렌더링하여 60FPS를 유지했다.
                        </p>
                    </div>

                    {/* 3. Bloom & Physics */}
                    <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-700/50">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                            3. 네온 글로우 효과와 물리 기반 색상
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-7">
                            강렬한 네온 사인을 표현하기 위해 <code>@react-three/postprocessing</code>의 <strong>Bloom</strong> 효과를 적용했다.
                            일반적인 색상값(0~1)을 넘어선 고광도 값(High Dynamic Range)을 사용하기 위해 머티리얼의 <code>toneMapped</code> 속성을 끄고,
                            색상 벡터에 <code>multiplyScalar(5)</code>를 적용해 빛이 화면 밖으로 번져 나가는 효과를 구현했다.
                        </p>
                    </div>

                    {/* 4. Reactive Camera */}
                    <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-700/50">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                            4. 반응형 카메라 무빙 (Bass Bounce)
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-7">
                            단순한 시각화를 넘어 역동성을 주기 위해 저음역대(Bass)의 평균값을 계산했다.
                            저음이 특정 임계값(Threshold)을 넘을 때마다 카메라가 줌아웃(Kick)되는 효과를 주었으며,
                            <code>MathUtils.lerp</code>를 사용해 움직임이 끊기지 않고 부드럽게 감쇠되도록 처리했다.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Post8;