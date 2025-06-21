import React from "react";
import BlockCode from "../../components/BlockCode.jsx";
import InlineCode from "../../components/InlineCode.jsx";


const Day3 = () => {
    return (<section className="space-y-10 text-gray-800 dark:text-gray-200 leading-relaxed">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500">
                Day 3 – EC2 + RDS 연동 실습
            </h1>

            {/* 오늘의 목표 */}
            <div>
                <h2 className="text-xl font-semibold mb-2">📌 오늘의 목표</h2>
                <ul className="list-disc list-inside">
                    <li>RDS(MySQL) 생성 및 EC2에서 접속</li>
                    <li>보안 그룹 설정 이해</li>
                </ul>
            </div>

            {/* 이론 */}
            <div>
                <h2 className="text-xl font-semibold mb-2">📖 이론 학습</h2>
                <ul className="list-disc list-inside">
                    <li>RDS 개념</li>
                    <li>보안 그룹과 포트 3306</li>
                    <li>EC2에서 mysql 접속 방법</li>
                </ul>
            </div>

            {/* 실습 1 */}
            <div>
                <h2 className="text-xl font-semibold mb-2">🛠 실습 1: RDS 생성</h2>
                <ol className="list-decimal list-inside space-y-1">
                    <li>AWS RDS 콘솔 접속</li>
                    <li>"데이터베이스 생성" 클릭</li>
                    <li>엔진: <InlineCode>MySQL</InlineCode></li>
                    <li>템플릿: <InlineCode>프리 티어</InlineCode></li>
                    <li>DB 식별자 / 사용자명 / 비밀번호 입력</li>
                    <li>퍼블릭 액세스: <InlineCode>비활성화</InlineCode></li>
                    <li>VPC 보안 그룹: EC2와 동일 그룹, 포트 <InlineCode>3306</InlineCode> 허용</li>
                    <li>DB 인스턴스 생성 완료까지 기다리기</li>
                </ol>
            </div>

            {/* 실습 2 */}
            <div>
                <h2 className="text-xl font-semibold mb-2">🛠 실습 2: EC2에서 RDS 접속</h2>
                <ol className="list-decimal list-inside space-y-2">
                    <li>
                        mysql-client 설치
                        <BlockCode>sudo apt install mysql-client -y</BlockCode>
                    </li>
                    <li>
                        접속 명령
                        <BlockCode>mysql -h [엔드포인트] -u [사용자] -p</BlockCode>
                    </li>
                    <li>
                        테스트 쿼리 실행
                        <BlockCode>
                            {`CREATE DATABASE testdb;
USE testdb;
CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(50));
INSERT INTO users VALUES (1, 'Alice');
SELECT * FROM users;`}
                        </BlockCode>
                    </li>
                </ol>
            </div>

            {/* 오늘 할 일 */}
            <div>
                <h2 className="text-xl font-semibold mb-2">✅ 오늘 할 일</h2>
                <ul className="list-disc list-inside">
                    <li>
                        <del className="text-red-500">RDS 인스턴스 생성</del>
                    </li>
                    <li>
                        <del className="text-red-500">EC2에서 mysql-client 설치</del>
                    </li>
                    <li>
                        <del className="text-red-500">보안 그룹에서 포트 3306 허용</del>
                    </li>
                    <li>
                        <del className="text-red-500">접속 후 DB 생성 및 SELECT 테스트</del>
                    </li>
                </ul>
            </div>
        </section>);
};

export default Day3;
