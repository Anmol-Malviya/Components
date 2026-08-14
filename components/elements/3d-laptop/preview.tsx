"use client";

import { Laptop3D } from "@/components/elements/3d-laptop/Laptop3D";

export function Laptop3DPreview() {
  return (
    <div className="demo-laptop-3d" aria-label="Interactive 3D laptop preview">
      <div className="demo-laptop-glow" />
      <Laptop3D />
      <span className="demo-laptop-hint">DRAG · ZOOM</span>
    </div>
  );
}
