const foldName = "plan";

export const planRoutes = [
    {path: "/day1", label: "Day 1"},
    {path: "/day2", label: "Day 2"},
    {path: "/day3", label: "Day 3"},
    {path: "/day4", label: "Day 4"},
    {path: "/day5", label: "Day 5"},
    {path: "/day6", label: "Day 6"},
    {path: "/day7", label: "Day 7"},
].map(route => ({
    ...route,
    path: `/${foldName}${route.path}`,
}));