import type { UIComponent } from "@/lib/component-types";
import { laptop3DSource } from "@/components/elements/3d-laptop/source";

export const laptop3D: UIComponent = {
  slug: "3d-laptop",
  name: "Detailed 3D Laptop",
  category: "3D",
  description:
    "A premium code-built laptop with a metallic unibody, detailed keyboard, speaker grills, ports, hinges, full-size glowing display, studio lighting, drag rotation and zoom.",
  tags: ["React Three Fiber", "Three.js", "Interactive", "3D", "Hardware"],
  preview: "3d-laptop",
  theme: "violet",
  code: laptop3DSource,
  css: `/* No external CSS required. The component is self-contained. */`,
};
