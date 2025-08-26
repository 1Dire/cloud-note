import React from "react";
import LightboxViewer from "@/components/LightboxViewer";
import BlockCode from "@/components/BlockCode";

const Post9 = () => {
    return (
        <div className="prose prose-lg max-w-4xl mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                프론트엔드 ECS 배포 + ALB 연결
            </h1>

            <p>
                이번 포스트에서는 <strong>React (Vite)</strong> 기반 프론트엔드 애플리케이션을 <strong>AWS ECS Fargate</strong>에 배포하고, <strong>Application Load Balancer (ALB)</strong>를 통해 외부에서 접속할 수 있도록 설정한다.
            </p>

            <hr className="my-6" />

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400 mt-10">1. Dockerfile 작성</h2>
            <p>
                정적 파일을 빌드하고 <code>serve</code> 패키지를 이용해 실행하는 <strong>멀티 스테이지 Dockerfile</strong>이다:
            </p>
            <BlockCode language="dockerfile" code={`# 1단계: Vite 빌드용 Node 이미지
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2단계: serve로 정적 파일 서빙 (포트 80으로 수정)
FROM node:18
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist /app/dist
EXPOSE 80
CMD ["serve", "-s", "dist", "-l", "80"]`} />

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400 mt-10">2. ECR에 이미지 Push</h2>
            <p>
                먼저 <code>hansan-front</code>라는 이름으로 ECR 리포지토리를 생성했다.
            </p>
           <LightboxViewer src="../ecs/post9/1.png" alt="ECR 프론트 리포지토리" className="rounded-md shadow-md my-4" />

            <p>그 다음 아래 명령어로 이미지 빌드 및 푸시:</p>
            <BlockCode language="bash" code={`# ECR 로그인
aws ecr get-login-password \
  --region ap-northeast-2 \
  | docker login \
  --username AWS \
  --password-stdin 183695703260.dkr.ecr.ap-northeast-2.amazonaws.com

# 빌드 (M1/M2 사용자는 반드시 플랫폼 지정)
DOCKER_BUILDKIT=1 docker build --platform linux/amd64 -t hansan-front .

# 태깅
docker tag hansan-front:latest 183695703260.dkr.ecr.ap-northeast-2.amazonaws.com/hansan-front

# 푸시
docker push 183695703260.dkr.ecr.ap-northeast-2.amazonaws.com/hansan-front`} />

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400 mt-10">3. ECS 서비스 생성</h2>
            <ul className="list-disc pl-5">
                <li>클러스터: 기존 클러스터 선택</li>
                <li>서비스 유형: Fargate</li>
                <li>작업 정의: 프론트 태스크 정의 선택</li>
                <li>ALB: <strong>신규 ALB</strong> 또는 백엔드와 동일한 ALB 사용</li>
                <li>포트 매핑: 컨테이너 포트 <code>5173</code></li>
                <li>대상 그룹: 새로 생성 또는 기존에 연결</li>
            </ul>
           <LightboxViewer src="../ecs/post9/2.png" alt="ECS 프론트 서비스 생성" className="rounded-md shadow-md my-4" />

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400 mt-10">4. ALB 주소 확인 및 연동</h2>
            <p>
                ALB에 프론트용 대상 그룹을 연결하면 새로운 퍼블릭 도메인이 생성된다. 이 주소를 <code>VITE_API_BASE_URL</code>에서 사용할 수 있다.
            </p>
            <div className="border-l-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-600 p-4 my-6">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-300">🌐 예시</h4>
                <p>http://hansan-frontend-alb-123456.ap-northeast-2.elb.amazonaws.com</p>
            </div>

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400 mt-10">5. CORS 설정 점검</h2>
            <p>
                백엔드에서 해당 ALB 도메인을 CORS 허용했는지 확인해야 한다. Spring Security 설정에 아래와 같이 포함되어야 한다:
            </p>
            <BlockCode language="java" code={`config.setAllowedOrigins(Arrays.asList(
    "http://localhost:5173",
    "http://xx.xx.xx.xxx:5173",
    "http://hansan-frontend-alb-123456.ap-northeast-2.elb.amazonaws.com"
));`} />

            <div className="border-l-4 border-green-400 bg-green-50 dark:bg-green-950 dark:border-green-600 p-4 my-6">
                <h4 className="font-semibold text-green-800 dark:text-green-300">✅ 성공!</h4>
                <p>이제 프론트엔드도 ECS에 배포되어 외부에서 접근 가능한 상태가 되었다.</p>
            </div>
        </div>
    );
};

export default Post9;
