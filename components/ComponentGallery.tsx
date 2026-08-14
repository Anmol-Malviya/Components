"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { UIComponent } from "@/lib/components";
import { AuroraButtonPreview } from "@/components/elements/aurora-button";
import { NeonButtonPreview } from "@/components/elements/neon-button";
import { GlassFocusCardPreview } from "@/components/elements/glass-focus-card";
import { SpotlightCardPreview } from "@/components/elements/spotlight-card";
import { LoadingDotsPreview } from "@/components/elements/loading-dots";
import { AIPulseRingPreview } from "@/components/elements/ai-pulse-ring";
import { ModernTogglePreview } from "@/components/elements/modern-toggle";
import { AvatarStackPreview } from "@/components/elements/avatar-stack";
import { Laptop3DPreview } from "@/components/elements/3d-laptop/preview";

export function CopyButton({
  value,
  label = "Copy code",
  className = "",
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button type="button" className={`copy-button ${className}`} onClick={copy}>
      {copied ? "Copied ✓" : label}
    </button>
  );
}

export function ComponentPreview({ type }: { type: string }) {
  switch (type) {
    case "3d-laptop":
      return <Laptop3DPreview />;
    case "aurora-button":
      return <AuroraButtonPreview />;
    case "neon-button":
      return <NeonButtonPreview />;
    case "glass-card":
      return <GlassFocusCardPreview />;
    case "spotlight-card":
      return <SpotlightCardPreview />;
    case "loading-dots":
      return <LoadingDotsPreview />;
    case "pulse-ring":
      return <AIPulseRingPreview />;
    case "toggle":
      return <ModernTogglePreview />;
    case "avatar-stack":
      return <AvatarStackPreview />;
    default:
      return null;
  }
}

export function ComponentGallery({ components }: { components: UIComponent[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(components.map((item) => item.category)))],
    [components]
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return components.filter((component) => {
      const matchesCategory = category === "All" || component.category === category;
      const matchesQuery =
        !normalized ||
        component.name.toLowerCase().includes(normalized) ||
        component.description.toLowerCase().includes(normalized) ||
        component.tags.some((tag) => tag.toLowerCase().includes(normalized));

      return matchesCategory && matchesQuery;
    });
  }, [category, components, query]);

  return (
    <>
      <div className="library-toolbar">
        <label className="search-box">
          <span>⌕</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search buttons, cards, loaders..."
            aria-label="Search components"
          />
          <kbd>/</kbd>
        </label>

        <div className="category-row" aria-label="Component categories">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setCategory(item)}
              className={category === item ? "active" : ""}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {filtered.length ? (
        <div className="component-grid">
          {filtered.map((component) => (
            <article className="component-card" key={component.slug}>
              <div className={`preview-surface theme-${component.theme}`}>
                <span className="preview-label">{component.category}</span>
                <ComponentPreview type={component.preview} />
              </div>

              <div className="component-card-body">
                <div>
                  <h3>{component.name}</h3>
                  <p>{component.description}</p>
                </div>

                <div className="tag-row">
                  {component.tags.slice(0, 3).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className="card-actions">
                  <Link href={`/components/${component.slug}`}>View code →</Link>
                  <CopyButton value={component.code} label="Copy JSX" />
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div>⌕</div>
          <h3>No components found</h3>
          <p>Try another keyword or switch back to All.</p>
        </div>
      )}
    </>
  );
}
