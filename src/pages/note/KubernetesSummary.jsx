import React from "react";
import Tags from "../../components/Tags.jsx";

const KubernetesSummary = () => {
    const tags = ["Kubernetes", "리소스", "개념정리", "DevOps", "운영"];

    return (
        <section className="space-y-10 text-gray-800 dark:text-gray-200 leading-relaxed">
            <h1 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-sky-500">
                쿠버네티스 핵심 리소스 한눈에 보기
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags}/>
            </div>

            <div className="space-y-4">
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>파드 (Pod):</strong> 컨테이너와 볼륨을 합친 실행 단위</li>
                    <li><strong>파드 템플릿 (Pod Template):</strong> 파드를 생성할 때 사용하는 <strong>형틀</strong></li>
                    <li><strong>레플리케이션 컨트롤러:</strong> 파드 개수를 유지하는 초창기 컨트롤러 (지금은 ReplicaSet 사용)</li>
                    <li><strong>리소스 쿼터 (ResourceQuota):</strong> 네임스페이스별 <strong>자원 사용 제한</strong> (CPU, 메모리 등)</li>
                    <li><strong>비밀값 (Secret):</strong> 패스워드, 토큰 등 민감한 정보 저장</li>
                    <li><strong>서비스 어카운트 (ServiceAccount):</strong> 파드가 API를 호출할 때 사용하는 <strong>권한 계정</strong></li>
                    <li><strong>서비스 (Service):</strong> 파드를 묶어 <strong>트래픽을 분산</strong>하는 네트워크 반장</li>
                    <li><strong>데몬세트 (DaemonSet):</strong> 모든 노드에 1개씩 <strong>Pod를 자동 배포</strong></li>
                    <li><strong>디플로이먼트 (Deployment):</strong> 파드 배포 및 업데이트를 관리하는 <strong>상위 관리자</strong></li>
                    <li><strong>레플리카세트 (ReplicaSet):</strong> 파드 개수를 유지하는 <strong>반장</strong></li>
                    <li><strong>스테이트풀셋 (StatefulSet):</strong> <strong>순서, 이름, 저장소</strong>를 유지하며 배포 (DB 등에 사용)</li>
                    <li><strong>잡 (Job):</strong> <strong>일회성 작업</strong> 실행 후 자동 종료</li>
                    <li><strong>크론잡 (CronJob):</strong> <strong>스케줄된 반복 작업</strong> 실행 (리눅스의 cron처럼)</li>
                </ul>
            </div>
        </section>
    );
};

export default KubernetesSummary;
