"use client";

import { FloatingRobot3D } from "@/components/elements/3d-floating-robot/FloatingRobot3D";

export function FloatingRobot3DPreview() {
  return (
    <div
      aria-label="3D floating humanoid robot preview"
      style={{
        position: "relative",
        width: "100%",
        height: 340,
        overflow: "hidden",
        background: "#080b14",
      }}
    >
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <FloatingRobot3D
          minHeight={340}
          floating
          autoRotate={false}
          controls={false}
          background="transparent"
        />
      </div>
    </div>
  );
}
