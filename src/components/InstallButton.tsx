"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

const buttonStyle = {
  color: "var(--color-chat-dim)",
  border: "1px solid var(--color-chat-border)",
};

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

  const handleClick = async () => {
    if (showIOS) {
      alert('Tap Share \u2192 "Add to Home Screen" to install MarkBot.');
      return;
    }
    if (deferred) {
      await deferred.prompt();
      const { outcome } = await deferred.userChoice;
      if (outcome === "accepted") {
        setDeferred(null);
        setInstalled(true);
      }
      return;
    }
    // No install prompt available (already offered, dismissed, or this
    // browser does not provide one) — the download page always works:
    // it carries the Android APK and the browser option.
    window.location.href = "/download";
  };

  // Already running as the installed app — nothing to download.
  if (installed) return null;

  return (
    <button
      onClick={handleClick}
      className="px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors"
      style={buttonStyle}
    >
      ⬇ Download
    </button>
  );
}
