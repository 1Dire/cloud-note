import React from "react";
import LightboxViewer from "../../components/LightboxViewer.jsx";

const Post7 = () => {
    return (
        <div className="prose prose-lg max-w-4xl mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                AWS ECS + Spring Boot 배포 튜토리얼
            </h1>
            <p>
                이 포스트는 Docker로 빌드한 Spring Boot 백엔드 이미지를
                AWS ECS (Fargate) 기반으로 실행하는 전체 과정을 담고 있다.
                이전 포스트에서 ECR에 이미지를 업로드한 상태에서 시작했다.
            </p>

            {/* 유튜브 영상 */}
            <div className="relative w-full h-0 pt-[56.25%] mb-8">
                <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    src="https://www.youtube.com/embed/edFpM7PcFg8"
                    title="Deploy SpringBoot Microservice on AWS ECS"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            <hr className="my-6"/>

            {/* 1. ECS 클러스터 생성 */}
            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400 mt-10">
                1. ECS 클러스터 생성
            </h2>
            <p>
                AWS 콘솔에서 ECS로 이동한 다음, <strong>“클러스터 생성”</strong> 버튼을 클릭한다.
            </p>
            <LightboxViewer src="blogs/post7/1.png" alt="ECS에서 클러스터 생성 버튼" className="rounded-md shadow-md my-4"/>
            <LightboxViewer src="blogs/post7/2.png" alt="Fargate 네트워킹 전용 클러스터 선택"
                            className="rounded-md shadow-md my-4"/>
            <p>
                클러스터 이름은 역할에 따라 명확하게 지정하는 것을 추천한다.
                예: <code>hansan-backend-cluster</code>, <code>hansan-frontend-cluster</code>
            </p>
            <LightboxViewer src="blogs/post7/3.png" alt="클러스터 이름 지정" className="rounded-md shadow-md my-4"/>
            <p>나머지 설정은 기본값으로 두고 생성하면 완료된다.</p>
            <LightboxViewer src="blogs/post7/4.png" alt="클러스터 생성 완료" className="rounded-md shadow-md my-4"/>

            {/* 클러스터 설명 */}
            <div
                className="border-l-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-700 p-4 my-6">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-300">📦 클러스터란?</h4>
                <p>
                    <strong>클러스터(Cluster)</strong>는 ECS에서 <strong>작업(Task)들을 그룹화</strong>하는 논리적인 단위이다.
                    쉽게 말하면, ECS에서 어떤 작업들이 실행될 “환경”을 정의하는 개념이다.
                </p>
                <ul className="list-disc pl-5 mt-2">
                    <li>Fargate 또는 EC2 방식 선택 가능</li>
                    <li>하나의 클러스터 안에 여러 서비스 또는 작업 정의 포함 가능</li>
                    <li>우리는 Fargate 기반으로 실행</li>
                </ul>
            </div>

            {/* 태스크 정의 설명 */}
            <div
                className="border-l-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-700 p-4 my-6">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-300">⚙️ 태스크 정의(Task Definition)란?</h4>
                <p>
                    ECS에서 컨테이너를 실행하기 위한 청사진 같은 설정 파일이다. 이미지, 포트, 환경 변수, 자원 등을 정의한다.
                </p>
                <ul className="list-disc pl-5 mt-2">
                    <li>도커 이미지 경로, 컨테이너 이름, 포트 설정 포함</li>
                    <li>이 정의를 기반으로 실제 태스크가 생성됨</li>
                    <li>하나의 정의에 여러 컨테이너 포함 가능</li>
                </ul>
            </div>

            {/* 2. 태스크 정의 */}
            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400 mt-10">
                2. 태스크 정의
            </h2>
            <p>“태스크 정의” 메뉴 클릭 후, “태스크 정의 생성”을 선택한다.</p>
            <LightboxViewer src="blogs/post7/5.png" alt="테스크 정의 메뉴" className="rounded-md shadow-md my-4"/>
            <LightboxViewer src="blogs/post7/6.png" alt="테스크 정의 생성" className="rounded-md shadow-md my-4"/>
            <p>패밀리 이름은 <code>hansan-backend</code>로 지정한다.</p>
            <LightboxViewer src="blogs/post7/7.png" alt="태스크 정의 이름" className="rounded-md shadow-md my-4"/>
            <p>
                컨테이너 이름도 동일하게 설정하고, ECR에서 복사한 이미지 URI를 입력한다.
            </p>
            <LightboxViewer src="blogs/post7/8.png" alt="컨테이너 이미지 입력" className="rounded-md shadow-md my-4"/>
            <LightboxViewer src="blogs/post7/9.png" alt="ECR 이미지 복사" className="rounded-md shadow-md my-4"/>

            <p>
                <strong>application.yml</strong>에서 사용하는 환경 변수(DB 정보, JWT_SECRET 등)를 등록한다.
            </p>
            <LightboxViewer src="blogs/post7/10.png" alt="환경 변수 설정" className="rounded-md shadow-md my-4"/>
            <p>보안을 위해 이후에는 <code>AWS Secrets Manager</code>를 사용하는 것이 좋다.</p>

            <LightboxViewer src="blogs/post7/11.png" alt="태스크 정의 생성 완료" className="rounded-md shadow-md my-4"/>

            {/* 3. ECS 서비스 생성 */}
            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400 mt-10">
                3. ECS 서비스 생성
            </h2>
            <p>다시 클러스터 상세 화면으로 돌아와 "서비스 생성"을 클릭한다.</p>
            <LightboxViewer src="blogs/post7/12.png" alt="클러스터 화면" className="rounded-md shadow-md my-4"/>
            <LightboxViewer src="blogs/post7/13.png" alt="서비스 생성 입력" className="rounded-md shadow-md my-4"/>
            <LightboxViewer src="blogs/post7/14.png" alt="서비스 유형 선택" className="rounded-md shadow-md my-4"/>

            {/* 4. 네트워크 설정 */}
            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400 mt-10">
                4. 네트워킹 설정
            </h2>
            <p>“네트워킹” 탭에서는 다음과 같이 설정한다:</p>
            <ul className="list-disc pl-5">
                <li>VPC는 기존에 생성한 VPC 선택</li>
                <li>서브넷은 서로 다른 가용영역의 2개 이상 선택 (예: 2a, 2b)</li>
                <li>보안 그룹은 <code>sg-xxxxx</code> 선택 – 8080, 5432 포트 인바운드 허용 필요</li>
                <li>퍼블릭 IP는 <code>켜짐</code>으로 설정</li>
            </ul>
            <LightboxViewer src="blogs/post7/15.png" alt="네트워크 설정 전체 화면" className="rounded-md shadow-md my-4"/>
            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400 mt-10">
                5. 배포 완료!
            </h2>
            <LightboxViewer src="blogs/post7/16.png" alt="배포완료" className="rounded-md shadow-md my-4"/>
            {/* 5. ALB 연결 (다음 단계 예고) */}
            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400 mt-10">
                🟢 다음 단계: ALB (로드 밸런서) 연결로 외부 접속 설정하기
            </h2>
            <p>
                현재까지 설정한 ECS 클러스터/서비스는 정상 실행되었지만 외부 접속을 위한 ALB (Application Load Balancer) 설정이 필요하다.
            </p>
            <ul className="list-disc pl-5 mt-2">
                <li>ALB는 외부 HTTP 요청을 받아 ECS 태스크에 전달해주는 역할을 한다.</li>
                <li>ALB를 생성하고 대상 그룹을 ECS 서비스와 연결해야 함.</li>
                <li>ALB의 퍼블릭 DNS가 접속 주소(URL)가 됨.</li>
            </ul>
            <p className="mt-4">👉 <strong>다음 포스트(Post8)</strong>에서 ALB 생성 및 ECS 연결 과정을 상세히 다룬다.</p>
        </div>
    );
};

export default Post7;