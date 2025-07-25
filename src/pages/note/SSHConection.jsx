import React from "react";
import LightboxViewer from "../../components/LightboxViewer.jsx";
import Tags from "../../components/Tags.jsx";

// 인라인 코드 컴포넌트
const InlineCode = ({children}) => (<code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-sm font-mono">
    {children}
</code>);

// 블록 코드 컴포넌트 (다크모드 최적화)
const BlockCode = ({children}) => (<pre
    className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 text-sm p-4 rounded-md overflow-x-auto font-mono my-2">
    <code>{children}</code>
  </pre>);

const SSHConnection = () => {
    const tags = [
        "SSH 접속",
    ];

    return (<section className="space-y-10 text-gray-800 dark:text-gray-200 leading-relaxed">
        <h1 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-sky-500">
            SSH 접속
        </h1>
        {/* 태그 뱃지 */}
        <div className="flex flex-wrap gap-2 mb-6">
            <Tags tags={tags}/>
        </div>
        <ol className="list-decimal list-inside space-y-8 pl-4">
            <li>
                <strong className="text-lg font-semibold mb-2">SSH로 인스턴스 접속</strong>
                <ul className="list-disc list-inside ml-6 space-y-2">
                    <li>
                        키 파일 권한 설정:
                        <BlockCode>chmod 400 dire-key.pem</BlockCode>
                    </li>
                    <li>
                        SSH 접속:
                        <BlockCode>ssh -i dire-key.pem ubuntu@퍼블릭IP</BlockCode>
                    </li>
                </ul>
            </li>


            <li>
                <strong className="text-lg font-semibold mb-2">패키지 업데이트</strong>
                <BlockCode>sudo apt update && sudo apt upgrade -y</BlockCode>
            </li>


            <li>
                <strong className="text-lg font-semibold mb-2">웹 서버 설치</strong>
                <ul className="list-disc list-inside ml-6 space-y-2">
                    <li>
                        Apache 설치:
                        <BlockCode>sudo apt install apache2 -y</BlockCode>
                    </li>
                    <li>
                        Nginx 설치:
                        <BlockCode>sudo apt install nginx -y</BlockCode>
                    </li>
                </ul>
            </li>

            <li>
                <strong className="text-lg font-semibold mb-2">보안 그룹에서 HTTP 포트(80) 열기</strong>
                <ul className="list-disc list-inside ml-6 space-y-1">
                    <li>EC2 대시보드 → 인스턴스 선택</li>
                    <li>하단 보안 탭 → 보안 그룹 클릭</li>
                    <li>인바운드 규칙 편집 → HTTP(80) 추가</li>
                </ul>

            </li>


            <li>
                <strong className="text-lg font-semibold mb-2">웹 브라우저에서 확인</strong>
                <p>
                    웹 브라우저에서 <InlineCode>http://퍼블릭IP</InlineCode> 접속 시
                    Apache 또는 Nginx 기본 화면이 나오면 성공.
                </p>
            </li>


        </ol>
    </section>);
};

export default SSHConnection;
