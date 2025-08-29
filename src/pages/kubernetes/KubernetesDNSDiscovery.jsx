import React from "react";
import BlockCode from "@/components/BlockCode.jsx";
import Tags from "@/components/Tags.jsx";

const KubernetesDNSDiscovery = () => {
    const tags = [
        "DNS",
        "Service Discovery",
        "CoreDNS",
        "kube-dns",
        "파드 통신",
        "도메인 네이밍",
        "Busybox",
        "kubectl 실습"
    ];

    return (
        <div className="prose prose-lg mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide w-full max-w-4xl lg:w-4xl">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500 mb-4">
                Kubernetes DNS를 이용한 서비스 탐색
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags} />
            </div>

            <p>
                쿠버네티스 클러스터 내에서 <strong>서비스 이름</strong>만으로도
                파드 간 통신이 가능하게 해주는 핵심 메커니즘입니다.
                <br />
                DNS는 쿠버네티스 1.3부터는 <strong>기본 애드온</strong>으로 설치되며,
                <code>kube-dns</code> 혹은 <code>CoreDNS</code>가 사용됩니다.
            </p>

            <div>
                <h2 className="text-2xl font-semibold mt-6">🔍 동작 원리</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>같은 파드 내 컨테이너끼리는 <code>localhost</code>로 통신</li>
                    <li>다른 파드 간에는 DNS가 필요</li>
                    <li>DNS는 서비스 이름을 내부 IP로 변환</li>
                </ul>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">📂 DNS 이름 구조</h2>
                <BlockCode
                    language="bash"
                    code={`# 짧은 이름
myservice

# 전체 도메인 형식
myservice.default.svc.cluster.local`}
                />
            </div>

            <div>
                <h2 className="text-2xl font-semibold">🛠️ 실습 명령어</h2>
                <p>Busybox를 통해 DNS 검색 확인:</p>
                <BlockCode
                    language="bash"
                    code={`kubectl run -i --tty busybox --image=busybox --restart=Never -- sh
cat /etc/resolv.conf`}
                />

                <p className="mt-4">출력 예시:</p>
                <BlockCode
                    language="bash"
                    code={`nameserver 10.0.0.10
search default.svc.cluster.local svc.cluster.local cluster.local`}
                />
            </div>

            <div>
                <h2 className="text-2xl font-semibold">📋 요약</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>서비스 탐색은 <strong>DNS 기반</strong>으로 동작</li>
                    <li>같은 네임스페이스 내에서 이름만으로 통신 가능</li>
                    <li>DNS search 도메인을 통해 전체 도메인 생략 가능</li>
                    <li>
                        서비스 없이 파드는 외부에서 직접 접근할 수 <strong>없음</strong>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default KubernetesDNSDiscovery;