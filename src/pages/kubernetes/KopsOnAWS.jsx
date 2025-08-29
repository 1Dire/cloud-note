import React from "react";
import { FcLink } from "react-icons/fc";
import BlockCode from "../../components/BlockCode.jsx";
import Tags from "../../components/Tags.jsx";

const KopsOnAWS = () => {
    const tags = ["Kops", "Kubernetes", "AWS", "클러스터", "Vagrant"];

    return (
        <div className="prose prose-lg mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide w-full max-w-4xl lg:w-4xl">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500">
                Kops로 AWS에 쿠버네티스 클러스터 구성하기
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags} />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">📌 Kops란?</h2>
                <p>
                    <strong>Kops (Kubernetes Operations)</strong>는 AWS에서 프로덕션 환경에 적합한 쿠버네티스 클러스터를 설치하고 관리할 수 있는 오픈소스 도구입니다.
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>클러스터 설치, 업그레이드, 상태 관리 지원</li>
                    <li>맥OS, 리눅스에서 사용 가능</li>
                    <li>레거시 도구인 <code>kube-up.sh</code>의 대체 도구</li>
                </ul>
                <p className="mt-2">
                    ☁️ <FcLink className="inline-block mr-1" />
                    <a
                        href="https://kops.sigs.k8s.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-sky-500 underline decoration-wavy decoration-blue-500"
                    >
                        Kops 공식 문서 바로가기
                    </a>
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">💻 Windows 사용자 준비</h2>
                <p>
                    Kops는 Windows에서는 직접 실행할 수 없기 때문에, 가상 머신 기반의 리눅스 환경을 구성해야 합니다.
                </p>

                <h3 className="text-lg font-semibold mt-3">필수 도구</h3>
                <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>
                        <FcLink className="inline-block mr-1" />
                        <a
                            href="https://virtualbox.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-sky-500 underline decoration-wavy decoration-blue-500"
                        >
                            VirtualBox - 가상 머신 실행 도구
                        </a>
                    </li>
                    <li>
                        <FcLink className="inline-block mr-1" />
                        <a
                            href="https://vagrantup.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-sky-500 underline decoration-wavy decoration-blue-500"
                        >
                            Vagrant - VM 환경 자동 구성 도구
                        </a>
                    </li>
                </ul>

                <h3 className="text-lg font-semibold mt-3">VM 환경 구성 예시</h3>
                <ol className="list-decimal list-inside space-y-2">
                    <li>디렉토리 생성
                        <BlockCode language="bash" code={`mkdir ubuntu && cd ubuntu`} />
                    </li>
                    <li>Vagrant 박스 초기화
                        <BlockCode language="bash" code={`vagrant init ubuntu/xenial64`} />
                    </li>
                    <li>VM 부팅
                        <BlockCode language="bash" code={`vagrant up`} />
                    </li>
                </ol>

                <p className="mt-2">
                    부팅이 완료되면, VM 내에는 <code>/vagrant</code> 디렉토리가 공유되어 있으며,
                    <code> vagrant ssh </code> 명령어로 리눅스에 로그인할 수 있습니다.
                </p>
                <p>
                    Windows에서는 <strong>PuTTY</strong> 또는 <strong>PuTTYgen</strong>을 사용해 SSH 접속할 수도 있습니다.
                    <br />
                    <code>vagrant ssh-config</code> 명령어로 private key 경로를 확인할 수 있습니다.
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">🚀 다음 단계</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>리눅스 VM 안에서 Kops 설치</li>
                    <li>AWS CLI 설정 및 IAM 권한 구성</li>
                    <li>S3 버킷 및 DNS 설정</li>
                    <li>클러스터 생성 명령 실행</li>
                </ul>
            </div>
        </div>
    );
};

export default KopsOnAWS;