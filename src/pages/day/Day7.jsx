import React from "react";
import BlockCode from "../../components/BlockCode.jsx";

const Day7 = () => {
    return (
        <section className="space-y-10 text-gray-800 dark:text-gray-200 leading-relaxed">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500">
                Day 7 – Kops로 AWS 클러스터 구성하기
            </h1>

            <div>
                <h2 className="text-xl font-semibold">📖 오늘 학습한 개념</h2>
                <ul className="list-disc list-inside mt-3 space-y-2">
                    <li><strong>Kops:</strong> AWS에 쿠버네티스 클러스터를 설치/관리하는 도구</li>
                    <li><strong>kubectl:</strong> 클러스터를 제어하는 커맨드라인 툴</li>
                    <li><strong>SSH Key:</strong> 노드 접근을 위한 공개키 생성</li>
                    <li><strong>S3 Bucket:</strong> 클러스터 상태 저장 장소 (state store)</li>
                    <li><strong>DNS 설정:</strong> 도메인과 NS 레코드 연동</li>
                    <li><strong>클러스터 생성:</strong> Kops 명령어로 마스터/노드 구성</li>
                    <li><strong>NodePort 서비스 테스트:</strong> 배포한 앱에 외부 접근 테스트</li>
                    <li><strong>클러스터 삭제:</strong> 자원 정리 및 삭제 명령 학습</li>
                </ul>
            </div>

            <div>
                <h2 className="text-xl font-semibold">📦 설치 및 구성 명령 요약</h2>
                <BlockCode language="bash" code={`# Kops 설치
curl -LO https://github.com/kubernetes/kops/releases/latest/download/kops-linux-amd64
chmod +x kops-linux-amd64
sudo mv kops-linux-amd64 /usr/local/bin/kops

# kubectl 설치
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl
sudo mv kubectl /usr/local/bin/kubectl

# SSH 키 생성
ssh-keygen -t rsa -b 4096`} />
            </div>

            <div>
                <h2 className="text-xl font-semibold">🧱 클러스터 생성 예시</h2>
                <BlockCode language="bash" code={`kops create cluster \\
  --name=kubernetes.example.com \\
  --state=s3://my-kops-state-bucket \\
  --zones=us-east-1a \\
  --node-count=2 \\
  --node-size=t2.micro \\
  --master-size=t2.micro \\
  --dns-zone=kubernetes.example.com

kops update cluster kubernetes.example.com --state=s3://my-kops-state-bucket --yes`} />
            </div>

            <div>
                <h2 className="text-xl font-semibold">🌐 서비스 배포 및 테스트</h2>
                <BlockCode language="bash" code={`kubectl run hello-minikube --image=kicbase/echo-server:1.0 --port=8080
kubectl expose deployment hello-minikube --type=NodePort
kubectl get service`} />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    EC2 퍼블릭 IP + NodePort로 접속 테스트
                </p>
            </div>

            <div>
                <h2 className="text-xl font-semibold">🧯 클러스터 삭제</h2>
                <BlockCode language="bash" code={`kops delete cluster --name=kubernetes.example.com --state=s3://my-kops-state-bucket --yes`} />
            </div>
        </section>
    );
};

export default Day7;