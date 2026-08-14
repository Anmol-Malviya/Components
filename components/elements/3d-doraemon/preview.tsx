"use client";

import { Doraemon3D } from "@/components/elements/3d-doraemon/Doraemon3D";

export function Doraemon3DPreview() {
  return (
    <div
      aria-label="All-sides 360 degree 3D Doraemon preview"
      style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        height: 340,
        overflow: "hidden",
        background:
          "radial-gradient(circle at 50% 35%, #b9ddff 0%, #8ec5f4 42%, #6ea9df 72%, #5a94cf 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "8% 15% 4%",
          borderRadius: "50%",
          background: "rgba(255,255,255,.18)",
          filter: "blur(62px)",
          pointerEvents: "none",
        }}
      />
      <Doraemon3D minHeight={340} autoRotate controls background="transparent" />
      <span
        style={{
          position: "absolute",
          left: "50%",
          bottom: 10,
          transform: "translateX(-50%)",
          padding: "5px 9px",
          border: "1px solid rgba(255,255,255,.34)",
          borderRadius: 999,
          color: "#f4faff",
          background: "rgba(38,91,143,.48)",
          backdropFilter: "blur(9px)",
          fontSize: 8,
          fontWeight: 800,
          letterSpacing: ".15em",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        360° · FRONT · SIDE · BACK · DRAG · ZOOM
      </span>
    </div>
  );
}
