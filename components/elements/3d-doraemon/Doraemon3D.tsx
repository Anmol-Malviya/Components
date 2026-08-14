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

const BLUE = "#078fda";
const BLUE_DARK = "#0878bd";
const WHITE = "#f7f7f3";
const RED = "#e3262e";
const DARK_RED = "#65090d";
const ORANGE = "#f1662b";
const GOLD = "#f3bd16";
const GOLD_DARK = "#d79a05";
const BLACK = "#141414";
const BROWN = "#3a2419";
const PINK = "#f2d8d4";
const SEAM = "#4b5154";

function Ellipsoid({
  position,
  scale,
  color,
  roughness = 0.38,
  metalness = 0.01,
}: EllipsoidProps) {
  return (
    <mesh position={position} scale={scale} castShadow receiveShadow>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
    </mesh>
  );
}

function CapsuleBetween({ start, end, radius = 0.25 }: { start: Vec3; end: Vec3; radius?: number }) {
  const transform = useMemo(() => {
    const a = new THREE.Vector3(...start);
    const b = new THREE.Vector3(...end);
    const direction = b.clone().sub(a);
    const length = direction.length();
    const midpoint = a.clone().add(b).multiplyScalar(0.5);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.clone().normalize()
    );

    return {
      position: [midpoint.x, midpoint.y, midpoint.z] as Vec3,
      quaternion,
      length,
    };
  }, [start, end]);

  return (
    <mesh position={transform.position} quaternion={transform.quaternion} castShadow receiveShadow>
      <capsuleGeometry args={[radius, Math.max(0.16, transform.length - radius * 2), 12, 28]} />
      <meshStandardMaterial color={BLUE} roughness={0.39} />
    </mesh>
  );
}

function CatEar({ side }: { side: -1 | 1 }) {
  const x = side * 0.92;
  const tilt = side * -0.10;

  return (
    <group position={[x, 2.82, -0.02]} rotation={[0.03, 0, tilt]}>
      <mesh scale={[0.48, 0.78, 0.48]} castShadow>
        <coneGeometry args={[0.66, 1.28, 40]} />
        <meshStandardMaterial color={BLUE} roughness={0.35} />
      </mesh>
      <mesh position={[0, -0.02, 0.32]} scale={[0.29, 0.54, 0.16]} castShadow>
        <coneGeometry args={[0.66, 1.25, 36]} />
        <meshStandardMaterial color={PINK} roughness={0.48} />
      </mesh>
    </group>
  );
}

function Arms() {
  return (
    <group>
      <CapsuleBetween start={[-1.02, 0.28, 0.02]} end={[-1.34, -0.34, 0.08]} radius={0.27} />
      <Ellipsoid position={[-1.42, -0.49, 0.10]} scale={[0.36, 0.36, 0.36]} color={WHITE} roughness={0.46} />

      <CapsuleBetween start={[1.02, 0.28, 0.02]} end={[1.34, -0.34, 0.08]} radius={0.27} />
      <Ellipsoid position={[1.42, -0.49, 0.10]} scale={[0.36, 0.36, 0.36]} color={WHITE} roughness={0.46} />
    </group>
  );
}

function Whiskers() {
  const lines: Vec3[][] = [
    [[-0.46, 1.73, 1.49], [-1.13, 1.91, 1.47]],
    [[-0.49, 1.57, 1.51], [-1.18, 1.58, 1.49]],
    [[-0.46, 1.41, 1.50], [-1.11, 1.27, 1.48]],
    [[0.46, 1.73, 1.49], [1.13, 1.91, 1.47]],
    [[0.49, 1.57, 1.51], [1.18, 1.58, 1.49]],
    [[0.46, 1.41, 1.50], [1.11, 1.27, 1.48]],
  ];

  return (
    <group>
      {lines.map((points, index) => (
        <Line key={index} points={points} color={BLACK} lineWidth={2.25} />
      ))}
    </group>
  );
}

function Brows() {
  return (
    <group>
      <Line
        points={[
          [-0.55, 2.62, 1.40],
          [-0.44, 2.69, 1.42],
          [-0.31, 2.69, 1.42],
          [-0.21, 2.64, 1.41],
        ]}
        color={BLACK}
        lineWidth={1.9}
      />
      <Line
        points={[
          [0.21, 2.64, 1.41],
          [0.31, 2.69, 1.42],
          [0.44, 2.69, 1.42],
          [0.55, 2.62, 1.40],
        ]}
        color={BLACK}
        lineWidth={1.9}
      />
    </group>
  );
}

function Mouth() {
  const mouthShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.92, 0.28);
    shape.bezierCurveTo(-0.57, 0.17, -0.26, 0.13, 0, 0.14);
    shape.bezierCurveTo(0.26, 0.13, 0.57, 0.17, 0.92, 0.28);
    shape.bezierCurveTo(0.78, -0.26, 0.42, -0.52, 0, -0.55);
    shape.bezierCurveTo(-0.42, -0.52, -0.78, -0.26, -0.92, 0.28);
    return shape;
  }, []);

  return (
    <group position={[0, 1.18, 1.405]}>
      <mesh castShadow>
        <extrudeGeometry
          args={[
            mouthShape,
            {
              depth: 0.075,
              bevelEnabled: true,
              bevelSize: 0.03,
              bevelThickness: 0.022,
              bevelSegments: 5,
              curveSegments: 36,
            },
          ]}
        />
        <meshStandardMaterial color={DARK_RED} roughness={0.56} />
      </mesh>
      <Ellipsoid position={[0, -0.34, 0.095]} scale={[0.54, 0.23, 0.07]} color={ORANGE} roughness={0.42} />
    </group>
  );
}

function Pocket() {
  const pocketShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.56, 0.22);
    shape.lineTo(0.56, 0.22);
    shape.bezierCurveTo(0.53, -0.24, 0.33, -0.46, 0, -0.48);
    shape.bezierCurveTo(-0.33, -0.46, -0.53, -0.24, -0.56, 0.22);
    return shape;
  }, []);

  return (
    <group position={[0, -0.47, 0.91]}>
      <mesh castShadow receiveShadow>
        <extrudeGeometry
          args={[
            pocketShape,
            {
              depth: 0.06,
              bevelEnabled: true,
              bevelSize: 0.025,
              bevelThickness: 0.018,
              bevelSegments: 4,
              curveSegments: 30,
            },
          ]}
        />
        <meshStandardMaterial color={WHITE} roughness={0.48} />
      </mesh>
      <Line points={[[-0.54, 0.215, 0.071], [0.54, 0.215, 0.071]]} color="#d7d7d4" lineWidth={1.8} />
    </group>
  );
}

function Bell() {
  return (
    <group position={[0, 0.47, 1.20]}>
      <Ellipsoid position={[0, 0, 0]} scale={[0.28, 0.26, 0.18]} color={GOLD} metalness={0.42} roughness={0.23} />
      <mesh position={[0, 0.105, 0.145]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.19, 0.03, 12, 48]} />
        <meshStandardMaterial color={GOLD_DARK} metalness={0.34} roughness={0.28} />
      </mesh>
      <Ellipsoid position={[0, -0.055, 0.18]} scale={[0.048, 0.048, 0.028]} color={BLACK} roughness={0.7} />
      <Line points={[[0, -0.09, 0.195], [0, -0.21, 0.195]]} color={BLACK} lineWidth={2.2} />
    </group>
  );
}

function Eyes() {
  return (
    <group>
      <Ellipsoid position={[-0.33, 2.26, 1.25]} scale={[0.41, 0.56, 0.18]} color={WHITE} roughness={0.44} />
      <Ellipsoid position={[0.33, 2.26, 1.25]} scale={[0.41, 0.56, 0.18]} color={WHITE} roughness={0.44} />

      <Ellipsoid position={[-0.18, 2.20, 1.425]} scale={[0.112, 0.155, 0.055]} color={BROWN} roughness={0.24} />
      <Ellipsoid position={[0.18, 2.20, 1.425]} scale={[0.112, 0.155, 0.055]} color={BROWN} roughness={0.24} />
      <Ellipsoid position={[-0.18, 2.22, 1.476]} scale={[0.064, 0.087, 0.03]} color={BLACK} roughness={0.20} />
      <Ellipsoid position={[0.18, 2.22, 1.476]} scale={[0.064, 0.087, 0.03]} color={BLACK} roughness={0.20} />
      <Ellipsoid position={[-0.21, 2.29, 1.505]} scale={[0.025, 0.035, 0.014]} color={WHITE} roughness={0.12} />
      <Ellipsoid position={[0.15, 2.29, 1.505]} scale={[0.025, 0.035, 0.014]} color={WHITE} roughness={0.12} />
    </group>
  );
}

function Face() {
  return (
    <group>
      <Ellipsoid position={[0, 1.47, 1.09]} scale={[1.23, 1.03, 0.24]} color={WHITE} roughness={0.48} />

      <Mouth />

      <Ellipsoid position={[-0.52, 1.58, 1.43]} scale={[0.65, 0.28, 0.15]} color={WHITE} roughness={0.47} />
      <Ellipsoid position={[0.52, 1.58, 1.43]} scale={[0.65, 0.28, 0.15]} color={WHITE} roughness={0.47} />

      <Eyes />
      <Brows />

      <Ellipsoid position={[0, 1.94, 1.48]} scale={[0.23, 0.23, 0.22]} color={RED} roughness={0.22} />
      <Ellipsoid position={[-0.065, 2.02, 1.68]} scale={[0.046, 0.046, 0.022]} color="#ffb2b6" roughness={0.12} />
      <Line points={[[0, 1.83, 1.51], [0, 1.50, 1.51]]} color={SEAM} lineWidth={1.45} />

      <Whiskers />
    </group>
  );
}

function Collar() {
  return (
    <mesh position={[0, 0.60, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[1.02, 0.94, 1]} castShadow>
      <torusGeometry args={[1.02, 0.105, 18, 96]} />
      <meshStandardMaterial color={RED} roughness={0.33} />
    </mesh>
  );
}

function BackDetails() {
  return (
    <group>
      <Ellipsoid position={[0, -0.50, -0.87]} scale={[0.28, 0.28, 0.28]} color={WHITE} roughness={0.46} />
      <Line
        points={[
          [0, 2.66, -1.405],
          [0, 2.05, -1.435],
          [0, 1.30, -1.445],
          [0, 0.70, -1.24],
        ]}
        color={BLUE_DARK}
        lineWidth={1.0}
      />
    </group>
  );
}

function DoraemonModel({ autoRotate = true }: { autoRotate?: boolean }) {
  const root = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!root.current) return;
    const t = state.clock.elapsedTime;
    root.current.position.y = Math.sin(t * 1.20) * 0.018;
    if (autoRotate) root.current.rotation.y = t * 0.16;
  });

  return (
    <group ref={root} position={[0, -0.08, 0]}>
      <Arms />

      <Ellipsoid position={[0, -0.28, 0]} scale={[1.02, 1.13, 0.84]} color={BLUE} roughness={0.37} />
      <Ellipsoid position={[-0.47, -1.29, 0.01]} scale={[0.45, 0.42, 0.57]} color={BLUE} roughness={0.38} />
      <Ellipsoid position={[0.47, -1.29, 0.01]} scale={[0.45, 0.42, 0.57]} color={BLUE} roughness={0.38} />

      <Ellipsoid position={[-0.48, -1.58, 0.15]} scale={[0.59, 0.25, 0.63]} color={WHITE} roughness={0.48} />
      <Ellipsoid position={[0.48, -1.58, 0.15]} scale={[0.59, 0.25, 0.63]} color={WHITE} roughness={0.48} />

      <BackDetails />

      <Ellipsoid position={[0, -0.25, 0.81]} scale={[0.73, 0.82, 0.13]} color={WHITE} roughness={0.49} />
      <Pocket />

      <Collar />

      <Ellipsoid position={[0, 1.56, 0]} scale={[1.46, 1.41, 1.40]} color={BLUE} roughness={0.34} />
      <CatEar side={-1} />
      <CatEar side={1} />

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
      aria-label="Interactive all-sides 3D Doraemon character"
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.48, 7.25], fov: 33, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.42} />
          <hemisphereLight intensity={1.12} color="#ffffff" groundColor="#8296ab" />
          <directionalLight
            position={[4.6, 7.4, 6.2]}
            intensity={3.2}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <directionalLight position={[-4.2, 3.2, 3.8]} intensity={1.05} />
          <pointLight position={[0, 2.0, 6]} intensity={0.52} />

          <DoraemonModel autoRotate={autoRotate} />
          <ContactShadows position={[0, -1.92, 0]} opacity={0.30} scale={6} blur={2.8} far={5} />

          {controls && (
            <OrbitControls
              makeDefault
              enablePan={false}
              minDistance={5.2}
              maxDistance={9.0}
              minPolarAngle={Math.PI * 0.29}
              maxPolarAngle={Math.PI * 0.72}
              target={[0, 0.52, 0]}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Doraemon3D;
