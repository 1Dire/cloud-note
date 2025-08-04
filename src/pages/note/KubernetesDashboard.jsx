import React from "react";
import BlockCode from "@/components/BlockCode";
import Tags from "@/components/Tags";

export default function KubernetesDashboard() {
    const tags = [
        "Kubernetes",
        "Dashboard",
        "Web UI",
        "RBAC",
        "ServiceAccount",
        "minikube"
    ];

    return (
        <section className="space-y-10 p-6 text-gray-800 dark:text-gray-200 leading-relaxed">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500 mb-4">
                쿠버네티스 웹 UI 대시보드
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags} />
            </div>

            <div>
                <h2 className="text-2xl font-semibold">🧭 웹 UI란?</h2>
                <p>
                    쿠버네티스 웹 UI(Dashboard)는 <strong>kubectl 없이 클러스터를 시각적으로 관리</strong>할 수 있게 도와주는 대시보드입니다.
                    <br />
                    앱 배포, 리소스 상태 확인, YAML 수정, 로그 확인, 파드 삭제 등이 가능합니다.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">🚀 설치 방법</h2>
                <BlockCode>
                    {`kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml`}
                </BlockCode>
                <p>위 명령어로 대시보드를 설치할 수 있습니다. 이후 <strong>RBAC 권한 사용자</strong>도 설정해야 합니다.</p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">🔐 admin-user 서비스 계정 생성</h2>
                <p>모든 리소스를 관리할 수 있는 <strong>admin-user</strong>를 생성합니다:</p>
                <BlockCode>
                    {`# dashboard-adminuser.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user-binding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kube-system`}
                </BlockCode>
                <p>적용:</p>
                <BlockCode>kubectl apply -f dashboard/dashboard-adminuser.yaml</BlockCode>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">🔑 토큰 얻기</h2>
                <BlockCode>
                    {`kubectl -n kube-system get secret | grep admin-user
kubectl -n kube-system describe secret [admin-user-token-xxxx]`}
                </BlockCode>
                <p>
                    `describe` 명령어로 나오는 <strong>token 값을 복사</strong>해서 로그인할 때 붙여넣습니다.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">🌐 대시보드 접속</h2>
                <p>Minikube 사용자는 간단히 다음으로 실행합니다:</p>
                <BlockCode>minikube dashboard</BlockCode>
                <p>또는 URL만 확인:</p>
                <BlockCode>minikube dashboard --url</BlockCode>
                <p>
                    브라우저에 표시된 URL에서 <strong>Token 로그인</strong>을 선택한 후, 위에서 복사한 토큰을 붙여넣어 로그인합니다.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">💡 Kops 사용자 주의</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>Kops에서는 기본적으로 인증서 로그인 방식이 활성화되어 있습니다.</li>
                    <li>하지만 <strong>토큰 로그인</strong>도 설정 가능하며, 인증서를 우회할 수 있습니다.</li>
                    <li>클러스터 인증 정보는 <code>~/.kube/config</code>에서 확인할 수 있습니다.</li>
                </ul>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">📌 요약</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>쿠버네티스 Dashboard는 GUI로 클러스터를 관리할 수 있는 도구</li>
                    <li><strong>ServiceAccount + ClusterRoleBinding</strong>으로 관리자 권한 부여 필요</li>
                    <li><strong>토큰을 사용해 로그인</strong>, kubeconfig 파일을 통한 로그인도 가능</li>
                    <li><code>kubectl</code> 없이도 리소스 생성/삭제 가능</li>
                </ul>
            </div>
        </section>
    );
}
