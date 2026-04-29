import { corsHeaders } from "@supabase/supabase-js/cors";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";
const SPREADSHEET_ID = "10VGZa0tIkWp4IEK_jlFdM0pr7a3_EmduuLGqC36jEv0";
const SHEET = "Winter 2026 Game Stats";
const TEAM_FILTER = "Phantoms";

interface PlayerTotal {
  player: string;
  number: string;
  gp: number;
  g: number;
  a: number;
  pts: number;
  pim: number;
}

interface GameRow {
  date: string;
  opponent: string;
  homeAway: "HOME" | "VISITOR" | string;
  goalsFor: number;
  goalsAgainst: number;
  result: "W" | "L" | "T";
  gameLink: string;
}

let cache: { at: number; data: unknown } | null = null;
const TTL_MS = 5 * 60 * 1000;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    if (cache && Date.now() - cache.at < TTL_MS) {
      return json(cache.data);
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const GOOGLE_SHEETS_API_KEY = Deno.env.get("GOOGLE_SHEETS_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
    if (!GOOGLE_SHEETS_API_KEY) throw new Error("GOOGLE_SHEETS_API_KEY is not configured");

    const url = `${GATEWAY_URL}/spreadsheets/${SPREADSHEET_ID}/values/${SHEET}!A6:AA1000`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": GOOGLE_SHEETS_API_KEY,
      },
    });
    const body = await res.json();
    if (!res.ok) {
      throw new Error(`Sheets API failed [${res.status}]: ${JSON.stringify(body)}`);
    }

    const rows: string[][] = body.values ?? [];
    const header = rows[0] ?? [];
    const dataRows = rows.slice(1).filter((r) => r && r[1]);

    const idx = (name: string) => header.indexOf(name);
    const iDate = idx("Date");
    const iTeamName = idx("TEAMNAME");
    const iTeam = idx("TEAM");
    const iNum = idx("PLAYER_NUMBER");
    const iPlayer = idx("PLAYER");
    const iGP = idx("GP");
    const iG = idx("G");
    const iA = idx("A");
    const iPTS = idx("PTS");
    const iPIM = idx("PIM");
    const iGameLink = idx("GAME_LINK");
    const iLoc = idx("Location");

    const num = (v: string | undefined) => (v ? Number(v) || 0 : 0);

    // Player season totals (Phantoms only)
    const players = new Map<string, PlayerTotal>();
    for (const r of dataRows) {
      if (r[iTeam] !== TEAM_FILTER) continue;
      const key = `${r[iNum]}|${r[iPlayer]}`;
      const cur = players.get(key) ?? {
        player: r[iPlayer] ?? "",
        number: r[iNum] ?? "",
        gp: 0, g: 0, a: 0, pts: 0, pim: 0,
      };
      cur.gp += num(r[iGP]);
      cur.g += num(r[iG]);
      cur.a += num(r[iA]);
      cur.pts += num(r[iPTS]);
      cur.pim += num(r[iPIM]);
      players.set(key, cur);
    }

    const roster = [...players.values()].sort((a, b) => b.pts - a.pts || b.g - a.g);

    // Per-game results
    const gameMap = new Map<string, { date: string; gameLink: string; teams: Map<string, { name: string; goals: number; homeAway: string }> }>();
    for (const r of dataRows) {
      const link = r[iGameLink] ?? `${r[iDate]}-${r[iTeamName]}`;
      if (!gameMap.has(link)) {
        gameMap.set(link, { date: r[iDate] ?? "", gameLink: r[iGameLink] ?? "", teams: new Map() });
      }
      const g = gameMap.get(link)!;
      const tname = r[iTeam] ?? "";
      if (!g.teams.has(tname)) {
        g.teams.set(tname, { name: tname, goals: 0, homeAway: r[iLoc] ?? "" });
      }
      g.teams.get(tname)!.goals += num(r[iG]);
    }

    const games: GameRow[] = [];
    for (const g of gameMap.values()) {
      const phantoms = g.teams.get(TEAM_FILTER);
      if (!phantoms) continue;
      const opp = [...g.teams.values()].find((t) => t.name !== TEAM_FILTER);
      if (!opp) continue;
      const result: "W" | "L" | "T" =
        phantoms.goals > opp.goals ? "W" : phantoms.goals < opp.goals ? "L" : "T";
      games.push({
        date: g.date,
        opponent: opp.name,
        homeAway: phantoms.homeAway,
        goalsFor: phantoms.goals,
        goalsAgainst: opp.goals,
        result,
        gameLink: g.gameLink,
      });
    }
    games.sort((a, b) => (a.date < b.date ? 1 : -1));

    const record = games.reduce(
      (acc, g) => {
        acc[g.result === "W" ? "wins" : g.result === "L" ? "losses" : "ties"]++;
        acc.gf += g.goalsFor;
        acc.ga += g.goalsAgainst;
        return acc;
      },
      { wins: 0, losses: 0, ties: 0, gf: 0, ga: 0 }
    );

    const data = {
      season: "Winter 2026",
      team: TEAM_FILTER,
      record,
      players: roster,
      games,
      updatedAt: new Date().toISOString(),
    };
    cache = { at: Date.now(), data };
    return json(data);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error("team-stats error:", msg);
    return json({ error: msg }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
