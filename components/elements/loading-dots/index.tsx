import type { UIComponent } from "@/lib/component-types";

export const loadingDots: UIComponent = {
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
};

export function LoadingDotsPreview() {
  return (
    <div className="demo-loading-dots" aria-label="Loading">
      <span />
      <span />
      <span />
    </div>
  );
}
