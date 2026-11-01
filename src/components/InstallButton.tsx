"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function InstallButton() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [showIOS, setShowIOS] = useState(false);

  useEffect(() => {
    // Browser-only detection (display mode, platform). It runs inside a
    // frame callback so the first render matches the server output and the
    // state updates land in a callback, not synchronously in the effect.
    const raf = requestAnimationFrame(() => {
      const isInstalled =
        window.matchMedia("(display-mode: standalone)").matches ||
        window.matchMedia("(display-mode: minimal-ui)").matches ||
        window.matchMedia("(display-mode: window-controls-overlay)").matches ||
        (navigator as Navigator & { standalone?: boolean }).standalone === true;

      if (isInstalled) {
        setInstalled(true);
        return;
      }

      const isSafari =
        /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
      const ios =
        /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
      setShowIOS(ios && isSafari);
    });

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };

    const onInstalled = () => {
      setInstalled(true);
      setDeferred(null);
    };

    const mql = window.matchMedia("(display-mode: standalone)");
    const onDisplayModeChange = (e: MediaQueryListEvent) => {
      if (e.matches) setInstalled(true);
    };
    mql.addEventListener("change", onDisplayModeChange);

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      cancelAnimationFrame(raf);
      mql.removeEventListener("change", onDisplayModeChange);
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferred) return;
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    if (outcome === "accepted") {
      setDeferred(null);
      setInstalled(true);
    }
  };

  if (installed) return null;

  if (showIOS) {
    return (
      <button
        onClick={() =>
          alert('Tap Share \u2192 "Add to Home Screen"')
        }
        className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-2"
      >
        Install App
      </button>
    );
  }

  if (!deferred) return null;

  return (
    <button
      onClick={handleInstall}
      className="px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white hover:opacity-90 transition-all active:scale-95"
    >
      Install App
    </button>
  );
}
