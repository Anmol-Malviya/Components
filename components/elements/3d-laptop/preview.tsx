"use client";

import { Laptop3D } from "@/components/elements/3d-laptop/Laptop3D";

export function Laptop3DPreview() {
  return (
    <div
      aria-label="Interactive detailed 3D laptop preview"
      style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        height: 310,
        overflow: "hidden",
        background:
          "radial-gradient(circle at 52% 10%, rgba(255,255,255,.07), transparent 28%), radial-gradient(circle at 50% 82%, rgba(124,92,255,.11), transparent 48%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "24% 12% 8%",
          borderRadius: "50%",
          background: "rgba(124, 92, 255, .2)",
          filter: "blur(52px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "44%",
          height: 90,
          left: "28%",
          top: -48,
          borderRadius: "50%",
          background: "rgba(255,255,255,.09)",
          filter: "blur(38px)",
          pointerEvents: "none",
        }}
      />
      <Laptop3D />
      <span
        style={{
          position: "absolute",
          left: "50%",
          bottom: 11,
          transform: "translateX(-50%)",
          padding: "5px 8px",
          border: "1px solid rgba(255,255,255,.07)",
          borderRadius: 999,
          color: "#777d89",
          background: "rgba(8,9,11,.58)",
          backdropFilter: "blur(8px)",
          fontSize: 8,
          fontWeight: 800,
          letterSpacing: ".15em",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        DRAG · ZOOM · ROTATE
      </span>
    </div>
  );
}
