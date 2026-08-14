import type { UIComponent } from "@/lib/component-types";

export const aiPulseRing: UIComponent = {
  slug: "ai-pulse-ring",
  name: "AI Pulse Ring",
  category: "Effects",
  description: "A breathing assistant indicator for voice, AI, or live status UI.",
  tags: ["CSS", "AI UI", "Animation"],
  preview: "pulse-ring",
  theme: "blue",
  code: `export function AIPulse() {
  return (
    <div className="ai-pulse">
      <div className="ai-pulse-ring" />
      <div className="ai-pulse-core">AI</div>
    </div>
  );
}`,
  css: `.ai-pulse {
  position: relative;
  display: grid;
  place-items: center;
  width: 88px;
  height: 88px;
}
.ai-pulse-core {
  position: relative;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  color: #dff8ff;
  background: linear-gradient(145deg, #14283e, #08111d);
  border: 1px solid rgba(111,219,255,.42);
  font: 700 12px/1 system-ui;
}
.ai-pulse-ring {
  position: absolute;
  inset: 4px;
  border: 1px solid rgba(111,219,255,.6);
  border-radius: 50%;
  animation: aiPulse 1.8s ease-out infinite;
}
@keyframes aiPulse {
  0% { transform: scale(.68); opacity: .9; }
  100% { transform: scale(1.18); opacity: 0; }
}`,
};

export function AIPulseRingPreview() {
  return (
    <div className="demo-pulse-wrap">
      <div className="demo-pulse-ring" />
      <div className="demo-pulse-core">AI</div>
    </div>
  );
}
