import Link from "next/link";
import { notFound } from "next/navigation";
import { ComponentPreview, CopyButton } from "@/components/ComponentGallery";
import { components, getComponent } from "@/lib/components";

export function generateStaticParams() {
  return components.map((component) => ({ slug: component.slug }));
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const component = getComponent(slug);

  if (!component) {
    notFound();
  }

  return (
    <main className="detail-shell">
      <nav className="navbar detail-nav">
        <Link href="/" className="brand">
          <span className="brand-mark">A</span>
          <span>Anmol UI</span>
        </Link>

        <Link href="/" className="back-link">
          ← All components
        </Link>
      </nav>

      <section className="detail-header">
        <div>
          <p className="eyebrow">{component.category}</p>
          <h1>{component.name}</h1>
          <p>{component.description}</p>
          <div className="tag-row detail-tags">
            {component.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      <section className={`detail-preview theme-${component.theme}`}>
        <span className="preview-label">Live preview</span>
        <ComponentPreview type={component.preview} />
      </section>

      <section className="code-grid">
        <article className="code-panel">
          <div className="code-panel-head">
            <div>
              <span className="code-dot" />
              <strong>Component.tsx</strong>
            </div>
            <CopyButton value={component.code} label="Copy JSX" />
          </div>
          <pre>
            <code>{component.code}</code>
          </pre>
        </article>

        <article className="code-panel">
          <div className="code-panel-head">
            <div>
              <span className="code-dot css" />
              <strong>styles.css</strong>
            </div>
            <CopyButton value={component.css} label="Copy CSS" />
          </div>
          <pre>
            <code>{component.css}</code>
          </pre>
        </article>
      </section>

      <section className="usage-note">
        <p className="eyebrow">How to use</p>
        <h2>Two files. Zero dependencies.</h2>
        <p>
          Copy the React snippet into your project, paste the CSS into your
          stylesheet, and rename the classes if your codebase needs a
          different naming convention.
        </p>
      </section>
    </main>
  );
}
