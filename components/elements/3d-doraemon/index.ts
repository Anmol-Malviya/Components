import type { UIComponent } from "@/lib/component-types";

export const doraemon3D: UIComponent = {
  slug: "3d-doraemon",
  name: "360° 3D Doraemon",
  category: "3D",
  description:
    "A reference-matched all-sides Doraemon character built with React Three Fiber and Three.js. The model includes true front/side/back depth, cat ears, neutral arms, rear tail, wraparound collar, projected face and belly geometry, bell, pocket, feet and full orbit controls.",
  tags: ["React Three Fiber", "Three.js", "360°", "3D Character", "Interactive", "Procedural"],
  preview: "3d-doraemon",
  theme: "blue",
  code: `"use client";

// npm i three @react-three/fiber @react-three/drei
import { Doraemon3D } from "@/components/elements/3d-doraemon/Doraemon3D";

export default function DoraemonDemo() {
  return (
    <div style={{ width: "100%", height: 620 }}>
      <Doraemon3D
        autoRotate
        controls
        background="transparent"
      />
    </div>
  );
}

// 360° model: front, left, right, back and 3/4 views.
// Drag to rotate, wheel/pinch to zoom.
// Props:
// autoRotate?: boolean
// controls?: boolean
// background?: string
// className?: string
// minHeight?: number`,
  css: `/* No external CSS required. The component is self-contained. */`,
};
