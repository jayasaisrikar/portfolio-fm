import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

const VisualMotionContext = createContext({ paused: false, systemReduced: false, toggle: () => {} });
export function VisualMotionProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  const [systemReduced, setSystemReduced] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let saved = false;
    try { saved = localStorage.getItem('jay-motion-paused') === 'true'; } catch { /* Storage can be unavailable in private contexts. */ }
    setPaused(saved);
    setSystemReduced(preference.matches);
    const change = () => setSystemReduced(preference.matches);
    preference.addEventListener('change', change);
    return () => preference.removeEventListener('change', change);
  }, []);
  function toggle() {
    setPaused(value => {
      try { localStorage.setItem('jay-motion-paused', String(!value)); } catch { /* Preference remains usable for this visit. */ }
      return !value;
    });
  }
  return <VisualMotionContext.Provider value={{ paused: paused || systemReduced, systemReduced, toggle }}>{children}</VisualMotionContext.Provider>;
}
export const useVisualMotion = () => useContext(VisualMotionContext);
