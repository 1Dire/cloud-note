import React from "react";
import LightboxViewer from "../../components/LightboxViewer.jsx";
import Tags from "../../components/Tags.jsx";
import BlockCode from "../../components/BlockCode.jsx"; // 새 컴포넌트 구조 사용

const RdsConnection = () => {
    const tags = ["RDS", "PostgreSQL", "EC2 연동"];

    return (
       <div className="prose prose-lg mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide w-full max-w-4xl lg:w-4xl">
            <h1 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-sky-500">
                EC2에서 RDS(PostgreSQL) 접속하기
            </h1>

            {/* 태그 */}
            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags} />
            </div>

            <ol className="list-decimal list-inside space-y-6 pl-2">
                <li>
                    <strong>PostgreSQL 클라이언트 설치</strong>
                    <p>EC2 인스턴스에 접속 후 다음 명령어 실행:</p>
                    <BlockCode language="bash" code={`sudo apt install postgresql-client -y`} />
                </li>

                <li>
                    <strong>RDS 접속</strong>
                    <p>RDS 콘솔에서 복사한 엔드포인트를 이용해 접속:</p>
                    <BlockCode
                        language="bash"
                        code={`psql -h 엔드포인트 -U 사용자명 -d 데이터베이스명`}
                    />
                    <p>예시:</p>
                    <BlockCode
                        language="bash"
                        code={`psql -h hansan-db.xxxxxx.ap-northeast-2.rds.amazonaws.com -U postgres -d hansan`}
                    />
                </li>

                <li>
                    <strong>비밀번호 입력</strong>
                    <p>마스터 사용자 생성 시 입력했던 비밀번호를 입력하면 PostgreSQL에 접속됩니다.</p>
                </li>

                <li>
                    <strong>간단한 쿼리 테스트</strong>
                    <p>접속 후 아래 쿼리로 정상 작동 여부를 확인합니다:</p>
                    <BlockCode language="sql" code={`\\l`} />
                    <BlockCode language="sql" code={`SELECT NOW();`} />
                </li>
            </ol>
        </div>
    );
};

export default RdsConnection;