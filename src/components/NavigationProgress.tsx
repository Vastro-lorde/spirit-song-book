"use client";

import { useEffect, useCallback, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const barRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(false);

  const hideBar = useCallback(() => {
    const bar = barRef.current;
    if (!bar || !activeRef.current) return;

    bar.style.width = "100%";
    bar.style.opacity = "1";

    // Let the 100% width render, then fade out
    requestAnimationFrame(() => {
      setTimeout(() => {
        bar.style.transition = "opacity 300ms ease";
        bar.style.opacity = "0";
        setTimeout(() => {
          bar.style.transition = "none";
          bar.style.width = "0%";
          activeRef.current = false;
        }, 300);
      }, 150);
    });
  }, []);

  const showBar = useCallback(() => {
    const bar = barRef.current;
    if (!bar) return;

    activeRef.current = true;
    bar.style.transition = "none";
    bar.style.width = "0%";
    bar.style.opacity = "1";

    requestAnimationFrame(() => {
      bar.style.transition = "width 8s cubic-bezier(0.1, 0.05, 0, 1)";
      bar.style.width = "90%";
    });
  }, []);

  // Hide bar when route changes (navigation completes)
  useEffect(() => {
    hideBar();
  }, [pathname, searchParams, hideBar]);

  // Intercept internal link clicks to show the bar
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:")) return;

      // Don't trigger for open-in-new-tab
      if (e.ctrlKey || e.metaKey || e.shiftKey || anchor.target === "_blank") return;

      // It's an internal navigation
      const url = new URL(href, window.location.origin);
      if (url.origin !== window.location.origin) return;

      // Don't show for same-page navigation
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;

      // Don't show while offline download is in progress
      if (document.documentElement.dataset.downloading) return;

      showBar();
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [showBar]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] pointer-events-none">
      <div
        ref={barRef}
        className="h-full bg-rccg-gold"
        style={{ width: "0%", opacity: 0 }}
      />
    </div>
  );
}
