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

const BLUE = "#0b91d8";
const BLUE_DARK = "#0876b8";
const WHITE = "#faf9f5";
const RED = "#e5232d";
const DARK_RED = "#65090f";
const ORANGE = "#f37235";
const GOLD = "#f6c21c";
const GOLD_DARK = "#d99b05";
const BLACK = "#151515";
const BROWN = "#3e281d";
const SEAM = "#56514e";

function Ellipsoid({
  position,
  scale,
  color,
  roughness = 0.48,
  metalness = 0.01,
}: EllipsoidProps) {
  return (
    <mesh position={position} scale={scale} castShadow receiveShadow>
      <sphereGeometry args={[1, 56, 56]} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
    </mesh>
  );
}

function CapsuleBetween({ start, end, radius = 0.22 }: { start: Vec3; end: Vec3; radius?: number }) {
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
      <capsuleGeometry args={[radius, Math.max(0.14, transform.length - radius * 2), 12, 28]} />
      <meshStandardMaterial color={BLUE} roughness={0.5} />
    </mesh>
  );
}

function CatEar({ side }: { side: -1 | 1 }) {
  const x = side * 0.79;
  const tilt = side * -0.10;

  return (
    <group position={[x, 2.55, -0.04]} rotation={[0.05, 0, tilt]}>
      <mesh scale={[0.38, 0.57, 0.34]} castShadow>
        <coneGeometry args={[0.66, 1.12, 48]} />
        <meshStandardMaterial color={BLUE} roughness={0.48} />
      </mesh>
      <mesh position={[0, -0.045, 0.20]} scale={[0.22, 0.38, 0.10]} castShadow>
        <coneGeometry args={[0.66, 1.06, 44]} />
        <meshStandardMaterial color={WHITE} roughness={0.54} />
      </mesh>
    </group>
  );
}

function Arms() {
  return (
    <group>
      <CapsuleBetween start={[-0.86, 0.18, -0.02]} end={[-1.11, -0.33, 0.03]} radius={0.21} />
      <Ellipsoid position={[-1.18, -0.46, 0.07]} scale={[0.30, 0.30, 0.30]} color={WHITE} roughness={0.54} />

      <CapsuleBetween start={[0.86, 0.18, -0.02]} end={[1.11, -0.33, 0.03]} radius={0.21} />
      <Ellipsoid position={[1.18, -0.46, 0.07]} scale={[0.30, 0.30, 0.30]} color={WHITE} roughness={0.54} />
    </group>
  );
}

function Whiskers() {
  const lines: Vec3[][] = [
    [[-0.40, 1.60, 1.28], [-0.94, 1.75, 1.25]],
    [[-0.43, 1.46, 1.30], [-0.99, 1.47, 1.27]],
    [[-0.40, 1.32, 1.29], [-0.94, 1.20, 1.25]],
    [[0.40, 1.60, 1.28], [0.94, 1.75, 1.25]],
    [[0.43, 1.46, 1.30], [0.99, 1.47, 1.27]],
    [[0.40, 1.32, 1.29], [0.94, 1.20, 1.25]],
  ];

  return (
    <group>
      {lines.map((points, index) => (
        <Line key={index} points={points} color={BLACK} lineWidth={1.8} />
      ))}
    </group>
  );
}

function Brows() {
  return (
    <group>
      <Line
        points={[
          [-0.49, 2.34, 1.20],
          [-0.39, 2.39, 1.22],
          [-0.29, 2.39, 1.22],
          [-0.21, 2.35, 1.21],
        ]}
        color={BLACK}
        lineWidth={1.5}
      />
      <Line
        points={[
          [0.21, 2.35, 1.21],
          [0.29, 2.39, 1.22],
          [0.39, 2.39, 1.22],
          [0.49, 2.34, 1.20],
        ]}
        color={BLACK}
        lineWidth={1.5}
      />
    </group>
  );
}

function Mouth() {
  const mouthShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.73, 0.22);
    shape.bezierCurveTo(-0.47, 0.14, -0.22, 0.11, 0, 0.12);
    shape.bezierCurveTo(0.22, 0.11, 0.47, 0.14, 0.73, 0.22);
    shape.bezierCurveTo(0.61, -0.20, 0.33, -0.41, 0, -0.43);
    shape.bezierCurveTo(-0.33, -0.41, -0.61, -0.20, -0.73, 0.22);
    return shape;
  }, []);

  return (
    <group position={[0, 1.08, 1.235]}>
      <mesh castShadow>
        <extrudeGeometry
          args={[
            mouthShape,
            {
              depth: 0.022,
              bevelEnabled: true,
              bevelSize: 0.014,
              bevelThickness: 0.010,
              bevelSegments: 4,
              curveSegments: 30,
            },
          ]}
        />
        <meshStandardMaterial color={DARK_RED} roughness={0.62} />
      </mesh>
      <Ellipsoid position={[0, -0.265, 0.034]} scale={[0.43, 0.17, 0.038]} color={ORANGE} roughness={0.5} />
    </group>
  );
}

function Pocket() {
  const pocketShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.49, 0.18);
    shape.lineTo(0.49, 0.18);
    shape.bezierCurveTo(0.47, -0.19, 0.29, -0.38, 0, -0.40);
    shape.bezierCurveTo(-0.29, -0.38, -0.47, -0.19, -0.49, 0.18);
    return shape;
  }, []);

  return (
    <group position={[0, -0.43, 0.75]}>
      <mesh castShadow receiveShadow>
        <extrudeGeometry
          args={[
            pocketShape,
            {
              depth: 0.034,
              bevelEnabled: true,
              bevelSize: 0.015,
              bevelThickness: 0.010,
              bevelSegments: 4,
              curveSegments: 24,
            },
          ]}
        />
        <meshStandardMaterial color={WHITE} roughness={0.56} />
      </mesh>
      <Line points={[[-0.47, 0.176, 0.041], [0.47, 0.176, 0.041]]} color="#d7d7d4" lineWidth={1.4} />
    </group>
  );
}

function Bell() {
  return (
    <group position={[0, 0.44, 0.98]}>
      <Ellipsoid position={[0, 0, 0]} scale={[0.24, 0.22, 0.15]} color={GOLD} metalness={0.30} roughness={0.32} />
      <mesh position={[0, 0.085, 0.12]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.165, 0.025, 12, 44]} />
        <meshStandardMaterial color={GOLD_DARK} metalness={0.24} roughness={0.34} />
      </mesh>
      <Ellipsoid position={[0, -0.050, 0.15]} scale={[0.040, 0.040, 0.023]} color={BLACK} roughness={0.74} />
      <Line points={[[0, -0.08, 0.16], [0, -0.18, 0.16]]} color={BLACK} lineWidth={1.8} />
    </group>
  );
}

function Eyes() {
  return (
    <group>
      <Ellipsoid position={[-0.29, 2.06, 1.12]} scale={[0.35, 0.47, 0.14]} color={WHITE} roughness={0.54} />
      <Ellipsoid position={[0.29, 2.06, 1.12]} scale={[0.35, 0.47, 0.14]} color={WHITE} roughness={0.54} />

      <Ellipsoid position={[-0.15, 2.01, 1.255]} scale={[0.092, 0.125, 0.043]} color={BROWN} roughness={0.34} />
      <Ellipsoid position={[0.15, 2.01, 1.255]} scale={[0.092, 0.125, 0.043]} color={BROWN} roughness={0.34} />
      <Ellipsoid position={[-0.15, 2.025, 1.296]} scale={[0.052, 0.070, 0.024]} color={BLACK} roughness={0.28} />
      <Ellipsoid position={[0.15, 2.025, 1.296]} scale={[0.052, 0.070, 0.024]} color={BLACK} roughness={0.28} />
      <Ellipsoid position={[-0.172, 2.08, 1.318]} scale={[0.020, 0.028, 0.010]} color={WHITE} roughness={0.16} />
      <Ellipsoid position={[0.128, 2.08, 1.318]} scale={[0.020, 0.028, 0.010]} color={WHITE} roughness={0.16} />
    </group>
  );
}

function Face() {
  return (
    <group>
      {/* Embedded curved muzzle: most of the volume sits inside the blue head so side views stay clean. */}
      <Ellipsoid position={[0, 1.36, 0.86]} scale={[1.01, 0.86, 0.43]} color={WHITE} roughness={0.55} />

      <Mouth />

      <Ellipsoid position={[-0.43, 1.46, 1.16]} scale={[0.52, 0.22, 0.16]} color={WHITE} roughness={0.54} />
      <Ellipsoid position={[0.43, 1.46, 1.16]} scale={[0.52, 0.22, 0.16]} color={WHITE} roughness={0.54} />

      <Eyes />
      <Brows />

      <Ellipsoid position={[0, 1.78, 1.31]} scale={[0.20, 0.20, 0.18]} color={RED} roughness={0.31} />
      <Ellipsoid position={[-0.055, 1.845, 1.465]} scale={[0.034, 0.034, 0.015]} color="#ffb6ba" roughness={0.18} />
      <Line points={[[0, 1.68, 1.31], [0, 1.40, 1.31]]} color={SEAM} lineWidth={1.2} />

      <Whiskers />
    </group>
  );
}

function Collar() {
  return (
    <mesh position={[0, 0.57, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[1.0, 0.84, 1]} castShadow>
      <torusGeometry args={[0.90, 0.075, 18, 96]} />
      <meshStandardMaterial color={RED} roughness={0.43} />
    </mesh>
  );
}

function BackDetails() {
  return (
    <group>
      <Ellipsoid position={[0, -0.47, -0.73]} scale={[0.22, 0.22, 0.22]} color={WHITE} roughness={0.56} />
      <Line
        points={[
          [0, 2.39, -1.13],
          [0, 1.92, -1.16],
          [0, 1.30, -1.16],
          [0, 0.70, -1.02],
        ]}
        color={BLUE_DARK}
        lineWidth={0.7}
      />
    </group>
  );
}

function DoraemonModel({
  autoRotate = true,
  autoRotateSpeed = 0.12,
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
    root.current.position.y = Math.sin(t * 1.0) * 0.009;
    if (autoRotate) root.current.rotation.y = initialRotationY + t * autoRotateSpeed;
  });

  return (
    <group ref={root} position={[0, -0.07, 0]} rotation={[0, initialRotationY, 0]}>
      <Arms />

      <Ellipsoid position={[0, -0.26, 0]} scale={[0.90, 1.00, 0.72]} color={BLUE} roughness={0.5} />
      <Ellipsoid position={[-0.40, -1.14, 0.00]} scale={[0.38, 0.34, 0.47]} color={BLUE} roughness={0.5} />
      <Ellipsoid position={[0.40, -1.14, 0.00]} scale={[0.38, 0.34, 0.47]} color={BLUE} roughness={0.5} />

      <Ellipsoid position={[-0.42, -1.39, 0.11]} scale={[0.50, 0.21, 0.53]} color={WHITE} roughness={0.57} />
      <Ellipsoid position={[0.42, -1.39, 0.11]} scale={[0.50, 0.21, 0.53]} color={WHITE} roughness={0.57} />

      <BackDetails />

      <Ellipsoid position={[0, -0.22, 0.63]} scale={[0.64, 0.71, 0.16]} color={WHITE} roughness={0.57} />
      <Pocket />

      <Collar />

      <Ellipsoid position={[0, 1.39, 0]} scale={[1.27, 1.22, 1.17]} color={BLUE} roughness={0.49} />
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
  autoRotateSpeed = 0.12,
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
        dpr={[1, 1.6]}
        camera={{ position: [0, 0.35, 8.9], fov: 28, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.92} />
          <hemisphereLight intensity={0.88} color="#ffffff" groundColor="#91a7bc" />
          <directionalLight
            position={[4.6, 7.0, 6.2]}
            intensity={1.85}
            castShadow
            shadow-mapSize-width={1536}
            shadow-mapSize-height={1536}
          />
          <directionalLight position={[-4.0, 3.4, 4.2]} intensity={0.55} />
          <pointLight position={[0, 2.0, 6.5]} intensity={0.22} />

          <DoraemonModel
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed}
            initialRotationY={initialRotationY}
          />
          <ContactShadows position={[0, -1.66, 0]} opacity={0.22} scale={5.0} blur={3.2} far={5} />

          {controls && (
            <OrbitControls
              makeDefault
              enablePan={false}
              enableDamping
              dampingFactor={0.075}
              minDistance={7.0}
              maxDistance={10.5}
              minPolarAngle={Math.PI * 0.33}
              maxPolarAngle={Math.PI * 0.67}
              target={[0, 0.30, 0]}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Doraemon3D;
