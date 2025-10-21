// src/pages/three/Post4.jsx
import React from "react";
import LightboxViewer from "../../components/LightboxViewer.jsx";

const Post4 = () => {
    return (
        <div className="prose prose-lg max-w-4xl mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500 mb-8">
                블렌더로 떠 있는 섬 만들기
            </h1>

            {/* --- 프롤로그 --- */}
            <p className="mb-6">
                블렌더로 내가 원하는 맵을 직접 만드는 것은 오래전부터 하고 싶었던 일이다. 그동안 꾸준히 연습하려 했지만 쉽지 않았고, 편하게 에셋을 가져다 쓰려 해도 늘 묘한 이질감이 남았다. 다른 컨셉의 에셋을 섞으면 완성된 장면이 마음에 들지 않았기 때문이다.
            </p>
            <p className="mb-6">
                그래서 결국 시간은 더 걸리더라도 차근차근 내가 직접 만들기로 했다. 특히 평소 가장 해보고 싶었던 것은 <b>떠 있는 섬(floating island)</b>이다. 단순한 평지보다 공중에 떠 있는 섬 위에 원하는 오브젝트를 올리고, 전체 컨셉에 맞춰 꾸며가는 과정 자체가 큰 재미가 될 것 같았다.
            </p>


            <LightboxViewer src="../three/post4/1.png" alt="Floating Island " />
            참고할 섬 이미지
            <LightboxViewer src="../three/post4/2.png" alt="블랜더로 만든 섬" />
            현재 작업중인 모델링
        </div>
    );
};

export default Post4;