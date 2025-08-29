import React from "react";
import LightboxViewer from "../../components/LightboxViewer.jsx";
import InlineCode from "../../components/InlineCode.jsx";
import Tags from "../../components/Tags.jsx";

const CreateRDS = () => {
    const tags = ["RDS", "MySQL", "DB 생성"];

    return (
        <div className="prose prose-lg max-w-4xl mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide">
            <h1 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-sky-500">
                AWS RDS 인스턴스 생성
            </h1>

            {/* 태그 */}
            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags} />
            </div>

            <ol className="list-decimal list-inside space-y-6 pl-2">
                <li>
                    <strong>RDS 콘솔 접속</strong>
                    <p>AWS 콘솔에서 <InlineCode>RDS</InlineCode> 검색 후 선택</p>
                    <LightboxViewer src="../cloud/createRDS/1.png" alt="RDS 검색 및 진입" />
                </li>

                <li>
                    <strong>데이터베이스 생성 클릭</strong>
                    <p>"데이터베이스 생성" 버튼 클릭</p>
                    <LightboxViewer src="../cloud/createRDS/2.png" alt="데이터베이스 생성 버튼" />
                </li>

                <li>
                    <strong>엔진 및 템플릿 선택</strong>
                    <ul className="list-disc list-inside ml-5 mt-2">
                        <li><InlineCode>MySQL</InlineCode> 선택</li>
                        <li><InlineCode>프리 티어</InlineCode> 템플릿 선택</li>
                    </ul>
                    <LightboxViewer src="../cloud/createRDS/3.png" alt="MySQL 프리티어 선택" />
                </li>

                <li>
                    <strong>DB 설정</strong>
                    <ul className="list-disc list-inside ml-5 mt-2">
                        <li>DB 식별자 입력 (예: <InlineCode>testdb</InlineCode>)</li>
                        <li>마스터 사용자 이름 설정 (예: <InlineCode>admin</InlineCode>)</li>
                        <li><strong>마스터 암호</strong> 및 <strong>암호 확인</strong> 입력</li>
                    </ul>
                    <LightboxViewer src="../cloud/createRDS/4.png" alt="DB 이름 및 사용자 설정" />
                </li>

                <li>
                    <strong>퍼블릭 액세스 설정</strong>
                    <p><InlineCode>퍼블릭 액세스: 아니요</InlineCode> 선택 (보안상 안전)</p>
                    <LightboxViewer src="../cloud/createRDS/5.png" alt="퍼블릭 액세스 설정" />
                </li>

                <li>
                    <strong>보안 그룹 설정</strong>
                    <p>
                        EC2와 동일한 보안 그룹 사용 또는 포트 <InlineCode>3306</InlineCode>을
                        EC2에서 접근 가능하도록 허용
                    </p>
                    <LightboxViewer src="../cloud/createRDS/6.png" alt="보안 그룹 설정" />
                </li>

                <li>
                    <strong>데이터베이스 생성</strong>
                    <p>설정 완료 후 <InlineCode>데이터베이스 생성</InlineCode> 클릭</p>
                    <LightboxViewer src="../cloud/createRDS/7.png" alt="DB 생성 버튼" />
                </li>

                <li>
                    <strong>엔드포인트 복사</strong>
                    <p>생성이 완료되면 DB 인스턴스 상세 정보에서 엔드포인트 복사</p>
                    <LightboxViewer src="../cloud/createRDS/8.png" alt="엔드포인트 확인" />
                </li>
            </ol>
        </div>
    );
};

export default CreateRDS;
