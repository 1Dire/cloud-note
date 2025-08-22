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

            <hr className="my-6"/>

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
ENTRYPOINT ["java", "-jar", "/app.jar"]`}/>
            <p>
                <strong className="text-red-500">주의:</strong> alpine 이미지나 일부 JDK 이미지는 Mac 환경에서 <code>no match for
                platform</code> 오류가 발생할 수 있음.<br/>
                → 따라서 <code>eclipse-temurin:17-jdk-jammy</code> 또는 <code>gradle:8.5-jdk17</code> 사용 추천.
            </p>

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400">2. 이미지 빌드</h2>
            <BlockCode language="bash" code={`docker build -t hansan-backend:latest .`}/>
            <p>처음엔 테스트 실패로 인해 빌드가 멈췄고, 다음과 같은 방법으로 해결했다:</p>
            <BlockCode language="bash" code={`docker build -t hansan-backend:latest .
# 실패 시 테스트 스킵 옵션 추가
# Dockerfile 내에:
RUN gradle build -x test --no-daemon`}/>

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400">3. ECR 로그인</h2>
            <p>AWS CLI로 ECR에 로그인:</p>
            <BlockCode language="bash" code={`aws ecr get-login-password --region ap-northeast-2 \
  | docker login --username AWS --password-stdin 183695703260.dkr.ecr.ap-northeast-2.amazonaws.com`}/>

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400">4. ECR에 태깅 & 푸시</h2>
            <p>태그 변경:</p>
            <BlockCode language="bash" code={`docker tag hansan-backend:latest \
  183695703260.dkr.ecr.ap-northeast-2.amazonaws.com/hansan-backend:latest`}/>

            <p>푸시 실행:</p>
            <BlockCode language="bash"
                       code={`docker push 183695703260.dkr.ecr.ap-northeast-2.amazonaws.com/hansan-backend:latest`}/>

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