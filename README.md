# GitMD

GitMD is a lightweight, browser-based Markdown previewer with GitHub-style rendering.

Demo: https://bright-04.github.io/GitMD/

## Why GitMD

-   Fast, privacy-friendly: everything renders locally in your browser.
-   GitHub-flavored rendering: GFM features (tables, task lists, fenced code) are supported.
-   Small and framework-free: simple vanilla JS + well-known libraries (marked, DOMPurify, highlight.js).

## Features

-   Live split-screen editor: left pane for Markdown, right pane for rendered preview.
-   Drag-and-drop or file upload for `.md` files.
-   Syntax highlighting for code blocks (highlight.js).
-   Toolbar: load sample, clear, download MD, export HTML, copy rendered HTML, copy Markdown, toggle word wrap, dark/light theme.
-   Saves last draft to `localStorage` and restores it automatically.
-   Sanitizes rendered HTML with DOMPurify for safety.

## Files

-   `index.html` — main page and entrypoint
-   `assets/css/style.css` — source styles
-   `assets/css/style.min.css` — minified styles (generated)
-   `assets/js/app.js` — app logic (source)
-   `assets/js/app.min.js` — minified app (generated)

## Usage

1. Open `index.html` locally or visit the demo URL above.
2. Type Markdown in the left editor — preview updates live.
3. Use the toolbar to upload a `.md` file, download the current Markdown, export the rendered HTML, toggle wrap, switch theme, or copy HTML/Markdown to clipboard.

## Developer notes

-   Build: `npm run build` (uses esbuild to produce minified assets into `assets/js/app.min.js` and `assets/css/style.min.css`).
-   CI: A GitHub Actions workflow builds the site and deploys to `gh-pages` automatically on push to `main`.
-   To re-run the build locally:

```powershell
npm ci
npm run build
```

## Troubleshooting

-   404 on Pages: ensure GitHub Pages is configured to serve from the `gh-pages` branch (Settings → Pages). The workflow deploys there automatically.
-   CI auth errors: ensure the workflow has `permissions: contents: write` (already configured).
-   If builds fail due to dependencies, ensure `package-lock.json` is present (committed).

## Roadmap / Improvements

-   Inline third-party libraries to support fully offline use.
-   Add a small test suite for rendering edge-case Markdown.
-   Add a Page-level share/export flow (download full HTML with inlined CSS).

## License

See `LICENSE` in this repository.

## Contact / Feedback

Open an issue or a PR on GitHub if you find bugs or want enhancements.
