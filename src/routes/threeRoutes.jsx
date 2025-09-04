const foldName = "three";


export const threeRoutes = [
    {path: "/post1", label: "평지 스타터팩"},
].map(route => ({
    ...route,
    path: `/${foldName}${route.path}`,
}));