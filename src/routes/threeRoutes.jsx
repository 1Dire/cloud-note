const foldName = "three";


export const threeRoutes = [
    {path: "/post1", label: "평지 스타터팩"},
    {path: "/post2", label: "셰이더"},
    {path: "/post3", label: "자동차 운전 🚗"},
].map(route => ({
    ...route,
    path: `/${foldName}${route.path}`,
}));