import React from "react";
import BlockCode from "@/components/BlockCode.jsx";
import Tags from "@/components/Tags.jsx";

export default function TaintsAndTolerations() {
    const tags = ["Kubernetes", "Taint", "Toleration", "스케줄링", "노드관리"];

    return (
        <section className="space-y-8 text-gray-800 dark:text-gray-200 leading-relaxed">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500">
                테인트(Taint) & 톨러레이션(Toleration)
            </h1>

            {/* 태그 */}
            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags} />
            </div>

            <div>
                <h2 className="text-2xl font-semibold">개념</h2>
                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li>
                        <strong>테인트</strong>: <em>노드에 붙는</em> “거부 규칙”. 일치하는 톨러레이션이 없으면 파드를{" "}
                        <strong>받지 않음</strong>.
                    </li>
                    <li>
                        <strong>톨러레이션</strong>: <em>파드에 붙는</em> “허용 증명서”. 특정 테인트를{" "}
                        <strong>허용</strong>해 그 노드에 스케줄링/유지 가능.
                    </li>
                    <li>
                        <strong>어피니티와의 관계</strong>: 반대가 아니라 <strong>다른 축</strong>. 어피니티는 “가고 싶은 곳/피하고
                        싶은 곳”, 테인트는 “여긴 아무나 못 와”. 함께 쓰면 가장 깔끔함.
                    </li>
                </ul>
            </div>

            {/* 효과(Effect) 종류 */}
            <div>
                <h2 className="text-2xl font-semibold">효과(Effect) 종류</h2>
                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li>
                        <code>NoSchedule</code> : 일치하는 톨러레이션 없으면 <strong>새 파드 배치 금지</strong>.
                    </li>
                    <li>
                        <code>PreferNoSchedule</code> : 가능하면 피하지만 <strong>강제 금지는 아님</strong>.
                    </li>
                    <li>
                        <code>NoExecute</code> : 일치하는 톨러레이션 없으면 <strong>기존 파드도 축출</strong>.{" "}
                        <code>tolerationSeconds</code> 로猶予 가능.
                    </li>
                </ul>
            </div>

            {/* 대표 유스케이스 */}
            <div>
                <h2 className="text-2xl font-semibold">대표 유스케이스</h2>
                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li>마스터/시스템 전용 노드 보호 (일반 파드 접근 차단)</li>
                    <li>GPU/특수 하드웨어 전용 노드</li>
                    <li>팀별/워크로드별 전용 노드 (멀티테넌시)</li>
                    <li>상태 불량 노드 자동 격리(노드 상태 기반 테인트)</li>
                </ul>
            </div>

            {/* kubectl: 테인트 추가/삭제 */}
            <div>
                <h2 className="text-2xl font-semibold">테인트 추가/삭제</h2>
                <BlockCode>{`# 노드에 테인트 추가 (key=value:Effect)
kubectl taint nodes <NODE_NAME> dedicated=gpu:NoSchedule

# 값 없이 키만 테인트(쿠버네티스 기본 테인트 형태)
kubectl taint nodes <NODE_NAME> node-role.kubernetes.io/master=:NoSchedule

# 테인트 제거(끝에 - 붙이기)
kubectl taint nodes <NODE_NAME> dedicated=gpu:NoSchedule-
kubectl taint nodes <NODE_NAME> node-role.kubernetes.io/master:NoSchedule-`}</BlockCode>
            </div>

            {/* 파드: 톨러레이션 예시 */}
            <div>
                <h2 className="text-2xl font-semibold">파드에 톨러레이션 주기</h2>
                <p className="mt-2">테인트와 키/값/이펙트가 일치하도록 작성합니다.</p>
                <BlockCode>{`apiVersion: v1
kind: Pod
metadata:
  name: toleration-demo
spec:
  tolerations:
    - key: "dedicated"
      operator: "Equal"
      value: "gpu"
      effect: "NoSchedule"
  containers:
    - name: app
      image: nginx`}</BlockCode>
                <p className="mt-3">
                    키만 검사하려면 <code>operator: Exists</code> 를 사용합니다.
                </p>
                <BlockCode>{`tolerations:
  - key: "node-role.kubernetes.io/master"
    operator: "Exists"
    effect: "NoSchedule"`}</BlockCode>
            </div>

            {/* NoExecute + tolerationSeconds */}
            <div>
                <h2 className="text-2xl font-semibold">NoExecute + 감내 시간</h2>
                <p className="mt-2">
                    노드에 <code>NoExecute</code> 테인트가 생겨도, 지정 시간(초)만큼은 파드를 유지합니다.
                </p>
                <BlockCode>{`tolerations:
  - key: "node.kubernetes.io/not-ready"
    operator: "Exists"
    effect: "NoExecute"
    tolerationSeconds: 600`}</BlockCode>
            </div>

            {/* 빠른 실습 시나리오 */}
            <div>
                <h2 className="text-2xl font-semibold">⚙️ 빠른 실습</h2>
                <ol className="list-decimal list-inside space-y-2 mt-2">
                    <li>
                        노드에 테인트 걸기
                        <BlockCode>{`kubectl get nodes
kubectl taint nodes <NODE> dedicated=team-a:NoSchedule`}</BlockCode>
                    </li>
                    <li>
                        톨러레이션 <strong>없는</strong> 파드 배포 → 해당 노드에 스케줄 안 됨
                        <BlockCode>{`kubectl run no-toleration --image=nginx --restart=Never`}</BlockCode>
                    </li>
                    <li>
                        톨러레이션 <strong>있는</strong> 파드 배포 → 테인트 노드에도 배치 가능
                        <BlockCode>{`kubectl apply -f - <<'YAML'
apiVersion: v1
kind: Pod
metadata:
  name: toleration-ok
spec:
  tolerations:
    - key: "dedicated"
      operator: "Equal"
      value: "team-a"
      effect: "NoSchedule"
  containers:
    - name: app
      image: nginx
YAML`}</BlockCode>
                    </li>
                    <li>
                        상태 테인트 시뮬레이션(참고): <em>실제 클러스터에선 컨트롤러가 상태 테인트 부여</em>
                        <BlockCode>{`# 예) not-ready 상태와 유사한 NoExecute 테인트 임의 부여
kubectl taint nodes <NODE> node.kubernetes.io/not-ready:NoExecute`}</BlockCode>
                        <p className="text-sm opacity-80">
                            이때 파드에 <code>NoExecute</code> 톨러레이션이 없으면 바로 축출됩니다.
                        </p>
                    </li>
                    <li>
                        정리
                        <BlockCode>{`kubectl taint nodes <NODE> dedicated=team-a:NoSchedule-
kubectl taint nodes <NODE> node.kubernetes.io/not-ready:NoExecute-`}</BlockCode>
                    </li>
                </ol>
            </div>

            {/* 팁 */}
            <div>
                <h2 className="text-2xl font-semibold">실무 팁</h2>
                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li>전용 노드(운영/배치/GPU)는 테인트로 보호 + 파드에 명시적 톨러레이션 부여</li>
                    <li>어피니티(끌어당김)와 테인트/톨러레이션(거부/허용)은 <strong>함께</strong> 써야 의도대로 배치됨</li>
                    <li>자동 상태 테인트(노드 컨디션)는 클러스터 설정에 따라 활성화됨(버전에 따라 다름)</li>
                </ul>
            </div>
        </section>
    );
}