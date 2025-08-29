import React from "react";
import BlockCode from "@/components/BlockCode";
import LightboxViewer from "@/components/LightboxViewer";

export default function Post3() {
    return (
        <div className="prose prose-lg mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide w-full max-w-4xl lg:w-4xl">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                GitHub Actions로 Docker 이미지 빌드 및 AWS ECR 푸시하기
            </h1>

            <p>
                지난 포스트에서 GitHub Actions를 이용한 <strong>자동 빌드</strong>까지 완료했다면, 이제는 다음 단계인 <strong>Docker 이미지 빌드 &gt; AWS ECR 푸시</strong>로 이어질 차례다.
            </p>

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400 mt-10">🐳 Step 1: Dockerfile 작성</h2>
            <p>
                먼저 루트 디렉토리에 아래와 같은 <code>Dockerfile</code>을 작성하자. Vite로 빌드한 정적 파일을 <code>node</code> 또는 <code>nginx</code> 서버에서 서빙하는 방식이다.
            </p>

            <BlockCode language="dockerfile" code={`
# 1단계: 빌드
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# 2단계: 정적 파일 서빙
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
`}/>

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400 mt-10">🗂️ Step 2: GitHub Secrets 등록</h2>
            <p>
                GitHub Actions가 AWS CLI를 사용해 로그인하려면 다음과 같은 정보가 필요하다.
            </p>
            <ul className="list-disc pl-6">
                <li><code>AWS_ACCESS_KEY_ID</code></li>
                <li><code>AWS_SECRET_ACCESS_KEY</code></li>
                <li><code>AWS_REGION</code></li>
                <li><code>ECR_REGISTRY</code> (예: <code>123456789012.dkr.ecr.ap-northeast-2.amazonaws.com</code>)</li>
                <li><code>ECR_REPOSITORY</code> (예: <code>test</code>)</li>
            </ul>
            <p>
                GitHub 레포지토리의 <strong>Settings &gt; Secrets and variables &gt; Actions</strong> 메뉴에서 위 값을 등록해두자.
            </p>

            <LightboxViewer src="../gitAction/post3/2.png" alt="GitHub Secrets 설정" />

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400 mt-10">⚙️ Step 3: GitHub Actions 수정</h2>
            <p>
                <code>.github/workflows/docker-ecr.yml</code> 파일을 만들고 아래처럼 작성한다.
            </p>

            <BlockCode language="yaml" code={`
name: Build & Push Docker to ECR

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: \${{ secrets.AWS_REGION }}

      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v1

      - name: Build, tag, and push image to ECR
        env:
          ECR_REGISTRY: \${{ secrets.ECR_REGISTRY }}
          ECR_REPOSITORY: \${{ secrets.ECR_REPOSITORY }}
        run: |
          docker build -t \$ECR_REPOSITORY .
          docker tag \$ECR_REPOSITORY:latest \$ECR_REGISTRY/\$ECR_REPOSITORY:latest
          docker push \$ECR_REGISTRY/\$ECR_REPOSITORY:latest
`}/>

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400 mt-10">📦 빌드 결과</h2>
            <p>
                정상적으로 작동하면 GitHub Actions 탭에서 아래와 같은 로그를 볼 수 있다. 마지막 단계에 <code>docker push</code> 성공 메시지가 뜨면 OK!
            </p>

            <LightboxViewer src="../gitAction/post3/3.png" alt="Docker 이미지 ECR 푸시 성공 로그" />

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400 mt-10">✅ 정리</h2>
            <ul className="list-disc pl-6">
                <li>Dockerfile을 작성해 정적 파일을 이미지로 빌드</li>
                <li>GitHub Secrets에 AWS 정보 등록</li>
                <li>GitHub Actions로 Docker 이미지 빌드 &gt; ECR에 푸시</li>
                <li>ECR에 이미지를 푸시하면 ECS에서 가져다 쓸 수 있음</li>
            </ul>

            <p>
                이제  GitHub에 코드를 푸시하기만 해도 <strong>자동으로 Docker 이미지가 만들어지고</strong>,
                <strong>AWS ECR로 배포</strong>되는 구조를 갖추게 되었다.
                다음 포스트에서는 <strong>ECS(Fargate)를 이용해 이 이미지를 자동으로 서비스하는 방법</strong>을 이어서 다룰 예정이다.
            </p>
        </div>
    );
}