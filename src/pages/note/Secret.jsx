import React from "react";
import BlockCode from "@/components/BlockCode";
import Tags from "@/components/Tags";

export default function Secret() {
    const tags = [
        "Kubernetes",
        "Secret",
        "환경 변수",
        "Volume",
        "보안",
        "기밀 데이터"
    ];

    return (
        <section className="space-y-10 p-6 text-gray-800 dark:text-gray-200 leading-relaxed">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500 mb-4">
                쿠버네티스 시크릿(Secret)
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags} />
            </div>

            <div>
                <h2 className="text-2xl font-semibold">Secret이란?</h2>
                <p>
                    쿠버네티스 <strong>Secret</strong>은 비밀번호, API 키, 인증서 등
                    <strong>민감한 정보를 안전하게 저장하고 파드에 전달하는 방법</strong>입니다.
                </p>
                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li>환경 변수로 전달</li>
                    <li>파일로 전달 (볼륨 마운트)</li>
                    <li>주로 DB 자격 증명, TLS 키, 외부 API 토큰에 사용</li>
                </ul>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">1️⃣ 파일로 Secret 생성</h2>
                <p>텍스트 파일을 기반으로 시크릿을 생성합니다:</p>
                <BlockCode>
                    {`echo "root" > username.txt
echo "my-password" > password.txt

kubectl create secret generic db-user-pass \\
  --from-file=username.txt \\
  --from-file=password.txt`}
                </BlockCode>
                <p>→ 시크릿 이름은 <code>db-user-pass</code>, 키는 파일 이름(username, password)입니다.</p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">2️⃣ YAML로 Secret 생성</h2>
                <p>값은 <strong>base64로 인코딩</strong>해야 합니다:</p>
                <BlockCode>
                    {`apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
data:
  username: cm9vdA==     # "root"
  password: bXktcGFzc3dvcmQ=   # "my-password"`}
                </BlockCode>
                <p>
                    base64 인코딩 방법 (리눅스/macOS):
                    <br />
                    <code>echo -n "root" | base64</code>
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">3️⃣ 환경 변수로 Secret 사용</h2>
                <BlockCode>
                    {`env:
- name: DB_USER
  valueFrom:
    secretKeyRef:
      name: db-secret
      key: username

- name: DB_PASS
  valueFrom:
    secretKeyRef:
      name: db-secret
      key: password`}
                </BlockCode>
                <p>→ 앱에서 <code>process.env.DB_USER</code> 와 같은 방식으로 읽을 수 있습니다.</p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">4️⃣ 파일로 마운트해서 사용</h2>
                <BlockCode>
                    {`volumeMounts:
- name: creds
  mountPath: "/etc/creds"
  readOnly: true

volumes:
- name: creds
  secret:
    secretName: db-secret`}
                </BlockCode>
                <p>→ 컨테이너 내부에 <code>/etc/creds/username</code>, <code>/etc/creds/password</code> 파일이 생깁니다.</p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">5️⃣ 실습 명령 요약</h2>
                <BlockCode>
                    {`# 파일 기반 시크릿 생성
kubectl create secret generic db-user-pass --from-file=username.txt --from-file=password.txt

# 시크릿 보기
kubectl get secrets
kubectl describe secret db-user-pass

# 시크릿 YAML로 보기
kubectl get secret db-user-pass -o yaml

# base64 디코딩 (내용 확인용)
echo "bXktcGFzc3dvcmQ=" | base64 --decode`}
                </BlockCode>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">💡 기타 팁</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>시크릿은 etcd에 저장되며 base64 인코딩일 뿐 <strong>암호화는 아님</strong></li>
                    <li>민감 정보라면 <strong>encryption-at-rest 설정</strong> 고려 필요</li>
                    <li>시크릿은 <strong>RBAC으로 접근 제어</strong> 가능</li>
                    <li>외부 Vault 연동도 가능 (예: HashiCorp Vault)</li>
                </ul>
            </div>
        </section>
    );
}
