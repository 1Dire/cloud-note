import React from "react";
import BlockCode from "@/components/BlockCode";
import Tags from "@/components/Tags";

export default function LivenessReadiness() {
    const tags = [
        "Kubernetes",
        "livenessProbe",
        "readinessProbe",
        "헬스체크",
        "서비스 안정성"
    ];

    return (
        <section className="space-y-10 p-6 text-gray-800 dark:text-gray-200 leading-relaxed">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500 mb-4">
                🔎 Liveness와 Readiness Probe
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags} />
            </div>

            <div>
                <h2 className="text-2xl font-semibold">readinessProbe란?</h2>
                <p>
                    <strong>readinessProbe</strong>는 파드가 **트래픽을 받을 준비가 되었는지**를 판단하는 헬스 체크입니다. 이 검사에 실패하면 해당 파드는 서비스에서 제거되어 트래픽을 받지 않습니다. 성공하면 다시 서비스에 포함되어 트래픽을 받을 수 있습니다.
                </p>
                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li>앱이 초기 부팅 중일 때 요청을 막을 수 있음</li>
                    <li>일시적인 오류 동안 트래픽 차단 가능</li>
                    <li>실패 시 서비스에서 제외되지만, 컨테이너는 재시작되지 않음</li>
                </ul>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">실습: readinessProbe와 livenessProbe 비교</h2>
                <p>아래 YAML은 readiness와 liveness 프로브를 함께 사용하는 예시입니다:</p>
                <BlockCode>{`livenessProbe:
  httpGet:
    path: /
    port: nodejs-port
  initialDelaySeconds: 15
  timeoutSeconds: 30

readinessProbe:
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
                <h2 className="text-2xl font-semibold">동작 비교</h2>
                <p>
                    <strong>livenessProbe</strong>는 컨테이너가 죽었는지를 판단하여 실패 시 컨테이너를 **재시작**합니다. 반면 <strong>readinessProbe</strong>는 파드가 요청 받을 준비가 되었는지를 판단하며, 실패 시 **서비스에서 제외**됩니다.
                </p>
                <p>
                    예를 들어 앱이 HTTP 500 에러를 반환하면 readinessProbe는 파드를 서비스에서 제거하지만, livenessProbe는 컨테이너 자체를 재시작할 수 있습니다.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">명령어 예시</h2>
                <p>헬스 체크 포함 배포 생성:</p>
                <BlockCode>kubectl create -f helloworld-liveness-readiness.yml</BlockCode>
                <p>상태 확인 및 실시간 모니터링:</p>
                <BlockCode>watch -n1 kubectl get pods</BlockCode>
                <p>파드 상세 보기:</p>
                <BlockCode>kubectl describe pods</BlockCode>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">실행 흐름 요약</h2>
                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li>컨테이너는 바로 실행되지만 readinessProbe 통과 전까지는 트래픽을 받지 않음</li>
                    <li>readinessProbe 성공 후에야 서비스에 등록되고 트래픽 처리 시작</li>
                    <li>readiness 실패 시 다시 서비스에서 제외됨</li>
                    <li>liveness 실패 시 컨테이너 자체를 재시작</li>
                </ul>
            </div>
        </section>
    );
}
