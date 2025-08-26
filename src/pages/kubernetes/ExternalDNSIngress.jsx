
import React from "react";
import Tags from "@/components/Tags";
import BlockCode from "@/components/BlockCode.jsx";

const ExternalDNSIngress = () => {
    const tags = ["Kubernetes", "Ingress", "Ingress Controller", "ExternalDNS", "DNS", "로드밸런서"];

    return (
        <section className="space-y-10 p-6 text-gray-800 dark:text-gray-200 leading-relaxed">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500">
                외부 DNS + 인그레스 개요
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags} />
            </div>

            <p>
                <strong>Ingress</strong>는 클러스터 외부의 HTTP/HTTPS 요청을 내부 서비스로 라우팅하는 규칙을 정의합니다.
                <strong> Ingress Controller</strong>는 이 규칙을 감지해 실제 트래픽을 전달하는 컴포넌트이고,
                <strong> ExternalDNS</strong>는 Ingress/Service 정보를 읽어 클라우드 DNS에 필요한 레코드를 자동으로
                생성·갱신합니다.
            </p>

            <div>
                <h2 className="text-2xl font-semibold">🔍 동작 흐름</h2>
                <ol className="list-decimal list-inside space-y-2 mt-2">
                    <li>DNS 제공자(예: Route53/Cloud DNS/Cloudflare)에 도메인 보유</li>
                    <li>로드밸런서 1개가 Ingress Controller 앞단에 위치</li>
                    <li>Ingress에 호스트/경로 규칙 정의</li>
                    <li>ExternalDNS가 규칙을 읽어 DNS 레코드(A/CNAME)를 자동 생성 → 로드밸런서로 연결</li>
                    <li>Ingress Controller가 규칙에 따라 각 서비스로 트래픽 전달</li>
                </ol>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">🧩 Ingress 예시 (호스트 기반 라우팅)</h2>
                <BlockCode language="yaml">{`apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: example-ingress
  annotations:
    kubernetes.io/ingress.class: nginx
spec:
  rules:
    - host: app-a.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: app-a-service
                port:
                  number: 80
    - host: app-b.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: app-b-service
                port:
                  number: 80`}</BlockCode>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">🧭 경로 기반 라우팅 예시</h2>
                <BlockCode language="yaml">{`apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: path-based
spec:
  rules:
    - host: api.example.com
      http:
        paths:
          - path: /v1
            pathType: Prefix
            backend:
              service:
                name: api-v1
                port:
                  number: 80
          - path: /v2
            pathType: Prefix
            backend:
              service:
                name: api-v2
                port:
                  number: 80`}</BlockCode>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">🔧 ExternalDNS 연동 포인트</h2>
                <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>클러스터에 ExternalDNS 배포 (DNS 제공자 자격증명 필요)</li>
                    <li>Ingress/Service 리소스의 <code>host</code> 값을 읽어 DNS 레코드 자동 생성</li>
                    <li>DNS 레코드는 로드밸런서(또는 Ingress LB)의 주소를 가리킴</li>
                </ul>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">📋 요약</h2>
                <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>Ingress: 규칙 정의 / Ingress Controller: 규칙 실행</li>
                    <li>ExternalDNS: DNS 레코드 자동화로 운영 부담 감소</li>
                    <li>하나의 로드밸런서로 다수 도메인·경로 라우팅 가능</li>
                    <li>HTTP/HTTPS 트래픽에 최적화 (TCP/UDP는 별도 방식 필요)</li>
                </ul>
            </div>
        </section>
    );
};

export default ExternalDNSIngress;