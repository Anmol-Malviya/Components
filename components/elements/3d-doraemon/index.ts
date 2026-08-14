import type { UIComponent } from "@/lib/component-types";

export const doraemon3D: UIComponent = {
  slug: "3d-doraemon",
  name: "Interactive 3D Doraemon",
  category: "3D",
  description:
    "A procedural Doraemon character built entirely with React Three Fiber and Three.js geometry, including the face, eyes, whiskers, bell, pocket, waving arms, feet, lighting, shadows and interactive orbit controls.",
  tags: ["React Three Fiber", "Three.js", "Interactive", "3D", "Character", "Procedural"],
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

// Props:
// autoRotate?: boolean
// controls?: boolean
// background?: string
// className?: string
// minHeight?: number`,
  css: `/* No external CSS required. The component is self-contained. */`,
};
