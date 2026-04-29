import { Calendar, MapPin } from "lucide-react";

const games = [
  { date: "MAY 04", time: "7:30 PM", opponent: "Iron Wolves", location: "Rink 2 — Home", status: "upcoming" },
  { date: "MAY 11", time: "8:15 PM", opponent: "Northside Crows", location: "Northside Dek", status: "upcoming" },
  { date: "MAY 18", time: "7:00 PM", opponent: "Riverside Rebels", location: "Rink 2 — Home", status: "upcoming" },
  { date: "APR 27", time: "—", opponent: "Steel City", location: "Rink 1", status: "W 5–3" },
  { date: "APR 20", time: "—", opponent: "Bay Bandits", location: "Bayfront", status: "L 2–4" },
];

export const Schedule = () => {
  return (
    <section id="schedule" className="py-24 md:py-32 bg-secondary/30 relative">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">2026 Season</p>
          <h2 className="text-4xl md:text-6xl font-display">Schedule & Results</h2>
        </div>

        <div className="grid gap-4 max-w-4xl mx-auto">
          {games.map((g, i) => (
            <div
              key={i}
              className="glass rounded-xl p-5 md:p-6 flex flex-wrap md:flex-nowrap items-center gap-4 md:gap-6 hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
            >
              <div className="flex-shrink-0 text-center min-w-[70px]">
                <div className="font-display text-2xl text-gradient-phantom">{g.date}</div>
                <div className="text-xs text-muted-foreground mt-1">{g.time}</div>
              </div>
              <div className="hidden md:block w-px h-12 bg-border" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-lg text-foreground">vs {g.opponent}</div>
                <div className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                  <MapPin className="h-3.5 w-3.5" /> {g.location}
                </div>
              </div>
              <div className="flex-shrink-0">
                {g.status === "upcoming" ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/15 text-primary text-xs font-semibold uppercase tracking-wider">
                    <Calendar className="h-3 w-3" /> Upcoming
                  </span>
                ) : (
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                      g.status.startsWith("W") ? "bg-accent/20 text-accent" : "bg-destructive/20 text-destructive"
                    }`}
                  >
                    {g.status}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
