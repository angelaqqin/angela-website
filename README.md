# Mahjong Landing Page

A single-screen landing page filled with uniform mahjong tiles. The **8 tiles in the center** (a 4×2 block) are clickable links; surrounding tiles extend past the screen edges for a cropped, wallpaper-like effect.

## Preview

Open `index.html` in a browser, or run a local server:

```bash
cd mahjong-landing
python3 -m http.server 8080
```

Then visit [http://localhost:8080](http://localhost:8080).

## Customize links

Edit the `LINKS` array at the top of `script.js`:

```js
const LINKS = [
  { href: "/about",    label: "About",    tile: "wan-1" },
  { href: "/work",     label: "Work",     tile: "wan-5" },
  // ... 8 entries total (top row left→right, then bottom row)
];
```

- `href` — where the tile goes
- `label` — accessible name for screen readers
- `tile` — face design (`wan-1`…`wan-9`, `tong-1`…`tong-9`, `tiao-1`…`tiao-9`, `east`, `south`, `west`, `north`, `red`, `green`, `white`)

## Layout

- 10 columns × 12 rows, centered on the viewport
- No scrolling (`overflow: hidden`)
- Tile size scales with the screen so the center 4×2 block stays fully visible
