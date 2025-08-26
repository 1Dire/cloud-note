import React from 'react';
import { FaGithub } from "react-icons/fa";

const frontendRepo = "https://github.com/1Dire/HansanPension-Front";
const backendRepo = "https://github.com/1Dire/HansanPension-Backend";

const Post1 = () => {
    return (
        <div className="prose prose-lg max-w-4xl mx-auto px-4 leading-relaxed tracking-wide dark:prose-invert">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-400 mb-3">
                클라우드를 배우기 시작한 계기와 나의 첫 배포 여정
            </h1>

            <p>
                클라우드를 공부하면서 자연스럽게 이런 생각이 들었다.
                <strong>“나도 직접 서비스를 클라우드에 배포해보고 싶다.”</strong>
            </p>

            <p>
                나는 지금까지 여러 개의 프론트엔드 프로젝트를 개발해왔지만,
                배포는 대부분 <strong>카페24 호스팅</strong>을 이용해왔다.
                간단하게 <strong>FTP로 파일을 업로드</strong>해 배포하는 방식이었고,
                초기에는 이 방법이 편리하고 저렴해서 자주 활용했다.
            </p>

            <p>
                하지만 서비스를 운영하면서
                <strong>서버 환경을 직접 수정해야 하는 상황</strong>이 종종 생겼고,
                그럴 때마다 카페24 환경은 <strong>권한이나 설정의 한계</strong>가 분명했다.
                “이런 건 내가 직접 제어할 수 있어야 하지 않나?”라는 생각이 들기 시작했다.
            </p>

            <p>
                그러다 “공부해야지”라고 몇 번을 다짐하다가,
                이번에는 진짜 <strong>클라우드 환경을 직접 경험해보자</strong>고 결심했다.
                아직은 초보지만, <strong>AWS</strong>를 중심으로 인프라를 다뤄보며
                서비스를 직접 배포해보는 것을 목표로 하고 있다.
            </p>

            <p>
                그리고 마침 현재 내가 운영 중인 <strong>펜션 예약 사이트</strong>가 있어서,
                이 서비스를 직접 클라우드에 배포하며
                <strong>공부한 내용을 기록</strong>하기로 했다.
            </p>

            <p>
                그래서 이번 배포에서는 단순히 AWS에 올리는 것만이 아니라,
                <strong>CI/CD까지 직접 구성해서 자동화된 배포 환경</strong>을 만들고자 한다.
            </p>

            <p>
                내가 코드를 수정해서 GitHub에 push하면,
                자동으로 <strong>Docker 이미지를 빌드하고, ECR에 푸시한 뒤 ECS에 반영되는 흐름</strong>을
                경험해보는 것이 목표다.
            </p>

            <p>
                지금부터 이 프로젝트의 배포 여정을 하나씩 정리해볼 계획이다.
                단순한 이론이 아닌, <strong>직접 구성하고 부딪히면서 배운 내용</strong>들을
                하나씩 글로 남기려고 한다.
            </p>

            <hr className="my-8" />
            <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">✅ 배포 대상</h2>

                <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 mb-12">
                    {/* 프론트엔드 카드 */}
                    <div className="border rounded-2xl p-6 shadow-md bg-gradient-to-br from-white to-slate-50 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700 transition">
                        <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-white">프론트엔드</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">React (Vite 기반)</p>
                        <a
                            href={frontendRepo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition text-sm"
                        >
                            <FaGithub /> GitHub 저장소
                        </a>
                    </div>

                    {/* 백엔드 카드 */}
                    <div className="border rounded-2xl p-6 shadow-md bg-gradient-to-br from-white to-slate-50 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700 transition">
                        <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-white">백엔드</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Spring Boot (REST API)</p>
                        <a
                            href={backendRepo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition text-sm"
                        >
                            <FaGithub /> GitHub 저장소
                        </a>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">🧱 아키텍처 설계</h2>

                <p>
                    배포할 프론트엔드와 백엔드 앱이 정리된 후,
                    전체 인프라 아키텍처를 어떻게 구성할지 고민했다.
                    처음부터 거창하게 설계하기보단,
                    <strong>간단하면서도 실제 서비스처럼 동작하는 구조</strong>를 목표로 했다.
                </p>

                <div className="not-prose mt-6 mb-8 border-l-4 border-indigo-400 dark:border-sky-500 pl-4 py-3 bg-slate-50 dark:bg-gray-800 rounded-md shadow-sm">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">📦 구성 요소</p>
                    <ul className="list-disc pl-5 text-sm text-gray-800 dark:text-gray-200">
                        <li><strong>Frontend:</strong> React + Vite → Docker → ECR → ECS (Fargate) → ALB</li>
                        <li><strong>Backend:</strong> Spring Boot → Docker → ECR → ECS (Fargate)</li>
                        <li><strong>Database:</strong> Amazon RDS (PostgreSQL)</li>
                        <li><strong>Routing:</strong> Route53 + ACM → HTTPS 도메인 연결</li>
                        <li><strong>CI/CD:</strong> GitHub Actions를 통한 자동 배포</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">🚀 배포 순서</h2>

                    <ol className="list-decimal pl-5 mt-4 space-y-2 text-gray-800 dark:text-gray-200">
                        <li>
                            <strong>프로젝트 정리:</strong> React (Vite) 프론트엔드 & Spring Boot 백엔드 레포지토리 구성 확인
                        </li>
                        <li>
                            <strong>Docker 설정:</strong> 각각 Dockerfile 작성 및 로컬에서 빌드 테스트
                        </li>
                        <li>
                            <strong>AWS ECR 생성:</strong> 프론트엔드, 백엔드용 각각의 리포지토리 생성
                        </li>
                        <li>
                            <strong>AWS ECS (Fargate) 서비스 구성:</strong> ECS 클러스터, 서비스, 태스크 정의
                        </li>
                        <li>
                            <strong>RDS(PostgreSQL) 생성:</strong> 백엔드에서 접근 가능한 데이터베이스 설정
                        </li>
                        <li>
                            <strong>도메인 연결:</strong> Route53 도메인 구매/연결 + ACM 인증서 발급 후 HTTPS 적용
                        </li>
                        <li>
                            <strong>GitHub Actions 구성:</strong> push 시 자동 빌드 & ECR 배포 & ECS 업데이트 자동화
                        </li>
                        <li>
                            <strong>배포 테스트:</strong> 배포 완료 후 API 및 웹사이트 정상 작동 확인
                        </li>
                    </ol>

                    <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
                        👉 위 과정은 모두 Hands-on으로 실습하며, 각각의 단계는 이후 포스트에서 상세히 정리해볼 예정입니다.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Post1;