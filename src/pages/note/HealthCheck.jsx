import React from "react";
import BlockCode from "@/components/BlockCode";
import Tags from "@/components/Tags";

export default function Healthcheck() {
    const tags = [
        "Kubernetes",
        "Deployment",
        "헬스체크",
        "livenessProbe",
        "프로덕션 안정성"
    ];

    return (
        <section className="space-y-10 p-6 text-gray-800 dark:text-gray-200 leading-relaxed">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500 mb-4">
                헬스 체크
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags} />
            </div>

            <div>
                <h2 className="text-2xl font-semibold">헬스 체크란?</h2>
                <p>
                    <strong>헬스 체크(Health Check)</strong>는 파드 내 애플리케이션이 정상적으로 동작 중인지
                    주기적으로 확인하기 위한 메커니즘입니다. 쿠버네티스는 이 정보를 바탕으로 문제 있는 컨테이너를 자동으로 재시작하거나 트래픽을 우회시킵니다.
                </p>
                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li><strong>Liveness Probe:</strong> 컨테이너가 살아 있는지를 확인</li>
                    <li>정상 코드(예: 200)가 오면 OK, 오류 코드(예: 500)가 오면 재시작</li>
                    <li>앱이 충돌했지만 프로세스는 살아있을 때 유용</li>
                </ul>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">헬스 체크가 포함된 배포 YAML</h2>
                <p>아래 YAML은 livenessProbe가 추가된 Deployment입니다:</p>
                <BlockCode>{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: helloworld-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: helloworld
  template:
    metadata:
      labels:
        app: helloworld
    spec:
      containers:
      - name: k8s-demo
        image: wardviaene/k8s-demo
        ports:
        - name: nodejs-port
          containerPort: 3000
        livenessProbe:
          httpGet:
            path: /
            port: nodejs-port
          initialDelaySeconds: 15
          timeoutSeconds: 30
          periodSeconds: 10
          successThreshold: 1
          failureThreshold: 3`}</BlockCode>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">배포 및 확인 명령어</h2>
                <BlockCode>kubectl create -f helloworld-healthcheck.yml</BlockCode>
                <BlockCode>kubectl get pods</BlockCode>
                <BlockCode>kubectl describe pods</BlockCode>
                <p>
                    <code>livenessProbe</code> 섹션에서 설정값 및 성공/실패 횟수 등을 확인할 수 있습니다.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">팁: kubectl edit로 실시간 편집</h2>
                <p>
                    <code>kubectl edit deployment helloworld-deployment</code> 명령어를 통해
                    배포 설정을 실시간으로 편집할 수 있습니다.
                </p>
                <p>
                    <code>timeoutSeconds</code>, <code>periodSeconds</code>,
                    <code>successThreshold</code>, <code>failureThreshold</code> 등의 값도 이곳에서 확인 및 수정할 수 있습니다.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">정리</h2>
                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li>헬스 체크는 파드의 안정성을 높이는 중요한 요소입니다.</li>
                    <li>프로덕션 환경에서는 <strong>livenessProbe</strong> 설정을 반드시 포함해야 합니다.</li>
                    <li>애플리케이션 충돌, HTTP 500 오류 등에 자동 대응할 수 있습니다.</li>
                </ul>
            </div>
        </section>
    );
}
