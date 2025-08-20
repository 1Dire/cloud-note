import React from "react";

// note와 blog 폴더의 컴포넌트 불러오기
const notePages = import.meta.glob("@/pages/note/*.jsx", { eager: true });
const blogPages = import.meta.glob("@/pages/blog/*.jsx", { eager: true });

// note + blog 합쳐서 한 번에 처리
const allPages = { ...notePages, ...blogPages };

// 공통 라우트 생성
const autoNoteRoutes = Object.entries(allPages).map(([path, module]) => {
    const name = path.split("/").pop().replace(".jsx", ""); // ex: WhatIsCloud.jsx

    return {
        path: name.charAt(0).toLowerCase() + name.slice(1), // ex: whatIsCloud
        element: React.createElement(module.default),
    };
});

export default autoNoteRoutes;