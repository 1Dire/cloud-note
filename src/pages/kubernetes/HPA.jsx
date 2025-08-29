import React from "react";
import BlockCode from "@/components/BlockCode.jsx";
import Tags from "@/components/Tags.jsx";

export default function HPA() {
    const tags = ["Kubernetes", "HPA", "Autoscaling", "Metrics Server", "Minikube"];

    return (
        <div className="prose prose-lg max-w-4xl mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500">
                HPA (Horizontal Pod Autoscaler) 오토스케일링 데모
            </h1>

            {/* 태그 */}
            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags} />
            </div>

            {/* 정의 */}
            <p>
                <strong>오토스케일링(Auto Scaling)</strong>은 시스템 부하에 따라 <strong>파드의 개수를 자동으로 조절</strong>하는 기능입니다.
                쿠버네티스에서 HPA(Horizontal Pod Autoscaler)는 <strong>CPU·메모리 사용량</strong> 또는 커스텀 메트릭을 기반으로
                파드 수를 늘리거나 줄여서 효율적인 리소스 사용과 안정적인 서비스 성능을 보장합니다.
            </p>

            <h2 className="text-2xl font-semibold">1) 사전 준비</h2>
            <ul className="list-disc list-inside space-y-1">
                <li>Minikube 사용 시 Metrics Server 활성화</li>
            </ul>
            <BlockCode language="bash">minikube addons enable metrics-server</BlockCode>

            <h2 className="text-2xl font-semibold">2) 예제 배포 (CPU 요청량 포함)</h2>
            <p>CPU 요청량이 있어야 HPA가 퍼센트를 계산할 수 있습니다.</p>
            <BlockCode language="yaml">
                {`apiVersion: apps/v1
kind: Deployment
metadata:
  name: hpa-example
spec:
  replicas: 1
  selector:
    matchLabels:
      app: hpa-example
  template:
    metadata:
      labels:
        app: hpa-example
    spec:
      containers:
      - name: web
        image: k8s.gcr.io/hpa-example
        ports:
        - containerPort: 80
        resources:
          requests:
            cpu: 100m
---
apiVersion: v1
kind: Service
metadata:
  name: hpa-example
spec:
  selector:
    app: hpa-example
  ports:
  - name: http
    port: 31001
    targetPort: 80
    protocol: TCP`}
            </BlockCode>
            <BlockCode language="bash">
                {`kubectl apply -f hpa-example.yaml
kubectl get deploy,svc -l app=hpa-example`}
            </BlockCode>

            <h2 className="text-2xl font-semibold">3) HPA 생성</h2>
            <p>CPU 평균 사용률 50%를 목표로 1~10개 사이에서 자동 조절합니다.</p>
            <BlockCode language="yaml">
                {`apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: hpa-example
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: hpa-example
  minReplicas: 1
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 50`}
            </BlockCode>
            <BlockCode language="bash">
                {`kubectl apply -f hpa.yaml
kubectl get hpa hpa-example`}
            </BlockCode>

            <h2 className="text-2xl font-semibold">4) 부하 발생(Load Generator)</h2>
            <p>Busybox로 반복 요청을 보내 CPU 사용률을 올립니다.</p>
            <BlockCode language="bash">
                {`kubectl run -it load-generator --image=busybox --restart=Never -- /bin/sh
# 컨테이너 셸 안에서 다음 실행
while true; do wget -q -O- http://hpa-example.default.svc.cluster.local:31001 > /dev/null; done`}
            </BlockCode>

            <h2 className="text-2xl font-semibold">5) 스케일 동작 확인</h2>
            <p>메트릭 집계/결정에 약 1~2분 소요될 수 있습니다.</p>
            <BlockCode language="bash">
                {`kubectl get hpa hpa-example
kubectl get pods -l app=hpa-example -w
kubectl top pods`}
            </BlockCode>

            <h2 className="text-2xl font-semibold">6) 부하 중단 & 축소 확인</h2>
            <p>load-generator 셸에서 <strong>Ctrl + C</strong>로 루프를 멈추면 몇 분 뒤 파드 수가 줄어듭니다.</p>

            <h2 className="text-2xl font-semibold">7) 정리(Cleanup)</h2>
            <BlockCode language="bash">
                {`kubectl delete hpa hpa-example
kubectl delete -f hpa-example.yaml
kubectl delete pod load-generator`}
            </BlockCode>

            <h2 className="text-2xl font-semibold">Troubleshooting</h2>
            <ul className="list-disc list-inside space-y-1">
                <li><strong>메트릭이 0%에서 안 변함</strong> → Metrics Server 설치/정상 동작 확인: <code>kubectl top pods</code></li>
                <li><strong>HPA가 동작 안 함</strong> → 파드에 <code>resources.requests.cpu</code> 설정했는지 확인</li>
                <li><strong>스케일 느림</strong> → HPA는 안정화 지연이 있어 1~2분 정도 기다리기</li>
            </ul>
        </div>
    );
}