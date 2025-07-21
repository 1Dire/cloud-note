import React from "react";
import BlockCode from "../../components/BlockCode.jsx";

const Day5 = () => {
    return (
        <section className="space-y-10 text-gray-800 dark:text-gray-200">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500">
                Day 5 – 쿠버네티스 기초 & 실습
            </h1>

            <div className="space-y-6">
                <div>
                    <h2 className="text-xl font-semibold">📌 오늘의 목표</h2>
                    <ul className="list-disc list-inside">
                        <li>쿠버네티스 기본 개념 학습</li>
                        <li>클러스터 구성요소 이해 (마스터/워커)</li>
                        <li>컨트롤 플레인 구성 이해</li>
                        <li>Minikube 실습 및 kubectl 사용법 익히기</li>
                        <li>Pod, Deployment, Service 실습</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl font-semibold">📖 이론 학습</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Pod:</strong> 컨테이너를 실행하는 최소 단위</li>
                        <li><strong>Deployment:</strong> 애플리케이션 배포 및 업데이트 관리</li>
                        <li><strong>Service:</strong> 네트워크를 통한 접근 포인트 제공 (LoadBalancer, ClusterIP, NodePort)</li>
                        <li><strong>kubectl:</strong> 쿠버네티스 클러스터를 제어하는 CLI</li>
                        <li><strong>Minikube:</strong> 로컬에서 쿠버네티스 클러스터를 실행하는 툴</li>
                        <li><strong>마스터 노드:</strong> 클러스터의 감독, 컨트롤 플레인 실행</li>
                        <li><strong>워커 노드:</strong> 실제 컨테이너가 실행되는 서버</li>
                    </ul>

                    <h3 className="text-lg font-semibold mt-4">🔧 마스터 노드의 컨트롤 플레인 구성</h3>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li><strong>kube-apiserver:</strong> 외부와 통신, kubectl 명령을 실행</li>
                        <li><strong>kube-controller-manager:</strong> 컨트롤러를 통한 상태 관리</li>
                        <li><strong>kube-scheduler:</strong> 파드를 워커 노드에 배치</li>
                        <li><strong>cloud-controller-manager:</strong> 클라우드와 연동해 리소스를 관리</li>
                        <li><strong>etcd:</strong> 클러스터 상태를 저장하는 분산 데이터베이스</li>
                    </ul>

                    <h3 className="text-lg font-semibold mt-4">🔧 워커 노드의 구성</h3>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li><strong>kubelet:</strong> 컨테이너 실행 및 상태 관리</li>
                        <li><strong>kube-proxy:</strong> 네트워크 요청 전달 및 로드밸런싱</li>
                        <li><strong>컨테이너 엔진:</strong> Docker, containerd 등 설치 필요</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl font-semibold">🛠 실습</h2>
                    <ol className="list-decimal list-inside space-y-4">
                        <li>
                            <strong>Minikube 설치</strong>
                            <BlockCode>
                                {`curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube`}
                            </BlockCode>
                        </li>

                        <li>
                            <strong>Minikube 클러스터 시작</strong>
                            <BlockCode>
                                {`minikube start`}
                            </BlockCode>
                        </li>

                        <li>
                            <strong>kubectl 설치</strong>
                            <BlockCode>
                                {`sudo apt update
sudo apt install -y kubectl`}
                            </BlockCode>
                        </li>

                        <li>
                            <strong>Deployment 생성</strong>
                            <BlockCode>
                                {`kubectl create deployment nginx --image=nginx`}
                            </BlockCode>
                        </li>

                        <li>
                            <strong>Service 생성 (NodePort)</strong>
                            <BlockCode>
                                {`kubectl expose deployment nginx --type=NodePort --port=80`}
                            </BlockCode>
                        </li>

                        <li>
                            <strong>웹 서비스 접속</strong>
                            <p>아래 명령어로 접속 가능한 URL 확인</p>
                            <BlockCode>
                                {`minikube service nginx --url`}
                            </BlockCode>
                        </li>

                        <li>
                            <strong>리소스 상태 확인</strong>
                            <BlockCode>
                                {`kubectl get nodes
kubectl get pods
kubectl get deployments
kubectl get services`}
                            </BlockCode>
                        </li>
                    </ol>
                </div>

                <div>
                    <h2 className="text-xl font-semibold">✅ 오늘 할 일</h2>
                    <ul className="list-disc list-inside">
                        <li>Minikube 설치 및 실행</li>
                        <li>kubectl 설치</li>
                        <li>Deployment 생성 (nginx)</li>
                        <li>Service 생성 (NodePort)</li>
                        <li>웹 서비스 접속 테스트</li>
                        <li>컨트롤 플레인과 워커 노드 개념 복습</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Day5;
