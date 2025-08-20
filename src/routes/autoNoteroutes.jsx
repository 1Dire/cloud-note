import React from "react";

// 동적으로 note 폴더의 컴포넌트들을 불러옴
const notePages = import.meta.glob("../pages/note/*.jsx", { eager: true });

const autoNoteRoutes = Object.entries(notePages).map(([path, module]) => {
    const name = path
        .split("/")
        .pop()
        .replace(".jsx", ""); // ex: Secret.jsx -> Secret

    return {
        path: name.charAt(0).toLowerCase() + name.slice(1), // 소문자 시작 경로
        element: React.createElement(module.default),
    };
});

export default autoNoteRoutes;