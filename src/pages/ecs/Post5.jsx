import React from "react";
import BlockCode from "@/components/BlockCode";

const Post5 = () => {
    return (
        <div className="prose prose-lg mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide w-full max-w-4xl lg:w-4xl">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                AWS RDS + PostgreSQL 마이그레이션 기록
            </h1>

            {/* 유튜브 튜토리얼 영상 */}
            <div className="relative w-full h-0 pt-[56.25%] mb-8">
                <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    src="https://www.youtube.com/embed/im2K-dME5gM?si=hSdVpWlRg3K-wXdw"
                    title="AWS RDS PostgreSQL Tutorial"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            {/* RDS 개념 설명 */}
            <div className="border-l-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-700 p-4 my-4">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-300">📌 RDS란?</h4>
                <p>
                    <strong>RDS (Relational Database Service)</strong>는 AWS에서 제공하는 관리형 데이터베이스 서비스로,
                    PostgreSQL, MySQL, MariaDB, Oracle 등 다양한 DB를 직접 설치 없이 바로 운영할 수 있다.
                </p>
                <ul className="list-disc pl-5">
                    <li>백업, 복구, 패치, 모니터링 등을 AWS에서 자동 처리</li>
                    <li>우리는 DB 인스턴스를 만들고 연결만 하면 됨</li>
                    <li>이번 글에서는 <strong>PostgreSQL</strong>을 사용함</li>
                </ul>
            </div>

            <hr className="my-6" />

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400">1. RDS 생성</h2>
            <ul>
                <li>AWS 콘솔 → RDS → DB 인스턴스 생성</li>
                <li>엔진: PostgreSQL</li>
                <li>DB 인스턴스 이름: <code>hansan-db</code></li>
                <li>기본 DB 이름: <code>postgres</code></li>
                <li>사용자명: <code>hansan_admin</code> / 비밀번호: <code>비공개</code></li>
                <li>퍼블릭 액세스 허용: 예</li>
                <li>보안 그룹 설정: 인바운드에 내 IP 기준 5432 포트 열기</li>
            </ul>

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400">2. 로컬 DB 백업</h2>
            <BlockCode
                language="bash"
                code={`pg_dump -U sangwoolee -d hansanpension_db -F p -f hansan_dump.sql`}
            />
            <p><code>-F p</code>는 plain SQL 포맷을 의미함</p>

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400">3. RDS에 접속 및 DB 생성</h2>
            <BlockCode
                language="bash"
                code={`psql \\
  -h hansan-db.********.rds.amazonaws.com \\
  -U hansan_admin \\
  -d postgres \\
  -p 5432 \\
  --set=sslmode=require`}
            />
            <p>접속 후 SQL 입력:</p>
            <BlockCode language="sql" code={`CREATE DATABASE hansanpension_db;`} />

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400">4. 덤프 복원</h2>
            <BlockCode
                language="bash"
                code={`PGPASSWORD="******" psql \\
  -h hansan-db.********.rds.amazonaws.com \\
  -U hansan_admin \\
  -d hansanpension_db \\
  -p 5432 \\
  -f hansan_dump.sql`}
            />
            <p className="text-sm text-gray-500">
                ※ <strong>role "admin" does not exist</strong> 에러는 무시 가능하거나, 해당 유저를 미리 생성해도 됨.
            </p>

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400">5. 테이블 확인</h2>
            <BlockCode
                language="bash"
                code={`PGPASSWORD="******" psql \\
  -h hansan-db.********.rds.amazonaws.com \\
  -U hansan_admin \\
  -d hansanpension_db \\
  -p 5432 \\
  -c '\\dt'`}
            />

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400">6. Spring Boot 연결</h2>
            <p><code>application.yml</code> 설정:</p>
            <BlockCode
                language="yaml"
                code={`spring:
  datasource:
    url: jdbc:postgresql://hansan-db.********.rds.amazonaws.com:5432/hansanpension_db
    username: hansan_admin
    password: 비공개
    driver-class-name: org.postgresql.Driver

jpa:
  hibernate:
    ddl-auto: update
  properties:
    hibernate:
      format_sql: true
  show-sql: true`}
            />

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400">7. 백엔드 Docker 이미지 다시 빌드 & 푸시</h2>
            <BlockCode
                language="bash"
                code={`# ECR 로그인
aws ecr get-login-password --region ap-northeast-2 \\
  | docker login --username AWS --password-stdin <account_id>.dkr.ecr.ap-northeast-2.amazonaws.com

# Docker 이미지 태깅
docker tag hansan-backend:latest <account_id>.dkr.ecr.ap-northeast-2.amazonaws.com/hansan-backend

# 푸시
docker push <account_id>.dkr.ecr.ap-northeast-2.amazonaws.com/hansan-backend`}
            />

            <h2 className="text-xl font-semibold text-indigo-600 dark:text-sky-400">8. ECS에서 이미지 업데이트</h2>
            <ul>
                <li>Task Definition 새 revision 생성</li>
                <li>서비스 수정 → 새 이미지 반영</li>
                <li>배포 상태 모니터링</li>
            </ul>

            <div className="border-l-4 border-green-400 bg-green-50 dark:bg-green-950 dark:border-green-600 p-4 my-6">
                <h4 className="font-semibold text-green-800 dark:text-green-300">✅ 마이그레이션 성공!</h4>
                <p>
                    이제 백엔드는 RDS(PostgreSQL) 기반으로 구동되며, ECS 환경에서 정상 작동 중이다.
                </p>
            </div>
        </div>
    );
};

export default Post5;