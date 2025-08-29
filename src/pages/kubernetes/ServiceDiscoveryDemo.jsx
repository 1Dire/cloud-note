import React from "react";
import BlockCode from "@/components/BlockCode";
import Tags from "@/components/Tags";

const ServiceDiscoveryDemo = () => {
    const tags = ["쿠버네티스", "서비스탐색", "DNS", "CoreDNS", "kubectl"];

    return (
        <div className="prose prose-lg mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide w-full max-w-4xl lg:w-4xl">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500 mb-4">
                서비스 탐색 (DNS 기반) 데모
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags} />
            </div>

            <p>
                이 데모에서는 <strong>서비스 탐색</strong>을 통해 애플리케이션이
                데이터베이스에 어떻게 연결되는지를 보여줍니다. 핵심 개념은 쿠버네티스의 DNS 서비스가
                각 리소스를 이름으로 검색하게 해주는 구조입니다.
            </p>

            <div>
                <h2 className="text-2xl font-semibold">📁 디렉토리 구조</h2>
                <BlockCode
                    language="bash"
                    code={`service-discovery/
├── credentials/        # secrets.yml 포함
├── database.yml        # MySQL 파드 정의
├── database-service.yml# MySQL 서비스 정의
├── helloworld-db.yml   # Node.js 앱 배포
└── helloworld-db-service.yml`}
                />
            </div>

            <div>
                <h2 className="text-2xl font-semibold">🔐 시크릿 생성</h2>
                <p><code>secrets.yml</code>에는 다음 정보가 포함되어 있습니다:</p>
                <ul className="list-disc list-inside pl-4 space-y-1">
                    <li>rootPassword</li>
                    <li>database</li>
                    <li>username (미사용)</li>
                    <li>password (미사용)</li>
                </ul>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">📦 리소스 생성</h2>
                <BlockCode
                    language="bash"
                    code={`kubectl apply -f service-discovery/credentials/secrets.yml
kubectl apply -f service-discovery/database.yml
kubectl apply -f service-discovery/database-service.yml
kubectl apply -f service-discovery/helloworld-db.yml
kubectl apply -f service-discovery/helloworld-db-service.yml`}
                />
            </div>

            <div>
                <h2 className="text-2xl font-semibold">🌐 DNS 서비스 확인</h2>
                <p>앱에서 환경 변수로 <code>MYSQL_HOST=database-service</code>를 지정해 DNS를 통해 DB 서비스에 접근합니다.</p>
                <BlockCode
                    language="bash"
                    code={`kubectl run -it busybox --image=busybox --restart=Never -- sh
nslookup database-service
exit`}
                />
            </div>

            <div>
                <h2 className="text-2xl font-semibold">🧪 앱 작동 확인</h2>
                <BlockCode
                    language="bash"
                    code={`minikube service helloworld-db-service --url`}
                />
                <p>접속 결과:</p>
                <BlockCode language="text" code={`당신은 방문자 번호 1입니다`} />
            </div>

            <div>
                <h2 className="text-2xl font-semibold">🛠 DB 연결 상태 확인</h2>
                <BlockCode
                    language="bash"
                    code={`kubectl exec -it database -- sh
mysql -u root -p
# 비밀번호 입력 후
use helloworld;
select * from visits;`}
                />
                <p>
                    이로써 애플리케이션이 DNS 이름을 통해 DB 서비스에 접근하고,
                    데이터를 삽입/조회하는 흐름을 확인할 수 있습니다.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">🧹 마무리 정리</h2>
                <BlockCode
                    language="bash"
                    code={`kubectl delete pod busybox
kubectl delete -f service-discovery/`}
                />
            </div>
        </div>
    );
};

export default ServiceDiscoveryDemo;