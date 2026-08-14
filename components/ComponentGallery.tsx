"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { UIComponent } from "@/lib/components";

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
    <button
      type="button"
      className={`copy-button ${className}`}
      onClick={copy}
    >
      {copied ? "Copied ✓" : label}
    </button>
  );
}

export function ComponentPreview({ type }: { type: string }) {
  const [enabled, setEnabled] = useState(true);

  switch (type) {
    case "aurora-button":
      return (
        <button className="demo-aurora-button">
          <span>Start building</span>
        </button>
      );

    case "neon-button":
      return <button className="demo-neon-button">Deploy now</button>;

    case "glass-card":
      return (
        <div className="demo-glass-card">
          <div className="demo-orb" />
          <p>PRODUCTIVITY</p>
          <h3>Focus mode</h3>
          <span>03h 42m tracked today</span>
        </div>
      );

    case "spotlight-card":
      return (
        <div className="demo-spotlight-card">
          <div className="demo-icon">✦</div>
          <strong>Magic panel</strong>
          <p>Subtle light follows the surface.</p>
        </div>
      );

    case "loading-dots":
      return (
        <div className="demo-loading-dots" aria-label="Loading">
          <span />
          <span />
          <span />
        </div>
      );

    case "pulse-ring":
      return (
        <div className="demo-pulse-wrap">
          <div className="demo-pulse-ring" />
          <div className="demo-pulse-core">AI</div>
        </div>
      );

    case "toggle":
      return (
        <button
          type="button"
          className={`demo-toggle ${enabled ? "enabled" : ""}`}
          aria-pressed={enabled}
          onClick={() => setEnabled((value) => !value)}
        >
          <span />
        </button>
      );

    case "avatar-stack":
      return (
        <div className="demo-avatar-stack">
          <span>AM</span>
          <span>KR</span>
          <span>DR</span>
          <span className="more">+8</span>
        </div>
      );

    default:
      return null;
  }
}

export function ComponentGallery({
  components,
}: {
  components: UIComponent[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(components.map((item) => item.category)))],
    [components]
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return components.filter((component) => {
      const matchesCategory =
        category === "All" || component.category === category;
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
