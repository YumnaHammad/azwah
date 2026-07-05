"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  computeSceneState,
  INITIAL_SCENE_STATE,
  type SceneState,
  type ViewMode,
} from "@/types/scene";

type SceneStore = {
  progress: number;
  state: SceneState;
  boutiqueProgress: number;
  viewMode: ViewMode;
  setProgress: (progress: number) => void;
  setBoutiqueProgress: (progress: number) => void;
  setViewMode: (mode: ViewMode) => void;
};

let progress = 0;
let boutiqueProgress = 0;
let viewMode: ViewMode = "bottle";
const listeners = new Set<() => void>();

let cachedKey = "";
let cachedSnapshot: SceneStore | null = null;

const SERVER_SNAPSHOT: SceneStore = {
  progress: 0,
  state: INITIAL_SCENE_STATE,
  boutiqueProgress: 0,
  viewMode: "bottle",
  setProgress: () => {},
  setBoutiqueProgress: () => {},
  setViewMode: () => {},
};

function notify() {
  cachedKey = "";
  listeners.forEach((l) => l());
}

function setProgress(value: number) {
  const next = Math.max(0, Math.min(1, value));
  if (next === progress) return;
  progress = next;
  notify();
}

function setBoutiqueProgress(value: number) {
  const next = Math.max(0, Math.min(1, value));
  if (next === boutiqueProgress) return;
  boutiqueProgress = next;
  notify();
}

function setViewMode(mode: ViewMode) {
  if (mode === viewMode) return;
  viewMode = mode;
  notify();
}

SERVER_SNAPSHOT.setProgress = setProgress;
SERVER_SNAPSHOT.setBoutiqueProgress = setBoutiqueProgress;
SERVER_SNAPSHOT.setViewMode = setViewMode;

function getSnapshot(): SceneStore {
  const key = `${progress}-${boutiqueProgress}-${viewMode}`;
  if (cachedSnapshot && cachedKey === key) return cachedSnapshot;

  cachedKey = key;
  cachedSnapshot = {
    progress,
    state: computeSceneState(progress),
    boutiqueProgress,
    viewMode,
    setProgress,
    setBoutiqueProgress,
    setViewMode,
  };
  return cachedSnapshot;
}

function getServerSnapshot(): SceneStore {
  return SERVER_SNAPSHOT;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const SceneContext = createContext<SceneStore>(SERVER_SNAPSHOT);

export function SceneProvider({ children }: { children: ReactNode }) {
  const store = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  return (
    <SceneContext.Provider value={store}>{children}</SceneContext.Provider>
  );
}

export function useScene() {
  return useContext(SceneContext);
}

export function useSceneState() {
  return useScene().state;
}
