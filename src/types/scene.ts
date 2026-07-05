export type ScenePhase =
  | "intro"
  | "glow"
  | "reveal"
  | "unlock"
  | "lift"
  | "escape"
  | "spray"
  | "spread"
  | "exit";

export type ViewMode = "bottle" | "boutique";

export interface SceneState {
  progress: number;
  phase: ScenePhase;
  capUnlock: number;
  capLift: number;
  dipTubeVisible: number;
  atomizerPress: number;
  sprayIntensity: number;
  mistIntensity: number;
  fragranceSpread: number;
  bottleGlow: number;
  bottleFloat: number;
  bottleOpacity: number;
  bottleScale: number;
  bottleY: number;
  cameraZ: number;
  cameraY: number;
  bottleRotation: number;
  ambientIntensity: number;
  goldIntensity: number;
  particleOpacity: number;
  environmentWarmth: number;
  canvasOpacity: number;
}

export const INITIAL_SCENE_STATE: SceneState = {
  progress: 0,
  phase: "intro",
  capUnlock: 0,
  capLift: 0,
  dipTubeVisible: 0,
  atomizerPress: 0,
  sprayIntensity: 0,
  mistIntensity: 0,
  fragranceSpread: 0,
  bottleGlow: 0,
  bottleFloat: 0,
  bottleOpacity: 1,
  bottleScale: 1,
  bottleY: 0,
  cameraZ: 8.6,
  cameraY: 0,
  bottleRotation: 0,
  ambientIntensity: 0.35,
  goldIntensity: 0.55,
  particleOpacity: 0.3,
  environmentWarmth: 0,
  canvasOpacity: 1,
};

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function rangeMap(p: number, start: number, end: number) {
  if (p <= start) return 0;
  if (p >= end) return 1;
  return (p - start) / (end - start);
}

export function computeSceneState(progress: number): SceneState {
  const p = clamp01(progress);

  let phase: ScenePhase = "intro";
  if (p >= 0.88) phase = "exit";
  else if (p >= 0.68) phase = "spread";
  else if (p >= 0.52) phase = "spray";
  else if (p >= 0.44) phase = "escape";
  else if (p >= 0.32) phase = "lift";
  else if (p >= 0.24) phase = "unlock";
  else if (p >= 0.12) phase = "reveal";
  else if (p >= 0.04) phase = "glow";

  const bottleGlow = rangeMap(p, 0.04, 0.2);
  const capUnlock = rangeMap(p, 0.24, 0.32);
  const capLift = rangeMap(p, 0.32, 0.48);
  const dipTubeVisible = rangeMap(p, 0.34, 0.42);
  const mistIntensity = rangeMap(p, 0.44, 0.58);
  const atomizerPress = rangeMap(p, 0.52, 0.58);
  const sprayIntensity =
    p < 0.52
      ? 0
      : p < 0.68
        ? rangeMap(p, 0.52, 0.65)
        : Math.max(0, 1 - rangeMap(p, 0.68, 0.82));
  const fragranceSpread = rangeMap(p, 0.62, 0.88);
  const environmentWarmth = rangeMap(p, 0.55, 0.9);
  const bottleFade = 1 - rangeMap(p, 0.75, 0.92);
  const bottleOpacity = bottleFade;
  const bottleScale =
    1 + rangeMap(p, 0.52, 0.62) * 0.04 - rangeMap(p, 0.75, 0.92) * 0.2;
  const bottleY = rangeMap(p, 0.75, 0.92) * 0.6;
  const bottleFloat = Math.sin(p * Math.PI * 4) * 0.02;

  const cameraZ = 8.6 - rangeMap(p, 0.1, 0.38) * 1.6;
  const cameraY = rangeMap(p, 0.1, 0.38) * 0.08;
  const bottleRotation =
    rangeMap(p, 0.12, 0.35) * 0.6 + p * 0.15;
  const ambientIntensity = 0.35 + environmentWarmth * 0.85;
  const goldIntensity = 0.55 + environmentWarmth * 1.15;
  const particleOpacity = 0.3 + rangeMap(p, 0.04, 0.85) * 0.7;
  const canvasOpacity = 1 - rangeMap(p, 0.72, 0.86);

  return {
    progress: p,
    phase,
    capUnlock,
    capLift,
    dipTubeVisible,
    atomizerPress,
    sprayIntensity,
    mistIntensity,
    fragranceSpread,
    bottleGlow,
    bottleFloat,
    bottleOpacity,
    bottleScale,
    bottleY,
    cameraZ,
    cameraY,
    bottleRotation,
    ambientIntensity,
    goldIntensity,
    particleOpacity,
    environmentWarmth,
    canvasOpacity,
  };
}
