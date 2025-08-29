import React from "react";
import BlockCode from "@/components/BlockCode";
import Tags from "@/components/Tags";

const KubernetesConfigMap = () => {
    const tags = ["Kubernetes", "ConfigMap", "볼륨 마운트", "환경 변수"];

    return (
        <div className="prose prose-lg max-w-4xl mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500 mb-4">
                Kubernetes ConfigMap 이해 및 활용
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags} />
            </div>

            <p>
                <strong>ConfigMap</strong>은 시크릿과 비슷하게 <strong>키-값 쌍</strong> 형식의
                설정값을 저장하는 리소스입니다. 다만 민감하지 않은 일반 설정 값을 저장하는 데 사용됩니다.
            </p>

            <ul className="list-disc list-inside space-y-1 mt-3">
                <li>환경 변수로 파드에 주입할 수 있음</li>
                <li>볼륨으로 마운트하여 구성 파일처럼 사용 가능</li>
                <li>전체 구성 파일 자체도 값으로 포함 가능</li>
                <li>컨테이너 이미지를 변경하지 않고 설정을 유연하게 주입 가능</li>
            </ul>

            <div>
                <h2 className="text-2xl font-semibold">🛠️ ConfigMap 생성 예시</h2>
                <p><code>app.properties</code> 파일을 기반으로 ConfigMap 생성:</p>
                <BlockCode
                    language="bash"
                    code={`cat <<EOF > app.properties
driver=jdbc
database=postgres
EOF

kubectl create configmap app-config --from-file=app.properties`}
                />
            </div>

            <div>
                <h2 className="text-2xl font-semibold">📦 파드에 ConfigMap 마운트</h2>
                <p>ConfigMap을 볼륨으로 마운트하는 파드 예시:</p>
                <BlockCode
                    language="yaml"
                    code={`volumes:
  - name: config-volume
    configMap:
      name: app-config

volumeMounts:
  - name: config-volume
    mountPath: /etc/config`}
                />
                <p><code>/etc/config/app.properties</code> 경로에서 설정 파일을 읽을 수 있습니다.</p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">🌱 환경 변수로 주입</h2>
                <BlockCode
                    language="yaml"
                    code={`env:
  - name: DRIVER
    valueFrom:
      configMapKeyRef:
        name: app-config
        key: driver`}
                />
            </div>

            <div>
                <h2 className="text-2xl font-semibold">📋 요약</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>ConfigMap은 환경 설정을 분리하여 컨테이너 재사용성을 높여줍니다.</li>
                    <li>환경 변수, 볼륨, 커맨드라인 인자 등 다양한 방식으로 사용됩니다.</li>
                    <li>구성 파일 전체를 포함해 볼륨으로 마운트할 수 있습니다.</li>
                    <li>이미지를 변경하지 않고도 설정을 유연하게 업데이트할 수 있습니다.</li>
                </ul>
            </div>
        </div>
    );
};

export default KubernetesConfigMap;