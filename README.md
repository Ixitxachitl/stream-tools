# Ixitxachitl's Stream Tools

A small static site that collects Ixitxachitl's free stream overlays and widgets in one place. Each tool
gets a card, a screenshot, and a setup guide. The site uses the same comic look as the Rave overlays
(Bangers + Comic Neue, thick ink outlines, hard shadows, halftone dots, neon rave colors).

| Tool                  | Lives at                                         | Guide                                                |
| --------------------- | ------------------------------------------------ | ---------------------------------------------------- |
| Rave Chat             | <https://rave.ixitxachitl.com/>                  | [tools/rave.html](tools/rave.html)                   |
| Chat Comics           | <https://comics.ixitxachitl.com/>                | [tools/chat-comics.html](tools/chat-comics.html)     |
| Stunt Wheel           | <https://race.ixitxachitl.com/>                  | [tools/stunt-wheel.html](tools/stunt-wheel.html)     |
| Stream Pet            | <https://pet.ixitxachitl.com/>                   | [tools/stream-pet.html](tools/stream-pet.html)       |
| Clip Shoutout         | <https://clips.ixitxachitl.com/>                 | [tools/clip-shoutout.html](tools/clip-shoutout.html) |
| Ball Drop             | <https://drop.ixitxachitl.com/>                  | [tools/ball-drop.html](tools/ball-drop.html)         |
| Duel                  | <https://duel.ixitxachitl.com/>                  | [tools/duel.html](tools/duel.html)                   |
| Game Wheel            | <https://wheel.ixitxachitl.com/>                 | [tools/game-wheel.html](tools/game-wheel.html)       |
| Countdown Timer       | <https://countdown.ixitxachitl.com/>             | [tools/countdown.html](tools/countdown.html)         |
| Snowfall              | <https://snow.ixitxachitl.com/>                  | [tools/snowfall.html](tools/snowfall.html)           |
| Input Display         | <https://input.ixitxachitl.com/>                 | [tools/input-display.html](tools/input-display.html) |
| StreamEdge (app)      | <https://github.com/Ixitxachitl/stream-edge>     | `#apps` on the home page (download links)            |
| Desktop Overlay (app) | <https://github.com/Ixitxachitl/desktop-overlay> | `#desktop-overlay` on the home page (download link)  |

## Layout

```text
index.html            home page: hero, tool cards, general OBS setup
tools/*.html          one setup guide per tool
assets/css/comic.css  the whole theme
assets/js/site.js     copy-link buttons, toast, setup-link builder
assets/icons/*.svg    manta logo + tool icons
assets/img/*.webp     screenshots (wide ones for pages / og:image, *-card ones for the home cards)
favicon.svg
.github/workflows/streamedge-release.yml  hourly: StreamEdge card follows its newest release
.github/workflows/desktop-overlay-release.yml  hourly: same for the Desktop Overlay card
```

There's no build step and no dependencies apart from Google Fonts.

## Run it locally

```sh
python -m http.server 8000
# then open http://localhost:8000/
```

## Deploy

It's plain static files, so any static host works. For GitHub Pages: Settings → Pages → deploy from the
`main` branch, root folder. The `.nojekyll` file is already there. To use a custom domain, add a `CNAME`
file with the domain in it.

## Adding a new tool

1. Copy the closest existing page in `tools/` (`rave.html` for a chat overlay, `game-wheel.html` for
   a widget) and rewrite its content.
2. Add an icon to `assets/icons/` (64×64 viewBox, `#111` strokes about 2.6 wide, so it matches the others).
3. Add a 760×380 card screenshot to `assets/img/` (see below).
4. In `index.html`, copy one of the `<article class="tool">` cards into the right shelf: **Chat overlays**,
   **Chat games & commands** or **Widgets & effects** (desktop apps go in **Desktop apps**). Keep every card
   the same: a screenshot and icon, a pitch of about 120 characters, three chips that set it apart, and the
   two buttons **How to set up** and **Try it ↗**. Set `--accent` to a theme color its neighbours don't use.
   Shelves are four across, so keep each one to four cards (the "Soon!" card fills a gap); if a shelf
   outgrows that, give it a second row of four or split it.
5. Add the new page to the `<nav>` in the header of **every** page, in the same order as the shelves.

## Retaking screenshots

The overlays have a demo mode, so headless Chrome can capture them directly. Bubbles are random, so take a
few captures at different timings and keep the best one:

```sh
chrome --headless=new --hide-scrollbars --window-size=760,380 \
  --default-background-color=1a0f33ff --virtual-time-budget=11000 \
  --screenshot=shot.png "https://rave.ixitxachitl.com/?demo=1&size=105&max=5"
```

Convert to WebP (for example with Pillow: `Image.open("shot.png").save("x.webp", quality=88)`).
