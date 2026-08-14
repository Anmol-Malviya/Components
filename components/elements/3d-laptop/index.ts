import type { UIComponent } from "@/lib/component-types";

export const laptop3D: UIComponent = {
  slug: "3d-laptop",
  name: "Product-Grade 3D Laptop",
  category: "3D",
  description:
    "A full product-style laptop rebuilt from separate hardware groups: layered aluminium chassis, bottom cover, rubber feet, vents, screws, realistic hinges, modeled ports, recessed keyboard, speakers, glass trackpad, thin-bezel display and depth-safe screen UI.",
  tags: ["React Three Fiber", "Three.js", "Interactive", "3D", "Hardware", "Product Model"],
  preview: "3d-laptop",
  theme: "violet",
  code: `"use client";

// npm i three @react-three/fiber @react-three/drei
import { Laptop3D } from "@/components/elements/3d-laptop/Laptop3D";

export default function LaptopDemo() {
  return (
    <div style={{ width: "100%", height: 560 }}>
      <Laptop3D
        accent="#8b5cf6"
        bodyColor="#5b6069"
        lidAngle={105}
        autoRotate
        autoRotateSpeed={0.42}
      />
    </div>
  );
}

// Drag vertically to inspect the top and underside.
// Drag horizontally for all sides; wheel/pinch to zoom.
// lidAngle supports roughly 5–145 degrees.
// The reusable model is split internally into base, bottom cover,
// keyboard, trackpad, ports, vents, feet, hinges, display and webcam groups.`,
  css: `/* No external CSS required. The component is self-contained. */`,
};
