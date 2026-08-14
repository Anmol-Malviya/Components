import type { UIComponent } from "@/lib/component-types";

export const modernToggle: UIComponent = {
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
};

export function ModernTogglePreview() {
  return (
    <label className="demo-toggle enabled" aria-label="Toggle preview">
      <input type="checkbox" defaultChecked className="sr-only" />
      <span />
    </label>
  );
}
