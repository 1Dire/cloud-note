import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import flowbiteReact from "flowbite-react/plugin/vite";
import path from "path";
import glsl from "vite-plugin-glsl";


export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    flowbiteReact(),
    glsl({ // .glsl/.vert/.frag 파일 import 지원
      include: ["**/*.glsl", "**/*.vert", "**/*.frag"],
      compress: true,
      warnDuplicatedImports: false,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    // ✅ three 중복 번들 방지 (drei/기타가 내부적으로 three를 또 끌고오지 않게)
    dedupe: ["three"],
  },
  // ✅ glb/gltf/hdr/ktx2 등 3D 에셋을 정적 자산으로 포함
  assetsInclude: [
    "**/*.gltf",
    "**/*.glb",
    "**/*.bin",
    "**/*.hdr",
    "**/*.exr",
    "**/*.ktx2",
    "**/*.basis",
    "**/*.env",
    "**/*.mp3",
    "**/*.wav",
    "**/*.ogg",
    "**/*.ttf",
    "**/*.otf",
    "**/*.json", // (Text3D용 폰트 JSON 등)
  ],
  server: {
    port: 3000,
    host: true,
    // headers: devHeadersForRapier, // ← Rapier 쓸 때만 주석 해제
  },
  build: {
    outDir: "dist", // ✅ Vercel 배포에 꼭 필요
 
  },

  optimizeDeps: {
    include: ["three", "@react-three/drei", "@react-three/postprocessing"],

  },
});