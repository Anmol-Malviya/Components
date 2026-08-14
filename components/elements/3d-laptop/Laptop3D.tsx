"use client";

import { Suspense, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Float,
  Html,
  OrbitControls,
  RoundedBox,
} from "@react-three/drei";
import type { Group } from "three";

export type Laptop3DProps = {
  accent?: string;
  bodyColor?: string;
  autoRotate?: boolean;
  screenContent?: ReactNode;
  className?: string;
};

type KeySpec = {
  id: string;
  x: number;
  z: number;
  width: number;
};

function MetalMaterial({ color }: { color: string }) {
  return (
    <meshPhysicalMaterial
      color={color}
      metalness={0.82}
      roughness={0.24}
      clearcoat={0.58}
      clearcoatRoughness={0.18}
    />
  );
}

function Keyboard() {
  const keys = useMemo<KeySpec[]>(() => {
    const rows = [
      [0.29, 0.29, 0.29, 0.29, 0.29, 0.29, 0.29, 0.29, 0.29, 0.29, 0.29, 0.29, 0.42],
      [0.44, 0.29, 0.29, 0.29, 0.29, 0.29, 0.29, 0.29, 0.29, 0.29, 0.29, 0.29, 0.49],
      [0.52, 0.29, 0.29, 0.29, 0.29, 0.29, 0.29, 0.29, 0.29, 0.29, 0.29, 0.63],
      [0.65, 0.29, 0.29, 0.29, 0.29, 0.29, 0.29, 0.29, 0.29, 0.29, 0.78],
      [0.4, 0.4, 0.4, 1.72, 0.4, 0.4, 0.4, 0.4],
    ];

    return rows.flatMap((widths, row) => {
      const gap = 0.055;
      const total = widths.reduce((sum, width) => sum + width, 0) + gap * (widths.length - 1);
      let cursor = -total / 2;

      return widths.map((width, key) => {
        const x = cursor + width / 2;
        cursor += width + gap;
        return {
          id: `${row}-${key}`,
          x,
          z: -0.98 + row * 0.32,
          width,
        };
      });
    });
  }, []);

  return (
    <group>
      {keys.map((key) => (
        <RoundedBox
          key={key.id}
          args={[key.width, 0.068, 0.255]}
          radius={0.032}
          smoothness={3}
          position={[key.x, -0.36, key.z]}
          castShadow
        >
          <meshPhysicalMaterial
            color="#111318"
            roughness={0.46}
            metalness={0.18}
            clearcoat={0.26}
          />
        </RoundedBox>
      ))}

      {/* Subtle keyboard backlight */}
      <rectAreaLight
        position={[0, -0.27, -0.36]}
        rotation={[-Math.PI / 2, 0, 0]}
        width={3.9}
        height={1.6}
        color="#4f8cff"
        intensity={0.42}
      />
    </group>
  );
}

function SpeakerGrill({ side }: { side: -1 | 1 }) {
  const holes = useMemo(
    () =>
      Array.from({ length: 48 }, (_, index) => ({
        id: index,
        x: side * (2.28 + (index % 4) * 0.07),
        z: -1.02 + Math.floor(index / 4) * 0.18,
      })),
    [side]
  );

  return (
    <group>
      {holes.map((hole) => (
        <mesh
          key={hole.id}
          position={[hole.x, -0.4, hole.z]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.019, 0.019, 0.014, 10]} />
          <meshStandardMaterial color="#08090c" roughness={0.82} />
        </mesh>
      ))}
    </group>
  );
}

function SidePorts() {
  const leftPorts = [
    { z: -0.72, w: 0.34 },
    { z: -0.12, w: 0.5 },
    { z: 0.61, w: 0.28 },
  ];
  const rightPorts = [
    { z: -0.44, w: 0.34 },
    { z: 0.22, w: 0.34 },
  ];

  return (
    <>
      {leftPorts.map((port) => (
        <RoundedBox
          key={`l-${port.z}`}
          args={[0.025, 0.065, port.w]}
          radius={0.016}
          smoothness={2}
          position={[-2.91, -0.57, port.z]}
        >
          <meshStandardMaterial color="#050609" roughness={0.35} metalness={0.38} />
        </RoundedBox>
      ))}
      {rightPorts.map((port) => (
        <RoundedBox
          key={`r-${port.z}`}
          args={[0.025, 0.065, port.w]}
          radius={0.016}
          smoothness={2}
          position={[2.91, -0.57, port.z]}
        >
          <meshStandardMaterial color="#050609" roughness={0.35} metalness={0.38} />
        </RoundedBox>
      ))}
      <mesh position={[2.92, -0.57, 0.86]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.052, 0.052, 0.022, 18]} />
        <meshStandardMaterial color="#050609" roughness={0.4} />
      </mesh>
    </>
  );
}

function DefaultScreen({ accent }: { accent: string }) {
  return (
    <div
      style={{
        width: 520,
        height: 310,
        position: "relative",
        overflow: "hidden",
        borderRadius: 12,
        color: "white",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        background: "linear-gradient(145deg, #05060a 0%, #0a0915 52%, #05070d 100%)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,.055)",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 220,
          height: 220,
          right: -35,
          top: -80,
          borderRadius: 999,
          background: accent,
          filter: "blur(50px)",
          opacity: 0.48,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 180,
          height: 180,
          left: -55,
          bottom: -90,
          borderRadius: 999,
          background: "#2563eb",
          filter: "blur(52px)",
          opacity: 0.26,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 3,
          height: 40,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          borderBottom: "1px solid rgba(255,255,255,.07)",
          background: "rgba(255,255,255,.012)",
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          {["#ff6b6b", "#ffd166", "#5ee7a0"].map((color) => (
            <span key={color} style={{ width: 7, height: 7, borderRadius: 99, background: color, opacity: 0.78 }} />
          ))}
        </div>
        <span style={{ marginLeft: "auto", fontSize: 7, letterSpacing: ".16em", opacity: 0.44 }}>
          ANMOL / COMPONENT LAB
        </span>
      </div>

      <div style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "112px 1fr", height: 270 }}>
        <aside
          style={{
            padding: "18px 13px",
            borderRight: "1px solid rgba(255,255,255,.06)",
            background: "rgba(255,255,255,.01)",
          }}
        >
          <div style={{ width: 27, height: 27, borderRadius: 9, background: accent, boxShadow: `0 0 24px ${accent}44` }} />
          <div style={{ marginTop: 22, display: "grid", gap: 10 }}>
            {[72, 56, 66, 47].map((width, index) => (
              <span
                key={index}
                style={{ width, height: 6, borderRadius: 99, background: index === 0 ? "rgba(255,255,255,.48)" : "rgba(255,255,255,.11)" }}
              />
            ))}
          </div>
        </aside>

        <main style={{ padding: "24px 25px" }}>
          <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: ".18em", opacity: 0.48 }}>
            INTERACTIVE / THREE.JS
          </div>
          <div style={{ marginTop: 8, fontSize: 39, lineHeight: 0.98, fontWeight: 820, letterSpacing: "-.055em" }}>
            3D Laptop
          </div>
          <div style={{ marginTop: 10, maxWidth: 250, fontSize: 9, lineHeight: 1.55, opacity: 0.5 }}>
            Detailed metallic hardware built entirely with reusable React Three Fiber primitives.
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 10, marginTop: 18 }}>
            <div
              style={{
                height: 64,
                padding: 11,
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: 12,
                background: "rgba(255,255,255,.03)",
              }}
            >
              <span style={{ display: "block", fontSize: 7, opacity: 0.42 }}>RENDER QUALITY</span>
              <strong style={{ display: "block", marginTop: 7, fontSize: 20 }}>Ultra</strong>
            </div>
            <div
              style={{
                height: 64,
                padding: 11,
                border: `1px solid ${accent}55`,
                borderRadius: 12,
                background: `${accent}13`,
              }}
            >
              <span style={{ display: "block", fontSize: 7, opacity: 0.46 }}>STATUS</span>
              <strong style={{ display: "block", marginTop: 7, fontSize: 17 }}>● Live</strong>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function LaptopModel({
  accent,
  bodyColor,
  screenContent,
  autoRotate,
}: {
  accent: string;
  bodyColor: string;
  screenContent?: ReactNode;
  autoRotate: boolean;
}) {
  const model = useRef<Group>(null);

  useFrame((state) => {
    if (!model.current || !autoRotate) return;
    model.current.rotation.y = -0.1 + Math.sin(state.clock.elapsedTime * 0.42) * 0.11;
  });

  return (
    <group ref={model} rotation={[0, -0.1, 0]} position={[0, -0.08, 0]}>
      {/* Main aluminum unibody */}
      <RoundedBox
        args={[5.82, 0.28, 3.72]}
        radius={0.14}
        smoothness={6}
        position={[0, -0.58, 0]}
        castShadow
        receiveShadow
      >
        <MetalMaterial color={bodyColor} />
      </RoundedBox>

      {/* Palm rest highlight plane */}
      <RoundedBox
        args={[5.56, 0.018, 3.43]}
        radius={0.11}
        smoothness={4}
        position={[0, -0.428, 0.04]}
      >
        <meshPhysicalMaterial color="#4b5059" roughness={0.35} metalness={0.66} clearcoat={0.28} />
      </RoundedBox>

      {/* Recessed keyboard well */}
      <RoundedBox
        args={[4.36, 0.026, 2.16]}
        radius={0.065}
        smoothness={4}
        position={[0, -0.408, -0.25]}
        receiveShadow
      >
        <meshStandardMaterial color="#202329" roughness={0.48} metalness={0.36} />
      </RoundedBox>

      <Keyboard />
      <SpeakerGrill side={-1} />
      <SpeakerGrill side={1} />

      {/* Precision trackpad */}
      <RoundedBox
        args={[2.2, 0.018, 0.87]}
        radius={0.065}
        smoothness={4}
        position={[0, -0.405, 1.2]}
        receiveShadow
      >
        <meshPhysicalMaterial color="#5c616a" roughness={0.38} metalness={0.5} clearcoat={0.34} />
      </RoundedBox>
      <RoundedBox
        args={[2.06, 0.004, 0.74]}
        radius={0.05}
        smoothness={3}
        position={[0, -0.393, 1.2]}
      >
        <meshStandardMaterial color="#696e77" roughness={0.5} metalness={0.26} />
      </RoundedBox>

      {/* Front opening notch */}
      <mesh position={[0, -0.455, 1.865]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.05, 32, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#23262c" roughness={0.42} metalness={0.52} />
      </mesh>

      <SidePorts />

      {/* Rubber feet */}
      {[
        [-2.2, -0.735, -1.35],
        [2.2, -0.735, -1.35],
        [-2.2, -0.735, 1.35],
        [2.2, -0.735, 1.35],
      ].map((position, index) => (
        <RoundedBox key={index} args={[0.62, 0.045, 0.11]} radius={0.04} smoothness={3} position={position as [number, number, number]}>
          <meshStandardMaterial color="#090a0c" roughness={0.84} />
        </RoundedBox>
      ))}

      {/* Triple-piece hinge */}
      {[-1.72, 0, 1.72].map((x, index) => (
        <mesh key={x} position={[x, -0.43, -1.79]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[index === 1 ? 0.075 : 0.105, index === 1 ? 0.075 : 0.105, index === 1 ? 0.55 : 0.72, 28]} />
          <meshPhysicalMaterial color="#111318" roughness={0.22} metalness={0.94} clearcoat={0.34} />
        </mesh>
      ))}

      {/* Display assembly */}
      <group position={[0, -0.39, -1.79]} rotation={[-0.13, 0, 0]}>
        <RoundedBox args={[5.42, 3.42, 0.18]} radius={0.15} smoothness={6} position={[0, 1.65, 0]} castShadow>
          <MetalMaterial color={bodyColor} />
        </RoundedBox>

        {/* Rear logo */}
        <mesh position={[0, 1.73, -0.105]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[0.32, 40]} />
          <meshPhysicalMaterial color="#353942" metalness={0.84} roughness={0.27} clearcoat={0.5} />
        </mesh>
        <mesh position={[0, 1.73, -0.112]} rotation={[0, Math.PI, 0]}>
          <ringGeometry args={[0.2, 0.23, 40]} />
          <meshBasicMaterial color={accent} transparent opacity={0.34} />
        </mesh>

        {/* Glass bezel */}
        <RoundedBox args={[5.12, 3.12, 0.045]} radius={0.105} smoothness={5} position={[0, 1.65, 0.115]}>
          <meshPhysicalMaterial
            color="#030407"
            roughness={0.08}
            metalness={0.16}
            clearcoat={1}
            clearcoatRoughness={0.07}
          />
        </RoundedBox>

        {/* Screen UI: centered, scaled to the physical glass and depth-occluded */}
        <Html
          transform
          center
          occlude
          position={[0, 1.62, 0.15]}
          distanceFactor={3.55}
          zIndexRange={[4, 0]}
          style={{ pointerEvents: "none", backfaceVisibility: "hidden" }}
        >
          <div
            style={{
              width: 520,
              height: 310,
              overflow: "hidden",
              borderRadius: 12,
              background: "#05060a",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
          >
            {screenContent ?? <DefaultScreen accent={accent} />}
          </div>
        </Html>

        {/* Camera + microphones */}
        <mesh position={[0, 3.12, 0.15]}>
          <sphereGeometry args={[0.043, 18, 18]} />
          <meshPhysicalMaterial color="#05070b" roughness={0.12} metalness={0.24} clearcoat={1} />
        </mesh>
        <mesh position={[0.1, 3.12, 0.153]}>
          <sphereGeometry args={[0.011, 12, 12]} />
          <meshBasicMaterial color={accent} />
        </mesh>
        {[-0.14, 0.14].map((x) => (
          <mesh key={x} position={[x, 3.12, 0.151]}>
            <sphereGeometry args={[0.011, 12, 12]} />
            <meshStandardMaterial color="#10131a" roughness={0.35} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export function Laptop3D({
  accent = "#8b5cf6",
  bodyColor = "#565b65",
  autoRotate = true,
  screenContent,
  className = "",
}: Laptop3DProps) {
  return (
    <div className={className} style={{ width: "100%", height: "100%", minHeight: 300 }}>
      <Canvas
        dpr={[1, 1.6]}
        shadows
        camera={{ position: [6.55, 3.45, 7.45], fov: 29, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true }}
      >
        <hemisphereLight args={["#eef2ff", "#090a10", 1.55]} />
        <ambientLight intensity={0.38} />
        <directionalLight position={[4.8, 7.2, 5.2]} intensity={3.2} castShadow />
        <spotLight position={[-4.8, 5.8, 4.4]} intensity={30} angle={0.38} penumbra={0.85} color="#ffffff" />
        <pointLight position={[-4.2, 1.7, 3.5]} intensity={13} color={accent} distance={11} />
        <pointLight position={[4, 1.6, -2.3]} intensity={9} color="#4f8cff" distance={10} />

        <Suspense fallback={null}>
          <Float speed={0.9} rotationIntensity={0.018} floatIntensity={0.1} floatingRange={[-0.025, 0.025]}>
            <LaptopModel accent={accent} bodyColor={bodyColor} screenContent={screenContent} autoRotate={autoRotate} />
          </Float>
          <ContactShadows position={[0, -1.01, 0]} opacity={0.64} scale={8.4} blur={2.35} far={5.4} />
        </Suspense>

        <OrbitControls
          makeDefault
          enablePan={false}
          enableDamping
          dampingFactor={0.06}
          minDistance={6.9}
          maxDistance={9.9}
          minPolarAngle={Math.PI / 4.2}
          maxPolarAngle={Math.PI / 2.12}
          minAzimuthAngle={-0.9}
          maxAzimuthAngle={0.9}
          autoRotate={false}
          target={[0, 0.43, -0.22]}
        />
      </Canvas>
    </div>
  );
}

export default Laptop3D;
