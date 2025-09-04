// src/pages/three/Post1.jsx
import React from "react";
import BlockCode from "@/components/BlockCode";

const Post1 = () => {
  return (
      <div className="prose prose-lg max-w-4xl mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide">
        <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500">
          Three.js 스타터 팩 만들기 (+ 그리드 평지 & Rapier 물리)
        </h1>

        {/* --- 프롤로그 / 동기 --- */}
        <p>
          매번 three.js 프로젝트를 시작할 때마다 똑같은 세팅을 반복하는 게 은근히 귀찮다.
          <span className="font-semibold"> Vite 설치 → three.js 설치 → OrbitControls → 카메라/조명/씬 초기화</span>
          를 계속 복붙하느니, 아예 내가 선호하는 기본값을 스타터 팩으로 만들어 두는 게 낫다.
        </p>
        <p>
          그래서 이번 포스트 한 편으로 <b>스타터 템플릿</b>을 만들고, 바로 이어서 <b>그리드 바닥(셰이더)</b>와{" "}
          <b>Rapier 물리엔진(보이지 않는 충돌 바닥 + 떨어지는 큐브)</b>까지 붙여
          다음 작업(카메라/물리/차량/효과)을 빠르게 시작할 베이스를 만든다.
        </p>

        {/* --- 1. 스타터: 가장 작은 3D 루프 --- */}
        <h2>1) 가장 작은 스타터(카메라 · 컨트롤 · 루프)</h2>
        <p>아래는 브라우저에서 바로 3D를 돌릴 수 있는 최소 구성이다.</p>
        <BlockCode
            language="jsx"
            code={`import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

// 카메라
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 3);

// 렌더러
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 컨트롤
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 조명
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 2, 3);
scene.add(light);

// 애니메이션 루프
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();`}
        />

        {/* --- 2. 환경 세팅 --- */}
        <h2>2) 프로젝트 셋업 (Vite + R3F + Rapier + GLSL)</h2>
        <p>
          React 환경에서 편하게 가기 위해 <b>react-three-fiber</b>를 쓰고, GLSL 파일 임포트를 위해{" "}
          <code>vite-plugin-glsl</code>을 사용한다.
        </p>
        <BlockCode
            language="bash"
            code={`npm i three @react-three/fiber @react-three/drei @react-three/rapier
npm i -D @vitejs/plugin-react vite-plugin-glsl`}
        />
        <BlockCode
            language="js"
            code={`// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import glsl from "vite-plugin-glsl";
import path from "path";

export default defineConfig({
  plugins: [react(), glsl()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
});`}
        />

        {/* --- 3. 그리드 셰이더 --- */}
        <h2>3) 셰이더로 그리드 평지 만들기</h2>
        <p>
          <code>fwidth</code> 기반 안티에일리어싱으로 1·10 유닛 라인을 부드럽게 그리고, 카메라 거리로 페이드아웃을 준다.
          (보이는 바닥은 순수 렌더용이다. 충돌은 뒤에서 Rapier가 맡는다.)
        </p>
        <BlockCode
            language="glsl"
            code={`// src/shaders/floor/floorVertex.glsl
varying vec3 vWorldPos;
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorldPos = world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}`}
        />
        <BlockCode
            language="glsl"
            code={`// src/shaders/floor/floorFragment.glsl
precision highp float;
varying vec3 vWorldPos;

uniform vec3  uColorMinor;
uniform vec3  uColorMajor;
uniform float uLineWidth1;
uniform float uLineWidth10;
uniform float uFadeDistance;
uniform vec3  uCamPos;

float gridLine(vec2 p, float scale, float widthPx) {
  vec2 q = p / scale;
  vec2 g = abs(fract(q - 0.5) - 0.5);
  vec2 fw = fwidth(q);
  float lx = 1.0 - smoothstep(0.0, fw.x * widthPx, g.x);
  float lz = 1.0 - smoothstep(0.0, fw.y * widthPx, g.y);
  return clamp(max(lx, lz), 0.0, 1.0);
}

void main() {
  vec2 p = vWorldPos.xz;

  float minor = gridLine(p, 1.0,  2.0);
  float major = gridLine(p, 10.0, 3.0);

  vec3  col   = mix(uColorMinor, uColorMajor, major);
  float alpha = max(minor, major);

  float dist = distance(uCamPos, vWorldPos);
  float fade = smoothstep(uFadeDistance, 0.0, dist);
  alpha *= fade;

  if (alpha < 0.01) discard;
  gl_FragColor = vec4(col, alpha);
}`}
        />

        <h3>Floor 머티리얼 & 컴포넌트</h3>
        <BlockCode
            language="js"
            code={`// src/materials/floorMaterial.js
import * as THREE from "three";
import vertexShader from "@/shaders/floor/floorVertex.glsl";
import fragmentShader from "@/shaders/floor/floorFragment.glsl";

export function createFloorMaterial({
  colorMinor = "#3a4356",
  colorMajor = "#ffffff",
  lineWidth1 = 2.0,
  lineWidth10 = 3.0,
  fadeDistance = 140.0,
} = {}) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColorMinor:   { value: new THREE.Color(colorMinor) },
      uColorMajor:   { value: new THREE.Color(colorMajor) },
      uLineWidth1:   { value: lineWidth1 },
      uLineWidth10:  { value: lineWidth10 },
      uFadeDistance: { value: fadeDistance },
      uCamPos:       { value: new THREE.Vector3() },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    extensions: { derivatives: true }, // fwidth()
  });
}`}
        />
        <BlockCode
            language="jsx"
            code={`// src/components/floor/Floor.jsx
import { useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { createFloorMaterial } from "@/materials/floorMaterial";

export default function Floor({ size = 5000, ...rest }) {
  const { camera } = useThree();
  const material = useMemo(() => createFloorMaterial(rest), [rest]);

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      frustumCulled={false}
      onBeforeRender={() => {
        material.uniforms.uCamPos.value.copy(camera.position);
      }}
    >
      <planeGeometry args={[size, size]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}`}
        />

        {/* --- 4. Rapier 물리 붙이기 --- */}
        <h2>4) Rapier 물리: 보이지 않는 충돌 바닥 + 떨어지는 큐브</h2>
        <p>
          <code>@react-three/rapier@2.x</code>에선 별도 디버그 컴포넌트를 import하지 않고{" "}
          <code>{`<Physics debug />`}</code> prop으로 켠다. 보이는 바닥(셰이더)와 충돌 바닥(고정 콜라이더)을 분리한다.
        </p>
        <BlockCode
            language="jsx"
            code={`// src/components/physics/PhysicsWorld.jsx
import { Physics, CuboidCollider, RigidBody } from "@react-three/rapier";

export default function PhysicsWorld({ floorSize = 5000, gravity = [0, -9.81, 0], debug = false, children }) {
  return (
    <Physics gravity={gravity} debug={debug}>
      {/* 보이지 않는 고정 바닥 (half-extent 규칙으로 size/2) */}
      <RigidBody type="fixed">
        <CuboidCollider args={[floorSize / 2, 0.1, floorSize / 2]} position={[0, 0, 0]} />
      </RigidBody>
      {children}
    </Physics>
  );
}`}
        />
        <BlockCode
            language="jsx"
            code={`// src/components/physics/DynamicBox.jsx
import { RigidBody } from "@react-three/rapier";

export default function DynamicBox({ position = [0, 2, 0], size = [1, 1, 1], color = "#7cc5ff" }) {
  return (
    <RigidBody type="dynamic" colliders="cuboid" restitution={0.2} friction={0.8} position={position}>
      <mesh>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.1} />
      </mesh>
    </RigidBody>
  );
}`}
        />

        {/* --- 5. 조립: Experience --- */}
        <h2>5) 조립: Experience</h2>
        <p>
          URL에 <code>#debug</code>를 붙이면 물리 와이어가 켜진다. 큐브는 중력으로 떨어져 충돌 바닥 위에 멈춘다.
        </p>
        <BlockCode
            language="jsx"
            code={`// src/components/Experience.jsx
import Floor from "@/components/floor/Floor";
import PhysicsWorld from "@/components/physics/PhysicsWorld";
import DynamicBox from "@/components/physics/DynamicBox";

export default function Experience() {
  const floorSize = 5000;
  const debug = location.hash.includes("debug");

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 5, 2]} intensity={1.2} />

      <PhysicsWorld floorSize={floorSize} debug={debug}>
        <DynamicBox position={[0, 2, 0]} />
      </PhysicsWorld>

      <Floor size={floorSize} colorMinor="#3a4356" colorMajor="#ffffff" lineWidth1={2.0} lineWidth10={3.0} fadeDistance={140} />
    </>
  );
}`}
        />

        {/* --- 6. 라이브 데모 & GitHub --- */}
        <h2>미리보기 · 리포지토리</h2>
        <div className="not-prose my-6 grid gap-3 sm:grid-cols-2">
          {/* Live Demo 카드 */}
          <a
              href="https://three-floor-starter.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="group block rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-5 bg-white/60 dark:bg-zinc-900/60 backdrop-blur hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-sky-900/40 dark:text-sky-300">
              {/* play icon */}
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
              <div>
                <p className="font-semibold">Live Demo</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">three-floor-starter.vercel.app</p>
              </div>
            </div>
          </a>

          {/* GitHub 카드 */}
          <a
              href="https://github.com/1Dire/three-floor-starter"
              target="_blank"
              rel="noreferrer"
              className="group block rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-5 bg-white/60 dark:bg-zinc-900/60 backdrop-blur hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
              {/* GitHub mark */}
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.41-1.34-1.79-1.34-1.79-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.77-1.6-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.64.24 2.86.12 3.16.77.84 1.24 1.9 1.24 3.22 0 4.61-2.8 5.62-5.47 5.92.43.37.82 1.1.82 2.22 0 1.6-.01 2.89-.01 3.28 0 .32.22.7.83.58A12 12 0 0 0 12 .5z" />
              </svg>
            </span>
              <div>
                <p className="font-semibold">GitHub Repository</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">1Dire/three-floor-starter</p>
              </div>
            </div>
          </a>
        </div>

        {/* --- 에필로그 --- */}
        <h2>정리</h2>
        <ul>
          <li>시각(셰이더)과 물리(Rapier)를 분리하면 유지보수/확장성이 훨씬 좋아진다.</li>
          <li>그리드는 fwidth로 안티에일리어싱, 멀리서 페이드로 보기 좋게 만든다.</li>
          <li>물리 디버그는 <code>#debug</code> 해시로 토글해서 배포 환경에서도 쉽게 켜고 끌 수 있다.</li>
        </ul>

      </div>
  );
};

export default Post1;