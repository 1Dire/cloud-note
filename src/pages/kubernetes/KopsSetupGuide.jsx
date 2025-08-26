import React from "react";
import { FcLink } from "react-icons/fc";
import BlockCode from "../../components/BlockCode.jsx";
import Tags from "../../components/Tags.jsx";

const KopsSetupGuide = () => {
    const tags = ["Kops", "Kubernetes", "AWS", "클러스터", "Vagrant", "DNS"];

    return (
        <section className="space-y-10 text-gray-800 dark:text-gray-200 leading-relaxed">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500">
                Kops 클러스터 구성 – AWS & DNS 설정 가이드
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags} />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">🚀 클러스터 생성 흐름 개요</h2>
                <p>
                    Vagrant를 통해 Ubuntu 환경을 구성하고, AWS CLI 및 IAM 설정을 마친 상태에서 Kops와 kubectl을 설치해 클러스터를 구성한다.
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">📥 Kops 설치</h2>
                <p>
                    Kops는 GitHub 릴리스 페이지에서 바이너리 형태로 제공된다.
                </p>
                <p>
                    🛠 <FcLink className="inline-block mr-1" />
                    <a
                        href="https://github.com/kubernetes/kops/releases"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-sky-500 underline decoration-wavy decoration-blue-500"
                    >
                        GitHub - Kops 릴리스
                    </a>
                </p>
                <BlockCode
                    language="bash"
                    code={`curl -LO https://github.com/kubernetes/kops/releases/latest/download/kops-linux-amd64
chmod +x kops-linux-amd64
sudo mv kops-linux-amd64 /usr/local/bin/kops`}
                />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">📦 kubectl 설치</h2>
                <p>
                    kubectl은 Kubernetes 클러스터를 관리하기 위한 CLI 도구이며, Kops와 함께 설치가 필요하다.
                </p>
                <BlockCode
                    language="bash"
                    code={`curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl
sudo mv kubectl /usr/local/bin/kubectl`}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    설치 후 <code>kubectl version</code>으로 정상 작동 여부를 확인할 수 있다.
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">🔑 SSH 키 생성</h2>
                <p>
                    Kops는 SSH를 통해 노드에 접속하므로, 공개 키를 미리 생성해 두어야 한다.
                </p>
                <BlockCode language="bash" code={`ssh-keygen -t rsa -b 4096`} />
                <p>
                    기본 생성 위치는 <code>~/.ssh/id_rsa.pub</code>이며, 해당 키가 노드에 설치된다.
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">🧱 클러스터 생성 명령</h2>
                <BlockCode
                    language="bash"
                    code={`kops create cluster \\
  --name=kubernetes.newtech.academy \\
  --state=s3://my-kops-state-bucket \\
  --zones=us-east-1a \\
  --node-count=2 \\
  --node-size=t2.micro \\
  --master-size=t2.micro \\
  --dns-zone=kubernetes.newtech.academy`}
                />
                <p>위 명령으로 Kops 클러스터 구성을 정의하고, 다음 명령으로 실제 인프라를 생성한다.</p>
                <BlockCode
                    language="bash"
                    code={`kops update cluster kubernetes.newtech.academy --state=s3://my-kops-state-bucket --yes`}
                />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">🔍 클러스터 확인 및 테스트</h2>
                <BlockCode language="bash" code={`kubectl get nodes`} />
                <p>노드 목록 확인이 가능하며, 아래 예시처럼 간단한 애플리케이션을 배포할 수 있다.</p>
                <BlockCode
                    language="bash"
                    code={`kubectl run hello-minikube --image=kicbase/echo-server:1.0 --port=8080
kubectl expose deployment hello-minikube --type=NodePort
kubectl get service`}
                />
                <p>노출된 NodePort를 통해 EC2 퍼블릭 IP로 접근하면 응답을 확인할 수 있다.</p>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">🧯 클러스터 삭제</h2>
                <BlockCode
                    language="bash"
                    code={`kops delete cluster --name=kubernetes.newtech.academy --state=s3://my-kops-state-bucket --yes`}
                />
                <p>
                    삭제 시 <code>--yes</code> 옵션을 반드시 포함해야 한다.
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">🌐 DNS 설정 및 확인</h2>
                <p>
                    클러스터 접근을 위해 DNS 설정이 필요하다.
                </p>
                <ul className="list-disc list-inside space-y-1">
                    <li>Route53에 호스팅 영역 생성</li>
                    <li>도메인 등록기관에 NS 레코드 등록</li>
                    <li>DNS 전파에는 최대 1시간 소요 가능</li>
                </ul>
                <p>DNS 확인 명령 예시:</p>
                <BlockCode language="bash" code={`host -t NS kubernetes.newtech.academy`} />
            </div>
        </section>
    );
};

export default KopsSetupGuide;