// src/pages/three/Post2.jsx
import React from "react";
import BlockCode from "@/components/BlockCode";

const Post2 = () => {
    return (
        <div className="prose prose-lg max-w-4xl mx-auto px-4 dark:prose-invert leading-relaxed tracking-wide">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-sky-500 mb-8">
                WebGL 셰이더
            </h1>

            {/* --- 프롤로그 / 배경 --- */}
            <p className="mb-6">
                셰이더는 <b>GLSL</b>(OpenGL Shading Language)로 작성되어{" "}
                <b>GPU에서 실행되는 프로그램</b>이다. Three.js 없이 네이티브 WebGL로
                들어가면 제일 먼저 마주치는 벽이 바로 이 녀석이고, WebGL이 어렵게
                느껴지는 이유 중 하나도 <em>GPU 코드를 직접 다뤄야 한다</em>는 점에
                있다.
            </p>
            <p className="mb-6">
                셰이더는 크게 두 종류다. <b>버텍스 셰이더</b>는 정점을 배치하고,{" "}
                <b>프래그먼트 셰이더</b>는 보이는 조각(프래그먼트)에 색을 칠한다. 흔히
                "픽셀"이라고 부르지만 렌더링 조각이 화면의 물리적 픽셀과 항상 1:1로
                대응하지 않기 때문에, 보통은 <b>프래그먼트</b>라는 용어를 쓴다.
            </p>

            {/* --- 1. 버텍스 셰이더 --- */}
            <h2 className="mt-10 mb-4">1) 버텍스 셰이더: 정점을 화면으로 투영</h2>
            <p className="mb-6">
                버텍스 셰이더의 임무는 <b>지오메트리의 정점들을 올바른 위치에 배치</b>
                하는 것이다. 정점 좌표(<em>attribute</em>), 메시 변환(위치·회전·스케일),
                카메라 행렬/시야각(<em>uniform</em>)을 받아 3D를 2D 캔버스로 투영한다.
            </p>
            <BlockCode
                language="glsl"
                code={`// 최소 버텍스 셰이더 (WebGL1 스타일)
attribute vec3 position;            // 정점별 값: Attribute
uniform mat4 modelViewMatrix;       // 공통 값:   Uniform
uniform mat4 projectionMatrix;      // 공통 값:   Uniform

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`}
                className="my-6"
            />

            <ul className="mb-6">
                <li>
                    <b>Attribute</b>: 정점마다 다른 데이터 (예: position, normal, uv)
                </li>
                <li>
                    <b>Uniform</b>: 모든 정점에 동일하게 적용되는 데이터 (예: 행렬, 라이트
                    위치)
                </li>
            </ul>

            {/* --- 2. 프래그먼트 셰이더 --- */}
            <h2 className="mt-10 mb-4">2) 프래그먼트 셰이더: 색을 결정</h2>
            <p className="mb-6">
                프래그먼트 셰이더는 <b>보이는 각 프래그먼트의 최종 색</b>을 정한다. 같은
                코드가 모든 프래그먼트에 실행되며, 전역 값은 <em>uniform</em>, 버텍스에서
                넘어온 값은 <em>varying</em>으로 받는다.
            </p>
            <BlockCode
                language="glsl"
                code={`// 최소 프래그먼트 셰이더
precision mediump float;    // WebGL에서 정밀도 지정 권장
uniform vec3 uColor;        // 전역 색상
void main() {
  gl_FragColor = vec4(uColor, 1.0); // 전체를 같은 색으로 칠함
}`}
                className="my-6"
            />

            {/* --- 3. Varying으로 데이터 넘기기 --- */}
            <h2 className="mt-10 mb-4">3) Varying: 버텍스 → 프래그먼트로 부드럽게 전달</h2>
            <p className="mb-6">
                <b>Varying</b>은 버텍스 셰이더에서 계산한 값을 프래그먼트 셰이더로 넘길
                때 사용한다. 래스터라이저가 삼각형 내부에서 값을 보간(Interpolate)해
                주기 때문에, 예컨대 <em>조명 계산용 N·L</em>이나 <em>UV</em> 같은 값을
                자연스럽게 사용할 수 있다.
            </p>
            <BlockCode
                language="glsl"
                code={`// vertex.glsl
attribute vec3 position;
attribute vec3 normal;

uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec3 vNormal;   // 프래그먼트로 보낼 값

void main() {
  vec3 worldNormal = normalize(mat3(modelMatrix) * normal);
  vNormal = worldNormal;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`}
                className="my-6"
            />

            <BlockCode
                language="glsl"
                code={`// fragment.glsl
precision highp float;
varying vec3 vNormal;
uniform vec3 uLightDir; // 정규화된 광원 방향(월드)

void main() {
  float NdotL = max(dot(normalize(vNormal), normalize(uLightDir)), 0.0);
  vec3  base  = vec3(0.85, 0.9, 1.0);
  vec3  color = base * (0.2 + 0.8 * NdotL); // 간단 람버트 조명
  gl_FragColor = vec4(color, 1.0);
}`}
                className="my-6"
            />

            {/* --- 4. Three.js에서 커스텀 셰이더 쓰기 --- */}
            <h2 className="mt-10 mb-4">4) Three.js에 연결하기 (ShaderMaterial)</h2>
            <p className="mb-6">
                Three.js에서는 <code>ShaderMaterial</code>로 버텍스/프래그먼트 셰이더를
                연결한다. Vite에선 <code>vite-plugin-glsl</code>로 <code>.glsl</code>{" "}
                파일을 임포트하면 편하다.
            </p>
            <BlockCode
                language="js"
                code={`// ShaderMaterial 예시
import * as THREE from "three";
import vertexShader from "@/shaders/basic/vertex.glsl";
import fragmentShader from "@/shaders/basic/fragment.glsl";

const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uColor:   { value: new THREE.Color('#7cc5ff') },
    uLightDir:{ value: new THREE.Vector3(0.5, 0.8, 0.2).normalize() },
  },
});`}
                className="my-6"
            />

            {/* --- 5. fwidth로 선 깔끔하게 그리기 (보너스) --- */}
            <h2 className="mt-10 mb-4">5) 보너스: fwidth로 깔끔한 라인</h2>
            <p className="mb-6">
                <code>fwidth</code>(화소별 미분 크기)를 활용하면 그리드 선의
                에일리어싱을 줄일 수 있다. 파생함수는 WebGL1에선{" "}
                <code>OES_standard_derivatives</code> 확장이 필요하며, Three.js{" "}
                <code>ShaderMaterial</code>에선{" "}
                <code>extensions: {'{'} derivatives: true {'}'}</code>로 활성화한다.
            </p>
            <BlockCode
                language="glsl"
                code={`// gridLine 함수 스니펫
float gridLine(vec2 p, float scale, float widthPx) {
  vec2 q = p / scale;
  vec2 g = abs(fract(q - 0.5) - 0.5);
  vec2 fw = fwidth(q);
  float lx = 1.0 - smoothstep(0.0, fw.x * widthPx, g.x);
  float lz = 1.0 - smoothstep(0.0, fw.y * widthPx, g.y);
  return clamp(max(lx, lz), 0.0, 1.0);
}`}
                className="my-6"
            />

            {/* --- 6. 정리 --- */}
            <h2 className="mt-10 mb-4">정리</h2>
            <ul className="mb-12">
                <li>
                    버텍스는 <b>배치</b>, 프래그먼트는 <b>색</b>.
                </li>
                <li>
                    <b>Attribute</b>=정점별, <b>Uniform</b>=전역 공통,{" "}
                    <b>Varying</b>=버텍스→프래그먼트 보간.
                </li>
                <li>
                    Three.js에선 <code>ShaderMaterial</code>로 연결하고, Vite에선{" "}
                    <code>vite-plugin-glsl</code>을 쓰면 개발이 수월하다.
                </li>
            </ul>
        </div>
    );
};

export default Post2;