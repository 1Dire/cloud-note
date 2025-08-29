import React from "react";
import Tags from "@/components/Tags";
import BlockCode from "@/components/BlockCode.jsx";

const PodPreset= () => {
    const tags = ["Kubernetes", "PodPreset", "자동 주입", "ConfigMap", "Secret", "Best Practice"];

    return (
 <div className="prose prose-lg mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide w-full max-w-4xl lg:w-4xl">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500">
                PodPreset란? (파드 자동 설정 주입)
            </h1>

            {/* 태그 */}
            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags} />
            </div>

            <p>
                <strong>PodPreset</strong>은 파드가 생성될 때 라벨 셀렉터에 매칭되는 파드에
                <strong> 환경 변수, 볼륨/마운트, 시크릿, ConfigMap</strong> 등을 자동으로 주입하는 규칙입니다.
                동일한 설정을 파드마다 반복해서 적지 않아도 된다는 점이 장점이죠.
            </p>

            <div>
                <h2 className="text-2xl font-semibold">동작 방식</h2>
                <ol className="list-decimal list-inside space-y-1 mt-2">
                    <li>네임스페이스에 <code>PodPreset</code> 리소스를 정의한다.</li>
                    <li>라벨 셀렉터가 매칭되는 파드가 생성될 때, 정의된 설정이 자동으로 병합된다.</li>
                    <li>결과적으로 파드 스펙에 env/volumes/volumeMounts 등이 추가된 상태로 실행된다.</li>
                </ol>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">예시 ① PodPreset 정의</h2>
                <BlockCode language="yaml">
                    {`apiVersion: settings.k8s.io/v1alpha1
kind: PodPreset
metadata:
  name: db-connection
spec:
  selector:
    matchLabels:
      role: backend
  env:
    - name: DB_HOST
      value: mydb.default.svc.cluster.local
  volumes:
    - name: app-config
      configMap:
        name: app-config
  volumeMounts:
    - name: app-config
      mountPath: /etc/config`}
                </BlockCode>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">예시 ② 원래 파드 (단순)</h2>
                <BlockCode language="yaml">
                    {`apiVersion: v1
kind: Pod
metadata:
  name: backend-app
  labels:
    role: backend
spec:
  containers:
    - name: app
      image: ghcr.io/example/backend:latest`}
                </BlockCode>
                <p className="mt-2">
                    생성 시점에 <code>db-connection</code> PodPreset이 매칭되어 env/volumes/volumeMounts가 자동 추가됩니다.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">주의 사항 & 대안</h2>
                <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>
                        <strong>상태:</strong> PodPreset은 알파(<code>settings.k8s.io/v1alpha1</code>) 기능으로, 많은 배포판에서 기본 비활성화입니다.
                    </li>
                    <li>
                        <strong>대안 권장:</strong> 반복 설정은 보통
                        <code>MutatingAdmissionWebhook</code>, <code>Helm values</code>, <code>Kustomize patches</code>로 관리합니다.
                    </li>
                    <li>
                        <strong>범위:</strong> 네임스페이스 단위로 동작하며, 라벨 셀렉터가 핵심입니다.
                    </li>
                </ul>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/40 border border-yellow-300/60 dark:border-yellow-700 rounded-md p-4">
                <strong>요약:</strong> PodPreset은 “라벨 매칭 파드에 공통 설정을 자동 주입”하는 규칙입니다.
                현재는 대체 도구(Helm/Kustomize/Webhook) 사용이 일반적이며, 문서화·일관성·승인 절차 측면에서
                조직 표준에 맞춘 방법을 선택하는 것이 좋습니다.
            </div>
        </div>
    );
};

export default PodPreset;
