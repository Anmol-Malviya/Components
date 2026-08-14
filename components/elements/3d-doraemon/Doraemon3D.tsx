"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Line, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export type Doraemon3DProps = {
  className?: string;
  autoRotate?: boolean;
  controls?: boolean;
  background?: string;
  minHeight?: number;
};

type EllipsoidProps = {
  position: [number, number, number];
  scale: [number, number, number];
  color: string;
  roughness?: number;
  metalness?: number;
};

const BLUE = "#0797df";
const WHITE = "#f7f7f4";
const RED = "#e51d2a";
const DARK_RED = "#5b0710";
const ORANGE = "#f06b2b";
const GOLD = "#f4bf15";
const BLACK = "#151515";
const BROWN = "#3b2114";

function Ellipsoid({
  position,
  scale,
  color,
  roughness = 0.42,
  metalness = 0.02,
}: EllipsoidProps) {
  return (
    <mesh position={position} scale={scale} castShadow receiveShadow>
      <sphereGeometry args={[1, 48, 48]} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
    </mesh>
  );
}

function Arm({
  position,
  rotation,
  hand,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  hand: [number, number, number];
}) {
  return (
    <group>
      <mesh position={position} rotation={rotation} castShadow>
        <capsuleGeometry args={[0.29, 0.82, 10, 22]} />
        <meshStandardMaterial color={BLUE} roughness={0.45} />
      </mesh>
      <Ellipsoid position={hand} scale={[0.38, 0.38, 0.38]} color={WHITE} />
    </group>
  );
}

function Whiskers() {
  const lines: [number, number, number][][] = [
    [[-0.43, 1.83, 1.55], [-1.18, 2.05, 1.53]],
    [[-0.47, 1.62, 1.58], [-1.27, 1.66, 1.56]],
    [[-0.45, 1.42, 1.56], [-1.20, 1.27, 1.53]],
    [[0.43, 1.83, 1.55], [1.18, 2.05, 1.53]],
    [[0.47, 1.62, 1.58], [1.27, 1.66, 1.56]],
    [[0.45, 1.42, 1.56], [1.20, 1.27, 1.53]],
  ];

  return (
    <group>
      {lines.map((points, index) => (
        <Line key={index} points={points} color={BLACK} lineWidth={2.2} />
      ))}
    </group>
  );
}

function Pocket() {
  const curve = new THREE.EllipseCurve(0, 0, 0.66, 0.54, Math.PI, Math.PI * 2, false, 0);
  const arc = curve.getPoints(48).map((point) => [point.x, point.y, 0] as [number, number, number]);

  return (
    <group position={[0, -0.48, 1.045]}>
      <Line points={[[-0.66, 0, 0], [0.66, 0, 0]]} color="#d9d9d7" lineWidth={2.2} />
      <Line points={arc} color="#d9d9d7" lineWidth={2.2} />
    </group>
  );
}

function Bell() {
  return (
    <group position={[0, 0.46, 1.26]}>
      <Ellipsoid position={[0, 0, 0]} scale={[0.32, 0.29, 0.17]} color={GOLD} metalness={0.35} roughness={0.28} />
      <mesh position={[0, 0.12, 0.17]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.23, 0.035, 10, 40]} />
        <meshStandardMaterial color="#d89e05" metalness={0.3} roughness={0.3} />
      </mesh>
      <Ellipsoid position={[0, -0.06, 0.18]} scale={[0.052, 0.052, 0.028]} color={BLACK} roughness={0.7} />
      <Line points={[[0, -0.1, 0.195], [0, -0.25, 0.195]]} color={BLACK} lineWidth={2.5} />
    </group>
  );
}

function DoraemonModel({ autoRotate = true }: { autoRotate?: boolean }) {
  const root = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!root.current) return;
    const t = state.clock.elapsedTime;
    root.current.position.y = Math.sin(t * 1.35) * 0.035;
    root.current.rotation.y = autoRotate ? Math.sin(t * 0.34) * 0.24 : 0;
  });

  return (
    <group ref={root} position={[0, -0.15, 0]}>
      <Ellipsoid position={[0, -0.25, 0]} scale={[1.12, 1.35, 0.88]} color={BLUE} />
      <Ellipsoid position={[-0.48, -1.34, 0]} scale={[0.48, 0.48, 0.66]} color={BLUE} />
      <Ellipsoid position={[0.48, -1.34, 0]} scale={[0.48, 0.48, 0.66]} color={BLUE} />
      <Ellipsoid position={[-0.55, -1.66, 0.2]} scale={[0.66, 0.34, 0.66]} color={WHITE} />
      <Ellipsoid position={[0.55, -1.66, 0.2]} scale={[0.66, 0.34, 0.66]} color={WHITE} />

      <Arm position={[-1.14, 0.2, -0.02]} rotation={[0.02, 0.05, -0.78]} hand={[-1.63, 0.92, 0.2]} />
      <Arm position={[1.1, -0.13, -0.01]} rotation={[0.03, 0.02, -0.6]} hand={[1.55, -0.73, 0.22]} />

      <Ellipsoid position={[0, -0.23, 0.86]} scale={[0.84, 1.02, 0.1]} color={WHITE} roughness={0.5} />
      <Pocket />

      <Ellipsoid position={[0, 1.57, 0]} scale={[1.58, 1.55, 1.48]} color={BLUE} />
      <Ellipsoid position={[0, 1.42, 0.77]} scale={[1.37, 1.2, 0.79]} color={WHITE} roughness={0.5} />
      <Ellipsoid position={[0, 0.5, 0.31]} scale={[1.12, 0.13, 0.83]} color={RED} roughness={0.35} />

      <Ellipsoid position={[-0.36, 2.41, 1.2]} scale={[0.44, 0.62, 0.17]} color={WHITE} roughness={0.48} />
      <Ellipsoid position={[0.36, 2.41, 1.2]} scale={[0.44, 0.62, 0.17]} color={WHITE} roughness={0.48} />
      <Ellipsoid position={[-0.25, 2.37, 1.38]} scale={[0.12, 0.17, 0.07]} color={BROWN} roughness={0.28} />
      <Ellipsoid position={[0.25, 2.37, 1.38]} scale={[0.12, 0.17, 0.07]} color={BROWN} roughness={0.28} />
      <Ellipsoid position={[-0.25, 2.39, 1.445]} scale={[0.067, 0.09, 0.032]} color={BLACK} roughness={0.22} />
      <Ellipsoid position={[0.25, 2.39, 1.445]} scale={[0.067, 0.09, 0.032]} color={BLACK} roughness={0.22} />
      <Ellipsoid position={[-0.285, 2.45, 1.475]} scale={[0.027, 0.038, 0.015]} color={WHITE} roughness={0.15} />
      <Ellipsoid position={[0.215, 2.45, 1.475]} scale={[0.027, 0.038, 0.015]} color={WHITE} roughness={0.15} />

      <Ellipsoid position={[0, 2.08, 1.49]} scale={[0.26, 0.26, 0.23]} color={RED} roughness={0.25} />
      <Ellipsoid position={[-0.075, 2.16, 1.69]} scale={[0.052, 0.052, 0.025]} color="#ffb0b4" roughness={0.15} />
      <Line points={[[0, 1.96, 1.505], [0, 1.54, 1.53]]} color="#4f4a47" lineWidth={1.7} />

      <Ellipsoid position={[0, 1.16, 1.43]} scale={[1.02, 0.57, 0.12]} color={DARK_RED} roughness={0.58} />
      <Ellipsoid position={[0, 0.92, 1.545]} scale={[0.57, 0.28, 0.07]} color={ORANGE} roughness={0.46} />

      <Whiskers />
      <Bell />
    </group>
  );
}

export function Doraemon3D({
  className = "",
  autoRotate = true,
  controls = true,
  background = "transparent",
  minHeight = 520,
}: Doraemon3DProps) {
  return (
    <div
      className={className}
      style={{ width: "100%", height: "100%", minHeight, overflow: "hidden", background }}
      aria-label="Interactive 3D Doraemon character"
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.65, 7.1], fov: 34, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.7} />
          <hemisphereLight intensity={1.2} color="#ffffff" groundColor="#8090a0" />
          <directionalLight position={[4, 7, 6]} intensity={3.2} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
          <directionalLight position={[-4, 3, 4]} intensity={1.2} />
          <pointLight position={[0, 1.5, 6]} intensity={0.7} />

          <DoraemonModel autoRotate={autoRotate} />
          <ContactShadows position={[0, -2.02, 0]} opacity={0.34} scale={6} blur={2.6} far={5} />

          {controls && (
            <OrbitControls
              makeDefault
              enablePan={false}
              minDistance={5.2}
              maxDistance={9}
              minPolarAngle={Math.PI * 0.33}
              maxPolarAngle={Math.PI * 0.67}
              target={[0, 0.55, 0]}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Doraemon3D;
