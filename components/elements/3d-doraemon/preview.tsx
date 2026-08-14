"use client";

import { Doraemon3D } from "@/components/elements/3d-doraemon/Doraemon3D";

export function Doraemon3DPreview() {
  return (
    <div
      aria-label="Reference-matched 3D Doraemon preview"
      style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        height: 340,
        overflow: "hidden",
        background:
          "radial-gradient(circle at 50% 35%, #8bc5ff 0%, #69a9ed 38%, #4a84cb 72%, #376eaf 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "8% 15% 4%",
          borderRadius: "50%",
          background: "rgba(255,255,255,.16)",
          filter: "blur(62px)",
          pointerEvents: "none",
        }}
      />
      <Doraemon3D minHeight={340} autoRotate={false} controls background="transparent" />
      <span
        style={{
          position: "absolute",
          left: "50%",
          bottom: 10,
          transform: "translateX(-50%)",
          padding: "5px 9px",
          border: "1px solid rgba(255,255,255,.28)",
          borderRadius: 999,
          color: "#eef7ff",
          background: "rgba(30,78,135,.44)",
          backdropFilter: "blur(9px)",
          fontSize: 8,
          fontWeight: 800,
          letterSpacing: ".15em",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        FRONT VIEW · DRAG · ZOOM
      </span>
    </div>
  );
}
