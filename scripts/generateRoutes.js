// scripts/generateRoutes.js
import fs from "fs";
import path from "path";

// 자동 라우팅할 폴더 리스트
const baseFolders = ["plan", "ecs", "kubernetes", "cloud","gitAction"];

function getRoutes(dirPath, baseFolder) {
    const files = fs.readdirSync(dirPath).filter(file => file.endsWith(".jsx"));
    return files.map(file => {
        const name = file.replace(".jsx", "");
        const routePath = `/${baseFolder}/${name}`; // 경로에 폴더 이름 포함
        return {
            path: routePath,
            importPath: `@/pages/${baseFolder}/${file}`,
        };
    });
}

let allRoutes = [];

for (const folder of baseFolders) {
    const dirPath = path.resolve(`src/pages/${folder}`);
    if (fs.existsSync(dirPath)) {
        allRoutes = allRoutes.concat(getRoutes(dirPath, folder));
    }
}

const imports = allRoutes
    .map((r, i) => `import Page${i} from "${r.importPath}";`)
    .join("\n");

const routeDefs = allRoutes
    .map((r, i) => `                <Route path="${r.path}" element={<Page${i} />} />`)
    .join("\n");

const content = `
import { Routes, Route } from "react-router-dom";
import Layout from "@/pages/Layout";
import Tag from "@/pages/Tag";
${imports}

function AutoRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Tag />} />
${routeDefs}
                <Route path="*" element={<div>404: Page Not Found</div>} />
            </Route>
        </Routes>
    );
}

export default AutoRoutes;
`;

fs.writeFileSync("src/AutoRoutes.jsx", content.trim());
console.log("✅ AutoRoutes.jsx 생성 완료!");