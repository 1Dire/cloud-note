import React from "react";
import BlockCode from "@/components/BlockCode";
import Tags from "@/components/Tags";

export default function PodLifecycle() {
    const tags = [
        "Kubernetes",
        "Pod Lifecycle",
        "Init Container",
        "postStart",
        "preStop",
        "LivenessProbe",
        "ReadinessProbe"
    ];

    return (
        <section className="space-y-10 p-6 text-gray-800 dark:text-gray-200 leading-relaxed">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500 mb-4">
                파드 수명 주기(Pod Lifecycle)
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags} />
            </div>

            <div>
                <h2 className="text-2xl font-semibold">파드 수명 주기란?</h2>
                <p>
                    쿠버네티스에서 파드는 단순히 생성되고 삭제되는 것이 아니라, 다양한{" "}
                    <strong>수명 주기 단계(Lifecycle Phase)</strong>를 거치며 상태가 변화합니다.
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Init Container:</strong> 메인 컨테이너 실행 전 준비 작업</li>
                    <li><strong>postStart:</strong> 컨테이너 시작 직후 실행할 명령 정의</li>
                    <li><strong>preStop:</strong> 컨테이너 종료 직전에 실행할 명령 정의</li>
                    <li><strong>readinessProbe:</strong> 요청을 받을 준비 상태 여부 확인</li>
                    <li><strong>livenessProbe:</strong> 컨테이너가 살아있는지 확인 (죽으면 재시작)</li>
                </ul>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">간단한 데모 YAML</h2>
                <p>다음은 수명 주기 기능을 포함한 간단한 Pod 예시입니다:</p>
                <BlockCode language="yaml" code={`apiVersion: v1
kind: Pod
metadata:
  name: lifecycle-demo
spec:
  initContainers:
  - name: init-sleep
    image: busybox
    command: ["sh", "-c", "echo Init... && sleep 5"]
  containers:
  - name: main
    image: busybox
    command: ["sh", "-c", "echo App is running > /status && sleep 300"]
    lifecycle:
      postStart:
        exec:
          command: ["sh", "-c", "echo Post Start Hook >> /status"]
      preStop:
        exec:
          command: ["sh", "-c", "echo Pre Stop Hook >> /status && sleep 10"]
    readinessProbe:
      exec:
        command: ["cat", "/status"]
      initialDelaySeconds: 5
      periodSeconds: 5
    livenessProbe:
      exec:
        command: ["cat", "/status"]
      initialDelaySeconds: 10
      periodSeconds: 10`} />
                <p className="mt-2">
                    이 YAML을 적용하면 init → main → postStart → readiness → liveness → preStop 순으로 실행 흐름이 이어집니다.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">확인 명령어</h2>
                <BlockCode language="bash" code={`kubectl create -f lifecycle-demo.yaml
kubectl get pods
kubectl describe pod lifecycle-demo
kubectl exec -it lifecycle-demo -- cat /status`} />
                <p>이 명령어를 통해 현재 단계와 상태 로그를 확인할 수 있습니다.</p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">요약</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>파드는 다양한 상태를 거치며 실행됩니다.</li>
                    <li><strong>Init 컨테이너</strong>는 준비 작업을 담당하고, <strong>postStart/preStop</strong>은 부트/종료 훅입니다.</li>
                    <li><strong>Probe</strong>는 상태 확인 및 트래픽 제어에 핵심 역할을 합니다.</li>
                    <li>수명 주기 기능은 실운영 환경에서 안정성과 제어성을 높여줍니다.</li>
                </ul>
            </div>
        </section>
    );
}