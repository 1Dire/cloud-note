import React, {useState} from "react";
import {Badge, TextInput} from "flowbite-react";
import {HiSearch} from "react-icons/hi";
import {useNavigate} from "react-router-dom";
import {FcFinePrint} from "react-icons/fc";


const dummyLogs = [{
    title: "클라우드란 무엇인가?", tags: ["클라우드 컴퓨팅", "온프레미스", "IaaS", "PaaS", "SaaS"], to: "cloud/whatIsCloud",
}, {
    title: "EC2 인스턴스 생성", tags: ["EC2", "키 페어"], to: "cloud/createEC2",
}, {
    title: "SSH 접속", tags: ["SSH 접속"], to: "cloud/sshConection",
}, {
    title: "AWS RDS 인스턴스 생성", tags: ["RDS", "MySQL", "DB 생성"], to: "cloud/createRDS",
}, {
    title: "RDS 인스턴스 연결", tags: ["RDS", "MySQL", "EC2 연동"], to: "cloud/rdsConnection",
}, {
    title: "도커란 무엇인가", tags: ["Docker", "이미지", "컨테이너", "볼륨", "명령어"], to: "kubernetes/whatIsDocker",
}, {
    title: "쿠버네티스란 무엇인가", tags: ["Kubernetes", "컨테이너", "오케스트레이션", "클러스터", "DevOps"], to: "kubernetes/whatIsKubernetes",
}, {
    title: "쿠버네티스의 파드와 서비스", tags: ["Kubernetes", "Pod", "Service", "로드밸런서", "클러스터"], to: "kubernetes/podAndService",
}, {
    title: "ReplicaSet과 Deployment란?",
    tags: ["Kubernetes", "ReplicaSet", "Deployment", "레플리카", "오케스트레이션"],
    to: "kubernetes/replicaSetAndDeployment",
}, {
    title: "쿠버네티스 핵심 리소스 한눈에 보기", tags: ["Kubernetes", "리소스", "개념정리", "DevOps", "운영"], to: "kubernetes/kubernetesSummary",
}, {
    title: "Kops로 AWS에 쿠버네티스 클러스터 구성하기", tags: ["Kops", "Kubernetes", "AWS", "클러스터", "Vagrant"], to: "kubernetes/kopsOnAWS",
}, {
    title: "Kops 클러스터 구성 – AWS & DNS 설정 가이드",
    tags: ["Kops", "Kubernetes", "AWS", "클러스터", "Vagrant", "DNS"],
    to: "kubernetes/kopsSetupGuide",
}, {
    title: "ReplicationController 수평 확장 데모",
    tags: ["Kubernetes", "ReplicationController", "ReplicaSet", "파드", "수평확장"],
    to: "kubernetes/replicationControllerDemo",
}, {
    title: "헬스 체크", tags: ["Kubernetes", "Deployment", "헬스체크", "livenessProbe", "프로덕션 안정성"], to: "kubernetes/healthCheck",
}, {
    title: "파드(Pod)의 상태 이해하기",
    tags: ["Kubernetes", "livenessProbe", "readinessProbe", "헬스체크", "서비스 안정성"],
    to: "kubernetes/podStatus",
}, {
    title: "Liveness 와 Readiness Probe", tags: ["Kubernetes", "Pod 상태", "파드 수명주기", "컨테이너 상태", "디버깅"], to: "kubernetes/livenessReadiness",
}, {
    title: "파드 수명 주기(Pod Lifecycle)",
    tags: ["Kubernetes", "Pod Lifecycle", "Init Container", "postStart", "preStop", "LivenessProbe", "ReadinessProbe"],
    to: "kubernetes/podLifecycle",
}, {
    title: "쿠버네티스 시크릿(Secret)", tags: ["Kubernetes", "Secret", "환경 변수", "Volume", "보안", "기밀 데이터"], to: "kubernetes/secret",
}, {
    title: "워드프레스 + 시크릿 배포 데모",
    tags: [
        "Kubernetes",
        "WordPress",
        "Secret",
        "Deployment",
        "Service",
        "NodePort",
        "Minikube"
    ],
    to: "kubernetes/wordPressDemo",
}, {
    title: "쿠버네티스 웹 UI 대시보드",
    tags: [
        "Kubernetes",
        "Dashboard",
        "Web UI",
        "RBAC",
        "ServiceAccount",
        "minikube"
    ],
    to: "kubernetes/kubernetesDashboard",
}, {
    title: "Kubernetes DNS를 이용한 서비스 탐색",
    tags: [
        "DNS",
        "Service Discovery",
        "CoreDNS",
        "kube-dns",
        "파드 통신",
        "도메인 네이밍",
        "Busybox",
        "kubectl 실습"
    ],
    to: "kubernetes/kubernetesDNSDiscovery",
}, {
    title: "서비스 탐색 (DNS 기반) 데모",
    tags: ["쿠버네티스", "서비스탐색", "DNS", "CoreDNS", "kubectl"],
    to: "kubernetes/serviceDiscoveryDemo",
}, {
    title: "Kubernetes ConfigMap 이해 및 활용",
    tags: ["Kubernetes", "ConfigMap", "볼륨 마운트", "환경 변수"],
    to: "kubernetes/kubernetesConfigMap",
}, {
    title: "ConfigMap + NGINX 리버스 프록시 데모",
    tags: ["ConfigMap", "NGINX", "Reverse Proxy", "Kubernetes"],
    to: "kubernetes/configMapNginxProxy",
}, {
    title: "인그레스와 인그레스 컨트롤러",
    tags: ["Kubernetes", "Ingress", "Ingress Controller", "NGINX", "트래픽 라우팅"],
    to: "kubernetes/kubernetesIngress",
}, {
    title: "외부 DNS + 인그레스 개요",
    tags: ["Kubernetes", "Ingress", "Ingress Controller", "ExternalDNS", "DNS", "로드밸런서"],
    to: "kubernetes/externalDNSIngress",
}, {
    title: "쿠버네티스 볼륨 & 퍼시스턴트 볼륨 요약",
    tags: ["쿠버네티스", "볼륨", "퍼시스턴트 볼륨", "AWS EBS", "Stateful 앱"],
    to: "kubernetes/kubernetesVolume",
}, {
    title: "볼륨 프로비저닝과 워드프레스 데모",
    tags: ["Kubernetes", "Volume Provisioning", "StorageClass", "EBS", "EFS", "WordPress"],
    to: "kubernetes/volumeProvisioning",
}, {
    title: "PodPreset란? (파드 자동 설정 주입)",
    tags: ["Kubernetes", "PodPreset", "자동 주입", "ConfigMap", "Secret", "Best Practice"],
    to: "kubernetes/podPreset",
}, {
    title: "StatefulSet로 Cassandra 클러스터 배포 데모",
    tags: ["Kubernetes", "StatefulSet", "Cassandra", "Headless Service", "PVC", "Stateful App"],
    to: "kubernetes/statefulSetCassandra",
}, {
    title: "오토스케일링",
    tags: ["Kubernetes", "HPA", "Autoscaling", "Metrics Server", "Minikube"],
    to: "kubernetes/hpa",
}, {
    title: "어피니티 & 안티 어피니티토스케일링",
    tags: [
        "Kubernetes",
        "Affinity",
        "AntiAffinity",
        "NodeAffinity",
        "PodAffinity",
        "Scheduling",
    ],
    to: "kubernetes/affinityAntiAffinity",
}, {
    title: "파드 간 어피니티 & 안티어피니티",
    tags: [
        "Kubernetes",
        "Pod Affinity",
        "Pod Anti-Affinity",
        "Scheduling",
        "Topology",
        "High Availability",
    ],
    to: "kubernetes/podAffinityAntiAffinity",
}, {
    title: "테인트(Taint) & 톨러레이션(Toleration)",
    tags: ["Kubernetes", "Taint", "Toleration", "스케줄링", "노드관리"],
    to: "kubernetes/taintsAndTolerations",
}];

const Tag = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    Array.from(new Set(dummyLogs.flatMap((log) => log.tags)));
    const handleTitleClick = (to) => {
        if (to) navigate(`/${to}`);
    };

    const filteredLogs = dummyLogs.filter((log) => {
        const matchTitle = log.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchTags = log.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchTitle || matchTags;
    });

    return (<div>
        <h1 className="text-2xl font-bold mb-6 text-indigo-600 dark:text-sky-500">
            <FcFinePrint className="inline-block mr-2 align-middle"/>
            태그 및 키워드로 학습 기록 검색
        </h1>

        <div className="mb-4">
            <TextInput
                icon={HiSearch}
                type="text"
                placeholder="제목 또는 태그로 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sizing="md"
            />
        </div>


        <ul className="space-y-4">
            {filteredLogs.length > 0 ? (filteredLogs.map((log, i) => (<li
                key={i}
                className="border-b border-gray-300 dark:border-gray-700 pb-2"
            >
                <p
                    onClick={() => handleTitleClick(log.to)}
                    className="font-semibold text-lg cursor-pointer text-gray-800 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-sky-400 transition"
                >
                    {log.title}
                </p>
                <div className="mt-1 flex gap-2 flex-wrap">
                    {log.tags.map((t, j) => (<Badge
                        key={j}
                        color="indigo"
                        size="xs"
                        className="cursor-pointer text-indigo-600"

                    >
                        #{t}
                    </Badge>))}
                </div>
            </li>))) : (<p className="text-sm text-gray-500 text-center">
                일치하는 기록이 없습니다.
            </p>)}
        </ul>
    </div>);
};

export default Tag;
