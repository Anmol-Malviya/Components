export type ComponentTheme = "violet" | "blue" | "emerald" | "amber" | "pink";

export type UIComponent = {
  slug: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  preview: string;
  theme: ComponentTheme;
  code: string;
  css: string;
};

export const components: UIComponent[] = [
  {
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
  },
  {
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
  box-shadow:
    inset 0 0 18px rgba(84, 210, 255, .08),
    0 0 24px rgba(84, 210, 255, .15);
  cursor: pointer;
  transition: .2s ease;
}
.neon-button:hover {
  color: #06101a;
  background: #6bddff;
  box-shadow: 0 0 34px rgba(84, 210, 255, .5);
}`,
  },
  {
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
.focus-card p {
  margin: 0 0 28px;
  color: rgba(255,255,255,.55);
  font: 700 10px/1 system-ui;
  letter-spacing: .16em;
}
.focus-card h3 {
  margin: 0 0 8px;
  font: 700 24px/1.1 system-ui;
}
.focus-card span {
  color: rgba(255,255,255,.62);
  font: 500 12px/1.4 system-ui;
}
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
  },
  {
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
  background:
    radial-gradient(circle at 50% -20%, rgba(139,92,246,.42), transparent 45%),
    #0e1016;
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
.spotlight-card strong {
  display: block;
  margin-bottom: 8px;
  font: 650 17px/1.2 system-ui;
}
.spotlight-card p {
  margin: 0;
  color: #8f94a3;
  font: 500 13px/1.5 system-ui;
}`,
  },
  {
    slug: "loading-dots",
    name: "Elastic Loading Dots",
    category: "Loaders",
    description: "Three elastic dots for lightweight loading and thinking states.",
    tags: ["CSS", "Animation", "Loader"],
    preview: "loading-dots",
    theme: "emerald",
    code: `export function LoadingDots() {
  return (
    <div className="loading-dots" aria-label="Loading">
      <span />
      <span />
      <span />
    </div>
  );
}`,
    css: `.loading-dots {
  display: flex;
  align-items: center;
  gap: 8px;
}
.loading-dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #74f6c3;
  animation: dotBounce .7s ease-in-out infinite alternate;
}
.loading-dots span:nth-child(2) { animation-delay: .14s; }
.loading-dots span:nth-child(3) { animation-delay: .28s; }
@keyframes dotBounce {
  from { transform: translateY(5px) scale(.85); opacity: .45; }
  to { transform: translateY(-5px) scale(1.08); opacity: 1; }
}`,
  },
  {
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
  },
  {
    slug: "modern-toggle",
    name: "Modern Toggle",
    category: "Inputs",
    description: "A tiny dependency-free toggle with a smooth spring-like switch.",
    tags: ["React", "Input", "Interactive"],
    preview: "toggle",
    theme: "emerald",
    code: `"use client";

import { useState } from "react";

export function ModernToggle() {
  const [enabled, setEnabled] = useState(true);

  return (
    <button
      className={\`modern-toggle \${enabled ? "enabled" : ""}\`}
      aria-pressed={enabled}
      onClick={() => setEnabled((value) => !value)}
    >
      <span />
    </button>
  );
}`,
    css: `.modern-toggle {
  width: 58px;
  height: 32px;
  padding: 3px;
  border: 0;
  border-radius: 999px;
  background: #2b3038;
  cursor: pointer;
  transition: background .22s ease;
}
.modern-toggle span {
  display: block;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 4px 14px rgba(0,0,0,.28);
  transition: transform .24s cubic-bezier(.2,.8,.2,1);
}
.modern-toggle.enabled { background: #37d99b; }
.modern-toggle.enabled span { transform: translateX(26px); }`,
  },
  {
    slug: "avatar-stack",
    name: "Avatar Stack",
    category: "Social",
    description: "Overlapping initials for teams, collaborators, and social proof.",
    tags: ["React", "People", "Social proof"],
    preview: "avatar-stack",
    theme: "amber",
    code: `export function AvatarStack() {
  return (
    <div className="avatar-stack">
      <span>AM</span>
      <span>KR</span>
      <span>DR</span>
      <span className="more">+8</span>
    </div>
  );
}`,
    css: `.avatar-stack {
  display: flex;
  align-items: center;
}
.avatar-stack span {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  margin-left: -10px;
  border: 3px solid #111318;
  border-radius: 50%;
  color: white;
  background: linear-gradient(145deg, #434a5b, #1d212a);
  font: 700 10px/1 system-ui;
}
.avatar-stack span:first-child { margin-left: 0; }
.avatar-stack .more {
  color: #1b1402;
  background: #ffc85c;
}`,
  },
];

export function getComponent(slug: string) {
  return components.find((component) => component.slug === slug);
}
