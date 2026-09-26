import { Code2, Cpu, FlaskConical, Lightbulb, LockKeyhole, Network } from "lucide-react";

export const interests = [
  { label: "AI", detail: "Exploring what machines can learn, create, and understand.", icon: Cpu },
  { label: "CODE", detail: "Turning an idea into something that actually works.", icon: Code2 },
  { label: "SCIENCE", detail: "Asking why, then asking what happens next.", icon: FlaskConical },
  { label: "CYBER", detail: "Understanding systems, patterns, and how they can be protected.", icon: LockKeyhole },
  { label: "TECH", detail: "Following the tools and ideas that change what people can build.", icon: Network },
  { label: "BUSINESS", detail: "Thinking about ideas, products, and what could actually be built.", icon: Lightbulb },
] as const;

export const chapters = [
  { id: "mind", label: "01 / MIND" },
  { id: "curiosity", label: "02 / CURIOSITY" },
  { id: "builder", label: "03 / BUILDER" },
  { id: "explorer", label: "04 / EXPLORE" },
  { id: "ideas", label: "05 / IDEAS" },
  { id: "future", label: "06 / FUTURE" },
] as const;
