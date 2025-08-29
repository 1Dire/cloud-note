import React from "react";
import InlineCode from "../../components/InlineCode.jsx";
import BlockCode from "../../components/BlockCode.jsx";
import Tags from "../../components/Tags.jsx";

const PodAndService = () => {
    const tags = ["Kubernetes", "Pod", "Service", "로드밸런서", "클러스터"];

    return (
         <div className="prose prose-lg mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide w-full max-w-4xl lg:w-4xl">
            <h1 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-sky-500">
                쿠버네티스의 파드와 서비스
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags}/>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">Pod란?</h2>
                <p>
                    <strong>Pod</strong>는 쿠버네티스에서 컨테이너를 실행하는 <strong>최소 단위</strong>다.
                    컨테이너와 볼륨을 함께 묶어 관리한다.
                </p>

                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li>기본적으로 하나의 컨테이너를 실행한다.</li>
                    <li>필요하면 여러 개의 컨테이너를 하나의 Pod에 묶을 수도 있다.</li>
                    <li>컨테이너 간 공유 자원: 네트워크(IP), 스토리지(볼륨)</li>
                </ul>

                <p className="mt-3">
                    대부분의 경우, 하나의 Pod에는 하나의 컨테이너가 들어가지만,
                    <InlineCode>Sidecar</InlineCode> 패턴 등으로 여러 개의 컨테이너를 실행할 수도 있다.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">Service란?</h2>
                <p>
                    <strong>Service</strong>는 여러 개의 Pod를 묶어서 관리하고, 트래픽을 <strong>로드밸런싱</strong>하는 역할을 한다.
                    쉽게 말해 <strong>여러 Pod를 이끄는 반장</strong>이다.
                </p>

                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li>여러 Pod를 하나의 그룹으로 묶는다.</li>
                    <li>고정된 IP와 DNS 이름을 제공한다.</li>
                    <li>트래픽을 내부적으로 여러 Pod로 분배한다.</li>
                    <li>Pod가 여러 워커 노드에 걸쳐 있어도 모두 관리한다.</li>
                    <li>구성이 다른 Pod는 다른 Service로 관리한다.</li>
                </ul>

                <BlockCode language="text" code={`# Service의 동작 개념
클라이언트 요청 --> Service IP --> 여러 Pod에 분배`} />

                <p className="mt-3">
                    예를 들어, 워드프레스 서비스가 있다면
                    워드프레스에 들어오는 요청을 여러 워드프레스 Pod에 나눠준다.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">Service의 종류</h2>
                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li><strong>ClusterIP:</strong> 클러스터 내부에서만 접근 가능한 IP (기본값)</li>
                    <li><strong>NodePort:</strong> 각 노드의 포트를 통해 외부에서 접근 가능</li>
                    <li><strong>LoadBalancer:</strong> 외부 로드밸런서를 통해 접근 (클라우드에서 주로 사용)</li>
                </ul>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">외부 트래픽 처리</h2>
                <p>
                    <strong>Service</strong>는 기본적으로 <strong>클러스터 내부 로드밸런서</strong>다.
                    외부에서 오는 트래픽은 <strong>Ingress</strong>나 물리적 <strong>LoadBalancer</strong>가 처리한다.
                </p>

                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li><strong>Ingress:</strong> 도메인 기반 라우팅, HTTPS 제공</li>
                    <li><strong>LoadBalancer:</strong> 클라우드에서 외부 IP를 할당해 직접 연결</li>
                </ul>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">요약</h2>
                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li><strong>Pod:</strong> 컨테이너 + 볼륨을 묶은 실행 단위</li>
                    <li><strong>Service:</strong> 여러 Pod를 묶어 로드밸런싱하고, 고정 IP를 제공</li>
                    <li><strong>Ingress / LoadBalancer:</strong> 외부 트래픽을 클러스터로 전달</li>
                </ul>
            </div>
        </div>
    );
};

export default PodAndService;