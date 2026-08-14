"use client";

import { Doraemon3D } from "@/components/elements/3d-doraemon/Doraemon3D";

export function Doraemon3DPreview() {
  return (
    <div
      aria-label="Polished 3D Doraemon hero preview"
      style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        height: 340,
        overflow: "hidden",
        background:
          "radial-gradient(circle at 50% 28%, #e2f1ff 0%, #b7daf8 40%, #8fc2ea 72%, #75addd 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "9% 18% 7%",
          borderRadius: "50%",
          background: "rgba(255,255,255,.28)",
          filter: "blur(58px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <Doraemon3D
          minHeight={340}
          autoRotate={false}
          initialRotationY={0.14}
          controls={false}
          background="transparent"
        />
      </div>

      <span
        style={{
          position: "absolute",
          left: "50%",
          bottom: 10,
          transform: "translateX(-50%)",
          padding: "5px 10px",
          border: "1px solid rgba(255,255,255,.48)",
          borderRadius: 999,
          color: "#f8fbff",
          background: "rgba(35,83,128,.38)",
          backdropFilter: "blur(9px)",
          fontSize: 8,
          fontWeight: 800,
          letterSpacing: ".14em",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        360° MODEL · OPEN TO ROTATE
      </span>
    </div>
  );
}
