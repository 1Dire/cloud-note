import React from "react";
import LightboxViewer from "@/components/LightboxViewer";
import BlockCode from "@/components/BlockCode";

const Post3 = () => {
    return (
        <div className="prose prose-lg mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide w-full max-w-4xl lg:w-4xl">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">AWS IAM 사용자 생성</h2>

            <p>
                드디어 AWS에 올릴 준비를 시작했다. ECR이나 ECS를 쓰려면 당연히 IAM 사용자부터 있어야 하니까,
                오늘은 IAM 사용자 만드는 과정을 기록해두기로 했다. 처음엔 좀 복잡해 보였는데, 해보니까 생각보다 간단했다.
            </p>

            <div className="border-l-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-700 p-4 my-4">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-300">🤔 IAM이 뭐야?</h4>
                <p>
                    IAM은 <strong>Identity and Access Management</strong>의 줄임말로, AWS 자원에 대한 접근 권한을 관리하는 서비스다.
                    사용자(User), 그룹(Group), 권한(Policy)을 통해 누가 무엇을 할 수 있는지를 통제할 수 있다.
                </p>
                <p>
                    예를 들어 Docker 이미지를 AWS ECR에 푸시하거나 ECS에서 서비스 배포하려면, 그 작업을 할 수 있는 IAM 사용자가 있어야 한다.
                    루트 계정을 쓰는 건 보안상 위험하니까, 따로 사용자 만들어서 쓰는 게 기본이다.
                </p>
            </div>

            <hr className="my-6" />

            <h3 className="text-xl font-semibold text-indigo-600 dark:text-sky-400">1. IAM 메뉴로 이동</h3>
            <p>
                AWS 콘솔에 로그인한 뒤, 상단 Console Home 에서 <strong>IAM</strong>을 눌려 이동했다.
            </p>
           <LightboxViewer src="../ecs/post3/1.png" alt="IAM 검색 및 진입" />

            <h3 className="text-xl font-semibold text-indigo-600 dark:text-sky-400">2. 사용자 추가 버튼 클릭</h3>
            <p>
                왼쪽 메뉴에서 <strong>사용자</strong>를 선택하고, 오른쪽 상단에 있는 <strong>사용자 추가</strong> 버튼을 눌렀다.
            </p>
           <LightboxViewer src="../ecs/post3/2.png" alt="사용자 추가 화면" />
           <LightboxViewer src="../ecs/post3/3.png" alt="사용자 생성 화면" />

            <h3 className="text-xl font-semibold text-indigo-600 dark:text-sky-400">3. 사용자 이름 & 액세스 방식 선택</h3>
            <p>
                사용자 이름은 <code>hansan-deploy</code>처럼 의미 있는 이름으로 지었다.
                그리고 <strong>프로그래밍 방식 액세스</strong>에 체크! CLI나 CI/CD에서 필요하기 때문.
            </p>
           <LightboxViewer src="../ecs/post3/4.png" alt="사용자 이름 및 액세스 방식" />

            <div className="border-l-4 border-blue-400 bg-blue-50 dark:bg-blue-950 dark:border-blue-600 p-4 my-4">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300">📌 용어 정리</h4>
                <ul className="list-disc pl-5">
                    <li><strong>프로그래밍 방식 액세스</strong>: AWS CLI, SDK, Terraform, GitHub Actions 같은 도구에서 로그인할 수 있게 해주는 방식</li>
                    <li><strong>콘솔 액세스</strong>: 웹 브라우저에서 AWS Management Console로 로그인하는 권한</li>
                </ul>
            </div>

            <h3 className="text-xl font-semibold text-indigo-600 dark:text-sky-400">4. 권한 설정</h3>
            <p>
                권한은 <strong>기존 정책 직접 연결</strong> 탭에서 <code>AdministratorAccess</code>를 선택했다.
                실제 운영에서는 제한적인 권한만 주는 게 좋지만, 지금은 연습이니까 전권 줌.
            </p>
           <LightboxViewer src="../ecs/post3/5.png" alt="권한 정책 연결" />
           <LightboxViewer src="../ecs/post3/6.png" alt="권한 정책 연결2" />

            <h3 className="text-xl font-semibold text-indigo-600 dark:text-sky-400">5. 태그 & 검토</h3>
            <p>태그는 생략했고, 마지막 검토 화면에서 <strong>사용자 생성</strong> 버튼 클릭!</p>
           <LightboxViewer src="../ecs/post3/7.png" alt="검토 후 사용자 생성" />

            <h3 className="text-xl font-semibold text-indigo-600 dark:text-sky-400">6. 액세스 키 저장</h3>
            <p>
                사용자 생성이 완료되면 <strong>액세스 키 ID</strong>와 <strong>비밀 액세스 키를 생성할 수 있다.</strong>
            </p>
           <LightboxViewer src="../ecs/post3/8.png" alt="엑세스 키 생성" />
           <LightboxViewer src="../ecs/post3/9.png" alt="설명 태그 설정 - 선택 사항" />
           <LightboxViewer src="../ecs/post3/10.png" alt="액세스 키 검색" />
            <BlockCode language="dotenv" code={`AWS_ACCESS_KEY_ID=AKIAXXXXXXX
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`} />
            <p>
                이 키를 가지고 나중에 AWS CLI에서 로그인하거나 GitHub Actions 같은 CI 도구에 넣을 수 있다.
            </p>


        </div>
    );
};

export default Post3;
