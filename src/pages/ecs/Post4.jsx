import React from "react";
import LightboxViewer from "@/components/LightboxViewer";
import BlockCode from "@/components/BlockCode";

const Post4 = () => {
    return (
        <div className="prose prose-lg max-w-4xl mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">AWS ECR에 Docker 이미지 푸시</h2>

            <p>
                드디어 내가 만든 백엔드 앱과 프론트엔드 앱을 AWS에 배포하기 위한 첫 단계, <strong>ECR</strong>에 이미지를 올려보기로 했다.
                이 과정을 놓치지 않으려고, 처음부터 끝까지 순서대로 정리해본다.
            </p>

            <div className="border-l-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-700 p-4 my-4">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-300">🤔 ECR이 뭐야?</h4>
                <p>
                    ECR은 <strong>Elastic Container Registry</strong>의 줄임말로, AWS에서 제공하는 Docker 이미지 저장소다.
                    쉽게 말해 Docker Hub의 AWS 버전이라고 보면 된다. 우리가 빌드한 이미지를 여기 올려두고, ECS에서 꺼내 쓸 수 있다.
                </p>
            </div>

            <hr className="my-6" />

            <h3 className="text-xl font-semibold text-indigo-600 dark:text-sky-400">1. AWS CLI 설치</h3>
            <p>
                AWS CLI가 있어야 터미널에서 AWS랑 연결할 수 있다. 맥에서는 공식 사이트에서 설치 파일을 받아서 설치했다:
            </p>
            <BlockCode language="bash" code={`curl \"https://awscli.amazonaws.com/AWSCLIV2.pkg\" -o \"AWSCLIV2.pkg\"
sudo installer -pkg AWSCLIV2.pkg -target /`} />
            <p>설치가 잘 되었는지 확인</p>
            <BlockCode language="bash" code={`aws --version`} />

            <h3 className="text-xl font-semibold text-indigo-600 dark:text-sky-400">2. IAM 사용자 정보 등록 (aws configure)</h3>
            <p>
                아까 만든 IAM 사용자 정보를 CLI에 등록했다. 이건 딱 한 번 해두면 CLI 명령어로 모든 AWS 자원을 다룰 수 있다.
            </p>
            <BlockCode language="bash" code={`aws configure`} />
            <p>입력한 정보 예시</p>
            <BlockCode language="dotenv" code={`AWS Access Key ID [None]: AKIAXXXXXXXX
AWS Secret Access Key [None]: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
Default region name [None]: ap-northeast-2
Default output format [None]: json`} />

            <h3 className="text-xl font-semibold text-indigo-600 dark:text-sky-400">3. ECR 리포지터리 만들기</h3>
            <p>각 서비스별로 리포지터리를 만들어줘야 한다. 프론트엔드 먼저 생성:</p>
            <BlockCode language="bash" code={`aws ecr create-repository \
  --repository-name hansan-frontend \
  --image-scanning-configuration scanOnPush=true \
  --region ap-northeast-2`} />
            <p>백엔드도 마찬가지로 생성</p>
            <BlockCode language="bash" code={`aws ecr create-repository \
  --repository-name hansan-backend \
  --image-scanning-configuration scanOnPush=true \
  --region ap-northeast-2`} />
            <p>이렇게 하면 두 개의 리포지터리가 만들어지고, ECR 콘솔에서도 확인할 수 있다.</p>

            <h3 className="text-xl font-semibold text-indigo-600 dark:text-sky-400">4. AWS CLI 로그인</h3>
            <p>
                ECR에 푸시하려면 먼저 CLI에서 로그인해야 한다. Docker와 AWS CLI를 연결해주는 작업이다:
            </p>
            <BlockCode language="bash" code={`aws ecr get-login-password --region ap-northeast-2 | \
docker login --username AWS \
--password-stdin 183695703260.dkr.ecr.ap-northeast-2.amazonaws.com`} />

            <h3 className="text-xl font-semibold text-indigo-600 dark:text-sky-400">5. Docker 이미지 태깅</h3>
            <p>
                로컬에서 만든 이미지에 ECR 주소로 태그를 붙여줘야 한다. 그래야 ECR에 push할 때 어디에 업로드할지 알 수 있으니까:
            </p>
            <BlockCode language="bash" code={`docker tag hansan-backend:latest \
183695703260.dkr.ecr.ap-northeast-2.amazonaws.com/hansan-backend:latest`} />
            <p>프론트도 마찬가지</p>
            <BlockCode language="bash" code={`docker tag hansan-frontend:latest \
183695703260.dkr.ecr.ap-northeast-2.amazonaws.com/hansan-frontend:latest`} />

            <h3 className="text-xl font-semibold text-indigo-600 dark:text-sky-400">6. 이미지 Push</h3>
            <p>
                이제 진짜 업로드!
            </p>
            <BlockCode language="bash" code={`docker push \
183695703260.dkr.ecr.ap-northeast-2.amazonaws.com/hansan-backend:latest`} />
            <BlockCode language="bash" code={`docker push \
183695703260.dkr.ecr.ap-northeast-2.amazonaws.com/hansan-frontend:latest`} />
            <p>
                푸시가 완료되면, ECR 콘솔에서 이미지가 올라온 걸 확인할 수 있다. 이제 이 이미지를 ECS에서 사용해서 배포할 수 있다!
            </p>

            <div className="border-l-4 border-blue-400 bg-blue-50 dark:bg-blue-950 dark:border-blue-600 p-4 my-4">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300">💡 이미지 푸시 오류가 날 경우</h4>
                <ul className="list-disc pl-5">
                    <li>리포지토리 이름과 태그가 정확히 일치해야 한다.</li>
                    <li>로그인 토큰이 만료되었으면 다시 로그인해야 한다.</li>
                    <li>이미지가 없는 경우 `docker images`로 확인 필요</li>
                </ul>
            </div>


        </div>
    );
};

export default Post4;
