"use client";

import { OrbitControls, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const WHITE = "#f7f8fb";
const JOINT = "#101936";
const PANEL = "#05070e";
const ACCENT = "#23376d";

type Side = -1 | 1;

type RobotProps = {
  floating?: boolean;
  floatAmplitude?: number;
  floatSpeed?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

export type FloatingRobot3DProps = RobotProps & {
  controls?: boolean;
  background?: string;
  className?: string;
  minHeight?: number;
};

function ArmorMaterial() {
  return <meshStandardMaterial color={WHITE} roughness={0.2} metalness={0.16} />;
}

function JointMaterial({ color = JOINT }: { color?: string }) {
  return <meshStandardMaterial color={color} roughness={0.26} metalness={0.48} />;
}

function PanelMaterial() {
  return <meshStandardMaterial color={PANEL} roughness={0.12} metalness={0.38} />;
}

function splineProfile(points: Array<[number, number]>, samples = 40) {
  const curve = new THREE.SplineCurve(
    points.map(([radius, y]) => new THREE.Vector2(radius, y)),
  );
  return curve
    .getPoints(samples)
    .map((p) => new THREE.Vector2(Math.max(0, p.x), p.y));
}

function taperedCapsuleProfile(
  height: number,
  topRadius: number,
  bottomRadius: number,
  segments = 28,
) {
  const result: THREE.Vector2[] = [];
  const cap = 0.18;

  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments;
    const y = THREE.MathUtils.lerp(-height / 2, height / 2, t);
    const baseRadius = THREE.MathUtils.lerp(bottomRadius, topRadius, t);
    let capFactor = 1;

    if (t < cap) {
      const u = t / cap;
      capFactor = Math.sqrt(Math.max(0, 1 - (1 - u) * (1 - u)));
    } else if (t > 1 - cap) {
      const u = (1 - t) / cap;
      capFactor = Math.sqrt(Math.max(0, 1 - (1 - u) * (1 - u)));
    }

    result.push(new THREE.Vector2(baseRadius * capFactor, y));
  }

  return result;
}

function LathedArmor({
  profile,
  zScale = 1,
  position = [0, 0, 0],
}: {
  profile: THREE.Vector2[];
  zScale?: number;
  position?: [number, number, number];
}) {
  return (
    <mesh castShadow receiveShadow scale={[1, 1, zScale]} position={position}>
      <latheGeometry args={[profile, 48]} />
      <ArmorMaterial />
    </mesh>
  );
}

function Ring({
  radius,
  height,
  position = [0, 0, 0],
}: {
  radius: number;
  height: number;
  position?: [number, number, number];
}) {
  return (
    <mesh castShadow receiveShadow position={position}>
      <cylinderGeometry args={[radius, radius, height, 40]} />
      <JointMaterial />
    </mesh>
  );
}

function BallJoint({
  radius,
  position = [0, 0, 0],
}: {
  radius: number;
  position?: [number, number, number];
}) {
  return (
    <mesh castShadow receiveShadow position={position}>
      <sphereGeometry args={[radius, 36, 24]} />
      <JointMaterial />
    </mesh>
  );
}

function Head() {
  return (
    <group name="HeadGroup" position={[0, 1.9, 0]}>
      <RoundedBox
        name="HeadShell"
        args={[2.6, 1.8, 1.45]}
        radius={0.48}
        smoothness={8}
        castShadow
        receiveShadow
      >
        <ArmorMaterial />
      </RoundedBox>

      <RoundedBox
        name="FaceInsetRim"
        args={[2.04, 1.32, 0.1]}
        radius={0.37}
        smoothness={8}
        position={[0, 0, 0.704]}
        castShadow
      >
        <JointMaterial color={ACCENT} />
      </RoundedBox>
      <RoundedBox
        name="FaceInset"
        args={[1.92, 1.2, 0.105]}
        radius={0.33}
        smoothness={8}
        position={[0, 0, 0.735]}
        castShadow
      >
        <PanelMaterial />
      </RoundedBox>

      {([-1, 1] as Side[]).map((side) => (
        <group key={side} name={side < 0 ? "LeftSideModule" : "RightSideModule"}>
          <mesh position={[side * 1.34, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.27, 0.27, 0.16, 36]} />
            <JointMaterial color={ACCENT} />
          </mesh>
          <mesh position={[side * 1.45, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.37, 0.37, 0.18, 40]} />
            <ArmorMaterial />
          </mesh>
          <mesh position={[side * 1.55, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.29, 0.29, 0.05, 36]} />
            <JointMaterial color={ACCENT} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Neck() {
  return (
    <group name="NeckGroup" position={[0, 0.98, 0]}>
      <Ring radius={0.36} height={0.08} position={[0, 0.13, 0]} />
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.29, 0.31, 0.24, 40]} />
        <JointMaterial />
      </mesh>
      <Ring radius={0.44} height={0.1} position={[0, -0.14, 0]} />
    </group>
  );
}

function Torso() {
  const profile = useMemo(
    () =>
      splineProfile([
        [0, -0.825],
        [0.7, -0.78],
        [0.83, -0.53],
        [0.92, -0.15],
        [1, 0.32],
        [0.98, 0.58],
        [0.84, 0.78],
        [0, 0.825],
      ]),
    [],
  );

  return (
    <group name="TorsoGroup" position={[0, 0.1, 0]}>
      <LathedArmor profile={profile} zScale={0.59} />
      <RoundedBox
        name="ChestPanelRim"
        args={[1.2, 1.08, 0.12]}
        radius={0.3}
        smoothness={7}
        position={[0, 0.04, 0.565]}
        castShadow
      >
        <JointMaterial color={ACCENT} />
      </RoundedBox>
      <RoundedBox
        name="ChestPanel"
        args={[1.08, 0.96, 0.13]}
        radius={0.26}
        smoothness={7}
        position={[0, 0.04, 0.615]}
        castShadow
      >
        <PanelMaterial />
      </RoundedBox>
    </group>
  );
}

function Finger({
  name,
  x,
  length = 0.27,
  curl = 0,
}: {
  name: string;
  x: number;
  length?: number;
  curl?: number;
}) {
  const segmentLength = length / 2;
  const radius = 0.055;
  const bodyLength = Math.max(0.035, segmentLength - radius * 2);

  return (
    <group name={name} position={[x, -0.37, 0]} rotation={[curl * 0.35, 0, 0]}>
      <group name={`${name}_segment_1`}>
        <mesh castShadow position={[0, -segmentLength * 0.45, 0]}>
          <capsuleGeometry args={[radius, bodyLength, 8, 18]} />
          <ArmorMaterial />
        </mesh>
      </group>
      <group
        name={`${name}_segment_2`}
        position={[0, -segmentLength * 0.92, 0]}
        rotation={[curl, 0, 0]}
      >
        <mesh castShadow position={[0, -segmentLength * 0.45, 0]}>
          <capsuleGeometry args={[radius * 0.92, bodyLength, 8, 18]} />
          <ArmorMaterial />
        </mesh>
      </group>
    </group>
  );
}

function RobotHand({ side, open = false }: { side: Side; open?: boolean }) {
  const curl = open ? 0.04 : 0.35;
  const thumbSign = -side;

  return (
    <group name="Hand">
      <RoundedBox
        name="Palm"
        args={[0.48, 0.44, 0.2]}
        radius={0.12}
        smoothness={6}
        position={[0, -0.18, 0]}
        castShadow
      >
        <ArmorMaterial />
      </RoundedBox>
      <Finger name="IndexFinger" x={-0.17} length={0.28} curl={curl} />
      <Finger name="MiddleFinger" x={-0.055} length={0.31} curl={curl * 0.8} />
      <Finger name="RingFinger" x={0.06} length={0.29} curl={curl} />
      <Finger name="PinkyFinger" x={0.17} length={0.24} curl={curl * 1.1} />

      <group name="Thumb" position={[thumbSign * 0.27, -0.12, 0]} rotation={[0, 0, thumbSign * 0.78]}>
        <mesh castShadow position={[0, -0.08, 0]}>
          <capsuleGeometry args={[0.07, 0.08, 8, 18]} />
          <ArmorMaterial />
        </mesh>
        <group name="ThumbTip" position={[0, -0.17, 0]} rotation={[0, 0, thumbSign * 0.22]}>
          <mesh castShadow position={[0, -0.07, 0]}>
            <capsuleGeometry args={[0.062, 0.065, 8, 18]} />
            <ArmorMaterial />
          </mesh>
        </group>
      </group>
    </group>
  );
}

function Arm({ side, waving = false }: { side: Side; waving?: boolean }) {
  const upper = useMemo(() => taperedCapsuleProfile(0.8, 0.34, 0.29), []);
  const forearm = useMemo(() => taperedCapsuleProfile(0.86, 0.32, 0.27), []);
  const shoulderZ = waving ? side * 0.18 : side * -0.05;
  const elbowZ = waving ? side * 2.08 : side * 0.1;

  return (
    <group
      name={side < 0 ? "LeftArm" : "RightArm"}
      position={[side * 1.12, 0.54, 0]}
      rotation={[waving ? -0.08 : 0.03, 0, shoulderZ]}
    >
      <mesh name="ShoulderSocket" position={[-side * 0.13, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.34, 0.34, 0.2, 40]} />
        <JointMaterial color={ACCENT} />
      </mesh>
      <BallJoint radius={0.3} />
      <Ring radius={0.29} height={0.075} position={[0, -0.31, 0]} />
      <LathedArmor profile={upper} zScale={0.92} position={[0, -0.69, 0]} />

      <group name="ElbowJoint" position={[0, -1.1, 0]} rotation={[waving ? -0.05 : 0.06, 0, elbowZ]}>
        <Ring radius={0.245} height={0.07} position={[0, 0.1, 0]} />
        <BallJoint radius={0.235} />
        <Ring radius={0.245} height={0.07} position={[0, -0.1, 0]} />
        <LathedArmor profile={forearm} zScale={0.94} position={[0, -0.54, 0]} />

        <group name="WristJoint" position={[0, -1.02, 0]}>
          <Ring radius={0.205} height={0.08} />
          <BallJoint radius={0.18} position={[0, -0.09, 0]} />
          <group position={[0, -0.19, 0]} rotation={waving ? [0.08, 0, side * -0.12] : [0.02, 0, 0]}>
            <RobotHand side={side} open={waving} />
          </group>
        </group>
      </group>
    </group>
  );
}

function Waist() {
  return (
    <group name="WaistGroup" position={[0, -0.73, 0]}>
      <Ring radius={0.5} height={0.095} position={[0, 0.1, 0]} />
      <mesh castShadow>
        <cylinderGeometry args={[0.41, 0.44, 0.2, 40]} />
        <JointMaterial />
      </mesh>
      <Ring radius={0.46} height={0.085} position={[0, -0.12, 0]} />
    </group>
  );
}

function Pelvis() {
  const profile = useMemo(
    () =>
      splineProfile([
        [0, -0.31],
        [0.46, -0.27],
        [0.65, -0.07],
        [0.71, 0.15],
        [0.61, 0.3],
        [0, 0.34],
      ]),
    [],
  );

  return (
    <group name="PelvisGroup" position={[0, -0.96, 0]}>
      <LathedArmor profile={profile} zScale={0.7} />
      <Ring radius={0.46} height={0.07} position={[0, 0.32, 0]} />
    </group>
  );
}

function Leg({ side }: { side: Side }) {
  const thigh = useMemo(() => taperedCapsuleProfile(0.76, 0.33, 0.29), []);
  const shin = useMemo(
    () =>
      splineProfile([
        [0, -0.41],
        [0.25, -0.38],
        [0.29, -0.18],
        [0.31, 0.1],
        [0.28, 0.36],
        [0, 0.41],
      ]),
    [],
  );

  return (
    <group name={side < 0 ? "LeftLeg" : "RightLeg"} position={[side * 0.43, -1.1, 0]} rotation={[0, 0, side * 0.025]}>
      <mesh name="HipSocket" position={[-side * 0.13, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.18, 36]} />
        <JointMaterial color={ACCENT} />
      </mesh>
      <BallJoint radius={0.3} />
      <Ring radius={0.285} height={0.07} position={[0, -0.29, 0]} />
      <LathedArmor profile={thigh} zScale={0.94} position={[0, -0.48, 0]} />

      <group name="KneeJoint" position={[0, -0.86, 0]} rotation={[0.07, 0, 0]}>
        <Ring radius={0.255} height={0.065} position={[0, 0.1, 0]} />
        <BallJoint radius={0.25} />
        <Ring radius={0.255} height={0.065} position={[0, -0.1, 0]} />
        <LathedArmor profile={shin} zScale={0.86} position={[0, -0.5, 0]} />

        <group name="AnkleJoint" position={[0, -0.94, 0]}>
          <Ring radius={0.205} height={0.075} />
          <BallJoint radius={0.18} position={[0, -0.08, 0]} />
          <RoundedBox
            name="Foot"
            args={[0.6, 0.34, 0.75]}
            radius={0.17}
            smoothness={7}
            position={[0, -0.23, 0.16]}
            rotation={[0, side * 0.035, 0]}
            castShadow
          >
            <ArmorMaterial />
          </RoundedBox>
          <RoundedBox
            name="Sole"
            args={[0.56, 0.08, 0.7]}
            radius={0.04}
            smoothness={4}
            position={[0, -0.39, 0.16]}
            rotation={[0, side * 0.035, 0]}
          >
            <JointMaterial color={ACCENT} />
          </RoundedBox>
        </group>
      </group>
    </group>
  );
}

export function FloatingRobot({
  floating = true,
  floatAmplitude = 0.055,
  floatSpeed = 1.35,
  autoRotate = false,
  autoRotateSpeed = 0.22,
}: RobotProps) {
  const root = useRef<THREE.Group>(null);
  const floatingGroup = useRef<THREE.Group>(null);

  useFrame(({ clock }, delta) => {
    if (floating && floatingGroup.current) {
      floatingGroup.current.position.y =
        Math.sin(clock.elapsedTime * floatSpeed) * floatAmplitude;
    }
    if (autoRotate && root.current) {
      root.current.rotation.y += delta * autoRotateSpeed;
    }
  });

  return (
    <group ref={root} name="RobotRoot">
      <group ref={floatingGroup}>
        <Head />
        <Neck />
        <Torso />
        <Arm side={-1} />
        <Arm side={1} waving />
        <Waist />
        <Pelvis />
        <Leg side={-1} />
        <Leg side={1} />
      </group>
    </group>
  );
}

export function FloatingRobot3D({
  floating = true,
  floatAmplitude = 0.055,
  floatSpeed = 1.35,
  autoRotate = false,
  autoRotateSpeed = 0.22,
  controls = true,
  background = "transparent",
  className = "",
  minHeight = 520,
}: FloatingRobot3DProps) {
  return (
    <div className={className} style={{ width: "100%", minHeight, height: "100%", background }}>
      <Canvas
        camera={{ position: [0, 0.05, 9.1], fov: 34 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.35} />
        <directionalLight position={[4, 6, 5]} intensity={2.4} />
        <directionalLight position={[-4, 2, 3]} intensity={1.05} />
        <directionalLight position={[0, -2, -4]} intensity={0.55} />

        <FloatingRobot
          floating={floating}
          floatAmplitude={floatAmplitude}
          floatSpeed={floatSpeed}
          autoRotate={autoRotate}
          autoRotateSpeed={autoRotateSpeed}
        />

        {controls ? (
          <OrbitControls
            makeDefault
            enablePan={false}
            minDistance={6.9}
            maxDistance={12}
            target={[0, -0.15, 0]}
          />
        ) : null}
      </Canvas>
    </div>
  );
}
