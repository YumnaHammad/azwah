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
} from "@/types/scene";

type SceneStore = {
  progress: number;
  state: SceneState;
  setProgress: (progress: number) => void;
};

let progress = 0;
const listeners = new Set<() => void>();

let cachedProgress = -1;
let cachedSnapshot: SceneStore | null = null;

const SERVER_SNAPSHOT: SceneStore = {
  progress: 0,
  state: INITIAL_SCENE_STATE,
  setProgress: () => {},
};

function setProgress(value: number) {
  const next = Math.max(0, Math.min(1, value));
  if (next === progress) return;
  progress = next;
  cachedProgress = -1;
  listeners.forEach((l) => l());
}

SERVER_SNAPSHOT.setProgress = setProgress;

function getSnapshot(): SceneStore {
  if (cachedSnapshot && cachedProgress === progress) {
    return cachedSnapshot;
  }

  cachedProgress = progress;
  cachedSnapshot = {
    progress,
    state: computeSceneState(progress),
    setProgress,
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
