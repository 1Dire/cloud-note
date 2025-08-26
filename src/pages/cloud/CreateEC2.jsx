import React from "react";
import LightboxViewer from "../../components/LightboxViewer.jsx";
import Tags from "../../components/Tags.jsx";

// 인라인 코드용 컴포넌트
const InlineCode = ({children}) => (
    <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-sm font-mono">
        {children}
    </code>
);

const CreateEC2 = () => {
    const tags = [
        "EC2 인스턴스",
        "Ubuntu AMI",
        "키 페어 생성",
        "보안 그룹",
    ];

    return (
        <section className="space-y-8 text-gray-800 dark:text-gray-200">
            <h1 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-sky-500">
                EC2 인스턴스 생성
            </h1>

            {/* 태그 뱃지 */}
            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags}/>
            </div>

            <ol className="list-decimal list-inside space-y-6 pl-2">
                {/* 1. EC2 서비스 접속 */}
                <li>
                    <strong>EC2 서비스 들어가기</strong>
                    <p>
                        AWS 콘솔 → 검색창에 <InlineCode>EC2</InlineCode> 입력 후 클릭
                    </p>
                    <LightboxViewer src="../cloud/createEC2/1.png" alt="EC2 검색 및 선택"/>
                </li>

                {/* 2. 인스턴스 시작 */}
                <li>
                    <strong>인스턴스 시작</strong>
                    <p>
                        왼쪽 메뉴에서 <InlineCode>인스턴스</InlineCode> →
                        <InlineCode>인스턴스 시작</InlineCode> 클릭
                    </p>
                    <LightboxViewer src="../cloud/createEC2/2.png" alt="인스턴스 메뉴"/>
                    <LightboxViewer src="../cloud/createEC2/3.png" alt="인스턴스 시작 버튼"/>
                </li>

                {/* 3. 구성 선택 */}
                <li>
                    <strong>구성 선택</strong>
                    <ul className="list-disc list-inside ml-5 mt-2">
                        <li>
                            <strong>AMI:</strong> Ubuntu Server 22.04 LTS
                            (Free tier eligible)
                        </li>
                        <li>
                            <strong>인스턴스 유형:</strong> t2.micro (프리티어 무료)
                        </li>
                    </ul>
                    <LightboxViewer src="../note/createEC2/4.png" alt="AMI 및 인스턴스 유형 선택"/>
                </li>

                {/* 4. 키 페어 생성 */}
                <li>
                    <strong>키 페어 생성</strong>
                    <ul className="list-disc list-inside ml-5 mt-2">
                        <li>새 키 페어 생성</li>
                        <li>
                            이름: 예) <InlineCode>dire-key</InlineCode>
                        </li>
                        <li>
                            유형: <InlineCode>RSA</InlineCode>
                        </li>
                        <li>
                            형식: <InlineCode>.pem</InlineCode>
                        </li>
                        <li>
                            <span className="text-red-600 font-semibold">다운로드 필수!</span>{" "}
                            (다시 받을 수 없음)
                        </li>
                        <li>SSH 접속 시 이 키 사용</li>
                    </ul>
                    <LightboxViewer src="../cloud/createEC2/5.png" alt="키 페어 생성 화면"/>
                </li>

                {/* 5. 보안 그룹 설정 */}
                <li>
                    <strong>보안 그룹 설정</strong>
                    <ul className="list-disc list-inside ml-5 mt-2">
                        <li>새 보안 그룹 생성</li>
                        <li>SSH (포트 22) 열기</li>
                        <li>
                            <strong>소스:</strong> 내 IP (보안상 안전)
                        </li>
                    </ul>
                    <LightboxViewer src="../cloud/createEC2/6.png" alt="보안 그룹 설정"/>
                </li>

                {/* 6. 인스턴스 시작 */}
                <li>
                    <strong>인스턴스 시작</strong>
                    <p>
                        모든 구성 확인 후 <InlineCode>인스턴스 시작</InlineCode> 클릭
                        <br/>
                        상태가 <InlineCode>running</InlineCode> 이 될 때까지 기다리기
                    </p>
                    <LightboxViewer src="../cloud/createEC2/7.png" alt="인스턴스 시작"/>
                </li>

                {/* 7. 생성 완료 */}
                <li>
                    <strong>생성 완료</strong>
                    <LightboxViewer src="../cloud/createEC2/8.png" alt="생성 완료 화면"/>
                </li>
            </ol>
        </section>
    );
};

export default CreateEC2;
