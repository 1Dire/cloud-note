const foldName = "bingo";


export const bingoRoutes = [
    {path: "/post1", label: "멀티 빙고게임 만들기"},
].map(route => ({
    ...route,
    path: `/${foldName}${route.path}`,
}));