// src/pages/Home.jsx
import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Experience } from "@/components/Experience";


export default function Home() {
  return (
    <div style={{ width:"100vw", height:"100vh", position:"relative" }}>
      <Canvas shadows camera={{ position:[6,8,14], fov:35 }}>
        <Experience />
      </Canvas>
    </div>
  );
}