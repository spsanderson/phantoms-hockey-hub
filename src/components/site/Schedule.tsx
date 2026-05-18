import { useEffect, useRef } from "react";

declare global {
  interface Window {
    snPlugin?: {
      init: () => void;
      renderOrganization: (config: Record<string, unknown>) => void;
    };
  }
}

const SPORTNINJA_SCRIPT_SRC = "https://plugin.sportninja.com/sportninja-plugin.js";

export const Schedule = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;

    const render = () => {
      if (!window.snPlugin || !containerRef.current) return;

      try {
        window.snPlugin.init();
        window.snPlugin.renderOrganization({
          teamId: "Z6UmwMtff38o8OkO",
          backgroundColor: "transparent",
          textColor: "#FFFFFF",
          headerBackgroundColor: "#F2B400",
          headerTextColor: "#27303E",
          primaryColor: "#F2B400",
          borderColor: "#F2B400",
          disableSuspensionsTab: false,
          disableScheduleTab: false,
          disableStandingsTab: false,
          disableStatisticsTab: false,
          disableAnnouncementsTab: false,
          disableProvider: true,
        });
        initializedRef.current = true;
      } catch (e) {
        console.error("SportNinja plugin failed to render", e);
      }
    };

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SPORTNINJA_SCRIPT_SRC}"]`
    );

    if (existing && window.snPlugin) {
      render();
    } else if (existing) {
      existing.addEventListener("load", render, { once: true });
    } else {
      const script = document.createElement("script");
      script.src = SPORTNINJA_SCRIPT_SRC;
      script.async = true;
      script.onload = render;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section id="schedule" className="py-24 md:py-32 bg-secondary/30 relative">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
            2026 Season
          </p>
          <h2 className="text-4xl md:text-6xl font-display">
            Schedule & Standings
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Live games, results, standings, statistics, and announcements powered by SportNinja.
          </p>
        </div>

        <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden border border-primary/40 bg-background/40 backdrop-blur-md shadow-[0_24px_80px_-32px_rgba(242,180,0,0.55)]">
          <div className="flex flex-col gap-2 border-b border-[#F2B400]/30 bg-gradient-to-r from-[#F2B400] to-[#FFE7A3] px-5 py-4 text-[#27303E] md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] opacity-80">
                Phantoms Team Center
              </p>
              <h3 className="font-display text-3xl leading-none md:text-4xl">
                Schedule · Standings · Stats
              </h3>
            </div>
            <span className="inline-flex w-fit rounded-full border border-[#27303E]/20 bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em]">
              Live Data
            </span>
          </div>

          <div
            id="main-content"
            ref={containerRef}
            className="main-content min-h-[600px] bg-transparent p-2 text-white md:p-4"
          />
        </div>
      </div>
    </section>
  );
};
