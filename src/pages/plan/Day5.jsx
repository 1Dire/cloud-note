import React from "react";
import BlockCode from "../../components/BlockCode.jsx";

const Day6 = () => {
    return (
        <section className="space-y-10 text-gray-800 dark:text-gray-200">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500">
                Day 6 – 쿠버네티스 리소스 관리
            </h1>

            <div className="space-y-6">
                <div>
                    <h2 className="text-xl font-semibold">📌 오늘의 목표</h2>
                    <ul className="list-disc list-inside">
                        <li>쿠버네티스 주요 리소스 개념 학습</li>
                        <li>리소스의 역할과 차이점 이해</li>
                        <li>컨트롤러와 리소스의 관계 이해</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl font-semibold">📖 이론 학습</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Pod:</strong> 컨테이너와 볼륨을 묶은 실행 단위</li>
                        <li><strong>Pod Template:</strong> 파드를 생성할 때 사용하는 <strong>형틀</strong></li>
                        <li><strong>ReplicaSet:</strong> 파드 개수를 유지하는 <strong>반장</strong></li>
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

                <div>
                    <h2 className="text-xl font-semibold">🛠 실습</h2>
                    <p>오늘은 별도의 실습 없이 개념 학습만 진행했습니다.</p>
                </div>

          
            </div>
        </section>
    );
};

export default Day6;
