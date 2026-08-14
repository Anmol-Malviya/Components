import type { UIComponent } from "@/lib/component-types";

export const doraemon3D: UIComponent = {
  slug: "3d-doraemon",
  name: "360° 3D Doraemon",
  category: "3D",
  description:
    "A polished all-sides Doraemon-style character built with React Three Fiber and Three.js. The model uses a softer integrated face profile, balanced head/body proportions, compact ears, neutral arms, rear tail, wraparound collar, pocket, bell, feet and mobile-friendly orbit controls.",
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
        autoRotateSpeed={0.14}
        initialRotationY={-0.16}
        controls
        background="transparent"
      />
    </div>
  );
}

// Drag to rotate, wheel/pinch to zoom.
// Props:
// autoRotate?: boolean
// autoRotateSpeed?: number
// initialRotationY?: number
// controls?: boolean
// background?: string
// className?: string
// minHeight?: number`,
  css: `/* No external CSS required. The component is self-contained. */`,
};
