export type PaletteKey =
  | "phosphor"
  | "amber"
  | "cyber"
  | "arctic"
  | "synth"
  | "gameboy"
  | "paper";

export type Palette = {
  key: PaletteKey;
  name: string;
  tagline: string;
  vibe: string;
  bestFor: string;
  mode: "dark" | "light";
  swatches: [string, string, string, string, string];
  bg: string;
  fg: string;
};

export const palettes: Palette[] = [
  {
    key: "phosphor",
    name: "Phosphor",
    tagline: "the original green screen",
    vibe: "1983 terminal, arcade cabinet, late-night coding",
    bestFor: "default run · retro credibility · dark rooms",
    mode: "dark",
    swatches: ["#3dff94", "#2ee6ff", "#ffb000", "#ff4d6d", "#b18cff"],
    bg: "#03070a",
    fg: "#3dff94",
  },
  {
    key: "amber",
    name: "Amber",
    tagline: "IBM 5151 monochrome",
    vibe: "warm, calm, dusty archive terminal",
    bestFor: "long reading sessions · low eye strain · print-flavoured",
    mode: "dark",
    swatches: ["#ffb000", "#ff8a3d", "#ffd24d", "#ff6b3d", "#d9a441"],
    bg: "#0c0803",
    fg: "#ffb000",
  },
  {
    key: "cyber",
    name: "Cyber",
    tagline: "neon magenta × electric cyan",
    vibe: "night city, synthesiser, arcade racer",
    bestFor: "demo day · projector wow-factor · stream overlays",
    mode: "dark",
    swatches: ["#00f0ff", "#ff2d95", "#ffe14d", "#a855f7", "#00f0ff"],
    bg: "#08030f",
    fg: "#00f0ff",
  },
  {
    key: "arctic",
    name: "Arctic",
    tagline: "cool-blue console",
    vibe: "calm technical documentation, ice, spacecraft UI",
    bestFor: "accessibility-first rooms · long workshops · fans of blue",
    mode: "dark",
    swatches: ["#6ff2d0", "#7cc7ff", "#ffd580", "#ff7a9c", "#a5b4fc"],
    bg: "#040a12",
    fg: "#7cc7ff",
  },
  {
    key: "synth",
    name: "Synth",
    tagline: "sunset synthwave",
    vibe: "golden hour on a CRT, retro-future poster",
    bestFor: "playful cohorts · social posts · a warmer dark mode",
    mode: "dark",
    swatches: ["#ffd166", "#56e1e9", "#ff9f1c", "#ff5c8a", "#c084fc"],
    bg: "#10040f",
    fg: "#ffd166",
  },
  {
    key: "gameboy",
    name: "Gameboy",
    tagline: "light LCD green",
    vibe: "handheld console, dot-matrix, school notebook",
    bestFor: "bright rooms · printed hand-outs · younger cohorts",
    mode: "light",
    swatches: ["#1b6b32", "#2b6a4a", "#7a5a12", "#8a2f2f", "#4a4a86"],
    bg: "#d9e6bd",
    fg: "#1b6b32",
  },
  {
    key: "paper",
    name: "Paper",
    tagline: "high-contrast light terminal",
    vibe: "clean documentation site, exam paper, whiteboard",
    bestFor: "projectors · accessibility · low vision · printing",
    mode: "light",
    swatches: ["#0b6b4f", "#0a5d8f", "#8a5a00", "#a3203b", "#5b3aa8"],
    bg: "#f4f6fa",
    fg: "#0d1220",
  },
];

export const defaultPalette: PaletteKey = "phosphor";

export function paletteByKey(key: string): Palette {
  return palettes.find((p) => p.key === key) ?? palettes[0];
}
