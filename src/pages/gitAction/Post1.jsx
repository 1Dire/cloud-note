import React from "react";
import BlockCode from "@/components/BlockCode";
import LightboxViewer from "@/components/LightboxViewer";

export default function Post1() {
    return (
        <div className="prose prose-lg mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide w-full max-w-4xl lg:w-4xl">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                GitHub Actions란 무엇인가?
            </h1>

            <p>
                <strong>GitHub Actions</strong>는 GitHub에서 공식적으로 제공하는
                <span className="text-blue-600"> CI/CD(지속적 통합 및 배포) 자동화 플랫폼</span>이다. 우리가 소스 코드를
                <code>push</code>, <code>PR</code>, <code>merge</code> 등의 이벤트로 변경할 때,
                특정 작업을 <strong>자동으로 실행</strong>할 수 있게 해주는 도구다.
            </p>

            <p>
                예를 들어, 프론트엔드 앱의 코드를 <code>main</code> 브랜치에 푸시하면 다음과 같은 작업을 자동으로 할 수 있다:
            </p>

            <ul className="list-disc pl-6">
                <li>코드를 체크아웃하고</li>
                <li>의존성을 설치하고</li>
                <li>빌드하고</li>
                <li>배포하거나 테스트를 수행</li>
            </ul>

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400 mt-10">CI/CD란 무엇인가?</h2>
            <p>
                <strong>CI (Continuous Integration, 지속적 통합)</strong>는 개발자가 코드를 자주, 일관되게 통합할 수 있도록 하는 프로세스다.
                모든 커밋마다 테스트와 빌드를 자동으로 수행하여 문제를 조기에 발견할 수 있다.
            </p>
            <p>
                <strong>CD (Continuous Delivery / Deployment, 지속적 배포)</strong>는 통합된 코드를 실제 서비스 환경(또는 그에 가까운 환경)에
                자동으로 배포하는 것을 말한다. 변경사항이 사용자에게 더 빠르게, 안정적으로 전달될 수 있도록 한다.
            </p>
            <p className="text-sm text-gray-500">
                ※ Delivery는 스테이징 서버까지 자동 배포, Deployment는 프로덕션까지 자동 배포하는 것을 의미한다.
            </p>

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400 mt-10">왜 GitHub Actions가 중요한가?</h2>
            <p>
                수동으로 매번 <code>npm install</code>, <code>npm run build</code>, <code>docker build</code> 하는 일은
                <span className="text-red-500">귀찮고 실수도 많다</span>. <br/>
                GitHub Actions는 이런 작업을 <strong>자동화</strong>함으로써 개발자가 더 중요한 일에 집중할 수 있게 해준다.
            </p>


            <p className="mt-10">
                다음 글에서는 실제로 <strong>Vite로 만든 프론트엔드 앱</strong>을 GitHub Actions로 빌드해보는 예제를 다룬다.<br/>
                🛠️ 내가 만든 앱을 푸시만 해도 자동으로 빌드되고 배포되도록 만드는 여정을 시작한다.
            </p>
        </div>
    );
}