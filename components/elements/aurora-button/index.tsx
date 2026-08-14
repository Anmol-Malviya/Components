import type { UIComponent } from "@/lib/component-types";

export const auroraButton: UIComponent = {
  slug: "aurora-button",
  name: "Aurora Button",
  category: "Buttons",
  description: "A soft animated gradient CTA with a luminous hover state.",
  tags: ["React", "Gradient", "Hover"],
  preview: "aurora-button",
  theme: "violet",
  code: `export function AuroraButton() {
  return (
    <button className="aurora-button">
      <span>Start building</span>
    </button>
  );
}`,
  css: `.aurora-button {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.2);
  border-radius: 999px;
  padding: 14px 22px;
  color: white;
  font: 600 14px/1 system-ui;
  background: linear-gradient(110deg, #6d5dfc, #a855f7, #4f46e5);
  background-size: 200% 100%;
  box-shadow: 0 12px 40px rgba(124, 58, 237, .28);
  cursor: pointer;
  transition: transform .2s ease, box-shadow .2s ease;
  animation: auroraShift 4s linear infinite alternate;
}
.aurora-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 50px rgba(124, 58, 237, .42);
}
@keyframes auroraShift {
  to { background-position: 100% 0; }
}`,
};

export function AuroraButtonPreview() {
  return (
    <button className="demo-aurora-button">
      <span>Start building</span>
    </button>
  );
}
