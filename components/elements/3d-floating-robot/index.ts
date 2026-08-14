import type { UIComponent } from "@/lib/component-types";

export const floatingRobot3D: UIComponent = {
  slug: "3d-floating-robot",
  name: "Floating Humanoid Robot 3D",
  category: "3D",
  description:
    "A cute full-body procedural humanoid robot built with React Three Fiber and Three.js. It uses separate rounded armor shells, visible shoulder/elbow/wrist/hip/knee/ankle joints, articulated five-digit hands, an oversized helmet head, compact torso and animation-ready nested transform groups.",
  tags: ["React Three Fiber", "Three.js", "3D Robot", "Procedural", "Animated", "Humanoid"],
  preview: "3d-floating-robot",
  theme: "violet",
  code: `"use client";

// npm i three @react-three/fiber @react-three/drei
import { FloatingRobot3D } from "@/components/elements/3d-floating-robot/FloatingRobot3D";

export default function RobotDemo() {
  return (
    <div style={{ width: "100%", height: 620, background: "#080b14" }}>
      <FloatingRobot3D
        floating
        autoRotate
        autoRotateSpeed={0.22}
        controls
        background="transparent"
      />
    </div>
  );
}

// Animation-ready hierarchy includes:
// HeadGroup, NeckGroup, TorsoGroup, LeftArm, RightArm,
// ElbowJoint, WristJoint, Hand/Fingers, WaistGroup,
// PelvisGroup, LeftLeg, RightLeg, KneeJoint and AnkleJoint.
//
// Props:
// floating?: boolean
// floatAmplitude?: number
// floatSpeed?: number
// autoRotate?: boolean
// autoRotateSpeed?: number
// controls?: boolean
// background?: string
// className?: string
// minHeight?: number`,
  css: `/* No external CSS required. The component is self-contained. */`,
};
