import React from "react";
import LightboxViewer from "../../components/LightboxViewer";
import Tags from "../../components/Tags";


const BlockCode = ({ children }) => (
    <pre className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 text-sm p-4 rounded-md overflow-x-auto font-mono my-2">
    <code>{children}</code>
  </pre>
);

const RDSConnection = () => {
    const tags = ["RDS", "MySQL", "EC2 연동"];

    return (
        <section className="space-y-8 text-gray-800 dark:text-gray-200">
            <h1 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-sky-500">
                EC2에서 RDS 접속하기
            </h1>

            {/* 태그 */}
            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags} />
            </div>

            <ol className="list-decimal list-inside space-y-6 pl-2">
                <li>
                    <strong>MySQL 클라이언트 설치</strong>
                    <p>EC2 인스턴스에 접속 후 다음 명령어 실행:</p>
                    <BlockCode>sudo apt install mysql-client -y</BlockCode>
                </li>

                <li>
                    <strong>RDS 접속</strong>
                    <p>RDS 콘솔에서 복사한 엔드포인트를 이용해 접속:</p>
                    <BlockCode>mysql -h 엔드포인트 -u 사용자명 -p</BlockCode>
                    <p>예시:</p>
                    <BlockCode>mysql -h mydb.xxxxxx.rds.amazonaws.com -u admin -p</BlockCode>
                </li>

                <li>
                    <strong>비밀번호 입력</strong>
                    <p>마스터 사용자 생성 시 입력했던 비밀번호를 입력하면 MySQL에 접속됩니다.</p>
                </li>

                <li>
                    <strong>간단한 쿼리 테스트</strong>
                    <p>접속 후 아래 쿼리로 정상 작동 여부를 확인합니다:</p>
                    <BlockCode>SHOW DATABASES;</BlockCode>
                </li>

            </ol>
        </section>
    );
};

export default RDSConnection;
