import React from "react";
import BlockCode from "../../components/BlockCode.jsx";

const Day4 = () => {
    return (
        <section className="space-y-10 text-gray-800 dark:text-gray-200">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500">
                Day 4 – 인프라 자동화 & 배포 실습
            </h1>

            <div className="space-y-6">
                <div>
                    <h2 className="text-xl font-semibold">📌 오늘의 목표</h2>
                    <ul className="list-disc list-inside">
                        <li>EC2에 Docker 설치 및 컨테이너 실행</li>
                        <li>Nginx 웹 서비스 컨테이너 배포</li>
                        <li>Dockerfile로 커스텀 이미지 제작</li>
                        <li>포트 설정 및 자동화 이해</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl font-semibold">📖 이론 학습</h2>
                    <ul className="list-disc list-inside">
                        <li><strong>Docker:</strong> 컨테이너 기반 가상화 기술</li>
                        <li><strong>이미지 vs 컨테이너:</strong> 이미지 → 실행 시 컨테이너</li>
                        <li><strong>Dockerfile:</strong> 이미지 빌드를 위한 명령 파일</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl font-semibold">🛠 실습</h2>
                    <ol className="list-decimal list-inside space-y-4">
                        <li>
                            <strong>Docker 설치</strong>
                            <BlockCode language="bash" code={`sudo apt update
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker`} />
                        </li>

                        <li>
                            <strong>Nginx 컨테이너 실행</strong>
                            <BlockCode language="bash" code={`sudo docker run -d -p 80:80 nginx`} />
                            <p>
                                퍼블릭 IP로 접속 시 Nginx 기본 페이지가 보여야 합니다.
                            </p>
                        </li>

                        <li>
                            <strong>커스텀 Dockerfile 작성</strong>
                            <BlockCode language="dockerfile" code={`FROM nginx
COPY index.html /usr/share/nginx/html/index.html`} />
                        </li>

                        <li>
                            <strong>이미지 빌드 및 컨테이너 실행</strong>
                            <BlockCode language="bash" code={`docker build -t mysite .
docker run -d -p 8080:80 mysite`} />
                        </li>

                        <li>
                            <strong>보안 그룹에서 포트 8080 열기</strong>
                            <p>EC2 보안 그룹 인바운드 규칙에 TCP 8080 추가</p>
                        </li>
                    </ol>
                </div>

                <div>
                    <h2 className="text-xl font-semibold">✅ 오늘 할 일</h2>
                    <ul className="list-disc list-inside">
                        <li>Docker 설치</li>
                        <li>Nginx 컨테이너 실행</li>
                        <li>커스텀 HTML 서비스 컨테이너 만들기</li>
                        <li>EC2에 Docker 이미지 배포 및 테스트</li>
                        <li>보안 그룹 설정 확인 (80, 8080)</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Day4;