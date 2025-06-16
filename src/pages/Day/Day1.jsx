import React from "react";

const Day1 = () => {
    return (
        <>
            <h1 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-sky-500">Day 1 – 클라우드 개념 정리</h1>

            <div className="space-y-6 text-gray-800 dark:text-gray-200">
                <div>
                    <h2 className="text-xl font-semibold mb-2">📌 오늘의 목표</h2>
                    <ul className="list-disc list-inside">
                        <li>클라우드가 뭔지 이해한다</li>
                        <li>서비스 종류 (IaaS, PaaS, SaaS) 구분하기</li>
                        <li>AWS, Azure, GCP 차이 알기</li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-2">✅ 오늘 할 일</h2>
                    <ul className="list-disc list-inside">
                        <li>클라우드 개념 정리</li>
                        <li>5개 용어 정리 (클라우드, IaaS, PaaS, SaaS, AWS)</li>
                    </ul>
                </div>
            </div>
        </>

    );
};

export default Day1;
