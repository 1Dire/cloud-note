import React from "react";
import LightboxViewer from "../../components/LightboxViewer.jsx";
import Tags from "../../components/Tags.jsx";
import BlockCode from "../../components/BlockCode.jsx";
import InlineCode from "../../components/InlineCode.jsx";

const SSHConnection = () => {
    const tags = ["SSH 접속"];

    return (
       <div className="prose prose-lg mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide w-full max-w-4xl lg:w-4xl">
            <h1 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-sky-500">
                SSH 접속
            </h1>

            {/* 태그 뱃지 */}
            <div className="flex flex-wrap gap-2 mb-6">
                <Tags tags={tags} />
            </div>

            <ol className="list-decimal list-inside space-y-8 pl-4">
                <li>
                    <strong className="text-lg font-semibold mb-2">SSH로 인스턴스 접속</strong>
                    <ul className="list-disc list-inside ml-6 space-y-2">
                        <li>
                            키 파일 권한 설정:
                            <BlockCode language="bash" code={`chmod 400 dire-key.pem`} />
                        </li>
                        <li>
                            SSH 접속:
                            <BlockCode language="bash" code={`ssh -i dire-key.pem ubuntu@퍼블릭IP`} />
                        </li>
                    </ul>
                </li>

                <li>
                    <strong className="text-lg font-semibold mb-2">패키지 업데이트</strong>
                    <BlockCode language="bash" code={`sudo apt update && sudo apt upgrade -y`} />
                </li>

                <li>
                    <strong className="text-lg font-semibold mb-2">웹 서버 설치</strong>
                    <ul className="list-disc list-inside ml-6 space-y-2">
                        <li>
                            Apache 설치:
                            <BlockCode language="bash" code={`sudo apt install apache2 -y`} />
                        </li>
                        <li>
                            Nginx 설치:
                            <BlockCode language="bash" code={`sudo apt install nginx -y`} />
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
        </div>
    );
};

export default SSHConnection;