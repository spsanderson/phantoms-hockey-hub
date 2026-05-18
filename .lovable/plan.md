## Goal
Style a sub-element inside the SportNinja plugin's shadow DOM (XPath `/div/div/div[2]/div[3]/div[4]/div/div/div[2]`) with a slate-500 background.

## Approach
After the plugin renders, locate its shadow root and inject a `<style>` tag whose selector mirrors that XPath as nth-child CSS:

```
div > div > div:nth-child(2) > div:nth-child(3) > div:nth-child(4) > div > div > div:nth-child(2) {
  background-color: #64748b !important;
}
```

## Implementation in `src/components/site/Schedule.tsx`
After the existing `render()` call in the effect:

1. Add an `injectShadowStyle()` helper that:
   - Looks for the plugin host element (try `#sn-root-plugin`, fall back to any element under `containerRef` with a `shadowRoot`).
   - If found and not already injected, appends a `<style data-phantoms-override>` node into the shadow root with the rule above.
2. Run it once after `render()`, then set up a `MutationObserver` on `containerRef.current` (subtree, childList) that re-runs the helper whenever the shadow root contents change — covers async mount and tab switches.
3. Disconnect the observer on unmount.

## Caveats
- SportNinja's DOM structure can change between plugin updates; the nth-child path may stop matching. We'll keep it scoped to this one rule so it fails silently rather than breaking other styling.

## Files
- `src/components/site/Schedule.tsx` — add the shadow-DOM style injection logic inside the existing `useEffect`.
