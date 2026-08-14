import type { UIComponent } from "@/lib/component-types";

export const neonButton: UIComponent = {
  slug: "neon-button",
  name: "Neon Outline",
  category: "Buttons",
  description: "A sharp cyber-style outline button with a subtle neon bloom.",
  tags: ["React", "Neon", "Dark UI"],
  preview: "neon-button",
  theme: "blue",
  code: `export function NeonButton() {
  return <button className="neon-button">Deploy now</button>;
}`,
  css: `.neon-button {
  border: 1px solid #54d2ff;
  border-radius: 10px;
  padding: 13px 20px;
  color: #bdefff;
  background: rgba(9, 18, 31, .72);
  font: 600 14px/1 system-ui;
  box-shadow: inset 0 0 18px rgba(84, 210, 255, .08), 0 0 24px rgba(84, 210, 255, .15);
  cursor: pointer;
  transition: .2s ease;
}
.neon-button:hover {
  color: #06101a;
  background: #6bddff;
  box-shadow: 0 0 34px rgba(84, 210, 255, .5);
}`,
};

export function NeonButtonPreview() {
  return <button className="demo-neon-button">Deploy now</button>;
}
