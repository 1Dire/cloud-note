import React from "react";
import BlockCode from "@/components/BlockCode";
import LightboxViewer from "@/components/LightboxViewer";

export default function Post2() {
    return (
        <div className="prose prose-lg mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide w-full max-w-4xl lg:w-4xl">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                GitHub Actions로 프론트엔드 자동 빌드 설정하기
            </h1>

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400 mt-10">🛠️ Step 0: Vite 프로젝트 생성</h2>
            <p>자동화 이전에 먼저 프론트엔드 프로젝트부터 시작해보자. Vite + React 환경 기준이다.</p>

            <BlockCode language="bash" code={`
npm create vite@latest test --template react
cd test
npm install
npm run dev
`}/>

            <p>
                브라우저에서 <code>http://localhost:5173</code> 으로 접속해 정상 작동하는지 확인하면 OK!
                이후 GitHub에 이 코드를 푸시해놓고 CI 설정을 진행하면 된다.
            </p>

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400 mt-10">⚙️ Step 1: GitHub Actions 설정 파일 만들기</h2>
            <p>
                이제 자동화를 위한 GitHub Actions 설정 파일을 생성하자. <code>.github/workflows/frontend.yml</code> 파일을 만들고 아래처럼 작성한다.
            </p>

            <BlockCode language="yaml" code={`
name: Frontend CI

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build
`}/>

            <p>
                위 설정은 다음과 같은 역할을 한다:
            </p>
            <ul className="list-disc pl-6">
                <li><strong>on.push.branches</strong>: main 브랜치에 푸시될 때만 실행</li>
                <li><strong>runs-on</strong>: 우분투 최신 환경에서 실행</li>
                <li><strong>actions/checkout</strong>: GitHub 레포 코드를 워크플로우 환경에 다운로드</li>
                <li><strong>setup-node</strong>: Node.js 환경 구성</li>
                <li><strong>npm install / npm run build</strong>: 실제 빌드 과정 수행</li>
            </ul>

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400 mt-10">🚀 실행 흐름</h2>
            <ol className="list-decimal pl-6">
                <li>main 브랜치에 코드가 push되면</li>
                <li>GitHub Actions가 Ubuntu 가상환경을 실행하고</li>
                <li>코드를 가져와서 npm install → npm run build를 자동 수행</li>
                <li>성공 여부를 GitHub Actions 탭에서 확인 가능</li>
            </ol>

            <p>
                결과는 GitHub 레포의 <a href="https://github.com/1Dire/gitAction/actions" target="_blank" className="text-blue-600 underline">Actions 탭</a>에서 실시간 확인 가능하다.
                빌드가 실패할 경우 로그를 통해 어떤 단계에서 오류가 발생했는지 바로 파악할 수 있다.
            </p>

            <LightboxViewer src="../gitAction/post2/1.png" alt="GitHub Actions 빌드 성공 장면" />

            <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mt-10">🧨 실패 테스트 실습: 의도적으로 에러 내보기</h2>
            <p>
                빌드 실패가 어떻게 기록되는지 보고 싶다면, <code>npm run build</code> 대신 존재하지 않는 명령어를 실행하게 설정해보자.
            </p>

            <BlockCode language="yaml" code={`
# .github/workflows/frontend.yml (수정 예시)
      - name: Build project
        run: npm run wrongcommand
`}/>

            <p>
                이처럼 <code>npm run wrongcommand</code>는 실제로 존재하지 않는 스크립트이므로 다음과 같은 에러가 발생한다:
            </p>

            <BlockCode language="text" code={`
npm ERR! Missing script: "wrongcommand"
npm ERR! A complete log of this run can be found in...
`}/>

            <p>
                실패 결과는 Actions 탭에 붉은색 '❌'로 표시되며, 로그를 클릭하면 실패 원인을 직접 확인할 수 있다. 테스트 후에는 다시 <code>npm run build</code>로 복구하자.
            </p>

            <LightboxViewer src="../gitAction/post2/2.png" alt="빌드 실패 장면" />

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400 mt-10">✅ 정리</h2>
            <ul className="list-disc pl-6">
                <li>Vite로 프로젝트 생성 후 GitHub에 푸시</li>
                <li><code>.github/workflows</code> 폴더에 yml 파일 생성</li>
                <li>빌드 및 실패 흐름 테스트까지 완료</li>
            </ul>

            <p>
                다음 포스트에서는 이 빌드 결과물을 <strong>Docker 이미지로 만들고 AWS ECR에 업로드</strong>하는 CD(지속적 배포) 흐름으로 넘어간다.
            </p>
        </div>
    );
}