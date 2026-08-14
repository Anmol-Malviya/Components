"use client";

import { Laptop3D } from "@/components/elements/3d-laptop/Laptop3D";

export function Laptop3DPreview() {
  return (
    <div
      aria-label="Interactive product-grade 3D laptop preview"
      style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        height: 340,
        overflow: "hidden",
        background:
          "radial-gradient(circle at 52% 8%, rgba(255,255,255,.08), transparent 28%), radial-gradient(circle at 50% 82%, rgba(124,92,255,.13), transparent 48%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "24% 10% 7%",
          borderRadius: "50%",
          background: "rgba(124,92,255,.2)",
          filter: "blur(54px)",
          pointerEvents: "none",
        }}
      />
      <Laptop3D lidAngle={105} autoRotate autoRotateSpeed={0.38} />
      <span
        style={{
          position: "absolute",
          left: "50%",
          bottom: 11,
          transform: "translateX(-50%)",
          padding: "5px 9px",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: 999,
          color: "#7d8390",
          background: "rgba(8,9,11,.64)",
          backdropFilter: "blur(9px)",
          fontSize: 8,
          fontWeight: 800,
          letterSpacing: ".15em",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        DRAG · ZOOM · ALL SIDES
      </span>
    </div>
  );
}
