
import React from "react";
import BlockCode from "@/components/BlockCode";
import Tags from "@/components/Tags";

const ConfigMapNginxProxy = () => {
    const tags = ["ConfigMap", "NGINX", "Reverse Proxy", "Kubernetes"];

    return (
        <section className="space-y-6 text-gray-800 dark:text-gray-200">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500">
                ConfigMap + NGINX 리버스 프록시 데모
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags} />
            </div>

            <p>
                이 데모에서는 NGINX 구성 파일을 Kubernetes <strong>ConfigMap</strong>으로 주입하고,
                Node.js 애플리케이션 앞에 <strong>리버스 프록시</strong>로 동작하도록 설정합니다.
            </p>

            <h2 className="text-xl font-semibold">🔧 구성 파일</h2>
            <p><code>configmap/reverseproxy.conf</code> 내용:</p>
            <BlockCode language="nginx">
                {`server {
    listen 80;
    server_name localhost;

    location / {
        proxy_pass http://localhost:3000;
    }
}`}
            </BlockCode>

            <h2 className="text-xl font-semibold">📁 ConfigMap 생성</h2>
            <BlockCode language="bash">
                {`kubectl create configmap nginx-config \\
  --from-file=configmap/reverseproxy.conf`}
            </BlockCode>

            <h2 className="text-xl font-semibold">🚀 NGINX + Node 파드 정의</h2>
            <p>파드 <code>helloworld-nginx</code>는 두 개의 컨테이너를 포함합니다:</p>
            <ul className="list-disc list-inside space-y-1">
                <li>nginx (port 80, 구성 파일 마운트)</li>
                <li>k8s-demo (port 3000, Node.js 앱)</li>
            </ul>
            <BlockCode language="yaml">
                {`volumeMounts:
  - name: config-volume
    mountPath: /etc/nginx/conf.d

volumes:
  - name: config-volume
    configMap:
      name: nginx-config
      items:
        - key: reverseproxy.conf
          path: reverseproxy.conf`}
            </BlockCode>

            <h2 className="text-xl font-semibold">🌐 외부 서비스 노출</h2>
            <BlockCode language="bash">
                {`minikube service helloworld-nginx-service --url`}
            </BlockCode>

            <h2 className="text-xl font-semibold">🔎 결과 확인</h2>
            <ul className="list-disc list-inside space-y-1">
                <li>curl을 통해 응답 확인</li>
                <li>엔진엑스 컨테이너 내부에서 구성 확인</li>
            </ul>
            <BlockCode language="bash">
                {`kubectl exec -it helloworld-nginx -c nginx -- bash
cat /etc/nginx/conf.d/reverseproxy.conf`}
            </BlockCode>

            <h2 className="text-xl font-semibold">✅ 요약</h2>
            <ul className="list-disc list-inside space-y-1">
                <li>ConfigMap을 통해 NGINX 구성 주입</li>
                <li>리버스 프록시로 Node.js 앱 포워딩</li>
                <li>동일 파드 내 다중 컨테이너 구성</li>
                <li>볼륨을 통해 ConfigMap 마운트</li>
            </ul>
        </section>
    );
};

export default ConfigMapNginxProxy;
