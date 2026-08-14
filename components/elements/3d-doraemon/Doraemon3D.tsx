"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Line, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export type Doraemon3DProps = {
  className?: string;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  initialRotationY?: number;
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

const BLUE = "#078fd6";
const BLUE_DARK = "#0674b5";
const WHITE = "#f8f8f5";
const RED = "#e3232d";
const DARK_RED = "#63080d";
const ORANGE = "#f36f2f";
const GOLD = "#f6c21a";
const GOLD_DARK = "#d99c05";
const BLACK = "#151515";
const BROWN = "#3d261a";
const SEAM = "#55504d";

function Ellipsoid({
  position,
  scale,
  color,
  roughness = 0.44,
  metalness = 0.01,
}: EllipsoidProps) {
  return (
    <mesh position={position} scale={scale} castShadow receiveShadow>
      <sphereGeometry args={[1, 56, 56]} />
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
      <meshStandardMaterial color={BLUE} roughness={0.46} />
    </mesh>
  );
}

function CatEar({ side }: { side: -1 | 1 }) {
  const x = side * 0.88;
  const tilt = side * -0.08;

  return (
    <group position={[x, 2.79, -0.08]} rotation={[0.03, 0, tilt]}>
      <mesh scale={[0.46, 0.68, 0.42]} castShadow>
        <coneGeometry args={[0.66, 1.2, 40]} />
        <meshStandardMaterial color={BLUE} roughness={0.43} />
      </mesh>
      <mesh position={[0, -0.055, 0.24]} scale={[0.27, 0.48, 0.13]} castShadow>
        <coneGeometry args={[0.66, 1.16, 36]} />
        <meshStandardMaterial color={WHITE} roughness={0.5} />
      </mesh>
    </group>
  );
}

function Arms() {
  return (
    <group>
      <CapsuleBetween start={[-0.93, 0.23, -0.03]} end={[-1.25, -0.34, 0.04]} radius={0.24} />
      <Ellipsoid position={[-1.32, -0.48, 0.08]} scale={[0.33, 0.33, 0.33]} color={WHITE} roughness={0.5} />

      <CapsuleBetween start={[0.93, 0.23, -0.03]} end={[1.25, -0.34, 0.04]} radius={0.24} />
      <Ellipsoid position={[1.32, -0.48, 0.08]} scale={[0.33, 0.33, 0.33]} color={WHITE} roughness={0.5} />
    </group>
  );
}

function Whiskers() {
  const lines: Vec3[][] = [
    [[-0.44, 1.72, 1.39], [-1.04, 1.88, 1.34]],
    [[-0.48, 1.56, 1.41], [-1.10, 1.57, 1.36]],
    [[-0.44, 1.40, 1.40], [-1.04, 1.27, 1.35]],
    [[0.44, 1.72, 1.39], [1.04, 1.88, 1.34]],
    [[0.48, 1.56, 1.41], [1.10, 1.57, 1.36]],
    [[0.44, 1.40, 1.40], [1.04, 1.27, 1.35]],
  ];

  return (
    <group>
      {lines.map((points, index) => (
        <Line key={index} points={points} color={BLACK} lineWidth={2.0} />
      ))}
    </group>
  );
}

function Brows() {
  return (
    <group>
      <Line
        points={[
          [-0.53, 2.58, 1.30],
          [-0.43, 2.64, 1.32],
          [-0.31, 2.64, 1.32],
          [-0.22, 2.60, 1.31],
        ]}
        color={BLACK}
        lineWidth={1.65}
      />
      <Line
        points={[
          [0.22, 2.60, 1.31],
          [0.31, 2.64, 1.32],
          [0.43, 2.64, 1.32],
          [0.53, 2.58, 1.30],
        ]}
        color={BLACK}
        lineWidth={1.65}
      />
    </group>
  );
}

function Mouth() {
  const mouthShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.82, 0.25);
    shape.bezierCurveTo(-0.52, 0.16, -0.24, 0.12, 0, 0.13);
    shape.bezierCurveTo(0.24, 0.12, 0.52, 0.16, 0.82, 0.25);
    shape.bezierCurveTo(0.69, -0.22, 0.38, -0.46, 0, -0.49);
    shape.bezierCurveTo(-0.38, -0.46, -0.69, -0.22, -0.82, 0.25);
    return shape;
  }, []);

  return (
    <group position={[0, 1.18, 1.305]}>
      <mesh castShadow>
        <extrudeGeometry
          args={[
            mouthShape,
            {
              depth: 0.028,
              bevelEnabled: true,
              bevelSize: 0.018,
              bevelThickness: 0.012,
              bevelSegments: 4,
              curveSegments: 32,
            },
          ]}
        />
        <meshStandardMaterial color={DARK_RED} roughness={0.6} />
      </mesh>
      <Ellipsoid position={[0, -0.30, 0.042]} scale={[0.48, 0.20, 0.045]} color={ORANGE} roughness={0.48} />
    </group>
  );
}

function Pocket() {
  const pocketShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.54, 0.20);
    shape.lineTo(0.54, 0.20);
    shape.bezierCurveTo(0.51, -0.22, 0.31, -0.43, 0, -0.45);
    shape.bezierCurveTo(-0.31, -0.43, -0.51, -0.22, -0.54, 0.20);
    return shape;
  }, []);

  return (
    <group position={[0, -0.46, 0.815]}>
      <mesh castShadow receiveShadow>
        <extrudeGeometry
          args={[
            pocketShape,
            {
              depth: 0.04,
              bevelEnabled: true,
              bevelSize: 0.018,
              bevelThickness: 0.012,
              bevelSegments: 4,
              curveSegments: 26,
            },
          ]}
        />
        <meshStandardMaterial color={WHITE} roughness={0.52} />
      </mesh>
      <Line points={[[-0.52, 0.195, 0.048], [0.52, 0.195, 0.048]]} color="#d8d8d5" lineWidth={1.5} />
    </group>
  );
}

function Bell() {
  return (
    <group position={[0, 0.47, 1.04]}>
      <Ellipsoid position={[0, 0, 0]} scale={[0.27, 0.25, 0.17]} color={GOLD} metalness={0.34} roughness={0.28} />
      <mesh position={[0, 0.10, 0.135]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.185, 0.028, 12, 48]} />
        <meshStandardMaterial color={GOLD_DARK} metalness={0.28} roughness={0.32} />
      </mesh>
      <Ellipsoid position={[0, -0.055, 0.17]} scale={[0.046, 0.046, 0.026]} color={BLACK} roughness={0.72} />
      <Line points={[[0, -0.09, 0.182], [0, -0.20, 0.182]]} color={BLACK} lineWidth={2.0} />
    </group>
  );
}

function Eyes() {
  return (
    <group>
      <Ellipsoid position={[-0.32, 2.25, 1.20]} scale={[0.39, 0.53, 0.16]} color={WHITE} roughness={0.5} />
      <Ellipsoid position={[0.32, 2.25, 1.20]} scale={[0.39, 0.53, 0.16]} color={WHITE} roughness={0.5} />

      <Ellipsoid position={[-0.17, 2.19, 1.355]} scale={[0.105, 0.145, 0.05]} color={BROWN} roughness={0.3} />
      <Ellipsoid position={[0.17, 2.19, 1.355]} scale={[0.105, 0.145, 0.05]} color={BROWN} roughness={0.3} />
      <Ellipsoid position={[-0.17, 2.21, 1.402]} scale={[0.058, 0.08, 0.027]} color={BLACK} roughness={0.24} />
      <Ellipsoid position={[0.17, 2.21, 1.402]} scale={[0.058, 0.08, 0.027]} color={BLACK} roughness={0.24} />
      <Ellipsoid position={[-0.195, 2.275, 1.43]} scale={[0.023, 0.032, 0.012]} color={WHITE} roughness={0.14} />
      <Ellipsoid position={[0.145, 2.275, 1.43]} scale={[0.023, 0.032, 0.012]} color={WHITE} roughness={0.14} />
    </group>
  );
}

function Face() {
  return (
    <group>
      {/* Deep curved mask instead of a thin white plate; this keeps the side profile natural. */}
      <Ellipsoid position={[0, 1.48, 0.75]} scale={[1.18, 1.02, 0.58]} color={WHITE} roughness={0.52} />

      <Mouth />

      <Ellipsoid position={[-0.48, 1.58, 1.22]} scale={[0.60, 0.25, 0.20]} color={WHITE} roughness={0.51} />
      <Ellipsoid position={[0.48, 1.58, 1.22]} scale={[0.60, 0.25, 0.20]} color={WHITE} roughness={0.51} />

      <Eyes />
      <Brows />

      <Ellipsoid position={[0, 1.93, 1.40]} scale={[0.22, 0.22, 0.20]} color={RED} roughness={0.28} />
      <Ellipsoid position={[-0.06, 2.00, 1.575]} scale={[0.040, 0.040, 0.018]} color="#ffb4b8" roughness={0.16} />
      <Line points={[[0, 1.82, 1.39], [0, 1.50, 1.39]]} color={SEAM} lineWidth={1.3} />

      <Whiskers />
    </group>
  );
}

function Collar() {
  return (
    <mesh position={[0, 0.62, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[1.0, 0.86, 1]} castShadow>
      <torusGeometry args={[0.98, 0.085, 18, 96]} />
      <meshStandardMaterial color={RED} roughness={0.4} />
    </mesh>
  );
}

function BackDetails() {
  return (
    <group>
      <Ellipsoid position={[0, -0.50, -0.78]} scale={[0.25, 0.25, 0.25]} color={WHITE} roughness={0.52} />
      <Line
        points={[
          [0, 2.62, -1.25],
          [0, 2.04, -1.28],
          [0, 1.35, -1.29],
          [0, 0.74, -1.12],
        ]}
        color={BLUE_DARK}
        lineWidth={0.8}
      />
    </group>
  );
}

function DoraemonModel({
  autoRotate = true,
  autoRotateSpeed = 0.14,
  initialRotationY = 0,
}: {
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  initialRotationY?: number;
}) {
  const root = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!root.current) return;
    const t = state.clock.elapsedTime;
    root.current.position.y = Math.sin(t * 1.05) * 0.012;
    if (autoRotate) root.current.rotation.y = initialRotationY + t * autoRotateSpeed;
  });

  return (
    <group ref={root} position={[0, -0.10, 0]} rotation={[0, initialRotationY, 0]}>
      <Arms />

      <Ellipsoid position={[0, -0.27, 0]} scale={[0.98, 1.08, 0.76]} color={BLUE} roughness={0.46} />
      <Ellipsoid position={[-0.44, -1.23, 0.00]} scale={[0.42, 0.38, 0.52]} color={BLUE} roughness={0.46} />
      <Ellipsoid position={[0.44, -1.23, 0.00]} scale={[0.42, 0.38, 0.52]} color={BLUE} roughness={0.46} />

      <Ellipsoid position={[-0.46, -1.51, 0.12]} scale={[0.55, 0.23, 0.58]} color={WHITE} roughness={0.54} />
      <Ellipsoid position={[0.46, -1.51, 0.12]} scale={[0.55, 0.23, 0.58]} color={WHITE} roughness={0.54} />

      <BackDetails />

      <Ellipsoid position={[0, -0.24, 0.68]} scale={[0.70, 0.78, 0.18]} color={WHITE} roughness={0.54} />
      <Pocket />

      <Collar />

      <Ellipsoid position={[0, 1.51, 0]} scale={[1.39, 1.35, 1.27]} color={BLUE} roughness={0.44} />
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
  autoRotateSpeed = 0.14,
  initialRotationY = 0,
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
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.42, 8.35], fov: 35, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.82} />
          <hemisphereLight intensity={0.82} color="#ffffff" groundColor="#8aa1b8" />
          <directionalLight
            position={[4.8, 7.2, 6.4]}
            intensity={2.15}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <directionalLight position={[-4.4, 3.6, 4.0]} intensity={0.62} />
          <pointLight position={[0, 2.2, 6.2]} intensity={0.28} />

          <DoraemonModel
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed}
            initialRotationY={initialRotationY}
          />
          <ContactShadows position={[0, -1.83, 0]} opacity={0.24} scale={5.5} blur={3.1} far={5} />

          {controls && (
            <OrbitControls
              makeDefault
              enablePan={false}
              enableDamping
              dampingFactor={0.08}
              minDistance={6.2}
              maxDistance={10.0}
              minPolarAngle={Math.PI * 0.31}
              maxPolarAngle={Math.PI * 0.70}
              target={[0, 0.42, 0]}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Doraemon3D;
