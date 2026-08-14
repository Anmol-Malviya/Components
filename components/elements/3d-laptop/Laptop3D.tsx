"use client";

import { Suspense, useMemo, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Float,
  Html,
  OrbitControls,
  RoundedBox,
} from "@react-three/drei";

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
      metalness={0.78}
      roughness={0.26}
      clearcoat={0.55}
      clearcoatRoughness={0.2}
    />
  );
}

function Keyboard() {
  const keys = useMemo<KeySpec[]>(() => {
    const rows = [
      [0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.42],
      [0.45, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.5],
      [0.53, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.64],
      [0.66, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.79],
      [0.42, 0.42, 0.42, 1.78, 0.42, 0.42, 0.42, 0.42],
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
          z: -0.98 + row * 0.33,
          width,
        };
      });
    });
  }, []);

  return (
    <group position={[0, 0.02, 0]}>
      {keys.map((key) => (
        <RoundedBox
          key={key.id}
          args={[key.width, 0.075, 0.27]}
          radius={0.035}
          smoothness={3}
          position={[key.x, -0.345, key.z]}
          castShadow
        >
          <meshPhysicalMaterial
            color="#14161a"
            roughness={0.48}
            metalness={0.16}
            clearcoat={0.22}
          />
        </RoundedBox>
      ))}
    </group>
  );
}

function SpeakerGrill({ side }: { side: -1 | 1 }) {
  const holes = useMemo(
    () =>
      Array.from({ length: 36 }, (_, index) => ({
        id: index,
        x: side * (2.29 + (index % 3) * 0.075),
        z: -1.02 + Math.floor(index / 3) * 0.19,
      })),
    [side]
  );

  return (
    <group>
      {holes.map((hole) => (
        <mesh
          key={hole.id}
          position={[hole.x, -0.322, hole.z]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.023, 0.023, 0.018, 10]} />
          <meshStandardMaterial color="#0b0c0f" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function SidePorts() {
  const leftPorts = [
    { z: -0.65, w: 0.34 },
    { z: -0.08, w: 0.5 },
    { z: 0.62, w: 0.27 },
  ];
  const rightPorts = [
    { z: -0.42, w: 0.34 },
    { z: 0.23, w: 0.34 },
  ];

  return (
    <>
      {leftPorts.map((port) => (
        <RoundedBox
          key={`l-${port.z}`}
          args={[0.025, 0.07, port.w]}
          radius={0.018}
          smoothness={2}
          position={[-2.91, -0.57, port.z]}
        >
          <meshStandardMaterial color="#06070a" roughness={0.4} metalness={0.3} />
        </RoundedBox>
      ))}
      {rightPorts.map((port) => (
        <RoundedBox
          key={`r-${port.z}`}
          args={[0.025, 0.07, port.w]}
          radius={0.018}
          smoothness={2}
          position={[2.91, -0.57, port.z]}
        >
          <meshStandardMaterial color="#06070a" roughness={0.4} metalness={0.3} />
        </RoundedBox>
      ))}
      <mesh position={[2.92, -0.57, 0.86]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.055, 0.055, 0.022, 18]} />
        <meshStandardMaterial color="#06070a" roughness={0.45} />
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
        borderRadius: 13,
        color: "white",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        background: "linear-gradient(145deg, #05060a 0%, #090814 52%, #05070d 100%)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,.05)",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 250,
          height: 250,
          right: -45,
          top: -90,
          borderRadius: 999,
          background: accent,
          filter: "blur(54px)",
          opacity: 0.62,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 220,
          height: 220,
          left: -75,
          bottom: -110,
          borderRadius: 999,
          background: "#2563eb",
          filter: "blur(58px)",
          opacity: 0.34,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 3,
          height: 42,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          borderBottom: "1px solid rgba(255,255,255,.07)",
          background: "rgba(255,255,255,.015)",
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          {["#ff6b6b", "#ffd166", "#5ee7a0"].map((color) => (
            <span key={color} style={{ width: 7, height: 7, borderRadius: 99, background: color, opacity: 0.8 }} />
          ))}
        </div>
        <span style={{ marginLeft: "auto", fontSize: 7, letterSpacing: ".16em", opacity: 0.46 }}>
          ANMOL / COMPONENT LAB
        </span>
      </div>

      <div style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "118px 1fr", height: 268 }}>
        <aside
          style={{
            padding: "18px 13px",
            borderRight: "1px solid rgba(255,255,255,.06)",
            background: "rgba(255,255,255,.012)",
          }}
        >
          <div style={{ width: 28, height: 28, borderRadius: 9, background: accent, boxShadow: `0 0 28px ${accent}55` }} />
          <div style={{ marginTop: 22, display: "grid", gap: 10 }}>
            {[74, 58, 68, 49].map((width, index) => (
              <span
                key={index}
                style={{ width, height: 6, borderRadius: 99, background: index === 0 ? "rgba(255,255,255,.5)" : "rgba(255,255,255,.12)" }}
              />
            ))}
          </div>
        </aside>

        <main style={{ padding: "25px 26px" }}>
          <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: ".18em", opacity: 0.48 }}>
            INTERACTIVE / THREE.JS
          </div>
          <div style={{ marginTop: 8, fontSize: 40, lineHeight: 0.98, fontWeight: 820, letterSpacing: "-.055em" }}>
            3D Laptop
          </div>
          <div style={{ marginTop: 10, maxWidth: 250, fontSize: 9, lineHeight: 1.55, opacity: 0.5 }}>
            Detailed metallic hardware built entirely with reusable React Three Fiber primitives.
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 10, marginTop: 20 }}>
            <div
              style={{
                height: 66,
                padding: 11,
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: 12,
                background: "rgba(255,255,255,.035)",
              }}
            >
              <span style={{ display: "block", fontSize: 7, opacity: 0.42 }}>RENDER QUALITY</span>
              <strong style={{ display: "block", marginTop: 7, fontSize: 20 }}>Ultra</strong>
            </div>
            <div
              style={{
                height: 66,
                padding: 11,
                border: `1px solid ${accent}55`,
                borderRadius: 12,
                background: `${accent}16`,
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
}: {
  accent: string;
  bodyColor: string;
  screenContent?: ReactNode;
}) {
  return (
    <group rotation={[0, -0.18, 0]} position={[0, -0.08, 0]}>
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

      {/* Dark keyboard well */}
      <RoundedBox
        args={[4.52, 0.035, 2.28]}
        radius={0.07}
        smoothness={4}
        position={[0, -0.415, -0.25]}
        receiveShadow
      >
        <meshStandardMaterial color="#25282e" roughness={0.42} metalness={0.45} />
      </RoundedBox>

      <Keyboard />
      <SpeakerGrill side={-1} />
      <SpeakerGrill side={1} />

      {/* Precision trackpad */}
      <RoundedBox
        args={[2.28, 0.022, 0.92]}
        radius={0.07}
        smoothness={4}
        position={[0, -0.42, 1.18]}
        receiveShadow
      >
        <meshPhysicalMaterial color="#484c55" roughness={0.33} metalness={0.58} clearcoat={0.35} />
      </RoundedBox>
      <RoundedBox
        args={[2.13, 0.006, 0.78]}
        radius={0.055}
        smoothness={3}
        position={[0, -0.405, 1.18]}
      >
        <meshStandardMaterial color="#565b64" roughness={0.46} metalness={0.34} />
      </RoundedBox>

      {/* Front opening notch */}
      <mesh position={[0, -0.455, 1.865]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.31, 0.31, 0.055, 32, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#1e2025" roughness={0.4} metalness={0.55} />
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
          <meshStandardMaterial color="#090a0c" roughness={0.82} />
        </RoundedBox>
      ))}

      {/* Triple-piece hinge */}
      {[-1.72, 0, 1.72].map((x, index) => (
        <mesh key={x} position={[x, -0.43, -1.79]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[index === 1 ? 0.075 : 0.105, index === 1 ? 0.075 : 0.105, index === 1 ? 0.55 : 0.72, 28]} />
          <meshPhysicalMaterial color="#111318" roughness={0.24} metalness={0.92} clearcoat={0.3} />
        </mesh>
      ))}

      {/* Display assembly pivots from the hinge */}
      <group position={[0, -0.39, -1.79]} rotation={[-0.13, 0, 0]}>
        <RoundedBox args={[5.42, 3.42, 0.18]} radius={0.15} smoothness={6} position={[0, 1.65, 0]} castShadow>
          <MetalMaterial color={bodyColor} />
        </RoundedBox>

        {/* Rear inset logo visible during rotation */}
        <mesh position={[0, 1.73, -0.105]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[0.34, 40]} />
          <meshPhysicalMaterial color="#383c44" metalness={0.82} roughness={0.28} clearcoat={0.5} />
        </mesh>
        <mesh position={[0, 1.73, -0.112]} rotation={[0, Math.PI, 0]}>
          <ringGeometry args={[0.21, 0.235, 40]} />
          <meshBasicMaterial color={accent} transparent opacity={0.45} />
        </mesh>

        {/* Glass / bezel */}
        <RoundedBox args={[5.12, 3.12, 0.045]} radius={0.105} smoothness={5} position={[0, 1.65, 0.115]}>
          <meshPhysicalMaterial
            color="#030407"
            roughness={0.08}
            metalness={0.18}
            clearcoat={1}
            clearcoatRoughness={0.08}
          />
        </RoundedBox>

        {/* Full-size HTML display — fixed from the previous tiny render */}
        <Html
          transform
          occlude="blending"
          position={[0, 1.62, 0.148]}
          distanceFactor={7.2}
          style={{ pointerEvents: "none" }}
        >
          <div style={{ width: 520, height: 310, overflow: "hidden", borderRadius: 13, background: "#05060a" }}>
            {screenContent ?? <DefaultScreen accent={accent} />}
          </div>
        </Html>

        {/* Camera + microphone array */}
        <mesh position={[0, 3.12, 0.15]}>
          <sphereGeometry args={[0.045, 18, 18]} />
          <meshPhysicalMaterial color="#06080d" roughness={0.12} metalness={0.25} clearcoat={1} />
        </mesh>
        <mesh position={[0.11, 3.12, 0.153]}>
          <sphereGeometry args={[0.012, 12, 12]} />
          <meshBasicMaterial color={accent} />
        </mesh>
        {[-0.14, 0.14].map((x) => (
          <mesh key={x} position={[x, 3.12, 0.151]}>
            <sphereGeometry args={[0.012, 12, 12]} />
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
        camera={{ position: [6.9, 3.85, 7.1], fov: 31, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true }}
      >
        <hemisphereLight args={["#eef2ff", "#090a10", 1.7]} />
        <ambientLight intensity={0.42} />
        <directionalLight position={[4.5, 7, 5]} intensity={3.4} castShadow />
        <spotLight position={[-5, 5.5, 4]} intensity={38} angle={0.42} penumbra={0.8} color="#ffffff" />
        <pointLight position={[-4.5, 1.8, 3.5]} intensity={18} color={accent} distance={11} />
        <pointLight position={[4.2, 1.5, -2.5]} intensity={12} color="#4f8cff" distance={10} />

        <Suspense fallback={null}>
          <Float speed={1.1} rotationIntensity={0.035} floatIntensity={0.16} floatingRange={[-0.035, 0.035]}>
            <LaptopModel accent={accent} bodyColor={bodyColor} screenContent={screenContent} />
          </Float>
          <ContactShadows position={[0, -1.02, 0]} opacity={0.72} scale={8.6} blur={2.2} far={5.5} />
        </Suspense>

        <OrbitControls
          makeDefault
          enablePan={false}
          enableDamping
          dampingFactor={0.055}
          minDistance={6.7}
          maxDistance={10.5}
          minPolarAngle={Math.PI / 4.6}
          maxPolarAngle={Math.PI / 2.02}
          autoRotate={autoRotate}
          autoRotateSpeed={0.42}
          target={[0, 0.42, -0.18]}
        />
      </Canvas>
    </div>
  );
}

export default Laptop3D;
