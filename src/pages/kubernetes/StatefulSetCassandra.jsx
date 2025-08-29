import React from "react";
import Tags from "@/components/Tags";
import BlockCode from "@/components/BlockCode.jsx";

const StatefulSetCassandra = () => {
    const tags = ["Kubernetes", "StatefulSet", "Cassandra", "Headless Service", "PVC", "Stateful App"];

    return (
 <div className="prose prose-lg mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide w-full max-w-4xl lg:w-4xl">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500">
                StatefulSet로 Cassandra 클러스터 배포 데모
            </h1>

            {/* 태그 */}
            <div className="flex flex-wrap gap-2 mb-2">
                <Tags tags={tags} />
            </div>

            {/* 개요 */}
            <div>
                <h2 className="text-2xl font-semibold">개요</h2>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>StatefulSet</strong>은 파드의 <strong>이름/순서/스토리지</strong>를 안정적으로 유지.</li>
                    <li><strong>Cassandra</strong>는 노드 간 통신과 부트스트랩에 <strong>정적 호스트명(시드)</strong>이 필요.</li>
                    <li>각 파드에 <strong>개별 PVC</strong>가 붙어서 데이터 보존(재시작/재스케줄 이후에도 유지).</li>
                    <li><strong>Headless Service</strong>(clusterIP: None)로 각 파드에 DNS 레코드 부여.</li>
                </ul>
            </div>

            {/* 핵심 구조 */}
            <div>
                <h2 className="text-2xl font-semibold">구성 요소</h2>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>StatefulSet</strong>: 파드 이름(예: <code>cassandra-0</code>, <code>cassandra-1</code>, …), 순차 생성/종료.</li>
                    <li><strong>Headless Service</strong>: <code>cassandra.default.svc.cluster.local</code> 아래에 각 파드 FQDN 제공.</li>
                    <li><strong>volumeClaimTemplates</strong>: 파드별 PVC 자동 생성(예: <code>cassandra-data-cassandra-0</code>).</li>
                    <li><strong>Readiness Probe</strong>: 노드 준비 상태 확인 후 트래픽 유입.</li>
                </ul>
            </div>

            {/* 예시: Headless Service */}
            <div>
                <h2 className="text-2xl font-semibold">Headless Service (DNS 전용)</h2>
                <BlockCode language="yaml">
                    {`apiVersion: v1
kind: Service
metadata:
  name: cassandra
  labels:
    app: cassandra
spec:
  clusterIP: None           # Headless Service
  selector:
    app: cassandra
  ports:
    - name: cql
      port: 9042`}
                </BlockCode>
            </div>

            {/* 예시: StatefulSet */}
            <div>
                <h2 className="text-2xl font-semibold">StatefulSet (Cassandra 3노드)</h2>
                <BlockCode language="yaml">
                    {`apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: cassandra
spec:
  serviceName: "cassandra"     # 반드시 Headless Service와 일치
  replicas: 3
  selector:
    matchLabels:
      app: cassandra
  template:
    metadata:
      labels:
        app: cassandra
    spec:
      securityContext:
        fsGroup: 999
      containers:
      - name: cassandra
        image: gcr.io/google-samples/cassandra:v13
        ports:
          - name: intra-node
            containerPort: 7000
          - name: jmx
            containerPort: 7199
          - name: cql
            containerPort: 9042
        env:
          - name: HEAP_SIZE
            value: "512M"
          - name: CASSANDRA_SEEDS
            value: "cassandra-0.cassandra.default.svc.cluster.local"
          - name: CASSANDRA_CLUSTER_NAME
            value: "DemoCluster"
          - name: CASSANDRA_DC
            value: "DC1"
          - name: CASSANDRA_RACK
            value: "RACK1"
          - name: POD_IP
            valueFrom:
              fieldRef: { fieldPath: status.podIP }
        readinessProbe:
          exec:
            command: ["/bin/bash", "-c", "nodetool status | grep -E 'UN|DN|UJ'"]
          initialDelaySeconds: 15
          timeoutSeconds: 5
        volumeMounts:
          - name: cassandra-data
            mountPath: /cassandra_data
  volumeClaimTemplates:
  - metadata:
      name: cassandra-data
    spec:
      accessModes: ["ReadWriteOnce"]
      storageClassName: standard
      resources:
        requests:
          storage: 8Gi`}
                </BlockCode>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    ⚠️ <code>storageClassName</code>은 클러스터 환경에 맞게 조정하세요(예: AWS gp2/ebs-csi, GKE standard-rwo 등).
                </p>
            </div>

            {/* 데모 흐름 */}
            <div>
                <h2 className="text-2xl font-semibold">데모 흐름</h2>
                <ol className="list-decimal list-inside mt-2 space-y-2">
                    <li><strong>적용</strong>
                        <BlockCode language="bash">
                            {`kubectl apply -f cassandra-headless-svc.yaml
kubectl apply -f cassandra-statefulset.yaml`}
                        </BlockCode>
                    </li>
                    <li><strong>상태 확인</strong>
                        <BlockCode language="bash">
                            {`kubectl get pods -l app=cassandra
kubectl exec -it cassandra-0 -- nodetool status`}
                        </BlockCode>
                    </li>
                    <li><strong>DNS 확인</strong>
                        <BlockCode language="bash">
                            {`kubectl exec -it cassandra-0 -- bash
# 파드 내부에서
ping cassandra-0.cassandra
ping cassandra-1.cassandra
ping cassandra-2.cassandra`}
                        </BlockCode>
                    </li>
                    <li><strong>복구 테스트</strong> (파드 재생성 시 데이터/이름 유지)
                        <BlockCode language="bash">
                            {`kubectl delete pod cassandra-2
kubectl get pods -l app=cassandra
kubectl get pvc | grep cassandra-data   # 기존 PVC 재사용 확인`}
                        </BlockCode>
                    </li>
                </ol>
            </div>

            {/* 포인트 정리 */}
            <div className="bg-indigo-50 dark:bg-sky-900/30 border border-indigo-200 dark:border-sky-800 rounded-md p-4">
                <h3 className="text-lg font-semibold mb-1">핵심 포인트</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li>정적 호스트명: <code>cassandra-0.cassandra</code> 처럼 파드별 고정 FQDN 부여.</li>
                    <li>시드(Seeds): 모든 노드는 <code>cassandra-0</code> 등 시드 노드로 부트스트랩.</li>
                    <li>스토리지: 파드별 PVC로 데이터 보존, 노드 이동/재시작에도 유지.</li>
                    <li>순서 보장: 0 → 1 → 2 순서로 생성, 역순으로 종료.</li>
                </ul>
            </div>
        </div>
    );
};

export default StatefulSetCassandra;
