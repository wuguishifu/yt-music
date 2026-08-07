import { useSyncExternalStore } from 'react';

let enabled = false;
const listeners = new Set<() => void>();

export function enableTransitionAnimations() {
  if (enabled) return;
  enabled = true;
  listeners.forEach((listener) => listener());
}

export function useTransitionAnimationsEnabled() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => enabled,
  );
}
