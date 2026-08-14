"use client";

import { Laptop3D } from "@/components/elements/3d-laptop/Laptop3D";

export function Laptop3DPreview() {
  return (
    <div
      aria-label="Interactive 3D laptop preview"
      style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        height: 290,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "22% 18% 14%",
          borderRadius: "50%",
          background: "rgba(124, 92, 255, .18)",
          filter: "blur(42px)",
          pointerEvents: "none",
        }}
      />
      <Laptop3D />
      <span
        style={{
          position: "absolute",
          left: "50%",
          bottom: 12,
          transform: "translateX(-50%)",
          color: "#686e79",
          fontSize: 8,
          fontWeight: 800,
          letterSpacing: ".16em",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        DRAG · ZOOM
      </span>
    </div>
  );
}
