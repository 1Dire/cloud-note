import React from "react";
import BlockCode from "@/components/BlockCode.jsx";
import Tags from "@/components/Tags.jsx";

export default function PodAffinityAntiAffinity() {
    const tags = [
        "Kubernetes",
        "Pod Affinity",
        "Pod Anti-Affinity",
        "Scheduling",
        "Topology",
        "High Availability",
    ];

    return (
        <section className="space-y-8 text-gray-800 dark:text-gray-200 leading-relaxed">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500">
                파드 간 어피니티 & 안티어피니티 (개념 + 데모)
            </h1>

            {/* 태그 */}
            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags} />
            </div>

            {/* 개념 요약 */}
            <div>
                <h2 className="text-2xl font-semibold">개념 한눈에 보기</h2>
                <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>
                        <strong>Pod Affinity</strong>: 특정 <em>파드의 라벨</em>을 기준으로 “<strong>가까이</strong>” 배치.
                    </li>
                    <li>
                        <strong>Pod Anti-Affinity</strong>: 특정 파드와 “<strong>떨어져</strong>” 배치(분산/중복 제거).
                    </li>
                    <li>
                        규칙 유형:
                        <code className="mx-1">requiredDuringSchedulingIgnoredDuringExecution</code>
                        (반드시 충족) /
                        <code className="mx-1">preferredDuringSchedulingIgnoredDuringExecution</code>
                        (선호, 불가 시 완화).
                    </li>
                    <li>
                        <strong>토폴로지 키</strong>로 “같다”의 범위를 정의:
                        <code className="mx-1">kubernetes.io/hostname</code>(같은 노드),
                        <code className="mx-1">topology.kubernetes.io/zone</code>(같은 가용 영역) 등.
                    </li>
                    <li>
                        <strong>스케줄링 시점</strong>에만 평가. 더 적합한 후보가 나중에 생겨도 자동 이동 없음(재배치를 원하면 파드 재생성).
                    </li>
                    <li>
                        기본적으로 <strong>같은 네임스페이스</strong>의 파드 라벨만 매칭(교차 네임스페이스는 별도 필드 필요).
                    </li>
                </ul>
            </div>

            {/* 예시들 */}
            <div>
                <h2 className="text-2xl font-semibold">자주 쓰는 패턴</h2>

                <h3 className="text-xl font-semibold mt-4">① 같은 노드에 붙이기 (Co-location)</h3>
                <BlockCode language="yaml">
                    {`affinity:
  podAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
    - labelSelector:
        matchExpressions:
        - key: app
          operator: In
          values: ["myapp"]
      topologyKey: "kubernetes.io/hostname"`}
                </BlockCode>

                <h3 className="text-xl font-semibold mt-4">② 같은 존에 묶기 (같은 AZ)</h3>
                <BlockCode language="yaml">
                    {`affinity:
  podAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
    - labelSelector:
        matchExpressions:
        - key: app
          operator: In
          values: ["myapp"]
      topologyKey: "topology.kubernetes.io/zone"`}
                </BlockCode>

                <h3 className="text-xl font-semibold mt-4">③ 같은 노드 피해서 분산 (Anti-Affinity)</h3>
                <BlockCode language="yaml">
                    {`affinity:
  podAntiAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
    - labelSelector:
        matchExpressions:
        - key: app
          operator: In
          values: ["myapp"]
      topologyKey: "kubernetes.io/hostname"`}
                </BlockCode>
            </div>

            {/* 데모 1: Hostname 기반 Co-location */}
            <div>
                <h2 className="text-2xl font-semibold">데모 ①: Hostname 기준으로 <em>같은 노드</em>에 붙이기</h2>
                <p className="mt-2">두 개의 배포를 사용해 Affinity 효과를 확인합니다.</p>

                <h3 className="text-xl font-semibold mt-3">배포 매니페스트</h3>
                <BlockCode language="yaml">
                    {`# pod-affinity-1: 기준이 되는 파드 (라벨 app=pod-affinity-1)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pod-affinity-1
spec:
  replicas: 1
  selector:
    matchLabels: { app: pod-affinity-1 }
  template:
    metadata:
      labels: { app: pod-affinity-1 }
    spec:
      containers:
      - name: web
        image: nginx:1.25
        ports: [{ containerPort: 80 }]

---
# pod-affinity-2: 위 파드와 "같은 노드"에 배치
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pod-affinity-2
spec:
  replicas: 1
  selector:
    matchLabels: { app: pod-affinity-2 }
  template:
    metadata:
      labels: { app: pod-affinity-2 }
    spec:
      affinity:
        podAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
          - labelSelector:
              matchExpressions:
              - key: app
                operator: In
                values: ["pod-affinity-1"]
            topologyKey: "kubernetes.io/hostname"
      containers:
      - name: redis
        image: redis:7`}
                </BlockCode>

                <h3 className="text-xl font-semibold mt-3">실행 & 확인</h3>
                <BlockCode language="bash">
                    {`# 적용
kubectl apply -f pod-affinity.yaml

# 어떤 노드에 떴는지 확인
kubectl get pods -o wide

# pod-affinity-2를 4개로 확장 → 모두 같은 노드에 몰림
kubectl scale deployment/pod-affinity-2 --replicas=4
kubectl get pods -o wide`}
                </BlockCode>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    ⓘ 우연히 같은 노드에 붙은 것이 아니라, <code>topologyKey: kubernetes.io/hostname</code>로 강제된 결과입니다.
                </p>
            </div>

            {/* 데모 2: Zone 기반 Co-location */}
            <div>
                <h2 className="text-2xl font-semibold">데모 ②: Zone 기준으로 <em>같은 영역</em>에 묶기</h2>
                <p className="mt-2">
                    동일 매니페스트에서 <code>topologyKey</code>만 존 레벨로 바꿔 재적용합니다.
                </p>
                <BlockCode language="yaml">
                    {`# 변경 포인트만 발췌
spec:
  template:
    spec:
      affinity:
        podAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
          - labelSelector:
              matchExpressions:
              - key: app
                operator: In
                values: ["pod-affinity-1"]
            topologyKey: "topology.kubernetes.io/zone"`}
                </BlockCode>
                <BlockCode language="bash">
                    {`kubectl delete -f pod-affinity.yaml
kubectl apply -f pod-affinity.yaml

# 노드의 zone 라벨 확인
kubectl get nodes -o wide --show-labels | sed -n '/NAME/,$p'

# 스케일 후, 같은 zone 내 여러 노드로 분산됨(노드 리소스 상황에 따라 다름)
kubectl scale deployment/pod-affinity-2 --replicas=5
kubectl get pods -o wide`}
                </BlockCode>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    ⓘ 모든 노드가 같은 AZ라면 “노드 분산”은 보이지만 “AZ 간 차이”는 보이지 않을 수 있습니다.
                </p>
            </div>

            {/* 데모 3: Anti-Affinity로 같은 노드 피하기 */}
            <div>
                <h2 className="text-2xl font-semibold">데모 ③: 안티-어피니티로 <em>같은 노드</em> 피하기</h2>
                <p className="mt-2">동일 앱의 복제 파드를 서로 다른 노드로 분산하려는 시나리오.</p>
                <BlockCode language="yaml">
                    {`apiVersion: apps/v1
kind: Deployment
metadata:
  name: spread-myapp
spec:
  replicas: 3
  selector:
    matchLabels: { app: myapp }
  template:
    metadata:
      labels: { app: myapp }
    spec:
      affinity:
        podAntiAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
          - labelSelector:
              matchExpressions:
              - key: app
                operator: In
                values: ["myapp"]
            topologyKey: "kubernetes.io/hostname"
      containers:
      - name: web
        image: nginx:1.25`}
                </BlockCode>
                <BlockCode language="bash">
                    {`kubectl apply -f spread-myapp.yaml
kubectl get pods -o wide   # 서로 다른 노드에 분산되었는지 확인`}
                </BlockCode>
            </div>

            {/* 디버깅 팁 */}
            <div>
                <h2 className="text-2xl font-semibold">디버깅 팁</h2>
                <BlockCode language="bash">
                    {`# Pending 이유(이벤트) 확인
kubectl describe pod <POD_NAME>

# 라벨 확인
kubectl get pods -L app -o wide
kubectl get nodes --show-labels | sed -n '/NAME/,$p'`}
                </BlockCode>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    ⓘ <code>required...</code>를 과도하게 쓰면 스케줄링이 막힐 수 있어요. 먼저 <code>preferred...</code>로 시도하고,
                    꼭 필요한 경우에만 <code>required...</code>로 승격하세요.
                </p>
            </div>
        </section>
    );
}