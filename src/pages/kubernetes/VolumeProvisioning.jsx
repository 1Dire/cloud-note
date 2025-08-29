import React from "react";
import Tags from "@/components/Tags";
import BlockCode from "@/components/BlockCode";

const VolumeProvisioning = () => {
    const tags = ["Kubernetes", "Volume Provisioning", "StorageClass", "EBS", "EFS", "WordPress"];

    return (
        <div className="prose prose-lg mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide w-full max-w-4xl lg:w-4xl">


            <h1 className="text-2xl font-bold text-indigo-600 dark:text-sky-500 mb-4">
                볼륨 프로비저닝과 워드프레스 데모
            </h1>
            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags}/>
            </div>
            <h2 className="text-xl font-semibold mt-4">📌 개념</h2>
            <p>
                볼륨 프로비저닝은 쿠버네티스에서 스토리지를 자동 생성 및 파드에 연결하는 과정입니다.
                <br/>
                StorageClass를 통해 동적 프로비저닝이 가능하며, PVC를 생성하면 PV가 자동 생성 및 바인딩됩니다.
            </p>

            <h2 className="text-xl font-semibold mt-4">📂 절차</h2>
            <ul className="list-disc list-inside space-y-1">
                <li>StorageClass 정의 (예: aws-ebs, gp2, us-east-1a)</li>
                <li>PVC 생성 및 용량 지정 (예: 8GB)</li>
                <li>파드에서 PVC 마운트 후 데이터 저장</li>
                <li>여러 파드 공유를 위해 EFS 등 NFS 기반 스토리지 사용</li>
            </ul>

            <h2 className="text-xl font-semibold mt-4">💡 워드프레스 데모 요약</h2>
            <ul className="list-disc list-inside space-y-1">
                <li>MySQL 파드: EBS 볼륨으로 데이터베이스 저장</li>
                <li>워드프레스 웹 파드: EFS로 업로드 파일 공유</li>
                <li>AWS CLI로 EFS 생성 → 마운트 타겟 생성 → 보안 그룹 설정</li>
                <li>파드 재시작·노드 변경 후에도 데이터 유지</li>
                <li>실습 후 EBS/EFS 삭제 필수</li>
            </ul>

            <h2 className="text-xl font-semibold mt-4">📝 예시 StorageClass</h2>
            <BlockCode language="yaml">
                {`apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: standard
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp2
  zone: us-east-1a`}
            </BlockCode>

            <h2 className="text-xl font-semibold mt-4">📝 예시 PVC</h2>
            <BlockCode language="yaml">
                {`apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: db-storage
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 8Gi
  storageClassName: standard`}
            </BlockCode>
        </div>
    );
};

export default VolumeProvisioning;
