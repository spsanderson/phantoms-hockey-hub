import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Trophy, TrendingUp, Loader2 } from "lucide-react";

interface Player {
  player: string;
  number: string;
  gp: number;
  g: number;
  a: number;
  pts: number;
  pim: number;
}

interface Game {
  date: string;
  opponent: string;
  homeAway: string;
  goalsFor: number;
  goalsAgainst: number;
  result: "W" | "L" | "T";
  gameLink: string;
}

interface StatsPayload {
  season: string;
  team: string;
  record: { wins: number; losses: number; ties: number; gf: number; ga: number };
  players: Player[];
  games: Game[];
  updatedAt: string;
}

export const Roster = () => {
  const [data, setData] = useState<StatsPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke<StatsPayload>("team-stats");
        if (cancelled) return;
        if (error) throw error;
        if ((data as unknown as { error?: string })?.error) {
          throw new Error((data as unknown as { error: string }).error);
        }
        setData(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load stats");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <section id="roster" className="py-24 md:py-32 relative">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">The Squad</p>
          <h2 className="text-4xl md:text-6xl font-display">Roster & Stats</h2>
          {data && (
            <p className="text-muted-foreground mt-4 text-sm">
              {data.season} • Live from team stats sheet
            </p>
          )}
        </div>

        {loading && (
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading stats…
          </div>
        )}

        {error && !loading && (
          <div className="max-w-xl mx-auto glass rounded-xl p-6 text-center text-destructive">
            Couldn't load stats: {error}
          </div>
        )}

        {data && !loading && (
          <>
            {/* Record cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
              <RecordCard label="Record" value={`${data.record.wins}-${data.record.losses}-${data.record.ties}`} />
              <RecordCard label="Goals For" value={data.record.gf} />
              <RecordCard label="Goals Against" value={data.record.ga} />
              <RecordCard label="Diff" value={(data.record.gf - data.record.ga >= 0 ? "+" : "") + (data.record.gf - data.record.ga)} />
            </div>

            {/* Leaderboard */}
            <div className="max-w-4xl mx-auto glass rounded-2xl overflow-hidden border border-border/60">
              <div className="px-6 py-4 border-b border-border flex items-center gap-2">
                <Trophy className="h-4 w-4 text-primary" />
                <h3 className="font-display text-xl tracking-wider">Player Leaderboard</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/40 text-muted-foreground uppercase text-xs tracking-wider">
                    <tr>
                      <th className="text-left px-4 py-3">#</th>
                      <th className="text-left px-4 py-3">Player</th>
                      <th className="text-right px-3 py-3">GP</th>
                      <th className="text-right px-3 py-3">G</th>
                      <th className="text-right px-3 py-3">A</th>
                      <th className="text-right px-3 py-3 text-primary">PTS</th>
                      <th className="text-right px-4 py-3">PIM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.players.map((p, i) => (
                      <tr key={`${p.number}-${p.player}`} className="border-t border-border/50 hover:bg-secondary/30 transition-colors">
                        <td className="px-4 py-3 font-display text-slate-800">{p.number || "—"}</td>
                        <td className="px-4 py-3 font-medium text-foreground flex items-center gap-2">
                          {p.player}
                          {i === 0 && p.pts > 0 && <TrendingUp className="h-3.5 w-3.5 text-accent" />}
                        </td>
                        <td className="px-3 py-3 text-right text-muted-foreground">{p.gp}</td>
                        <td className="px-3 py-3 text-right">{p.g}</td>
                        <td className="px-3 py-3 text-right">{p.a}</td>
                        <td className="px-3 py-3 text-right font-bold text-primary">{p.pts}</td>
                        <td className="px-4 py-3 text-right text-muted-foreground">{p.pim}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

const RecordCard = ({ label, value }: { label: string; value: string | number }) => (
  <div className="glass rounded-xl p-5 text-center">
    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{label}</div>
    <div className="font-display text-3xl md:text-4xl text-gradient-phantom">{value}</div>
  </div>
);
