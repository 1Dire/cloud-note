// node scripts/generateRoutes.js
import fs from "fs";
import path from "path";

// 자동 라우팅할 폴더 리스트
const baseFolders = ["plan", "ecs", "kubernetes", "cloud", "gitAction","three","bingo"];

function getRoutes(dirPath, baseFolder) {
  const files = fs.readdirSync(dirPath).filter((file) => file.endsWith(".jsx"));
  // 보기 좋게 정렬(선택)
  files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  return files.map((file) => {
    const name = file.replace(".jsx", "");
    const routePath = `/${baseFolder}/${name}`; // 절대 경로 유지
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
  .map(
    (r, i) =>
      `                <Route path="${r.path}" element={<Page${i} />} />`
  )
  .join("\n");

const content = `
import { Routes, Route } from "react-router-dom";
import Layout from "@/pages/Layout";
import Tag from "@/pages/Tag";
import Home from "@/pages/Home";
${imports}

function AutoRoutes() {
    return (
        <Routes>
           
            <Route path="/test" element={<Home />} />
            <Route path="/" element={<Layout />}>
             <Route path="/" element={<Home />} />
                <Route path="/tag" element={<Tag />} />
${routeDefs}
                <Route path="*" element={<div>404: Page Not Found</div>} />
            </Route>
        </Routes>
    );
}

export default AutoRoutes;
`.trim();

fs.writeFileSync("src/AutoRoutes.jsx", content);
console.log("✅ AutoRoutes.jsx 생성 완료!");
