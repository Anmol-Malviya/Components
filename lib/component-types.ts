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
