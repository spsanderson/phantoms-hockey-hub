import { useEffect, useRef } from "react";

declare global {
  interface Window {
    snPlugin?: {
      init: () => void;
      renderOrganization: (config: Record<string, unknown>) => void;
    };
  }
}

export const Schedule = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;

    const SCRIPT_SRC = "https://plugin.sportninja.com/sportninja-plugin.js";

    const OVERRIDE_CSS = `
      div > div > div:nth-child(2) > div:nth-child(3) > div:nth-child(4) > div > div > div:nth-child(2) {
        background-color: #64748b !important;
      }
    `;

    const findShadowRoot = (): ShadowRoot | null => {
      const host =
        (document.getElementById("sn-root-plugin") as HTMLElement | null) ??
        (containerRef.current?.querySelector("*") as HTMLElement | null);
      if (host?.shadowRoot) return host.shadowRoot;
      const all = containerRef.current?.querySelectorAll<HTMLElement>("*") ?? [];
      for (const el of all) {
        if (el.shadowRoot) return el.shadowRoot;
      }
      return null;
    };

    const injectShadowStyle = () => {
      const root = findShadowRoot();
      if (!root) return;
      if (root.querySelector("style[data-phantoms-override]")) return;
      const style = document.createElement("style");
      style.setAttribute("data-phantoms-override", "");
      style.textContent = OVERRIDE_CSS;
      root.appendChild(style);
    };

    let observer: MutationObserver | null = null;
    const startObserver = () => {
      if (!containerRef.current) return;
      observer = new MutationObserver(() => injectShadowStyle());
      observer.observe(containerRef.current, { childList: true, subtree: true });
    };

    const render = () => {
      if (!window.snPlugin || !containerRef.current) return;
      try {
        window.snPlugin.init();
        window.snPlugin.renderOrganization({
          teamId: "Z6UmwMtff38o8OkO",
          backgroundColor: "#64748b",
          textColor: "#E6ECF5",
          headerBackgroundColor: "#1e293b",
          headerTextColor: "#F5F0FF",
          primaryColor: "#f8fafc",
          borderColor: "transparent",
          disableSuspensionsTab: false,
          disableScheduleTab: false,
          disableStandingsTab: false,
          disableStatisticsTab: false,
          disableAnnouncementsTab: false,
          disableProvider: true,
        });
        initializedRef.current = true;
        injectShadowStyle();
        startObserver();
      } catch (e) {
        console.error("SportNinja plugin failed to render", e);
      }
    };

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`
    );
    if (existing && window.snPlugin) {
      render();
    } else if (existing) {
      existing.addEventListener("load", render, { once: true });
    } else {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = render;
      document.body.appendChild(script);
    }

    return () => {
      observer?.disconnect();
    };
  }, []);


  return (
    <section id="schedule" className="py-24 md:py-32 bg-secondary/30 relative">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">2026 Season</p>
          <h2 className="text-4xl md:text-6xl font-display">Schedule & Standings</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Live games, results, and stats powered by SportNinja.
          </p>
        </div>

        <div className="max-w-6xl mx-auto glass rounded-2xl overflow-hidden border border-border/60">
          <div
            id="main-content"
            ref={containerRef}
            className="main-content min-h-[600px] bg-slate-500"
          />
        </div>
      </div>
    </section>
  );
};
