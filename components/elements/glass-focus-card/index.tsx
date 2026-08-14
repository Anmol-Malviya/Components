import type { UIComponent } from "@/lib/component-types";

export const glassFocusCard: UIComponent = {
  slug: "glass-focus-card",
  name: "Glass Focus Card",
  category: "Cards",
  description: "A glassmorphism stat card for dashboards and productivity UI.",
  tags: ["React", "Glass", "Dashboard"],
  preview: "glass-card",
  theme: "pink",
  code: `export function FocusCard() {
  return (
    <article className="focus-card">
      <div className="focus-orb" />
      <p>PRODUCTIVITY</p>
      <h3>Focus mode</h3>
      <span>03h 42m tracked today</span>
    </article>
  );
}`,
  css: `.focus-card {
  position: relative;
  width: 250px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.18);
  border-radius: 24px;
  padding: 24px;
  color: white;
  background: rgba(255,255,255,.08);
  backdrop-filter: blur(18px);
  box-shadow: 0 24px 70px rgba(0,0,0,.28);
}
.focus-card p { margin: 0 0 28px; color: rgba(255,255,255,.55); font: 700 10px/1 system-ui; letter-spacing: .16em; }
.focus-card h3 { margin: 0 0 8px; font: 700 24px/1.1 system-ui; }
.focus-card span { color: rgba(255,255,255,.62); font: 500 12px/1.4 system-ui; }
.focus-orb {
  position: absolute;
  width: 110px;
  height: 110px;
  right: -40px;
  top: -36px;
  border-radius: 50%;
  background: #ff4fd8;
  filter: blur(26px);
  opacity: .42;
}`,
};

export function GlassFocusCardPreview() {
  return (
    <div className="demo-glass-card">
      <div className="demo-orb" />
      <p>PRODUCTIVITY</p>
      <h3>Focus mode</h3>
      <span>03h 42m tracked today</span>
    </div>
  );
}
