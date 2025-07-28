import React from "react";
import BlockCode from "@/components/BlockCode";
import Tags from "@/components/Tags";

export default function ReplicationControllerDemo() {
    const tags = [
        "Kubernetes",
        "ReplicationController",
        "ReplicaSet",
        "파드",
        "수평확장"
    ];

    return (
        <section className="space-y-10 p-6 text-gray-800 dark:text-gray-200 leading-relaxed">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500 mb-4">
                ReplicationController 수평 확장 데모
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags} />
            </div>

            <div>
                <h2 className="text-2xl font-semibold">클러스터 확인 및 설정</h2>
                <p>Minikube 쿠버네티스 클러스터를 재시작한 후, 아래 명령어로 클러스터 준비 상태를 확인합니다:</p>
                <BlockCode>kubectl get nodes</BlockCode>
                <p>사용할 YAML 파일 경로:</p>
                <BlockCode>Kubernetes-course/Replication-Controller/helloworld-repl-controller.yml</BlockCode>
                <p>복제 컨트롤러를 생성한 후 파드 상태를 확인합니다:</p>
                <BlockCode>kubectl get pods</BlockCode>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">파드 확인 및 설명</h2>
                <p>생성된 파드는 각각 고유한 이름을 가지며, 예시는 다음과 같습니다:</p>
                <BlockCode>kubectl describe pod helloworld-controller-[randomstring]</BlockCode>
                <p>이미지를 다운로드한 후 두 개의 파드가 실행되며, 스테이트리스 앱의 수평 확장을 확인할 수 있습니다.</p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">수평 확장 (Scaling)</h2>
                <p>다음 명령어로 파드 수를 4개로 늘릴 수 있습니다:</p>
                <BlockCode>kubectl scale --replicas=4 -f helloworld-repl-controller.yml</BlockCode>
                <p>또는 복제 컨트롤러 이름으로 직접 스케일할 수도 있습니다:</p>
                <BlockCode>kubectl scale --replicas=1 rc/helloworld-controller</BlockCode>
                <p>결과 확인:</p>
                <BlockCode>kubectl get pods</BlockCode>
                <p>이렇게 수평 확장은 스케일 아웃(늘리기)과 스케일 인(줄이기)을 모두 수행할 수 있습니다.</p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">특징 및 주의사항</h2>
                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li>수평 확장은 <strong>스테이트리스 파드</strong>에 적합합니다.</li>
                    <li>스테이트풀 파드의 경우 <strong>StatefulSet</strong>을 사용해야 합니다.</li>
                    <li>복제 컨트롤러는 항상 지정된 수의 파드를 유지합니다.</li>
                    <li>파드가 삭제되면 새로운 파드를 자동으로 생성합니다.</li>
                    <li>로드밸런서를 앞단에 두어 여러 파드로 트래픽을 분산할 수 있습니다.</li>
                </ul>
                <p className="mt-3">
                    스테이트리스 애플리케이션을 설계할 땐 <strong>12factor 앱</strong> 원칙을 참고하세요.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">삭제 및 마무리</h2>
                <p>복제 컨트롤러를 삭제하려면 아래 명령어를 사용합니다:</p>
                <BlockCode>kubectl delete rc/helloworld-controller</BlockCode>
                <p>
                    삭제 후에도 마지막 파드는 바로 종료되지 않을 수 있습니다. 관련 설정 정보는 etcd에 저장되며,
                    YAML 파일 없이도 동작하지만, 보통은 YAML로 관리하는 것이 버전 관리와 재사용에 유리합니다.
                </p>
            </div>
        </section>
    );
}
