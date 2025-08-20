import React from "react";

// note 폴더와 blog 폴더의 컴포넌트들을 모두 불러옴
const notePages = import.meta.glob("@/pages/note/*.jsx", { eager: true });
const blogPages = import.meta.glob("@/pages/blog/*.jsx", { eager: true });

// 하나의 객체로 병합
const allPages = { ...notePages, ...blogPages };

// 자동 라우트 생성
const autoNoteRoutes = Object.entries(allPages).map(([path, module]) => {
    // 경로에서 파일명 추출: ex) /src/pages/note/WhatIsCloud.jsx → WhatIsCloud
    const name = path.split("/").pop().replace(".jsx", "");

    // 라우트 경로: 첫 글자 소문자로 변환 → whatIsCloud
    const routePath = name.charAt(0).toLowerCase() + name.slice(1);

    return {
        path: routePath,
        element: React.createElement(module.default),
    };
});

export default autoNoteRoutes;