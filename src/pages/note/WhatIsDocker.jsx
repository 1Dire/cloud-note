import React from "react";
import InlineCode from "../../components/InlineCode.jsx";
import BlockCode from "../../components/BlockCode.jsx";
import Tags from "../../components/Tags.jsx";

const WhatIsDocker = () => {
    const tags = ["Docker", "이미지", "컨테이너", "볼륨", "명령어"];

    return (<section className="space-y-10 text-gray-800 dark:text-gray-200 leading-relaxed">
        <h1 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-sky-500">
            도커 핵심 개념 정리
        </h1>

        <div className="flex flex-wrap gap-2 mb-6">
            <Tags tags={tags}/>
        </div>

        <div>
            <h2 className="text-2xl font-semibold">이미지(Image)란?</h2>
            <p>도커 이미지란 컨테이너를 실행하기 위한 모든 파일, 환경 설정, 실행 정보 등을 포함한 불변의 템플릿이다. 하나의 이미지로 여러 개의 컨테이너를 만들 수 있다.</p>
        </div>

        <div>
            <h2 className="text-2xl font-semibold">컨테이너(Container)란?</h2>
            <p>이미지를 기반으로 실행된 독립된 환경이며, 가상 머신보다 가볍고 빠르다. 호스트 시스템 커널을 공유한다.</p>
        </div>

        <div>
            <h2 className="text-2xl font-semibold">주요 Docker 명령어</h2>
            <BlockCode>
                {`docker build -t myapp .        # 도커 이미지 생성
docker images                  # 이미지 목록 확인
docker run -p 3000:3000 myapp  # 컨테이너 실행 (포트 매핑)
docker ps                      # 실행 중인 컨테이너 확인
docker stop [컨테이너ID]      # 컨테이너 중지
docker rm [컨테이너ID]        # 컨테이너 삭제
docker rmi [이미지ID]         # 이미지 삭제`}
            </BlockCode>
        </div>

        <div>
            <h2 className="text-2xl font-semibold">도커에 파일 복사하기</h2>
            <p>로컬 파일을 컨테이너 내부로 복사할 수 있다.</p>
            <BlockCode>
                {`docker cp ./app/config.json mycontainer:/usr/src/app/config.json`}
            </BlockCode>
        </div>

        <div>
            <h2 className="text-2xl font-semibold">도커 볼륨(Volume)과 마운트(Mount)</h2>
            <p>도커 볼륨은 컨테이너 외부에 데이터를 저장하여 영속성을 유지하는 방식이며, 바인드 마운트는 호스트 디렉터리를 직접 연결해 실시간 파일 공유가 가능하다.</p>
            <BlockCode>
                {`docker run -v /host/path:/container/path myapp`}
            </BlockCode>
        </div>

        <div>
            <h2 className="text-2xl font-semibold">데이터 퍼시스턴시(Data Persistence)</h2>
            <p>애플리케이션이 종료되어도 데이터를 유지하는 개념으로, 도커에서는 볼륨이나 마운트를 통해 구현한다.</p>
        </div>

        <div>
            <h2 className="text-2xl font-semibold">도커 볼륨 생성 및 관리</h2>
            <BlockCode>
                {`docker volume create myvolume

docker run -v myvolume:/app/data myapp`}
            </BlockCode>
            <BlockCode>
                {`# 볼륨 명령어
create   # 볼륨 생성
inspect  # 상세 정보 확인
ls       # 목록 출력
rm       # 삭제`}
            </BlockCode>
        </div>

        <div>
            <h2 className="text-2xl font-semibold">Dockerfile 주요 인스트럭션</h2>
            <p>도커 이미지를 정의할 때 사용되는 명령어</p>
            <BlockCode>
                {`FROM node:18-alpine
RUN npm install
COPY . /app
CMD ["node", "app.js"]
EXPOSE 3000
ENV NODE_ENV=production`}
            </BlockCode>
        </div>

        <div>
            <h2 className="text-2xl font-semibold">도커 컴포즈(Docker Compose)</h2>
            <p>여러 컨테이너를 정의하고 동시에 실행할 수 있는 도구. <InlineCode>docker-compose.yml</InlineCode> 파일로 설정 관리</p>
            <BlockCode>
                {`version: '3.8'
services:
  web:
    image: nginx
    ports:
      - "8080:80"
  app:
    build: .
    volumes:
      - .:/app
    depends_on:
      - db
  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: example`}
            </BlockCode>
        </div>

        <div>
            <h2 className="text-2xl font-semibold">도커 컴포즈 명령어</h2>
            <BlockCode>
                {`docker-compose up     # 모든 서비스 시작
docker-compose down   # 모든 서비스 중지 및 네트워크 제거
docker-compose ps     # 상태 확인
docker-compose logs   # 로그 출력
docker-compose build  # 이미지 빌드`}
            </BlockCode>
        </div>


    </section>);
};

export default WhatIsDocker;
