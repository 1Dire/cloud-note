import React from "react";
import BlockCode from "@/components/BlockCode";
import Tags from "@/components/Tags";

export default function WordPressDemo() {
    const tags = [
        "Kubernetes",
        "WordPress",
        "Secret",
        "Deployment",
        "Service",
        "NodePort",
        "Minikube"
    ];

    return (
        <section className="space-y-10 p-6 text-gray-800 dark:text-gray-200 leading-relaxed">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500 mb-4">
                워드프레스 + 시크릿 배포 데모
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags} />
            </div>

            <div>
                <h2 className="text-2xl font-semibold">🔐 시크릿 생성</h2>
                <p>DB 비밀번호를 저장할 시크릿을 생성합니다:</p>
                <BlockCode>
                    {`# wordpress-secret.yml
apiVersion: v1
kind: Secret
metadata:
  name: wordpress-secrets
type: Opaque
data:
  db-password: cGFzc3dvcmQ=  # base64 인코딩된 "password"`}
                </BlockCode>
                <p>적용:</p>
                <BlockCode>kubectl create -f wordpress/wordpress-secret.yml</BlockCode>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">📦 배포 구성</h2>
                <p>하나의 파드에 워드프레스와 MySQL을 함께 실행합니다.</p>
                <BlockCode>
                    {`# single-deployment-no-volumes.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wordpress-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: wordpress
  template:
    metadata:
      labels:
        app: wordpress
    spec:
      containers:
      - name: wordpress
        image: wordpress:4-php7.0
        ports:
        - containerPort: 80
        env:
        - name: WORDPRESS_DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: wordpress-secrets
              key: db-password
        - name: WORDPRESS_DB_HOST
          value: 127.0.0.1
      - name: mysql
        image: mysql:5.7
        ports:
        - containerPort: 3306
        env:
        - name: MYSQL_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: wordpress-secrets
              key: db-password`}
                </BlockCode>
                <p>적용:</p>
                <BlockCode>kubectl create -f wordpress/single-deployment-no-volumes.yml</BlockCode>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">🌐 서비스 생성</h2>
                <p>외부 접근을 위해 NodePort로 워드프레스를 노출합니다:</p>
                <BlockCode>
                    {`# wordpress-service.yml
apiVersion: v1
kind: Service
metadata:
  name: wordpress-service
spec:
  selector:
    app: wordpress
  type: NodePort
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
    nodePort: 30080`}
                </BlockCode>
                <p>적용 및 브라우저 접속:</p>
                <BlockCode>
                    {`kubectl create -f wordpress/wordpress-service.yml
minikube service wordpress-service --url`}
                </BlockCode>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">🔁 파드 재시작 시 데이터 휘발성</h2>
                <p>
                    현재는 <strong>볼륨 미사용 상태</strong>이기 때문에, 워드프레스에 저장된 데이터는 <strong>파드 재시작 시 모두 사라집니다.</strong>
                </p>
                <p>재시작 예시:</p>
                <BlockCode>kubectl delete pod [wordpress-pod-name]</BlockCode>
                <p>⇒ 새 파드 생성됨 + 워드프레스 설치화면 초기화됨</p>
                <p className="text-yellow-500">
                    이 문제는 이후 <strong>PersistentVolume </strong>로 해결예정.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">🧠 요약</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>Secret을 이용해 DB 비밀번호를 안전하게 전달</li>
                    <li>하나의 파드에 워드프레스 + MySQL 두 컨테이너 실행</li>
                    <li>NodePort 서비스로 외부에서 접속 가능</li>
                    <li>볼륨 미사용 상태로 데이터는 휘발성</li>
                </ul>
                <p className="mt-2">실습 경로: <code>/kubernetes-course/wordpress/</code></p>
            </div>
        </section>
    );
}
