import React from "react";
import InlineCode from "../../components/InlineCode.jsx";
import BlockCode from "../../components/BlockCode.jsx";
import Tags from "../../components/Tags.jsx";

const WhatIsKubernetes = () => {
    const tags = ["Kubernetes", "컨테이너", "오케스트레이션", "클러스터", "DevOps"];

    return (
        <div className="prose prose-lg max-w-4xl mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide">
            <h1 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-sky-500">
                쿠버네티스란 무엇인가?
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags}/>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">컨테이너 운영의 현실적인 문제</h2>
                <p>컨테이너를 운영할 때 다음과 같은 어려움이 있다:</p>
                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li><InlineCode>docker run</InlineCode> 명령을 일일이 반복해야 한다.</li>
                    <li>컨테이너를 여러 대 실행하려면 서버마다 직접 실행해야 한다.</li>
                    <li><InlineCode>docker-compose</InlineCode>를 사용해도 서버가 여러 대면 반복 작업은 여전하다.</li>
                    <li>컨테이너가 죽으면 직접 확인하고 재시작해야 한다.</li>
                    <li>컨테이너 업데이트 시 모든 서버에서 일일이 작업해야 한다.</li>
                </ul>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">쿠버네티스의 등장</h2>
                <p>쿠버네티스는 바로 이런 번거로운 컨테이너 관리의 수고를 덜어주는 도구다.</p>
                <p className="mt-3">도커 컴포즈에서 <InlineCode>docker-compose.yml</InlineCode>을 사용하는 것처럼, 쿠버네티스는 <strong>매니페스트 파일</strong>을 작성한다.</p>
                <p className="mt-3">이 파일을 기준으로 여러 물리적 서버에 컨테이너를 자동으로 생성하고 관리해준다.</p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">반복 작업의 예시</h2>
                <p>예를 들어 20개의 컨테이너를 실행해야 한다면, Docker만 사용할 경우 다음과 같은 작업을 반복해야 한다.</p>
                <BlockCode language="bash" code={`# Docker만 사용하는 경우
docker run myapp
docker run myapp
docker run myapp
# (20번 반복)`} />
                <p className="mt-3">하지만 쿠버네티스를 사용하면 매니페스트 파일 하나만 작성하면 된다.</p>
                <BlockCode language="yaml" code={`apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
spec:
  replicas: 20
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myapp:latest`} />
            </div>

            <div>
                <h2 className="text-2xl font-semibold">쿠버네티스가 제공하는 기능</h2>
                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li>여러 대의 서버에 컨테이너를 자동 배포</li>
                    <li>컨테이너 장애 감지 및 자동 복구</li>
                    <li>자동 스케일링</li>
                    <li>롤링 업데이트</li>
                    <li>중앙 집중형 모니터링 및 관리</li>
                </ul>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">쿠버네티스의 구성: 마스터 노드와 워커 노드</h2>
                <p>쿠버네티스는 <strong>마스터 노드</strong>와 <strong>워커 노드</strong>로 나뉜다. 역할이 다르다.</p>

                <h3 className="text-xl font-semibold mt-4">마스터 노드</h3>
                <p>마스터 노드는 <strong>감독</strong> 역할을 담당한다. 집으로 비유하면 <strong>대들보</strong> 같은 존재다.</p>
                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li>컨테이너를 직접 실행하지 않는다.</li>
                    <li>워커 노드에서 실행되는 컨테이너를 관리한다.</li>
                    <li>도커 엔진(컨테이너 엔진)이 설치되지 않는다.</li>
                </ul>

                <h3 className="text-xl font-semibold mt-4">워커 노드</h3>
                <p>워커 노드는 실제 <strong>컨테이너가 실행되는 서버</strong>이다.</p>
                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li>컨테이너를 실행하고 운영한다.</li>
                    <li>컨테이너 엔진(예: Docker, containerd)이 설치되어 있다.</li>
                </ul>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">클러스터란?</h2>
                <p>마스터 노드와 워커 노드가 함께 구성된 쿠버네티스 시스템을 <strong>클러스터</strong>라고 한다.</p>
                <p className="mt-3">클러스터는 사람이 개입하지 않아도 마스터 노드의 설정에 따라 워커 노드가 자동으로 관리되며 자율적으로 동작한다.</p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">쿠버네티스 설치 개요</h2>
                <p>쿠버네티스를 사용하려면 <strong>쿠버네티스 소프트웨어와 CNI</strong>를 설치해야 한다. 쿠버네티스는 도커와는 별개의 시스템이다.</p>

                <h3 className="text-xl font-semibold mt-4">설치해야 할 주요 구성 요소</h3>
                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li><strong>쿠버네티스 소프트웨어</strong>: 마스터와 워커 노드에 설치</li>
                    <li><strong>CNI (Container Network Interface)</strong>: 컨테이너 네트워크를 자동으로 연결</li>
                    <li><strong>etcd</strong>: 마스터 노드의 상태 저장용 데이터베이스</li>
                    <li><strong>컨테이너 엔진</strong>: 워커 노드에 설치 (예: Docker, containerd)</li>
                </ul>

                <h3 className="text-xl font-semibold mt-4">대표적인 CNI 플러그인</h3>
                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li>Flannel (플란넬)</li>
                    <li>Calico (칼리코)</li>
                    <li>AWS VPC CNI (AWS 환경에서 사용)</li>
                </ul>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">클러스터의 상태 관리와 제어</h2>
                <h3 className="text-xl font-semibold mt-4">etcd</h3>
                <p>마스터 노드에는 <strong>etcd</strong>라는 분산 데이터베이스가 설치된다.</p>
                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li>쿠버네티스 클러스터의 모든 상태 정보를 저장한다.</li>
                    <li>컨테이너가 몇 개 떠 있는지, 어디에 있는지 등을 기록한다.</li>
                    <li>키-값 형태로 빠르게 상태를 저장하고 조회한다.</li>
                </ul>

                <h3 className="text-xl font-semibold mt-4">kubectl</h3>
                <p><InlineCode>kubectl</InlineCode>은 쿠버네티스를 조작하는 명령어 도구다.</p>
                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li>관리자 컴퓨터(로컬)에 설치한다.</li>
                    <li>마스터 노드에 명령을 보내 초기 설정과 관리를 한다.</li>
                    <li>모든 쿠버네티스 제어는 <InlineCode>kubectl</InlineCode>로 진행된다.</li>
                </ul>

                <BlockCode language="bash" code={`# kubectl 사용 예시
kubectl get nodes        # 노드 상태 조회
kubectl get pods         # 파드 상태 조회
kubectl apply -f app.yaml # 매니페스트 적용`} />
            </div>

            <div>
                <h2 className="text-2xl font-semibold">마스터 노드의 컨트롤 플레인 구성</h2>
                <p>쿠버네티스의 마스터 노드에는 다음과 같은 핵심 컴포넌트가 설치된다:</p>

                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li><strong>kube-apiserver</strong>: 외부와 통신하는 API 서버. <InlineCode>kubectl</InlineCode> 명령을 전달받아 실행</li>
                    <li><strong>kube-controller-manager</strong>: 컨트롤러를 통해 상태를 감시하고 조정</li>
                    <li><strong>kube-scheduler</strong>: 파드를 적절한 워커 노드에 배치</li>
                    <li><strong>cloud-controller-manager</strong>: 클라우드와 연동해 서비스 리소스를 생성</li>
                    <li><strong>etcd</strong>: 클러스터 상태를 저장하는 분산 키-값 저장소</li>
                </ul>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">워커 노드의 구성</h2>
                <p>워커 노드에는 다음과 같은 컴포넌트가 실행된다:</p>

                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li><strong>kubelet</strong>: 컨테이너를 실행하고 상태를 관리. 마스터의 스케줄링을 실행</li>
                    <li><strong>kube-proxy</strong>: 네트워크 트래픽을 적절한 파드로 전달</li>
                </ul>
            </div>
        </div>
    );
};

export default WhatIsKubernetes;