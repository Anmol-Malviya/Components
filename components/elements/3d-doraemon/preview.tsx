"use client";

import { Doraemon3D } from "@/components/elements/3d-doraemon/Doraemon3D";

export function Doraemon3DPreview() {
  return (
    <div
      aria-label="Polished 360 degree 3D Doraemon preview"
      style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        height: 340,
        overflow: "hidden",
        background:
          "radial-gradient(circle at 50% 28%, #d9ecff 0%, #a9d3f7 42%, #7fb6e5 76%, #69a3d8 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "10% 17% 6%",
          borderRadius: "50%",
          background: "rgba(255,255,255,.22)",
          filter: "blur(58px)",
          pointerEvents: "none",
        }}
      />

      <Doraemon3D
        minHeight={340}
        autoRotate={false}
        initialRotationY={-0.16}
        controls
        background="transparent"
      />

      <span
        style={{
          position: "absolute",
          left: "50%",
          bottom: 10,
          transform: "translateX(-50%)",
          padding: "5px 9px",
          border: "1px solid rgba(255,255,255,.45)",
          borderRadius: 999,
          color: "#f7fbff",
          background: "rgba(31,79,126,.42)",
          backdropFilter: "blur(9px)",
          fontSize: 8,
          fontWeight: 800,
          letterSpacing: ".14em",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        DRAG · ROTATE · ZOOM · 360°
      </span>
    </div>
  );
}
