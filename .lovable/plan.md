## Remove the "Roster & Stats" section

The SportNinja plugin in the Schedule section already shows roster, stats, and standings, making the custom "The Squad / Roster & Stats" block redundant.

### Changes
- Remove the `<Roster />` render and its import from `src/pages/Index.tsx`.
- Remove the "Roster" link from the nav in `src/components/site/Navbar.tsx` (and footer if present).
- Delete `src/components/site/Roster.tsx`.
- Delete the now-unused `supabase/functions/team-stats/` edge function and its entry in `supabase/config.toml` (the Google Sheets stats pipeline is no longer needed).

### Kept
- Google Sheets connection stays linked (harmless, easy to reuse later).
- SportNinja schedule plugin remains untouched.
