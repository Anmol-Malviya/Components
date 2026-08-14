import Link from "next/link";
import { ComponentGallery } from "@/components/ComponentGallery";
import { components } from "@/lib/components";

export default function Home() {
  const categories = new Set(components.map((component) => component.category));

  return (
    <main className="site-shell">
      <nav className="navbar">
        <Link href="/" className="brand" aria-label="Anmol UI home">
          <span className="brand-mark">A</span>
          <span>Anmol UI</span>
        </Link>

        <div className="nav-links">
          <a href="#components">Components</a>
          <a
            href="https://github.com/Anmol-Malviya/Components"
            target="_blank"
            rel="noreferrer"
            className="github-link"
          >
            GitHub ↗
          </a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-kicker">
          <span className="status-dot" />
          Open-source React component library
        </div>

        <h1>
          Build less.
          <br />
          <span>Ship beautiful UI faster.</span>
        </h1>

        <p className="hero-copy">
          Preview polished interface elements, copy their React + CSS source,
          and drop them directly into your project.
        </p>

        <div className="hero-stats">
          <div>
            <strong>{components.length}</strong>
            <span>components</span>
          </div>
          <div>
            <strong>{categories.size}</strong>
            <span>categories</span>
          </div>
          <div>
            <strong>100%</strong>
            <span>copy-ready</span>
          </div>
        </div>
      </section>

      <section id="components" className="component-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Component library</p>
            <h2>Find your next UI element</h2>
          </div>
          <p>
            Every card has a live preview. Open a component to copy both the
            React and CSS source.
          </p>
        </div>

        <ComponentGallery components={components} />
      </section>

      <footer className="footer">
        <div>
          <span className="brand-mark small">A</span>
          <strong>Anmol UI</strong>
        </div>
        <p>Built for developers who like shipping fast.</p>
      </footer>
    </main>
  );
}
