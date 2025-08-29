import React from "react";
import Tags from "@/components/Tags.jsx";

const KubernetesVolume = () => {
    const tags = ["쿠버네티스", "볼륨", "퍼시스턴트 볼륨", "AWS EBS", "Stateful 앱"];

    return (
   <div className="prose prose-lg mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide w-full max-w-4xl lg:w-4xl">

            <h1 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-sky-400">
                쿠버네티스 볼륨 & 퍼시스턴트 볼륨 요약
            </h1>
            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags} />
            </div>

            <div className="space-y-4 leading-relaxed">
                <section>
                    <h2 className="text-lg font-semibold">1. 볼륨의 필요성</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>컨테이너가 멈추면 내부 데이터는 모두 삭제됨</li>
                        <li>Stateful 앱은 외부 저장소 필요</li>
                        <li>외부 저장소 예: MySQL, PostgreSQL, AWS S3, Redis</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-semibold">2. 쿠버네티스 볼륨 개념</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>컨테이너 외부에 데이터 저장</li>
                        <li>퍼시스턴트 볼륨(PV) 사용 시 파드 재시작 후에도 데이터 유지</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-semibold">3. 볼륨 플러그인 예시</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>클라우드 스토리지: AWS EBS, GCP PD, Azure Disk</li>
                        <li>네트워크 스토리지: NFS, CephFS</li>
                        <li>로컬 스토리지: 노드 내부 디스크</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-semibold">4. AWS EBS 동작 원리</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>특정 가용 영역에서만 연결 가능</li>
                        <li>노드 장애 시 새 노드로 파드 이동 + 볼륨 재연결</li>
                        <li>데이터 유지 가능</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-semibold">5. 데모 흐름</h2>
                    <ol className="list-decimal list-inside space-y-1">
                        <li>
                            AWS CLI로 EBS 볼륨 생성
                            <pre className="bg-gray-800 text-white p-2 rounded text-sm mt-1">
                                aws ec2 create-volume --size 10 --availability-zone eu-west-1a --volume-type gp2
                            </pre>
                        </li>
                        <li>파드 YAML에 volumeMounts 및 awsElasticBlockStore 설정</li>
                        <li>/myvolume 경로 데이터는 유지, / 경로 데이터는 사라짐</li>
                        <li>kubectl drain으로 노드 변경 테스트</li>
                        <li>작업 후 볼륨 삭제</li>
                    </ol>
                </section>

                <section className="bg-yellow-50 dark:bg-yellow-900 p-3 rounded-md border border-yellow-300 dark:border-yellow-700">
                    <strong>💡 핵심 정리:</strong> Stateful 앱은 볼륨을 사용해야 하며, PV + 클라우드 스토리지를 사용하면 노드 장애에도 안전하게 데이터 유지 가능.
                </section>
            </div>
        </div>
    );
};

export default KubernetesVolume;
