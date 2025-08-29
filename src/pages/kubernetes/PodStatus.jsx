import React from "react";
import BlockCode from "@/components/BlockCode";
import Tags from "@/components/Tags";

export default function PodStatus() {
    const tags = [
        "Kubernetes",
        "Pod 상태",
        "파드 수명주기",
        "컨테이너 상태",
        "디버깅"
    ];

    return (
         <div className="prose prose-lg mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide w-full max-w-4xl lg:w-4xl">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500 mb-4">
                📦 파드(Pod)의 상태 이해하기
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags} />
            </div>

            <div>
                <h2 className="text-2xl font-semibold">1. 파드 상태 필드 (kubectl get pods)</h2>
                <p>
                    <strong>파드 상태(Status)</strong>는 전체 파드의 요약 상태를 나타냅니다. 주로 다음 5가지입니다:
                </p>
                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li><strong>Running:</strong> 모든 컨테이너가 생성되고 하나 이상이 실행 중인 상태</li>
                    <li><strong>Pending:</strong> 파드가 예약되었지만 실행 준비 중 (예: 이미지 다운로드 중)</li>
                    <li><strong>Succeeded:</strong> 모든 컨테이너가 정상 종료</li>
                    <li><strong>Failed:</strong> 모든 컨테이너가 종료되었고 하나 이상이 실패 코드 반환</li>
                    <li><strong>Unknown:</strong> 상태를 확인할 수 없음 (예: 노드 다운)</li>
                </ul>
                <p>자세한 이유는 다음 명령어로 확인할 수 있습니다:</p>
                <BlockCode language="bash" code={`kubectl describe pod [POD_NAME]`} />
            </div>

            <div>
                <h2 className="text-2xl font-semibold">2. 파드 조건(Pod Conditions)</h2>
                <p>파드의 상태를 더 세부적으로 설명하는 값입니다. 대표적인 5가지 조건:</p>
                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li><strong>PodScheduled:</strong> 노드에 예약되었는가?</li>
                    <li><strong>Ready:</strong> 트래픽을 받을 준비가 되었는가?</li>
                    <li><strong>Initialized:</strong> Init 컨테이너가 완료되었는가?</li>
                    <li><strong>Unschedulable:</strong> 자원 부족 등으로 예약할 수 없음</li>
                    <li><strong>ContainersReady:</strong> 모든 컨테이너가 준비되었는가?</li>
                </ul>
                <BlockCode language="bash" code={`kubectl describe pod [POD_NAME]`} />
            </div>

            <div>
                <h2 className="text-2xl font-semibold">3. 컨테이너 상태 (Container State)</h2>
                <p>파드 내부의 개별 컨테이너 상태입니다. 주로 다음 3가지:</p>
                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li><strong>Running:</strong> 컨테이너가 실행 중</li>
                    <li><strong>Terminated:</strong> 정상 또는 비정상 종료됨 (종료 코드 포함)</li>
                    <li><strong>Waiting:</strong> 이미지 다운로드, 의존성 대기 등</li>
                </ul>
                <p>상세 정보는 다음 명령으로 확인할 수 있습니다:</p>
                <BlockCode language="bash" code={`kubectl get pod [POD_NAME] -o yaml`} />
            </div>

            <div>
                <h2 className="text-2xl font-semibold">4. 실전 디버깅 팁</h2>
                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li><strong>kubectl describe pod</strong>로 이벤트(Event) 확인</li>
                    <li><strong>kubectl logs</strong>로 컨테이너 로그 직접 보기</li>
                    <li>자원 부족으로 Pending이 오래간다면, 노드 자원 상태 확인</li>
                </ul>
            </div>
        </div>
    );
}