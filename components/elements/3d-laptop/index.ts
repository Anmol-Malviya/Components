import type { UIComponent } from "@/lib/component-types";

export const laptop3D: UIComponent = {
  slug: "3d-laptop",
  name: "3D Laptop",
  category: "3D",
  description: "An interactive code-built laptop with a floating chassis, keyboard, glowing screen, drag rotation and zoom.",
  tags: ["React Three Fiber", "Three.js", "Interactive", "3D"],
  preview: "3d-laptop",
  theme: "violet",
  code: `"use client";

// npm i three @react-three/fiber @react-three/drei
import { Suspense, useMemo, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, Html, OrbitControls, RoundedBox } from "@react-three/drei";

function Keyboard() {
  const keys = useMemo(() => {
    const rows = [12, 12, 11, 10, 9];
    return rows.flatMap((count, row) => {
      const gap = 0.31;
      const start = -((count - 1) * gap) / 2;
      return Array.from({ length: count }, (_, key) => ({
        id: row + "-" + key,
        x: start + key * gap,
        z: -0.7 + row * 0.31,
      }));
    });
  }, []);

  return (
    <group>
      {keys.map((key) => (
        <mesh key={key.id} position={[key.x, -0.392, key.z]} castShadow>
          <boxGeometry args={[0.255, 0.055, 0.235]} />
          <meshStandardMaterial color="#17191d" roughness={0.58} metalness={0.18} />
        </mesh>
      ))}
      <mesh position={[0, -0.392, 0.92]} castShadow>
        <boxGeometry args={[1.95, 0.055, 0.235]} />
        <meshStandardMaterial color="#17191d" roughness={0.58} metalness={0.18} />
      </mesh>
    </group>
  );
}

function LaptopModel({ accent, bodyColor, screenContent }: { accent: string; bodyColor: string; screenContent?: ReactNode }) {
  return (
    <group rotation={[0, -0.28, 0]} position={[0, -0.12, 0]}>
      <RoundedBox args={[5.3, 0.22, 3.45]} radius={0.12} smoothness={5} position={[0, -0.55, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={bodyColor} roughness={0.27} metalness={0.88} />
      </RoundedBox>

      <RoundedBox args={[4.65, 0.04, 2.22]} radius={0.06} smoothness={4} position={[0, -0.405, 0.1]}>
        <meshStandardMaterial color="#22252a" roughness={0.48} metalness={0.55} />
      </RoundedBox>
      <Keyboard />

      <RoundedBox args={[1.9, 0.025, 0.78]} radius={0.06} smoothness={4} position={[0, -0.392, 1.2]}>
        <meshStandardMaterial color="#2b2e33" roughness={0.4} metalness={0.5} />
      </RoundedBox>

      {[-1.65, 1.65].map((x) => (
        <mesh key={x} position={[x, -0.39, -1.64]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.55, 24]} />
          <meshStandardMaterial color="#0a0c0f" roughness={0.3} metalness={0.9} />
        </mesh>
      ))}

      <group position={[0, -0.33, -1.61]} rotation={[-0.1, 0, 0]}>
        <RoundedBox args={[5.02, 3.16, 0.16]} radius={0.13} smoothness={5} position={[0, 1.52, 0]} castShadow>
          <meshStandardMaterial color={bodyColor} roughness={0.27} metalness={0.88} />
        </RoundedBox>
        <RoundedBox args={[4.62, 2.76, 0.035]} radius={0.065} smoothness={4} position={[0, 1.52, 0.102]}>
          <meshStandardMaterial color="#040509" roughness={0.1} metalness={0.32} emissive="#080812" emissiveIntensity={0.7} />
        </RoundedBox>
        <mesh position={[0, 2.96, 0.13]}>
          <sphereGeometry args={[0.033, 16, 16]} />
          <meshStandardMaterial color="#0d1119" emissive={accent} emissiveIntensity={0.45} />
        </mesh>
        <Html transform position={[0, 1.52, 0.128]} distanceFactor={1.45} style={{ pointerEvents: "none" }}>
          <div style={{ width: 480, height: 288, display: "grid", placeItems: "center", overflow: "hidden", borderRadius: 15, color: "white", background: "radial-gradient(circle at 75% 20%, " + accent + " 0, #0b0a15 30%, #05060a 72%)", fontFamily: "system-ui" }}>
            {screenContent ?? (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 8, letterSpacing: ".2em", opacity: 0.5 }}>INTERACTIVE COMPONENT</div>
                <strong style={{ display: "block", marginTop: 8, fontSize: 42, letterSpacing: "-.05em" }}>3D Laptop</strong>
                <span style={{ fontSize: 10, opacity: 0.55 }}>React Three Fiber · Pure code geometry</span>
              </div>
            )}
          </div>
        </Html>
      </group>
    </group>
  );
}

export function Laptop3D({
  accent = "#8b5cf6",
  bodyColor = "#17191d",
  autoRotate = true,
  screenContent,
}: {
  accent?: string;
  bodyColor?: string;
  autoRotate?: boolean;
  screenContent?: ReactNode;
}) {
  return (
    <div style={{ width: "100%", height: 520 }}>
      <Canvas shadows dpr={[1, 1.75]} camera={{ position: [7, 4.3, 7.3], fov: 34 }}>
        <ambientLight intensity={0.78} />
        <directionalLight position={[4, 8, 5]} intensity={3.1} castShadow />
        <pointLight position={[-4, 2.4, 3]} intensity={10} color={accent} distance={10} />
        <pointLight position={[4, 1, -3]} intensity={5} color="#4f8cff" distance={9} />
        <Suspense fallback={null}>
          <Float speed={1.4} rotationIntensity={0.08} floatIntensity={0.26}>
            <LaptopModel accent={accent} bodyColor={bodyColor} screenContent={screenContent} />
          </Float>
          <ContactShadows position={[0, -1.05, 0]} opacity={0.6} scale={8} blur={2.5} far={5} />
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableDamping
          minDistance={6.2}
          maxDistance={11}
          autoRotate={autoRotate}
          autoRotateSpeed={0.65}
          target={[0, 0.2, 0]}
        />
      </Canvas>
    </div>
  );
}`,
  css: `/* No external CSS required. The component is self-contained. */`,
};
