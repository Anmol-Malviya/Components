import { auroraButton } from "@/components/elements/aurora-button";
import { neonButton } from "@/components/elements/neon-button";
import { glassFocusCard } from "@/components/elements/glass-focus-card";
import { spotlightCard } from "@/components/elements/spotlight-card";
import { loadingDots } from "@/components/elements/loading-dots";
import { aiPulseRing } from "@/components/elements/ai-pulse-ring";
import { modernToggle } from "@/components/elements/modern-toggle";
import { avatarStack } from "@/components/elements/avatar-stack";
import type { UIComponent } from "@/lib/component-types";

export type { UIComponent, ComponentTheme } from "@/lib/component-types";

export const components: UIComponent[] = [
  auroraButton,
  neonButton,
  glassFocusCard,
  spotlightCard,
  loadingDots,
  aiPulseRing,
  modernToggle,
  avatarStack,
];

export function getComponent(slug: string) {
  return components.find((component) => component.slug === slug);
}
