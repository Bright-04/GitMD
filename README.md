# GitMD

GitMD is a browser-based Markdown previewer with GitHub-style rendering, hosted on GitHub Pages.

## Description

GitMD is a static, privacy-friendly Markdown previewer that renders GitHub Flavored Markdown (GFM) in your browser. It uses `marked.js` for parsing, `highlight.js` for code highlighting and `github-markdown-css` for accurate styling.

## Usage

1. Open `index.html` in a browser or visit the GitHub Pages demo (link TBD after deployment).
2. Type Markdown in the left pane — the right pane updates live.
3. Upload or drag-and-drop a `.md` file to load its contents.
4. Use the toolbar to load a sample, clear the editor, copy rendered HTML, or toggle dark mode.
5. Content is saved locally in `localStorage` and restored on your next visit.

## Files

-   `index.html` — main page
-   `assets/css/style.css` — site styles
-   `assets/js/app.js` — application logic

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. In the repository Settings → Pages, set the source to the `main` branch and `/ (root)` folder.
3. Wait a few minutes; the site should be available at `https://<your-username>.github.io/<repo-name>/`.

Add the demo link here once published.

## Accessibility & Notes

-   Keyboard shortcuts: Ctrl/Cmd+S saves to localStorage; Ctrl/Cmd+L loads the sample.
-   The app sanitizes rendered HTML with DOMPurify to protect against XSS.

## License

See `LICENSE` in the repository.
