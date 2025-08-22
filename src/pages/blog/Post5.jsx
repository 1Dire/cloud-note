import React from "react";
import BlockCode from "@/components/BlockCode";

const Post5 = () => {
    return (<div className="prose max-w-3xl mx-auto">
            <h1>AWS RDS + PostgreSQL 마이그레이션 기록</h1>

            <p>
                이 글은 내가 직접 진행한 AWS RDS(PostgreSQL) 세팅과 로컬 DB 마이그레이션 과정의 기록이다.
                Spring Boot 백엔드와 연결까지 이어지는 흐름을 순서대로 정리했다.
            </p>

            <h2>1. RDS 생성</h2>
            <ul>
                <li>RDS 콘솔에서 PostgreSQL 선택</li>
                <li>인스턴스 이름: <code>hansan-db</code></li>
                <li>DB 이름: <code>postgres</code> (처음엔 기본 DB로)</li>
                <li>사용자: <code>hansan_admin</code>, 비밀번호: <code>Ehdro1ro!</code></li>
                <li>퍼블릭 액세스 허용: <strong>예 (Yes)</strong></li>
                <li>VPC 보안 그룹: 인바운드 5432 포트 열어야 함 (내 IP 기준)</li>
            </ul>

            <h2>2. pg_dump로 로컬 DB 백업</h2>
            <BlockCode
                language="bash"
                code={`pg_dump -U sangwoolee -d hansanpension_db -F p -f hansan_dump.sql`}
            />
            <ul>
                <li>로컬 DB에서 dump 파일 생성</li>
                <li><code>-F p</code>는 plain SQL 포맷으로 출력</li>
            </ul>

            <h2>3. RDS에 DB 생성</h2>
            <p>RDS 접속 후 새로운 DB 생성 (기본 postgres DB로 먼저 접속):</p>
            <BlockCode
                language="bash"
                code={`psql \\
  -h hansan-db.*********.rds.amazonaws.com \\
  -U hansan_admin \\
  -d postgres \\
  -p 5432 \\
  --set=sslmode=require`}
            />
            <p>이후 SQL로 DB 생성:</p>
            <BlockCode language="sql" code={`CREATE DATABASE hansanpension_db;`}/>

            <h2>4. 덤프 파일 RDS에 복원</h2>
            <BlockCode
                language="bash"
                code={`PGPASSWORD="Ehdro1ro!" psql \\
  -h hansan-db.*********.rds.amazonaws.com \\
  -U hansan_admin \\
  -d hansanpension_db \\
  -p 5432 \\
  -f hansan_dump.sql`}
            />
            <p>
                <strong>role \"admin\" does not exist</strong> 에러는 로컬 DB에서 덤프 생성할 때의 유저명이 포함돼 있어서 그렇다. 대부분 무시 가능하거나, 미리
                admin 계정을 생성해도 된다.
            </p>

            <h2>5. 테이블 확인</h2>
            <BlockCode
                language="bash"
                code={`PGPASSWORD="Ehdro1ro!" psql \\
  -h hansan-db.*********.rds.amazonaws.com \\
  -U hansan_admin \\
  -d hansanpension_db \\
  -p 5432 \\
  -c '\\dt'`}
            />
            <p>정상 출력되면 마이그레이션 완료!</p>

            <h2>6. Spring Boot 연결 설정</h2>
            <p><code>application.yml</code>에 RDS 정보 반영:</p>
            <BlockCode
                language="yaml"
                code={`spring:
  datasource:
    url: jdbc:postgresql://hansan-db.*********.rds.amazonaws.com:5432/hansanpension_db
    username: hansan_admin
    password: Ehdro1ro!
    driver-class-name: org.postgresql.Driver

jpa:
  hibernate:
    ddl-auto: update
  properties:
    hibernate:
      format_sql: true
  show-sql: true`}
            />

            <h2>7. 백엔드 Docker 이미지 다시 빌드 & 푸시</h2>
            <p><strong>IAM 권한</strong> 및 <strong>AWS CLI 인증</strong> 후 아래 실행:</p>

            <BlockCode
                language="bash"
                code={`# ECR 로그인
aws ecr get-login-password --region ap-southeast-2 \
  | docker login --username AWS --password-stdin <account_id>.dkr.ecr.ap-southeast-2.amazonaws.com

# Docker 이미지 태깅
docker tag hansan-backend:latest <account_id>.dkr.ecr.ap-southeast-2.amazonaws.com/hansan-backend

# 푸시
docker push <account_id>.dkr.ecr.ap-southeast-2.amazonaws.com/hansan-backend`}
            />

            <h2>8. ECS 서비스 재배포</h2>
            <ul>
                <li>기존 백엔드 서비스 수정 → 새 이미지로 업데이트</li>
                <li>task definition도 새 revision으로 갱신</li>
                <li>배포 상태 확인 후 정상 작동 체크</li>
            </ul>

            <h2>✅ 결과</h2>
            <p>이제 백엔드는 RDS(PostgreSQL) 기반으로 구동되며, ECS 환경에서 서비스되고 있음!</p>
        </div>);
};

export default Post5;