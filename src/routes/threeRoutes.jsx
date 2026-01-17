const foldName = "three";


export const threeRoutes = [
    {path: "/post1", label: "평지 스타터팩"},
    {path: "/post2", label: "셰이더"},
    {path: "/post3", label: "자동차 운전 🚗"},
    {path: "/post4", label: "섬 만들기"},
    {path: "/post5", label: "쉐이더로 잔디만들기"},
    {path: "/post6", label: "쉐이더로 잔디만들기2"},
    {path: "/post7", label: "Synthwave"},
    {path: "/post8", label: "3D Audio Visualizer"},
].map(route => ({
    ...route,
    path: `/${foldName}${route.path}`,
}));