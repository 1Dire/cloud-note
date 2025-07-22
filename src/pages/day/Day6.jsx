import React from "react";
import Tags from "../../components/Tags.jsx";

const Day6 = () => {
    const tags = ["Kubernetes", "리소스", "ReplicaSet", "Deployment", "StatefulSet", "Job"];

    return (
        <section className="space-y-10 text-gray-800 dark:text-gray-200 leading-relaxed">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500">
                Day 6 – 쿠버네티스 리소스 관리
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags}/>
            </div>

            <div>
                <h2 className="text-xl font-semibold">📖 오늘 학습한 개념</h2>

                <ul className="list-disc list-inside mt-3 space-y-2">
                    <li><strong>Pod:</strong> 컨테이너와 볼륨을 묶은 실행 단위</li>
                    <li><strong>Pod Template:</strong> 파드를 생성할 때 사용하는 <strong>형틀</strong></li>
                    <li><strong>ReplicaSet:</strong> 파드의 개수를 관리하는 <strong>반장</strong></li>
                    <li><strong>Deployment:</strong> 배포와 업데이트를 관리하는 <strong>상사</strong></li>
                    <li><strong>Service:</strong> 트래픽을 분산하는 <strong>네트워크 반장</strong></li>
                    <li><strong>DaemonSet:</strong> 모든 노드에 1개씩 파드를 배포</li>
                    <li><strong>StatefulSet:</strong> 순서, 이름, 저장소를 유지하는 배포 (DB용)</li>
                    <li><strong>Job:</strong> 일회성 작업 실행 후 종료</li>
                    <li><strong>CronJob:</strong> 정해진 시간마다 반복 실행</li>
                    <li><strong>ReplicationController:</strong> ReplicaSet의 초기 버전 (거의 사용 안함)</li>
                    <li><strong>ResourceQuota:</strong> 자원(CPU, 메모리) 사용 제한</li>
                    <li><strong>Secret:</strong> 비밀번호, 토큰 등 민감 정보 저장</li>
                    <li><strong>ServiceAccount:</strong> 파드의 API 호출용 권한 계정</li>
                </ul>
            </div>


        </section>
    );
};

export default Day6;
