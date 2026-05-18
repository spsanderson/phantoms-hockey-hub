## Goal
Improve the appearance of links/elements inside the SportNinja plugin (which renders in a shadow DOM we can't style from outside) by adjusting the colors passed to `renderOrganization`.

## Change
In `src/components/site/Schedule.tsx`, update the config object passed to `window.snPlugin.renderOrganization({...})`.

Current values:
- backgroundColor: `#0B0F1A`
- textColor: `#E6ECF5`
- headerBackgroundColor: `#1A0F2E`
- headerTextColor: `#F5F0FF`
- primaryColor: `#8B5CF6` (controls link/accent color — this is what the targeted `<a>` likely uses)
- borderColor: `#2A2438`

Based on the requested classes (`text-slate-50` on `bg-slate-800` with transparent border), proposed update:
- primaryColor: `#f8fafc` (slate-50) — makes links read as light text
- headerBackgroundColor: `#1e293b` (slate-800)
- borderColor: `transparent`

Other values stay as-is to keep the existing dark phantom theme.

## Open question
The plugin exposes a limited set of color knobs — it can't target one specific `<a>`. The change will affect all links/accents inside the widget, not just the single element matched by your CSS selector. If you wanted only that one link restyled, that isn't reachable from our code.

## Files
- `src/components/site/Schedule.tsx` — update the 3 color values in the `renderOrganization` config.
