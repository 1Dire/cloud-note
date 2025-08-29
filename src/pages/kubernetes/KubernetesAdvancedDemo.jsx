import React from "react";
import BlockCode from "../../components/BlockCode.jsx";

const KubernetesAdvancedDemo = () => {
    return (
        <div className="prose prose-lg mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide w-full max-w-4xl lg:w-4xl">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500">
                쿠버네티스 데모 실습 요약 & 고급 명령어
            </h1>

            <div className="space-y-4">
                <p>
                    이 데모에서는 <strong>쿠버네티스 파드</strong>를 사용해 첫 번째 애플리케이션을 실행하는 방법을 배웁니다.
                    Minikube 클러스터가 실행 중이며, <code>kubectl</code> 명령어를 바로 사용할 수 있는 상태입니다.
                </p>

                <h2 className="text-xl font-semibold">1️⃣ 깃 저장소 준비</h2>
                <p>소스 코드가 있는 저장소를 복제하거나 압축 파일을 다운로드합니다.</p>
                <BlockCode language="bash" code={`git clone https://github.com/사용자명/kubernetes-course.git`} />

                <h2 className="text-xl font-semibold">2️⃣ Pod 생성</h2>
                <p><code>first-app/helloworld.yml</code> 파일로 파드를 생성합니다.</p>
                <BlockCode language="bash" code={`kubectl create -f first-app/helloworld.yml`} />
                <p>출력 예시: <code>pod "nodehelloworld.example.com" created</code></p>

                <h2 className="text-xl font-semibold">3️⃣ Pod 확인 및 상태 보기</h2>
                <BlockCode language="bash" code={`kubectl get pod\nkubectl describe pod nodehelloworld.example.com`} />
                <p>이벤트 로그에서 이미지 다운로드 및 컨테이너 상태를 확인할 수 있습니다.</p>

                <h2 className="text-xl font-semibold">4️⃣ port-forward로 접속</h2>
                <p>로컬 포트와 파드의 포트를 연결합니다.</p>
                <BlockCode language="bash" code={`kubectl port-forward pod/nodehelloworld.example.com 8081:3000`} />
                <p><code>curl localhost:8081</code> 또는 브라우저로 접속해 "Hello World" 메시지를 확인합니다.</p>

                <h2 className="text-xl font-semibold">5️⃣ 서비스 생성 및 노출</h2>
                <p>Pod를 NodePort 타입으로 노출하여 외부에서 접속 가능하게 합니다.</p>
                <BlockCode
                    language="bash"
                    code={`kubectl expose pod nodehelloworld.example.com \\
  --type=NodePort \\
  --name=nodehelloworld-service`}
                />

                <h2 className="text-xl font-semibold">6️⃣ Minikube에서 URL 확인</h2>
                <BlockCode language="bash" code={`minikube service nodehelloworld-service --url`} />
                <p>생성된 URL로 접속하여 서비스 정상 동작 여부를 확인합니다.</p>

                <h2 className="text-xl font-semibold">7️⃣ 실행 중인 파드에 attach</h2>
                <BlockCode language="bash" code={`kubectl attach nodehelloworld.example.com`} />
                <p>파드의 표준 출력에 연결되며 실행 중인 로그를 실시간으로 확인할 수 있습니다.</p>

                <h2 className="text-xl font-semibold">8️⃣ exec로 컨테이너 내부 접근</h2>
                <BlockCode language="bash" code={`kubectl exec nodehelloworld.example.com -- ls /app`} />
                <p>컨테이너 안의 <code>/app</code> 디렉토리를 확인할 수 있습니다.</p>
                <p>예: <code>touch /app/text.txt</code> 실행 → 컨테이너 종료 시 삭제됨</p>

                <h2 className="text-xl font-semibold">9️⃣ 서비스 상세 정보 확인</h2>
                <BlockCode language="bash" code={`kubectl describe service nodehelloworld-service`} />
                <p>NodePort, 클러스터 IP, 엔드포인트 정보 확인 가능</p>

                <h2 className="text-xl font-semibold">🔟 클러스터 내부 통신 (BusyBox 활용)</h2>
                <BlockCode
                    language="bash"
                    code={`kubectl run busybox --image=busybox --restart=Never -it -- sh`}
                />
                <BlockCode language="bash" code={`telnet nodehelloworld-service 3000`} />
                <p>파드 간 통신 확인 (GET / → 200 OK → Hello World!)</p>

                <h2 className="text-xl font-semibold">✅ 전체 요약</h2>
                <ul className="list-disc list-inside">
                    <li>깃 저장소에서 YAML 불러오기 및 Pod 생성</li>
                    <li>kubectl describe / get으로 상태 확인</li>
                    <li>port-forward, Service로 접속 테스트</li>
                    <li>exec, attach로 컨테이너 내부 접근</li>
                    <li>busybox를 활용한 파드 간 통신 테스트</li>
                </ul>

                <h2 className="text-xl font-semibold">📘 용어 정리</h2>
                <ul className="list-disc list-inside">
                    <li><strong>kubectl:</strong> 쿠버네티스 클러스터 제어용 CLI</li>
                    <li><strong>attach:</strong> 실행 중인 파드의 입출력 스트림에 연결</li>
                    <li><strong>exec:</strong> 컨테이너 안에서 명령 실행</li>
                    <li><strong>describe:</strong> 리소스 상태와 메타데이터 상세 조회</li>
                    <li><strong>NodePort:</strong> 외부에서 접근 가능한 서비스 포트</li>
                    <li><strong>busybox:</strong> 테스트에 적합한 초경량 유닉스 도구 이미지</li>
                    <li><strong>telnet:</strong> TCP 연결을 직접 테스트하는 명령어</li>
                    <li><strong>Volume:</strong> 컨테이너 종료 후에도 데이터를 유지하는 스토리지</li>
                </ul>
            </div>
        </div>
    );
};

export default KubernetesAdvancedDemo;