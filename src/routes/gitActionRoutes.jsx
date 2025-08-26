const foldName = "gitAction";

export const gitActionRoutes = [
    {path: "/post1", label: "시작하기"},
    {path: "/post2", label: "GitHub Actions로 프론트엔드 자동 빌드 설정하기"},
    {path: "/post3", label: "GitHub Actions로 Docker 이미지 만들고 AWS ECR에 푸시하기"},
    {path: "/post4", label: "자동화의 위력"},


].map(route => ({
    ...route,
    path: `/${foldName}${route.path}`,
}));