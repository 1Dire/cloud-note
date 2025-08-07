import React from "react";
import BlockCode from "@/components/BlockCode.jsx";
import Tags from "@/components/Tags";

const KubernetesIngress = () => {
    const tags = ["Kubernetes", "Ingress", "Ingress Controller", "NGINX", "트래픽 라우팅"];

    return (
        <section className="space-y-6 text-gray-800 dark:text-gray-200">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500">
                인그레스와 인그레스 컨트롤러
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags} />
            </div>

            <p>
                <strong>Ingress</strong>는 외부 HTTP(S) 요청을 내부 서비스로 전달하는 규칙을 정의하는 Kubernetes 리소스입니다.
                NodePort나 LoadBalancer 없이도 외부에서 클러스터로 접근할 수 있게 해주며, 클라우드 로드밸런서가 없는 환경에서도 유용합니다.
            </p>

            <p>
                <strong>Ingress Controller</strong>는 Ingress 리소스를 감지하고 실제 트래픽을 적절한 서비스로 라우팅합니다.
                Kubernetes는 Ingress Controller를 기본적으로 포함하지 않으며, <code>NGINX</code>, <code>Traefik</code> 등을 별도로 설치해야 합니다.
            </p>

            <h2 className="text-xl font-semibold">🌐 인그레스 동작 구조</h2>
            <ul className="list-disc list-inside space-y-1">
                <li>클라이언트 → 클러스터의 Ingress Controller 접근 (80/443 포트)</li>
                <li>Ingress Controller는 Ingress 규칙을 참조하여 요청을 내부 서비스로 전달</li>
                <li>규칙은 <strong>호스트 기반</strong> 또는 <strong>경로 기반</strong>으로 정의</li>
            </ul>

            <h2 className="text-xl font-semibold">🧩 인그레스 예제</h2>
            <BlockCode language="yaml">
                {`apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: helloworld-rules
spec:
  rules:
    - host: helloworld-v1.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: helloworld-v1
                port:
                  number: 80
    - host: helloworld-v2.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: helloworld-v2
                port:
                  number: 80`}
            </BlockCode>

            <h2 className="text-xl font-semibold">📌 요약</h2>
            <ul className="list-disc list-inside space-y-1">
                <li>Ingress는 외부 요청을 내부 서비스로 라우팅하는 역할</li>
                <li>Ingress Controller는 이를 실행하는 실제 컴포넌트</li>
                <li>호스트 및 경로 기반 트래픽 분배 가능</li>
                <li>마이크로서비스 아키텍처에서 필수적인 컴포넌트</li>
            </ul>
        </section>
    );
};

export default KubernetesIngress;
