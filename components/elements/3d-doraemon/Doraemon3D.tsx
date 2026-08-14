"use client";

import { Suspense, useMemo, useRef } from "react";
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

type Vec3 = [number, number, number];

type EllipsoidProps = {
  position: Vec3;
  scale: Vec3;
  color: string;
  roughness?: number;
  metalness?: number;
};

const BLUE = "#0798df";
const WHITE = "#f7f7f3";
const RED = "#e5252d";
const DARK_RED = "#64060d";
const ORANGE = "#f26b2b";
const GOLD = "#f4be13";
const GOLD_DARK = "#d59a05";
const BLACK = "#151515";
const BROWN = "#3b2519";
const SEAM = "#57524f";

function Ellipsoid({
  position,
  scale,
  color,
  roughness = 0.36,
  metalness = 0.01,
}: EllipsoidProps) {
  return (
    <mesh position={position} scale={scale} castShadow receiveShadow>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
    </mesh>
  );
}

function Limb({
  start,
  end,
  radius = 0.27,
}: {
  start: Vec3;
  end: Vec3;
  radius?: number;
}) {
  const { position, quaternion, length } = useMemo(() => {
    const a = new THREE.Vector3(...start);
    const b = new THREE.Vector3(...end);
    const direction = b.clone().sub(a);
    const segmentLength = direction.length();
    const middle = a.clone().add(b).multiplyScalar(0.5);
    const q = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.clone().normalize()
    );

    return {
      position: [middle.x, middle.y, middle.z] as Vec3,
      quaternion: q,
      length: segmentLength,
    };
  }, [start, end]);

  return (
    <mesh position={position} quaternion={quaternion} castShadow>
      <capsuleGeometry args={[radius, Math.max(0.18, length - radius * 2), 12, 28]} />
      <meshStandardMaterial color={BLUE} roughness={0.38} />
    </mesh>
  );
}

function Arms() {
  return (
    <group position={[0, 0, -0.08]}>
      <Limb start={[-0.91, 0.34, 0.02]} end={[-1.49, 1.08, 0.08]} radius={0.27} />
      <Ellipsoid position={[-1.61, 1.21, 0.12]} scale={[0.37, 0.37, 0.37]} color={WHITE} />

      <Limb start={[0.92, 0.20, 0.03]} end={[1.43, -0.48, 0.09]} radius={0.27} />
      <Ellipsoid position={[1.55, -0.61, 0.13]} scale={[0.37, 0.37, 0.37]} color={WHITE} />
    </group>
  );
}

function Whiskers() {
  const lines: Vec3[][] = [
    [[-0.43, 1.79, 1.49], [-1.19, 2.02, 1.47]],
    [[-0.47, 1.62, 1.51], [-1.28, 1.64, 1.49]],
    [[-0.45, 1.45, 1.5], [-1.20, 1.29, 1.48]],
    [[0.43, 1.79, 1.49], [1.19, 2.02, 1.47]],
    [[0.47, 1.62, 1.51], [1.28, 1.64, 1.49]],
    [[0.45, 1.45, 1.5], [1.20, 1.29, 1.48]],
  ];

  return (
    <group>
      {lines.map((points, index) => (
        <Line key={index} points={points} color={BLACK} lineWidth={2.35} />
      ))}
    </group>
  );
}

function Mouth() {
  const mouthShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.97, 0.31);
    shape.bezierCurveTo(-0.63, 0.20, -0.31, 0.16, 0, 0.17);
    shape.bezierCurveTo(0.31, 0.16, 0.63, 0.20, 0.97, 0.31);
    shape.bezierCurveTo(0.82, -0.24, 0.45, -0.55, 0, -0.59);
    shape.bezierCurveTo(-0.45, -0.55, -0.82, -0.24, -0.97, 0.31);
    return shape;
  }, []);

  return (
    <group position={[0, 1.20, 1.43]}>
      <mesh castShadow>
        <extrudeGeometry
          args={[
            mouthShape,
            {
              depth: 0.055,
              bevelEnabled: true,
              bevelSize: 0.025,
              bevelThickness: 0.018,
              bevelSegments: 4,
              curveSegments: 32,
            },
          ]}
        />
        <meshStandardMaterial color={DARK_RED} roughness={0.52} />
      </mesh>
      <Ellipsoid position={[0, -0.36, 0.075]} scale={[0.55, 0.24, 0.06]} color={ORANGE} roughness={0.4} />
    </group>
  );
}

function Pocket() {
  const pocketShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.61, 0.23);
    shape.lineTo(0.61, 0.23);
    shape.bezierCurveTo(0.58, -0.25, 0.36, -0.49, 0, -0.51);
    shape.bezierCurveTo(-0.36, -0.49, -0.58, -0.25, -0.61, 0.23);
    return shape;
  }, []);

  return (
    <group position={[0, -0.48, 1.01]}>
      <mesh castShadow receiveShadow>
        <extrudeGeometry
          args={[
            pocketShape,
            {
              depth: 0.055,
              bevelEnabled: true,
              bevelSize: 0.025,
              bevelThickness: 0.018,
              bevelSegments: 4,
              curveSegments: 28,
            },
          ]}
        />
        <meshStandardMaterial color={WHITE} roughness={0.48} />
      </mesh>
      <Line
        points={[
          [-0.58, 0.225, 0.066],
          [0.58, 0.225, 0.066],
        ]}
        color="#d8d8d5"
        lineWidth={1.9}
      />
    </group>
  );
}

function Bell() {
  return (
    <group position={[0, 0.43, 1.23]}>
      <Ellipsoid
        position={[0, 0, 0]}
        scale={[0.31, 0.28, 0.18]}
        color={GOLD}
        metalness={0.38}
        roughness={0.24}
      />
      <mesh position={[0, 0.11, 0.145]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.215, 0.032, 12, 48]} />
        <meshStandardMaterial color={GOLD_DARK} metalness={0.32} roughness={0.28} />
      </mesh>
      <Ellipsoid position={[0, -0.06, 0.18]} scale={[0.052, 0.052, 0.028]} color={BLACK} roughness={0.7} />
      <Line points={[[0, -0.10, 0.193], [0, -0.24, 0.193]]} color={BLACK} lineWidth={2.4} />
    </group>
  );
}

function Eyes() {
  return (
    <group>
      <Ellipsoid position={[-0.34, 2.34, 1.25]} scale={[0.43, 0.59, 0.18]} color={WHITE} roughness={0.45} />
      <Ellipsoid position={[0.34, 2.34, 1.25]} scale={[0.43, 0.59, 0.18]} color={WHITE} roughness={0.45} />

      <Ellipsoid position={[-0.20, 2.28, 1.425]} scale={[0.115, 0.16, 0.055]} color={BROWN} roughness={0.25} />
      <Ellipsoid position={[0.20, 2.28, 1.425]} scale={[0.115, 0.16, 0.055]} color={BROWN} roughness={0.25} />
      <Ellipsoid position={[-0.20, 2.30, 1.475]} scale={[0.066, 0.089, 0.03]} color={BLACK} roughness={0.2} />
      <Ellipsoid position={[0.20, 2.30, 1.475]} scale={[0.066, 0.089, 0.03]} color={BLACK} roughness={0.2} />
      <Ellipsoid position={[-0.23, 2.37, 1.505]} scale={[0.026, 0.037, 0.014]} color={WHITE} roughness={0.12} />
      <Ellipsoid position={[0.17, 2.37, 1.505]} scale={[0.026, 0.037, 0.014]} color={WHITE} roughness={0.12} />
    </group>
  );
}

function Face() {
  return (
    <group>
      <Ellipsoid position={[0, 1.47, 1.10]} scale={[1.31, 1.12, 0.23]} color={WHITE} roughness={0.47} />

      <Mouth />

      <Ellipsoid position={[-0.54, 1.60, 1.44]} scale={[0.69, 0.30, 0.15]} color={WHITE} roughness={0.46} />
      <Ellipsoid position={[0.54, 1.60, 1.44]} scale={[0.69, 0.30, 0.15]} color={WHITE} roughness={0.46} />

      <Eyes />

      <Ellipsoid position={[0, 2.02, 1.48]} scale={[0.25, 0.25, 0.22]} color={RED} roughness={0.22} />
      <Ellipsoid position={[-0.07, 2.10, 1.685]} scale={[0.05, 0.05, 0.023]} color="#ffb4b8" roughness={0.12} />
      <Line points={[[0, 1.91, 1.505], [0, 1.55, 1.505]]} color={SEAM} lineWidth={1.55} />

      <Whiskers />
    </group>
  );
}

function DoraemonModel({ autoRotate = true }: { autoRotate?: boolean }) {
  const root = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!root.current) return;
    const t = state.clock.elapsedTime;
    root.current.position.y = Math.sin(t * 1.25) * 0.024;
    root.current.rotation.y = autoRotate ? Math.sin(t * 0.30) * 0.16 : 0;
  });

  return (
    <group ref={root} position={[0, -0.10, 0]}>
      <Arms />

      <Ellipsoid position={[0, -0.25, 0]} scale={[1.10, 1.25, 0.84]} color={BLUE} />
      <Ellipsoid position={[-0.48, -1.28, 0.03]} scale={[0.48, 0.48, 0.61]} color={BLUE} />
      <Ellipsoid position={[0.48, -1.28, 0.03]} scale={[0.48, 0.48, 0.61]} color={BLUE} />

      <Ellipsoid position={[-0.54, -1.62, 0.20]} scale={[0.65, 0.34, 0.63]} color={WHITE} roughness={0.48} />
      <Ellipsoid position={[0.54, -1.62, 0.20]} scale={[0.65, 0.34, 0.63]} color={WHITE} roughness={0.48} />

      <Ellipsoid position={[0, -0.23, 0.82]} scale={[0.82, 0.94, 0.12]} color={WHITE} roughness={0.49} />
      <Pocket />

      <Ellipsoid position={[0, 1.50, 0]} scale={[1.55, 1.50, 1.42]} color={BLUE} roughness={0.34} />

      <Ellipsoid position={[0, 0.58, 0.42]} scale={[1.10, 0.13, 0.86]} color={RED} roughness={0.32} />
      <Face />
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
        camera={{ position: [0, 0.55, 7.15], fov: 33, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.45} />
          <hemisphereLight intensity={1.1} color="#ffffff" groundColor="#72859b" />
          <directionalLight
            position={[4.5, 7.5, 6]}
            intensity={3.3}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <directionalLight position={[-4, 3.5, 4]} intensity={1.05} />
          <pointLight position={[0, 2, 6]} intensity={0.55} />

          <DoraemonModel autoRotate={autoRotate} />
          <ContactShadows position={[0, -1.98, 0]} opacity={0.32} scale={6} blur={2.7} far={5} />

          {controls && (
            <OrbitControls
              makeDefault
              enablePan={false}
              minDistance={5.4}
              maxDistance={9}
              minPolarAngle={Math.PI * 0.34}
              maxPolarAngle={Math.PI * 0.66}
              target={[0, 0.50, 0]}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Doraemon3D;
