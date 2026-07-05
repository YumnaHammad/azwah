export interface SceneState {
  progress: number;
  phase: "intro" | "reveal" | "open" | "spray" | "transform" | "exit";
  capLift: number;
  sprayIntensity: number;
  mistIntensity: number;
  bottleOpacity: number;
  bottleScale: number;
  bottleY: number;
  cameraZ: number;
  cameraY: number;
  bottleRotation: number;
  ambientIntensity: number;
  goldIntensity: number;
  particleOpacity: number;
  canvasOpacity: number;
}

export const INITIAL_SCENE_STATE: SceneState = {
  progress: 0,
  phase: "intro",
  capLift: 0,
  sprayIntensity: 0,
  mistIntensity: 0,
  bottleOpacity: 1,
  bottleScale: 1,
  bottleY: 0,
  cameraZ: 9.2,
  cameraY: 0.05,
  bottleRotation: 0,
  ambientIntensity: 0.35,
  goldIntensity: 0.6,
  particleOpacity: 0.35,
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

  let phase: SceneState["phase"] = "intro";
  if (p >= 0.88) phase = "exit";
  else if (p >= 0.72) phase = "transform";
  else if (p >= 0.52) phase = "spray";
  else if (p >= 0.38) phase = "open";
  else if (p >= 0.18) phase = "reveal";

  const capLift = rangeMap(p, 0.38, 0.52);
  const sprayIntensity =
    p < 0.52
      ? 0
      : p < 0.72
        ? rangeMap(p, 0.52, 0.68)
        : Math.max(0, 1 - rangeMap(p, 0.72, 0.88));

  const mistIntensity = rangeMap(p, 0.6, 0.95);
  const bottleFade = 1 - rangeMap(p, 0.72, 0.9);
  const bottleOpacity = bottleFade;
  const bottleScale = 1 + rangeMap(p, 0.52, 0.65) * 0.06 - rangeMap(p, 0.72, 0.9) * 0.25;
  const bottleY = rangeMap(p, 0.72, 0.92) * 0.8;

  const cameraZ = 9.2 - rangeMap(p, 0.1, 0.45) * 1.6;
  const cameraY = 0.05 + rangeMap(p, 0.1, 0.45) * 0.15;
  const bottleRotation = p * Math.PI * 0.35;
  const ambientIntensity = 0.35 + rangeMap(p, 0.5, 0.85) * 0.75;
  const goldIntensity = 0.6 + rangeMap(p, 0.45, 0.8) * 1.0;
  const particleOpacity = 0.35 + rangeMap(p, 0.4, 0.85) * 0.65;
  const canvasOpacity = 1 - rangeMap(p, 0.92, 1.0);

  return {
    progress: p,
    phase,
    capLift,
    sprayIntensity,
    mistIntensity,
    bottleOpacity,
    bottleScale,
    bottleY,
    cameraZ,
    cameraY,
    bottleRotation,
    ambientIntensity,
    goldIntensity,
    particleOpacity,
    canvasOpacity,
  };
}
