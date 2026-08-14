"use client";

import { Doraemon3D } from "@/components/elements/3d-doraemon/Doraemon3D";

export function Doraemon3DPreview() {
  return (
    <div
      aria-label="Interactive 3D Doraemon preview"
      style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        height: 340,
        overflow: "hidden",
        background:
          "radial-gradient(circle at 50% 34%, rgba(126,190,255,.3), transparent 35%), linear-gradient(180deg, #0e1b2c 0%, #08111d 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "14% 18% 4%",
          borderRadius: "50%",
          background: "rgba(0,153,230,.18)",
          filter: "blur(58px)",
          pointerEvents: "none",
        }}
      />
      <Doraemon3D minHeight={340} autoRotate controls />
      <span
        style={{
          position: "absolute",
          left: "50%",
          bottom: 11,
          transform: "translateX(-50%)",
          padding: "5px 9px",
          border: "1px solid rgba(255,255,255,.1)",
          borderRadius: 999,
          color: "#8ea6be",
          background: "rgba(5,12,21,.68)",
          backdropFilter: "blur(9px)",
          fontSize: 8,
          fontWeight: 800,
          letterSpacing: ".15em",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        DRAG · ZOOM · 3D
      </span>
    </div>
  );
}
