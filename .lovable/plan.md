## Change
In `src/components/site/Schedule.tsx`, update the `backgroundColor` passed to `window.snPlugin.renderOrganization({...})` from `#0B0F1A` to `#64748b` (Tailwind slate-500).

## Note
This recolors the entire SportNinja widget background (schedule, standings, stats, etc.), not just the team-name strip. Also update the wrapper `bg-background` on the container `<div id="main-content">` to `bg-slate-500` so there's no flash of dark background before the plugin paints.

## Files
- `src/components/site/Schedule.tsx` — set `backgroundColor: "#64748b"` and change container class `bg-background` → `bg-slate-500`.
