const foldName = "three";


export const threeRoutes = [
    {path: "/post1", label: "평지 스타터팩"},
    {path: "/post2", label: "쉐이더"},
].map(route => ({
    ...route,
    path: `/${foldName}${route.path}`,
}));