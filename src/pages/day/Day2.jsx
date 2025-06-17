// src/pages/Day2.jsx
import React from "react";

const Day2 = () => {
    return (
        <>
            <h1 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-sky-500">
                Day 2 – AWS 기초 서비스 실습
            </h1>

            <div className="space-y-6 text-gray-800 dark:text-gray-200">
                <div>
                    <h2 className="text-xl font-semibold mb-2">📌 오늘의 목표</h2>
                    <ul className="list-disc list-inside">
                        <li>EC2 인스턴스 생성 및 접속</li>
                        <li>S3 버킷 생성 및 정적 웹 호스팅</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2">📖 이론 학습</h2>
                    <ul className="list-disc list-inside">
                        <li><strong>EC2:</strong> 가상 서버. AMI, 인스턴스 타입, 키 페어, 보안 그룹 이해</li>
                        <li><strong>S3:</strong> 객체 스토리지. 버킷, 객체, 퍼블릭 접근 설정 이해</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2">🛠 실습 1: EC2 인스턴스</h2>
                    <ol className="list-decimal list-inside space-y-1">
                        <li>EC2 콘솔 접속 → Amazon Linux 2 AMI 선택</li>
                        <li>인스턴스 타입: t2.micro</li>
                        <li>키 페어 생성 후 .pem 다운로드</li>
                        <li>보안 그룹: 포트 22(SSH) 허용</li>
                        <li>SSH 접속: <code>ssh -i &lt;키파일.pem&gt; ec2-user@퍼블릭IP</code></li>
                        <li>기본 업데이트: <code>sudo yum update -y</code></li>
                    </ol>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2">🛠 실습 2: S3 정적 웹 호스팅</h2>
                    <ol className="list-decimal list-inside space-y-1">
                        <li>S3 콘솔 → 버킷 생성 (이름 고유하게)</li>
                        <li>정적 웹 호스팅 활성화</li>
                        <li>index.html 업로드</li>
                        <li>퍼블릭 접근 허용 및 웹 주소 확인</li>
                    </ol>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2">✅ 오늘 할 일</h2>
                    <ul className="list-disc list-inside">
                        <li><del className="text-red-500">EC2 인스턴스 생성 및 SSH 접속</del></li>
                        <li><del className="text-red-500">S3 버킷 생성 및 정적 웹사이트 배포</del></li>
                        <li><del className="text-red-500">브라우저에서 HTML 페이지 정상 출력</del></li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Day2;
