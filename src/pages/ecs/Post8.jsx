import React from "react";
import LightboxViewer from "@/components/LightboxViewer";

const Post8 = () => {
    return (
        <div className="prose prose-lg max-w-4xl mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                AWS ECS + ALB(Application Load Balancer) 연동
            </h1>
            <p>
                이번 포스트에서는 <strong>Application Load Balancer(ALB)</strong>를 생성하고,
                이전에 만들었던 <strong>Spring Boot 백엔드 ECS 서비스</strong>와 연동하는 과정을 정리한다.
                이를 통해 외부에서 접근 가능한 퍼블릭 URL이 생긴다.
            </p>

            {/* 유튜브 영상 */}
            <div className="relative w-full h-0 pt-[56.25%] mb-8">
                <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    src="https://www.youtube.com/embed/eul12XujVgQ"
                    title="How to create an ECS Service with Application Load Balancer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            <hr className="my-6"/>

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400 mt-10">1. ALB 생성</h2>
            <p>AWS 콘솔 → EC2 → <strong>로드 밸런서</strong> → <strong>로드 밸런서 생성</strong></p>
           <LightboxViewer src="../ecs/post8/1.png" alt="로드 밸런서 생성 위치" className="rounded-md shadow-md my-4"/>
            <p>여기서는 우리가 HTTP 기반 웹 앱을 배포하므로 <strong>Application Load Balancer(ALB)</strong>를 선택한다.</p>

            <div className="border-l-4 border-blue-400 bg-blue-50 dark:bg-blue-950 dark:border-blue-600 p-4 my-6">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300">📊 로드 밸런서 종류 비교</h4>
                <ul className="list-disc pl-5 mt-2">
                    <li><strong>ALB:</strong> HTTP/HTTPS 기반, URL 경로 기반 라우팅, ECS Fargate 최적화</li>
                    <li><strong>NLB:</strong> TCP/UDP 기반, 고정 IP 및 초고속 처리용</li>
                    <li><strong>GWLB:</strong> 보안 장비 연동(GENEVE 프로토콜)</li>
                </ul>
                <p className="mt-2">대부분의 웹 애플리케이션은 <strong>ALB</strong>로 충분하다.</p>
            </div>

           <LightboxViewer src="../ecs/post8/2.png" alt="로드 밸런서 유형" className="rounded-md shadow-md my-4"/>
            <p>아래와 같이 ALB를 구성:</p>
            <ul className="list-disc pl-5">
                <li>로드 밸런서 이름: <code>hansan-backend-alb</code></li>
                <li><strong>체계(Scheme)</strong>: <code>인터넷 연결형</code></li>
                <li><strong>IP 주소 유형</strong>: <code>IPv4</code></li>
                <li><strong>VPC</strong>: 백엔드 서비스가 있는 VPC</li>
                <li><strong>서브넷</strong>: 퍼블릭 서브넷 2개 이상</li>
                <li><strong>보안 그룹</strong>: 포트 80 허용된 SG</li>
            </ul>

           <LightboxViewer src="../ecs/post8/3.png" alt="기본구성" className="rounded-md shadow-md my-4"/>
           <LightboxViewer src="../ecs/post8/4.png" alt="보안그룹 및 라우팅" className="rounded-md shadow-md my-4"/>

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400 mt-10">2. 대상 그룹 생성</h2>
            <p>
                ALB는 <strong>대상 그룹(Target Group)</strong>을 통해 ECS 태스크에 트래픽을 전달한다.
                생성 시 아래처럼 설정:
            </p>
            <ul className="list-disc pl-5">
                <li>대상 유형: <code>ip</code> (Fargate는 필수)</li>
                <li>프로토콜: HTTP, 포트 8080</li>
                <li>상태검사 경로: <code>/actuator/health</code></li>
            </ul>
            <p>
                헬스 체크 경로는 <code>/</code>가 아닐 수 있으며, Spring Boot에서는 보통
                <code>/actuator/health</code>를 사용한다. 잘못되면 서비스가 Unhealthy 상태로 계속 유지된다.
            </p>
           <LightboxViewer src="../ecs/post8/5.png" alt="대상 그룹 설정" className="rounded-md shadow-md my-4"/>

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400 mt-10">3. ECS 서비스 ALB와 연동</h2>
            <ul className="list-disc pl-5">
                <li>ECS → 서비스 편집 → 로드 밸런싱 활성화</li>
                <li>ALB 선택 후, 대상 그룹 연결</li>
                <li>포트 매핑: 컨테이너 포트 8080</li>
            </ul>

            <div className="border-l-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-600 p-4 my-6">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-300">🌐 ALB 작동 방식</h4>
                <ul className="list-disc pl-5">
                    <li>사용자가 ALB의 퍼블릭 DNS로 접속</li>
                    <li>ALB → Target Group → ECS 태스크로 트래픽 전달</li>
                </ul>
                <p className="mt-2">ECS 서비스가 퍼블릭 인터넷과 통신하려면 반드시 ALB가 필요하다.</p>
            </div>

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400 mt-10">4. 퍼블릭 도메인 확인</h2>
            <p>ALB가 생성되면 퍼블릭 DNS(URL)를 확인하자:</p>
           <LightboxViewer src="../ecs/post8/6.png" alt="ALB 주소 확인" className="rounded-md shadow-md my-4"/>
            <p>예: http://hansan-backend-alb-1234567890.ap-northeast-2.elb.amazonaws.com</p>
            <p>정상 연결되면 Spring Boot 백엔드에서 반환하는 메시지를 확인할 수 있다.</p>

            <div className="border-l-4 border-green-400 bg-green-50 dark:bg-green-950 dark:border-green-600 p-4 my-6">
                <h4 className="font-semibold text-green-800 dark:text-green-300">✅ 성공!</h4>
                <p>이제 ALB 주소를 통해 외부에서 ECS 백엔드 서비스에 접근할 수 있다.</p>
            </div>
        </div>
    );
};

export default Post8;