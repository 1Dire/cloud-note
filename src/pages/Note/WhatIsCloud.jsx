import React from 'react';
import { FcLink, FcDatabase } from "react-icons/fc";
import { Badge } from "flowbite-react";

const WhatIsCloud = () => {
    const tags = [
        "클라우드 컴퓨팅",
        "온프레미스",
        "IaaS",
        "PaaS",
        "SaaS"
    ];

    return (
        <>
            <h1 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-sky-500">
                ☁️ 클라우드란 무엇인가?
            </h1>

            {/* 태그 뱃지 */}
            <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag, index) => (
                    <Badge
                        key={index}
                        color="indigo"
                        size="sm"

                    >
                        #{tag}
                    </Badge>
                ))}
            </div>

            <div className="space-y-6 text-gray-800 dark:text-gray-200">
                {/* 정의 */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">📘 정의</h2>
                    <p>
                        클라우드는 <strong>인터넷을 통해 IT 자원(서버, 스토리지, 네트워크 등)을 빌려 쓰는 서비스</strong>입니다.
                        필요할 때만 쓰고, 사용한 만큼만 요금을 지불합니다. <br />
                        <FcLink className="inline-block mr-1" />
                        <a
                            href="https://aws.amazon.com/what-is-cloud-computing/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-sky-500 underline decoration-wavy decoration-blue-500"
                        >
                            AWS - 클라우드란?
                        </a>
                    </p>
                </div>

                {/* 비교표 */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">📕 왜 클라우드를 사용할까?</h2>
                    <table className="w-full border border-gray-300 text-sm">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                            <th className="border px-4 py-2">항목</th>
                            <th className="border px-4 py-2">온프레미스</th>
                            <th className="border px-4 py-2">클라우드</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="border px-4 py-2">서버 구축</td>
                            <td className="border px-4 py-2">직접 구매/설치</td>
                            <td className="border px-4 py-2">웹에서 즉시 생성</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">비용</td>
                            <td className="border px-4 py-2">초기 고정비용</td>
                            <td className="border px-4 py-2">사용량 기반 과금</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">유지보수</td>
                            <td className="border px-4 py-2">직접 관리</td>
                            <td className="border px-4 py-2">업체가 관리</td>
                        </tr>
                        </tbody>
                    </table>
                    <p className="mt-2">
                        <FcLink className="inline-block mr-1" />
                        <a
                            href="https://www.ibm.com/kr-ko/cloud/learn/cloud-computing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-sky-500 underline decoration-wavy decoration-blue-500"
                        >
                            IBM - 클라우드 컴퓨팅 입문
                        </a>
                    </p>
                </div>

                {/* 클라우드 서비스 모델 */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">📖 클라우드 서비스 모델</h2>
                    <ul className="list-disc list-inside">
                        <li><strong>IaaS</strong>: 인프라 제공 (ex. AWS EC2)</li>
                        <li><strong>PaaS</strong>: 실행 환경 제공 (ex. Elastic Beanstalk)</li>
                        <li><strong>SaaS</strong>: 완성된 소프트웨어 제공 (ex. Gmail, Zoom)</li>
                    </ul>
                    <p className="mt-2 space-y-1">
                        <span className="block">
                            <FcLink className="inline-block mr-1" />
                            <a
                                href="https://azure.microsoft.com/ko-kr/resources/cloud-computing-dictionary/what-is-iaas/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-sky-500 underline decoration-wavy decoration-blue-500"
                            >
                                Azure - IaaS 개요
                            </a>
                        </span>
                        <span className="block">
                            <FcLink className="inline-block mr-1" />
                            <a
                                href="https://www.redhat.com/en/topics/cloud-computing/what-is-paas"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-sky-500 underline decoration-wavy decoration-blue-500"
                            >
                                RedHat - PaaS란?
                            </a>
                        </span>
                        <span className="block">
                            <FcLink className="inline-block mr-1" />
                            <a
                                href="https://www.salesforce.com/kr/saas/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-sky-500 underline decoration-wavy decoration-blue-500"
                            >
                                Salesforce - SaaS 소개
                            </a>
                        </span>
                    </p>
                </div>

                {/* 대표 클라우드 플랫폼 */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">📕 대표 클라우드 플랫폼</h2>
                    <table className="w-full border border-gray-300 text-sm">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                            <th className="border px-4 py-2">플랫폼</th>
                            <th className="border px-4 py-2">특징</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="border px-4 py-2">AWS</td>
                            <td className="border px-4 py-2">시장 점유율 1위, 다양한 서비스</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Azure</td>
                            <td className="border px-4 py-2">Microsoft 제품과 연동 강점</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">GCP</td>
                            <td className="border px-4 py-2">AI 및 데이터 분석 강점</td>
                        </tr>
                        </tbody>
                    </table>
                    <p className="mt-2 space-y-1">
                        <span className="block">
                            <FcLink className="inline-block mr-1" />
                            <a
                                href="https://aws.amazon.com/ko/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-sky-500 underline decoration-wavy decoration-blue-500"
                            >
                                AWS 공식 사이트
                            </a>
                        </span>
                        <span className="block">
                            <FcLink className="inline-block mr-1" />
                            <a
                                href="https://azure.microsoft.com/ko-kr/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-sky-500 underline decoration-wavy decoration-blue-500"
                            >
                                Azure 공식 사이트
                            </a>
                        </span>
                        <span className="block">
                            <FcLink className="inline-block mr-1" />
                            <a
                                href="https://cloud.google.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-sky-500 underline decoration-wavy decoration-blue-500"
                            >
                                GCP 공식 사이트
                            </a>
                        </span>
                    </p>
                </div>

                {/* 요약 */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">요약</h2>
                    <p>
                        클라우드는 <strong>필요한 IT 자원을 인터넷으로 빌려서 유연하고 효율적으로 사용하는 기술</strong>이다.
                    </p>
                </div>
            </div>
        </>
    );
};

export default WhatIsCloud;
