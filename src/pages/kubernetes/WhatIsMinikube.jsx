import React from "react";
import BlockCode from "../../components/BlockCode.jsx";
import Tags from "../../components/Tags.jsx";
import { FcLink } from "react-icons/fc";

const WhatIsMinikube = () => {
    const tags = ["Minikube", "로컬 쿠버네티스", "Kubernetes", "클러스터", "개발환경"];

    return (
       <div className="prose prose-lg max-w-4xl mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide">
            <h1 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-sky-500">
                Minikube란 무엇인가?
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags} />
            </div>

            <div>
                <h2 className="text-2xl font-semibold">Minikube의 정의</h2>
                <p>
                    <strong>Minikube</strong>는 로컬 환경에서 쿠버네티스 클러스터를 실행할 수 있게 해주는 경량 도구다.
                    실제 운영 환경의 쿠버네티스 클러스터와 거의 동일한 구조를 가상 머신 또는 컨테이너 기반으로 손쉽게 구축할 수 있다.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">주요 특징</h2>
                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li>로컬 머신에 쿠버네티스 클러스터를 빠르게 생성</li>
                    <li>리눅스, 맥, 윈도우 모두 지원</li>
                    <li>가상 머신 또는 컨테이너 드라이버 지원 (예: Docker, VirtualBox)</li>
                    <li>kubectl과 연동되어 실습 가능</li>
                    <li>개발자 테스트 및 학습용으로 적합</li>
                </ul>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">Minikube로 할 수 있는 일</h2>
                <ul className="list-disc list-inside mt-3 space-y-1">
                    <li>Deployment 생성 및 관리</li>
                    <li>Pod 실행과 상태 확인</li>
                    <li>Service를 통한 접근 테스트</li>
                    <li>Kubernetes 객체 실습 및 테스트</li>
                    <li>대시보드를 통한 GUI 관리</li>
                </ul>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">설치 및 시작 예시</h2>
                <BlockCode
                    language="bash"
                    code={`# Minikube 설치
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# 클러스터 시작
minikube start`}
                />
            </div>

            <div>
                <p className="flex items-center space-x-2">
                    <FcLink className="inline-block mr-1" />
                    <a
                        href="https://minikube.sigs.k8s.io/docs/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-sky-500 underline decoration-wavy decoration-blue-500"
                    >
                        Minikube 공식 문서
                    </a>
                </p>
            </div>
        </div>
    );
};

export default WhatIsMinikube;