import React from "react";
import InlineCode from "../../components/InlineCode.jsx";
import BlockCode from "../../components/BlockCode.jsx";
import Tags from "../../components/Tags.jsx";

const ReplicaSetAndDeployment = () => {
    const tags = ["Kubernetes", "ReplicaSet", "Deployment", "레플리카", "오케스트레이션"];

    return (
       <div className="prose prose-lg mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide w-full max-w-4xl lg:w-4xl">
            <h1 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-sky-500">
                ReplicaSet과 Deployment란?
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags} />
            </div>

            <div>
                <h2 className="text-2xl font-semibold">ReplicaSet이란?</h2>
                <p>
                    <strong>ReplicaSet</strong>은 <strong>파드의 개수를 관리하는 반장</strong>이다.
                    정의된 개수만큼 파드를 유지하고, 모자라면 새로 만들고 많으면 삭제한다.
                </p>

                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li>파드의 수를 일정하게 유지한다.</li>
                    <li>장애나 종료로 파드가 줄어들면 자동으로 보충한다.</li>
                    <li>파드의 개수를 <strong>레플리카</strong>라고 부른다. (복제품과 같은 뜻)</li>
                </ul>

                <p className="mt-3">
                    그래서 파드의 수를 조절한다는 말은 <strong>레플리카의 수를 조절한다</strong>는 말과 같다.
                </p>

                <BlockCode
                    language="yaml"
                    code={`# 예시: 파드 3개 유지
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: myapp-replicaset
spec:
  replicas: 3
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
        image: myapp:latest`}
                />
            </div>

            <div>
                <h2 className="text-2xl font-semibold">Deployment란?</h2>
                <p>
                    <strong>Deployment</strong>는 <strong>파드를 배포하고 관리하는 상사</strong>다.
                    ReplicaSet을 직접 다루기 어렵기 때문에 대부분 <strong>Deployment를 사용해 관리</strong>한다.
                </p>

                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li>ReplicaSet을 자동으로 생성하고 관리한다.</li>
                    <li>파드가 사용하는 이미지, 버전, 설정 정보를 가진다.</li>
                    <li>롤링 업데이트, 롤백, 버전 관리 등을 지원한다.</li>
                </ul>

                <p className="mt-3">
                    쉽게 말해 <strong>ReplicaSet이 반장이라면, Deployment는 반장의 상사</strong>다.
                </p>

                <BlockCode
                    language="yaml"
                    code={`# Deployment 예시
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
spec:
  replicas: 3
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
        image: myapp:latest`}
                />
            </div>

            <div>
                <h2 className="text-2xl font-semibold">요약</h2>
                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li><strong>ReplicaSet:</strong> 파드의 수를 유지하는 반장</li>
                    <li><strong>레플리카:</strong> 동일한 구성을 가진 파드 복제본</li>
                    <li><strong>Deployment:</strong> 파드를 배포하고 ReplicaSet을 관리하는 상사</li>
                </ul>
            </div>
        </div>
    );
};

export default ReplicaSetAndDeployment;