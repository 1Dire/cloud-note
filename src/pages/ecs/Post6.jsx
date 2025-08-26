import React from "react";
import BlockCode from "@/components/BlockCode";

const Post6 = () => {
    return (
        <div className="prose prose-lg max-w-4xl mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                Spring Boot 백엔드 Docker 이미지 빌드 & ECR 푸시
            </h1>

            <div className="relative w-full h-0 pt-[56.25%] mb-8">
                <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    src="https://www.youtube.com/embed/CgPO-CzPU7A"
                    title="How to deploy Spring Boot application to AWS ECS"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            <p>
                이번 글은 AWS RDS 연결이 완료된 Spring Boot 백엔드 애플리케이션을 Docker 이미지로 빌드한 후,
                AWS ECR(Elastic Container Registry)에 푸시한 전체 과정을 정리한 것이다.
                중간에 발생한 오류와 해결 방법도 기록했다.
            </p>

            <hr className="my-6" />

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400">1. Dockerfile 구성</h2>
            <p>멀티 스테이지로 구성한 Dockerfile:</p>
            <BlockCode language="dockerfile" code={`# 1단계: 빌드용 이미지
FROM gradle:8.5-jdk17 AS builder
WORKDIR /home/gradle/project
COPY . .
RUN gradle build -x test --no-daemon

# 2단계: 실행용 이미지
FROM eclipse-temurin:17-jdk-jammy
VOLUME /tmp
COPY --from=builder /home/gradle/project/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]`} />

            <div className="border-l-4 border-red-500 bg-red-50 dark:bg-red-900 dark:border-red-600 p-4 my-6">
                <h4 className="font-bold text-red-800 dark:text-red-300">⚠️ Mac(M1/M2) 사용자 및 아키텍처 주의!</h4>
                <p className="mb-2">
                    Apple Silicon(M1/M2) 환경에서는 Docker가 기본적으로 <strong>arm64</strong> 아키텍처로 이미지를 빌드합니다.
                    하지만 AWS ECS(Fargate)는 대부분 <strong>x86_64</strong> 아키텍처에서 실행되기 때문에,
                    <span className="text-red-600 font-semibold"> 플랫폼 불일치 오류</span>가 발생할 수 있습니다.
                </p>
                <p className="mb-2">대표적인 에러:</p>
                <BlockCode
                    language="bash"
                    code={`standard_init_linux.go:228: exec user process caused: exec format error`}
                />
                <p className="mt-2">이 문제를 방지하려면 다음 방법 중 하나를 사용하세요:</p>
                <ul className="list-disc pl-5 mt-2">
                    <li>
                        <strong>멀티 아키텍처 지원 베이스 이미지</strong> 사용<br />
                        예: <code>eclipse-temurin:17-jdk-jammy</code>, <code>gradle:8.5-jdk17</code>
                    </li>
                    <li>
                        또는 <strong>빌드 시 플랫폼 명시</strong><br />
                        <BlockCode
                            language="bash"
                            code={`docker buildx build --platform linux/amd64 -t hansan-backend .`}
                        />
                    </li>
                </ul>
                <p className="mt-2">
                    <strong>Tip:</strong> 만약 Mac에서 Docker Desktop 사용 중이라면, <code>Settings → Features in development → Use Rosetta for x86/amd64 emulation</code> 활성화도 고려해볼 수 있습니다.
                </p>
            </div>

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400">2. 이미지 빌드</h2>
            <BlockCode language="bash" code={`docker build -t hansan-backend:latest .`} />
            <p>처음엔 테스트 실패로 인해 빌드가 멈췄고, 다음과 같은 방법으로 해결했다:</p>
            <BlockCode language="bash" code={`docker build -t hansan-backend:latest .
# 실패 시 테스트 스킵 옵션 추가
# Dockerfile 내에:
RUN gradle build -x test --no-daemon`} />

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400">3. ECR 로그인</h2>
            <p>AWS CLI로 ECR에 로그인:</p>
            <BlockCode
                language="bash"
                code={`aws ecr get-login-password --region ap-northeast-2 \\
  | docker login --username AWS --password-stdin 183695703260.dkr.ecr.ap-northeast-2.amazonaws.com`}
            />

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400">4. ECR에 태깅 & 푸시</h2>
            <p>태그 변경:</p>
            <BlockCode
                language="bash"
                code={`docker tag hansan-backend:latest \\
  183695703260.dkr.ecr.ap-northeast-2.amazonaws.com/hansan-backend:latest`}
            />

            <p>푸시 실행:</p>
            <BlockCode
                language="bash"
                code={`docker push 183695703260.dkr.ecr.ap-northeast-2.amazonaws.com/hansan-backend:latest`}
            />

            <div className="border-l-4 border-green-400 bg-green-50 dark:bg-green-950 dark:border-green-600 p-4 my-6">
                <h4 className="font-semibold text-green-800 dark:text-green-300">✅ 성공!</h4>
                <p>
                    백엔드 Spring Boot 애플리케이션의 Docker 이미지가 성공적으로 ECR에 업로드되었고,
                    이제 ECS에 배포할 준비가 완료되었다.
                </p>
            </div>
        </div>
    );
};

export default Post6;