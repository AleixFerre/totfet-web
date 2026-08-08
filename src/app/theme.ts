import { definePreset } from '@openng/optimus-ui-themes';
import Aura from '@openng/optimus-ui-themes/aura';

/**
 * Warm orange ramp anchored on the app's brand colour at shade 400.
 *
 * `#ffd180` is Material's `orange` A100 — the primary the app used through
 * `mat.m2-define-palette(mat.$m2-orange-palette, A100, A200, A400)` — and it is
 * still the `theme_color` in `manifest.webmanifest`. Shades 500 (`#ffb647`) and
 * 600 (`#ff930f`) land on the old A200 / A400 for the same reason.
 *
 * Aura's dark scheme paints `primary.color` from shade 400, so 400 is the shade
 * that actually shows up on buttons and focus rings.
 */
const brandOrange = {
  50: '#fff9f0',
  100: '#fff4e0',
  200: '#ffe7bd',
  300: '#ffdb9e',
  400: '#ffd180',
  500: '#ffb647',
  600: '#ff930f',
  700: '#d76e04',
  800: '#a65107',
  900: '#813d08',
  950: '#491f04',
};

/**
 * Neutral dark ramp. Aura's dark scheme uses `surface.900` for content and
 * overlay backgrounds and `surface.950` for form fields, so 900 is pinned to
 * `#2c2c2c` — the background `styles.scss`, `index.html`'s `theme-color` meta
 * and the web manifest all already use.
 */
const darkSurface = {
  0: '#ffffff',
  50: '#f7f7f7',
  100: '#ededed',
  200: '#dedede',
  300: '#c4c4c4',
  400: '#9e9e9e',
  500: '#757575',
  600: '#565656',
  700: '#3f3f3f',
  800: '#353535',
  900: '#2c2c2c',
  950: '#222222',
};

export const TotfetPreset = definePreset(Aura, {
  semantic: {
    primary: brandOrange,
    colorScheme: {
      dark: {
        surface: darkSurface,
        // Aura defaults to pure white text; the app has always used #ebebeb.
        text: {
          color: '#ebebeb',
          hoverColor: '#ffffff',
          mutedColor: '{surface.400}',
          hoverMutedColor: '{surface.300}',
        },
      },
    },
  },
});
