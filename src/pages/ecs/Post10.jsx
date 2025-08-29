import LightboxViewer from "@/components/LightboxViewer";
import BlockCode from "@/components/BlockCode";
import React from "react";

export default function Post10() {
    return (
        <div className="prose prose-lg mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide w-full max-w-4xl lg:w-4xl">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                HansanPension 프로젝트 배포 후기
            </h1>

            <p>
                드디어! HansanPension 프로젝트의 프론트엔드와 백엔드 모두를 AWS ECS(Fargate)와 Application Load Balancer(ALB)를 통해 성공적으로
                배포 완료했다. 수많은 오류와 삽질의 기록들을 지나 최종적으로 서비스가 도메인 주소로 접근 가능한 상태까지 도달함. 이 포스트에서는 그 여정을
                짧게 되돌아보며 정리한다.
            </p>

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400 mt-10">📦 배포 구조 요약</h2>
            <ul>
                <li>📁 <strong>백엔드</strong>: Spring Boot + PostgreSQL (AWS RDS)</li>
                <li>📁 <strong>프론트엔드</strong>: React + Vite (정적 빌드 후 serve)</li>
                <li>🚀 <strong>배포</strong>: Docker → ECR → ECS (Fargate) → ALB</li>
                <li>🌐 <strong>라우팅</strong>: ALB 경로 기반 라우팅 설정</li>
            </ul>

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400 mt-10">🐛 겪은 대표적인 문제들</h2>
            <ul>
                <li>도커파일에서 build.gradle.kts 누락 → 빌드 실패</li>
                <li>Health Check 경로 미설정 → ALB Target Group unhealthy</li>
                <li>프론트 serve 포트 80 vs 81 설정 충돌 → ALB 라우팅 오류</li>
                <li>SecurityConfig의 CORS 설정 누락 → 프론트와 API 연동 오류</li>
                <li>ALB 리스너 포트 중복 설정 후 Task Definition 다시 생성하는 과정 번거로움</li>
                <li>Security Group에서 포트 열람 누락 → 외부 접근 불가</li>
                <li>프론트와 백엔드 모두 ALB와 연동 시 port mapping 실수 → 서비스 unreachable</li>
                <li>ENV 설정에서 base_url 누락 → 프론트 API 요청 실패</li>
            </ul>

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400 mt-10">✅ 해결 팁 요약</h2>
            <ul>
                <li><strong>Health Check</strong>: 백엔드에 /health 엔드포인트 추가하고 permitAll 해줘야 함</li>
                <li><strong>Port</strong>: 프론트는 80, 백엔드는 8080 또는 81로 명확히 구분</li>
                <li><strong>CORS</strong>: ALB 주소를 CorsConfiguration에 반드시 포함</li>
                <li><strong>보안 그룹</strong>: 인바운드 규칙에서 포트 80, 81, 8080을 열어줘야 ALB 및 직접 접근 가능</li>
                <li><strong>ECS 서비스 수정시</strong>: Task Definition 새로 만들고 재배포 필요</li>
                <li><strong>프론트 ENV</strong>: Vite 기준 VITE_API_BASE_URL 올바르게 설정 필요</li>
            </ul>

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400 mt-10">💰 요금은?</h2>
            <p>
                프론트 + 백엔드 ECS Fargate 각각 약 10달러, ALB 약 15~20달러, 로그 & 전송비용 약간 포함해서 총 25~40달러 정도 예상된다.
                작은 규모의 프로젝트라면 충분히 감당 가능한 수준.

                하지만 지금 개발중이니 비용절감을위해 삭제해두자!
            </p>



            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400 mt-10">📎 마무리</h2>
            <p>
                단순한 프로젝트라도 ECS + ALB를 직접 구성해보는 과정은 굉장히 좋은 학습 경험이었다.
                특히 Docker → ECR → ECS → ALB로 이어지는 전체 플로우를 다뤄본 건 AWS 인프라의 핵심을 경험한 셈이다.
                다음에는 Route53을 통한 도메인 연결, HTTPS 인증서 발급(ACM), CI/CD 자동화(GitHub Actions)를 추가로 시도해볼 예정!
            </p>
        </div>
    );
}