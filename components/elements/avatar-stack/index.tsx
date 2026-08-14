import type { UIComponent } from "@/lib/component-types";

export const avatarStack: UIComponent = {
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
};

export function AvatarStackPreview() {
  return (
    <div className="demo-avatar-stack">
      <span>AM</span>
      <span>KR</span>
      <span>DR</span>
      <span className="more">+8</span>
    </div>
  );
}
