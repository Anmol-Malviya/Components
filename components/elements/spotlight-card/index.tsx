import type { UIComponent } from "@/lib/component-types";

export const spotlightCard: UIComponent = {
  slug: "spotlight-card",
  name: "Spotlight Card",
  category: "Cards",
  description: "A compact feature card with a cinematic top-light treatment.",
  tags: ["React", "Feature", "Marketing"],
  preview: "spotlight-card",
  theme: "violet",
  code: `export function SpotlightCard() {
  return (
    <article className="spotlight-card">
      <div className="spotlight-icon">✦</div>
      <strong>Magic panel</strong>
      <p>Subtle light follows the surface.</p>
    </article>
  );
}`,
  css: `.spotlight-card {
  position: relative;
  width: 250px;
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 20px;
  padding: 22px;
  overflow: hidden;
  color: white;
  background: radial-gradient(circle at 50% -20%, rgba(139,92,246,.42), transparent 45%), #0e1016;
  box-shadow: 0 24px 60px rgba(0,0,0,.3);
}
.spotlight-icon {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  margin-bottom: 28px;
  border-radius: 12px;
  background: rgba(139,92,246,.15);
  color: #bda8ff;
}
.spotlight-card strong { display: block; margin-bottom: 8px; font: 650 17px/1.2 system-ui; }
.spotlight-card p { margin: 0; color: #8f94a3; font: 500 13px/1.5 system-ui; }`,
};

export function SpotlightCardPreview() {
  return (
    <div className="demo-spotlight-card">
      <div className="demo-icon">✦</div>
      <strong>Magic panel</strong>
      <p>Subtle light follows the surface.</p>
    </div>
  );
}
