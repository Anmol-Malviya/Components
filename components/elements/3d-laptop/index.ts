import type { UIComponent } from "@/lib/component-types";

export const laptop3D: UIComponent = {
  slug: "3d-laptop",
  name: "Detailed 3D Laptop",
  category: "3D",
  description:
    "A premium code-built laptop with a metallic unibody, recessed keyboard, speaker grills, ports, hinges, depth-safe screen UI, studio lighting and front-view drag/zoom controls.",
  tags: ["React Three Fiber", "Three.js", "Interactive", "3D", "Hardware"],
  preview: "3d-laptop",
  theme: "violet",
  code: `"use client";

// npm i three @react-three/fiber @react-three/drei
import { Laptop3D } from "@/components/elements/3d-laptop/Laptop3D";

export default function LaptopDemo() {
  return (
    <div style={{ width: "100%", height: 520 }}>
      <Laptop3D
        accent="#8b5cf6"
        bodyColor="#565b65"
        autoRotate
      />
    </div>
  );
}

// The reusable implementation lives in:
// components/elements/3d-laptop/Laptop3D.tsx
// It includes centered/depth-occluded screen UI, constrained front-view
// OrbitControls, detailed keyboard deck, speakers, ports and hinges.`,
  css: `/* No external CSS required. The component is self-contained. */`,
};
