import React from "react";
import BlockCode from "@/components/BlockCode.jsx";
import Tags from "@/components/Tags.jsx";

export default function AffinityAntiAffinity() {
    const tags = [
        "Kubernetes",
        "Affinity",
        "AntiAffinity",
        "NodeAffinity",
        "PodAffinity",
        "Scheduling",
    ];

    return (
       <div className="prose prose-lg mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide w-full max-w-4xl lg:w-4xl">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500">
                어피니티 & 안티 어피니티 (Affinity / Anti-Affinity)
            </h1>

            {/* 태그 */}
            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags} />
            </div>

            {/* 개념 한눈에 보기 */}
            <div>
                <h2 className="text-2xl font-semibold">개념 한눈에 보기</h2>
                <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>
                        <strong>어피니티(Affinity)</strong>: 파드를 <em>어떤 노드/파드 “가까이”</em> 배치하고 싶은 선호·요구 규칙.
                    </li>
                    <li>
                        <strong>안티 어피니티(Anti-Affinity)</strong>: 파드를 <em>특정 노드/파드와 “떨어져”</em> 배치하도록 하는 규칙.
                    </li>
                    <li>
                        <strong>스케줄링 시점</strong>에만 적용. 더 적합한 노드가 나중에 생겨도 자동 이동 없음(재스케줄하려면 파드 재생성 필요).
                    </li>
                </ul>
            </div>

            {/* NodeSelector vs Node Affinity */}
            <div>
                <h2 className="text-2xl font-semibold">NodeSelector vs Node Affinity</h2>
                <p className="mt-2">
                    <code>nodeSelector</code>는 “<strong>정확히 일치</strong>”만 허용하고 불일치 시 스케줄 실패.{" "}
                    <strong>Node Affinity</strong>는 <em>표현식</em>과 <em>선호(preferred)</em> 규칙까지 지원.
                </p>

                <h3 className="text-lg font-semibold mt-4">예) NodeSelector (엄격)</h3>
                <BlockCode language="yaml">
                    {`apiVersion: apps/v1
kind: Deployment
metadata:
  name: only-high-spec
spec:
  replicas: 3
  selector:
    matchLabels:
      app: demo
  template:
    metadata:
      labels:
        app: demo
    spec:
      nodeSelector:
        hardware: high-spec
      containers:
      - name: app
        image: nginx`}
                </BlockCode>

                <h3 className="text-lg font-semibold mt-4">예) Node Affinity (엄격 + 선호)</h3>
                <p className="mt-1">
                    <strong>requiredDuringSchedulingIgnoredDuringExecution</strong>는 반드시 충족,{" "}
                    <strong>preferredDuringSchedulingIgnoredDuringExecution</strong>는 가중치로 우선 배치.
                </p>
                <BlockCode language="yaml">
                    {`apiVersion: apps/v1
kind: Deployment
metadata:
  name: node-affinity-demo
spec:
  replicas: 3
  selector:
    matchLabels:
      app: naf-demo
  template:
    metadata:
      labels:
        app: naf-demo
    spec:
      affinity:
        nodeAffinity:
          # 1) 반드시 충족(엄격)
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
            - matchExpressions:
              - key: env
                operator: In
                values: ["dev"]

          # 2) 선호(유연) - 점수로 우선순위 부여
          preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 5
            preference:
              matchExpressions:
              - key: team
                operator: In
                values: ["engineering-project1"]
          - weight: 1
            preference:
              matchExpressions:
              - key: disktype
                operator: In
                values: ["ssd"]
      containers:
      - name: app
        image: nginx`}
                </BlockCode>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    ⓘ 스케줄러는 preferred 규칙의 <strong>weight</strong>를 합산해 각 노드에 점수를 매기고, 가장 점수가 높은 노드를 선택.
                </p>
            </div>

            {/* Pod Affinity / Anti-Affinity */}
            <div>
                <h2 className="text-2xl font-semibold">Pod Affinity / Pod Anti-Affinity</h2>
                <p className="mt-2">
                    실행 <strong>중인 다른 파드의 라벨</strong>을 기준으로 “가깝게” 또는 “멀리” 배치.{" "}
                    <code>topologyKey</code>로 “가깝다”의 기준(예: 같은 노드/같은 존)을 지정.
                </p>

                <h3 className="text-lg font-semibold mt-4">예) Pod Affinity (같이 붙이기)</h3>
                <BlockCode language="yaml">
                    {`affinity:
  podAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
    - labelSelector:
        matchExpressions:
        - key: app
          operator: In
          values: ["backend"]
      topologyKey: "kubernetes.io/hostname"  # 같은 노드에`}
                </BlockCode>

                <h3 className="text-lg font-semibold mt-4">예) Pod Anti-Affinity (떨어뜨리기/분산)</h3>
                <BlockCode language="yaml">
                    {`affinity:
  podAntiAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
    - labelSelector:
        matchExpressions:
        - key: app
          operator: In
          values: ["frontend"]
      topologyKey: "kubernetes.io/hostname"  # 같은 노드에는 배치 금지`}
                </BlockCode>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    ⓘ 고가용성을 위해 동일 앱의 복제 파드를 <strong>다른 노드</strong>로 분산하는 데 자주 사용.
                </p>
            </div>

            {/* 실습 데모: Node Affinity와 레이블 붙이기 */}
            <div>
                <h2 className="text-2xl font-semibold">실습 데모: Node Affinity + 노드 레이블</h2>
                <p className="mt-2">
                    3노드 클러스터(예: kOps)에서 <code>env=dev</code>를 필수, <code>team=engineering-project1</code>를 선호로 두고
                    파드가 어느 노드로 가는지 확인합니다.
                </p>

                <h3 className="text-lg font-semibold mt-3">1) 노드 레이블 확인</h3>
                <BlockCode language="bash">
                    {`kubectl get nodes
kubectl describe node <노드이름> | sed -n '/Labels:/,/Annotations:/p'`}
                </BlockCode>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    ⓘ 빌트인 라벨 예: <code>kubernetes.io/hostname</code>, <code>topology.kubernetes.io/zone</code>,{" "}
                    <code>topology.kubernetes.io/region</code>, <code>node.kubernetes.io/instance-type</code>, OS/arch 등.
                </p>

                <h3 className="text-lg font-semibold mt-3">2) 배포 적용 (env는 필수, team은 선호)</h3>
                <BlockCode language="bash">
                    {`kubectl apply -f node-affinity.yaml
kubectl get pods
kubectl describe pod <파드이름>   # 0/3 nodes are available 같은 메시지로 Pending일 수 있음`}
                </BlockCode>

                <h3 className="text-lg font-semibold mt-3">3) 노드에 레이블 추가</h3>
                <BlockCode language="bash">
                    {`# env=dev 레이블을 두 노드에 추가 (필수 조건 충족)
kubectl label node <node-1> env=dev
kubectl label node <node-2> env=dev

# 선호 조건(team)을 한 노드에만 추가
kubectl label node <node-2> team=engineering-project1`}
                </BlockCode>

                <h3 className="text-lg font-semibold mt-3">4) 스케줄링 결과 확인 & 선호 반영 확인</h3>
                <BlockCode language="bash">
                    {`kubectl get pods -o wide
kubectl describe pod <파드이름>

# 선호 노드로 재스케줄 유도: 파드 하나 삭제 → 새 파드가 team 레이블 노드에 뜨는지 확인
kubectl delete pod <파드이름>
kubectl get pods -o wide`}
                </BlockCode>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    ⓘ 선호 규칙은 “가능하면” 맞추는 것이라 해당 노드 리소스가 부족하면 <code>env=dev</code>만 만족하는 다른 노드로도 배치될 수 있어요.
                </p>
            </div>

            {/* 유용한 팁 */}
            <div>
                <h2 className="text-2xl font-semibold">유용한 팁</h2>
                <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>
                        <strong>required</strong> 규칙을 과하게 쓰면 파드가 <strong>Pending</strong>에 머물 수 있음(가용 노드 부족).
                    </li>
                    <li>
                        <strong>preferred</strong>만으로 시작하고, 꼭 필요한 경우에만 <strong>required</strong>로 승격하는 전략이 안전.
                    </li>
                    <li>
                        파드 배치 최적화는 <strong>어피니티/안티 어피니티 + 리소스 요청/한도 + 톨러레이션/테인트</strong>를 함께 고려.
                    </li>
                </ul>
            </div>
        </div>
    );
}