# Ixitxachitl's Stream Tools

A small static site that collects Ixitxachitl's free stream overlays and widgets in one place. Each tool
gets a card, a screenshot, and a setup guide. The site uses the same comic look as the Rave overlays
(Bangers + Comic Neue, thick ink outlines, hard shadows, halftone dots, neon rave colors).

| Tool              | Lives at                                     | Guide                                                |
| ----------------- | -------------------------------------------- | ---------------------------------------------------- |
| Rave Chat         | <https://rave.ixitxachitl.com/>              | [tools/rave.html](tools/rave.html)                   |
| Chat Comics       | <https://comics.ixitxachitl.com/>            | [tools/chat-comics.html](tools/chat-comics.html)     |
| Game Wheel        | <https://wheel.ixitxachitl.com/>             | [tools/game-wheel.html](tools/game-wheel.html)       |
| Snowfall          | <https://snow.ixitxachitl.com/>              | [tools/snowfall.html](tools/snowfall.html)           |
| Countdown Timer   | <https://countdown.ixitxachitl.com/>         | [tools/countdown.html](tools/countdown.html)         |
| Stream Pet        | <https://pet.ixitxachitl.com/>               | [tools/stream-pet.html](tools/stream-pet.html)       |
| Stunt Wheel       | <https://race.ixitxachitl.com/>              | [tools/stunt-wheel.html](tools/stunt-wheel.html)     |
| StreamEdge (app)  | <https://github.com/Ixitxachitl/stream-edge> | `#apps` on the home page (download links)           |

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
4. In `index.html`, copy one of the `<article class="tool">` cards above the "More on the way…" card.
   Set `--accent` to one of the theme colors.
5. Add the new page to the `<nav>` in the header of **every** page.

## Retaking screenshots

The overlays have a demo mode, so headless Chrome can capture them directly. Bubbles are random, so take a
few captures at different timings and keep the best one:

```sh
chrome --headless=new --hide-scrollbars --window-size=760,380 \
  --default-background-color=1a0f33ff --virtual-time-budget=11000 \
  --screenshot=shot.png "https://rave.ixitxachitl.com/?demo=1&size=105&max=5"
```

Convert to WebP (for example with Pillow: `Image.open("shot.png").save("x.webp", quality=88)`).
