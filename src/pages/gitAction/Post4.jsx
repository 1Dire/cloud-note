import React from "react";
import BlockCode from "@/components/BlockCode";

export default function Post4() {
    return (
        <div className="prose prose-lg max-w-4xl mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                자동화의 위력: GitHub Actions로 배포하며 느낀 점
            </h1>

            <p>
                이번 프로젝트에서 가장 크게 느낀 점은 바로 <strong>자동화의 위대함</strong>이다.
            </p>

            <p>
                이전에는 로컬에서 코드를 수정하고 나면,
                도커 빌드 → 푸시 → ECS Task Definition 수정 → 배포까지 모든 과정을 수동으로 처리해야 했다.
            </p>

            <p>
                반복되는 작업은 생각보다 시간도 많이 들고, 실수도 자주 발생했다.
                특히 코드에 오류가 있을 경우, 빌드 도중 실패하고 나서야 문제를 깨닫게 된다.
            </p>

            <p>
                그런데 그 시점엔 이미 Docker 이미지가 만들어지고 ECR에 푸시까지 완료된 상태라,
                다시 수정 → 빌드 → 푸시를 반복하는 무한 루프에 빠지곤 했다.
            </p>

            <p>
                하지만 GitHub Actions를 설정하고 나서는 완전히 달라졌다.
            </p>

            <ul className="list-disc pl-6">
                <li>커밋만 해도 자동으로 빌드가 시작되고</li>
                <li>에러가 있으면 GitHub가 실시간으로 알려주고</li>
                <li>성공하면 Docker 이미지가 자동으로 ECR에 등록된다</li>
            </ul>

            <blockquote className="mt-6">
                “내가 실수하더라도 GitHub Actions가 대신 체크해주는 든든한 QA 도우미 같다.”
            </blockquote>

            <p>
                편하다는 느낌을 넘어서 배포 과정이 코드화되고 기록으로 남는다는 점도 매우 유용하다.
                나중에 내가 했던 배포를 복기할 때 `.yml` 설정 파일만 봐도 전체 파이프라인이 보이니 문서 역할도 한다.
            </p>

            <h2 className="text-xl font-semibold mt-10">🚀 배포 자동화까지 연동하려면?</h2>
            <p>
                여기서 한 걸음 더 나아가면 CD(지속적 배포)까지 연결 가능하다.
                예를 들어, 다음과 같이 ECS에 배포까지 자동화할 수 있다.
            </p>

            <BlockCode language="yaml" code={`
- name: Deploy to ECS
  uses: aws-actions/amazon-ecs-deploy-task-definition@v1
  with:
    task-definition: ecs-task-def.json
    service: \${{ secrets.SERVICE_NAME }}
    cluster: \${{ secrets.CLUSTER_NAME }}
    wait-for-service-stability: true
`}/>

            <p>
                이 블록은 Docker 이미지 푸시 이후에 붙이면 자동으로 ECS에 배포까지 완료된다.
                필요한 값들은 GitHub Repository의 Settings → Secrets에 미리 등록해두면 된다.
            </p>

            <h2 className="text-xl font-semibold mt-10">💸 마지막 정리: 비용 절감을 위해</h2>
            <p>
                학습이 끝났다면 AWS 리소스들 (ECS 서비스, ALB, RDS, S3 등)을 꼭 정리해두자.
                불필요하게 자원이 돌아가고 있을 경우 과금이 계속 발생할 수 있으니,
                EC2, ECR, ECS, RDS 등에서 직접 리소스를 삭제하거나 중지하는 습관을 들이는 것이 좋다.
            </p>
        </div>
    );
}