import React from "react";
import BlockCode from "@/components/BlockCode";
import LightboxViewer from "@/components/LightboxViewer.jsx";

const DockerSetup = () => {
    return (
        <div className="prose prose-lg max-w-4xl mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">🐳 Docker 설정</h2>

            <p>
                이번엔 프론트엔드랑 백엔드를 도커로 묶어보기로 했다. 아무래도 AWS에 배포하려면 컨테이너로
                관리하는 게 가장 깔끔하고 확장성도 좋아 보였다. 그래서 각각 Dockerfile을 만들었고, 일단은 ECR에 올려서 Fargate로 돌릴 계획이다.
            </p>

            <hr className="my-6"/>
            <div>
                <h3 className="text-xl font-semibold text-indigo-600 dark:text-sky-400">프론트엔드 (React + Vite)</h3>

                <p>
                    프론트는 Vite 기반이라 빌드가 빠르다. 정적 파일로 만들어서 <code>serve</code>로 띄우는
                    방식으로 구성했다. 다단계로 나눠서 빌드 이미지와 실행 이미지를 따로 나눴다.
                </p>

                <BlockCode language="dockerfile">
                    {`# 1단계: Vite 빌드용 Node 이미지
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2단계: serve로 정적 파일 서빙
FROM node:18
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist /app/dist
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]`}
                </BlockCode>

                <p>
                    serve는 간단하게 정적 파일을 서빙하기 좋은 툴이라서 Vite랑 궁합이 잘 맞는다.
                    SPA라서 라우팅도 알아서 처리해줘서 더 편했었다.
                </p>

                <hr className="my-6"/>

                <h3 className="text-xl font-semibold text-green-600 dark:text-emerald-400">백엔드 (Spring Boot)</h3>

                <p>
                    백엔드는 말 그대로 jar 하나 만들고 실행하면 끝이다. 빌드된 jar만 있으면 실행은 정말 단순하다.
                </p>

                <BlockCode language="dockerfile">
                    {`FROM openjdk:17-jdk-slim
WORKDIR /app
COPY build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]`}
                </BlockCode>

                <p>
                    물론 이걸 쓰려면 먼저 jar를 만들어야 하니까, 빌드는 따로 해줘야 한다. 나는 Gradle을 쓰지만 Maven도 비슷하다.
                </p>

                <BlockCode language="bash">
                    {`# Gradle 사용 시
./gradlew build`}
                </BlockCode>

                <BlockCode language="bash">
                    {`# Maven 사용 시
./mvnw package`}
                </BlockCode>

                <p>
                    이렇게 만들면 프론트랑 백엔드 둘 다 이미지가 생기고, 그걸 ECR에 올려서 ECS에 연결하면 된다.
                    배포는 이제 CI/CD로 묶을 예정이다.
                </p>
            </div>


            <hr className="my-6"/>
            <div>
                <h3 className="text-xl font-semibold text-indigo-600 dark:text-sky-400">프론트 실행</h3>

                <p>프론트는 먼저 Dockerfile 만든 다음에 아래처럼 빌드했음:</p>
                <BlockCode language="bash">{`docker build -t hansan-frontend .`}</BlockCode>

                <p>그런데 실행하려다보니 포트 충돌 나거나 이름 중복 에러가 계속 났다.</p>

                <h4 className="text-lg font-semibold my-3">에러 해결 과정</h4>
                <p>처음에 나왔던 에러 메시지:</p>
                <BlockCode language="bash">
                    {`docker: Error response from daemon: Conflict. The container name "/hansan-frontend" is already in use...`}
                </BlockCode>

                <p>그래서 이미 있는 컨테이너 삭제하거나 이름 바꿔야 했고, 그냥 이렇게 실행했다.</p>
                <BlockCode language="bash">
                    {`docker run -d --name hansan-frontend -p 5173:5173 hansan-frontend`}
                </BlockCode>

                <p>잘 떴는지 확인하려고 <code>docker ps</code>로 체크:</p>
                <BlockCode language="bash">
                    {`CONTAINER ID   IMAGE             ...   PORTS                    NAMES
0d0650d87395   hansan-frontend   ...   0.0.0.0:5173->5173/tcp   hansan-frontend`}
                </BlockCode>

                <p>
                    이제 로컬에서 <strong>http://localhost:5173</strong> 으로 접속 가능하고,
                    같은 와이파이 쓰는 다른 기기에서도 <strong>http://192.168.xx.xx:5173</strong>으로 접속 가능하다.
                </p>
                <LightboxViewer src="blogs/post2/1.png" alt="인스턴스 시작 버튼" />
            </div>


            <hr className="my-8"/>
            <div>
                <h2 className="text-xl font-semibold text-green-600 dark:text-emerald-400">백엔드 도커 실행 및 네트워크 구성</h2>
                <p>PostgreSQL을 같이 띄우고 백엔드에서 연결하려면 Docker 네트워크를 따로 만들었다:</p>
                <BlockCode language="bash">{`docker network create hansan-net`}</BlockCode>

                <p>그리고 PostgreSQL 컨테이너도 이렇게 실행:</p>
                <BlockCode
                    language="bash">{`docker run -d --name hansan-db --network hansan-net -p 5432:5432 postgres:14`}</BlockCode>

                <p>application.yml에서 DB 주소를 <code>localhost</code>가 아니라 컨테이너 이름인 <code>hansan-db</code>로 바꿔줬다:</p>
                <BlockCode language="yaml">{`spring:
  datasource:
    url: jdbc:postgresql://hansan-db:5432/hansanpension_db
    username: admin
    password: admin
    driver-class-name: org.postgresql.Driver`}</BlockCode>

                <p>그리고 백엔드를 네트워크에 연결해 실행:</p>
                <BlockCode
                    language="bash">{`docker run -d --name hansan-backend --network hansan-net -p 8080:8080 hansan-backend`}</BlockCode>

                <p>기존 컨테이너가 이미 있어서 에러가 나길래, 중복 컨테이너 삭제 후 다시 실행함:</p>
                <BlockCode language="bash">{`docker rm -f hansan-backend`}</BlockCode>

                <p>만약 빌드 실패 시 테스트 오류 때문일 수 있으니, 테스트 생략해서 빌드할 수도 있다:</p>
                <BlockCode language="bash">{`./gradlew build -x test`}</BlockCode>


            </div>

            <hr className="my-8"/>
            <div>
                <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400">🛠 로컬 PostgreSQL → Docker
                    PostgreSQL로 데이터 이전</h2>

                <p>로컬에서 쓰던 PostgreSQL 데이터를 Docker 컨테이너로 옮기기 위해 덤프 파일을 만들었다:</p>
                <BlockCode
                    language="bash">{`pg_dump -U admin -h localhost -p 5432 -d hansanpension_db > hansan_dump.sql`}</BlockCode>

                <p>덤프 파일은 명령어 실행한 위치 기준으로 저장된다. 나는 홈 디렉토리에서 실행했기 때문에 <code>~/hansan_dump.sql</code>에 저장되었음.</p>

                <p>이제 이 덤프 파일을 Docker 컨테이너 안으로 복사한다:</p>
                <BlockCode language="bash">{`docker cp ~/hansan_dump.sql hansan-db:/hansan_dump.sql`}</BlockCode>

                <p>컨테이너에 들어가서 DB에 복원:</p>
                <BlockCode language="bash">{`docker exec -it hansan-db bash`}</BlockCode>

                <BlockCode language="bash">{`psql -U admin -d hansanpension_db -f /hansan_dump.sql`}</BlockCode>

                <p>테이블이 잘 들어갔는지 확인하려면:</p>
                <BlockCode language="bash">{`psql -U admin -d hansanpension_db`}</BlockCode>
                <BlockCode language="psql">{`\dt`}</BlockCode>

                <p>복원 후에는 dump 파일을 컨테이너에서 삭제해도 된다:</p>
                <BlockCode language="bash">{`rm /hansan_dump.sql`}</BlockCode>
            </div>


            <p>이제 프론트와 백앤드 모두 컨테이너로 잘 뜨고, 정상적으로 앱이 작동하는걸 볼수있다. 다음은 ECR 푸시 & ECS 배포다!</p>
        </div>
    );
};

export default DockerSetup;