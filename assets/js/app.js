/* GitMD app.js
   - Uses marked for GFM parsing
   - Uses DOMPurify to sanitize HTML
   - Uses highlight.js for code highlighting
*/

// Simple sample content
const SAMPLE = `# Welcome to GitMD

This is a live preview of GitHub Flavored Markdown.

- Supports **GFM** tables, strikethrough, task lists

## Code

\`\`\`js
function greet(name){
  return \`Hello, \${name}\`;
}
console.log(greet('GitMD'));
\`\`\`

> Drop a .md file or use the upload button.
`;

// Elements
const editor = document.getElementById("editor");
const preview = document.getElementById("preview");
const fileInput = document.getElementById("fileInput");
const loadSample = document.getElementById("loadSample");
const clearEditor = document.getElementById("clearEditor");
const copyHtml = document.getElementById("copyHtml");
const themeToggle = document.getElementById("themeToggle");
const dropHint = document.getElementById("dropHint");

// Configure marked: enable GFM and preserve line breaks similar to GitHub
marked.setOptions({
	gfm: true,
	breaks: true,
	headerIds: true,
	mangle: false,
	smartLists: true,
});

// Use highlight.js for code blocks
function highlightCodeBlocks(el) {
	el.querySelectorAll("pre code").forEach((block) => {
		try {
			hljs.highlightElement(block);
		} catch (e) {
			/*ignore*/
		}
	});
}

// Render function: parse, sanitize, and inject
function renderMarkdown(md) {
	const raw = marked.parse(md || "");
	const clean = DOMPurify.sanitize(raw, { USE_PROFILES: { html: true } });
	preview.innerHTML = clean;
	highlightCodeBlocks(preview);
}

// Save to localStorage
function saveState() {
	try {
		localStorage.setItem("gitmd:last", editor.value);
	} catch (e) {
		/* ignore */
	}
}
function restoreState() {
	const saved = localStorage.getItem("gitmd:last");
	if (saved) {
		editor.value = saved;
		return;
	}
	editor.value = SAMPLE;
}

// Live preview handler with requestAnimationFrame debounce
let raf = null;
function scheduleRender() {
	if (raf) cancelAnimationFrame(raf);
	raf = requestAnimationFrame(() => {
		renderMarkdown(editor.value);
		saveState();
		raf = null;
	});
}

// File load
fileInput.addEventListener("change", (e) => {
	const f = e.target.files && e.target.files[0];
	if (!f) return;
	const reader = new FileReader();
	reader.onload = () => {
		editor.value = reader.result;
		scheduleRender();
	};
	reader.readAsText(f);
});

// Drag-and-drop support
["dragenter", "dragover"].forEach((ev) => {
	document.addEventListener(
		ev,
		(e) => {
			e.preventDefault();
			dropHint.classList.add("visible");
		},
		false
	);
});
["dragleave", "drop"].forEach((ev) => {
	document.addEventListener(
		ev,
		(e) => {
			e.preventDefault();
			dropHint.classList.remove("visible");
		},
		false
	);
});

document.addEventListener("drop", (e) => {
	const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
	if (!f) return;
	const reader = new FileReader();
	reader.onload = () => {
		editor.value = reader.result;
		scheduleRender();
	};
	reader.readAsText(f);
});

// Toolbar actions
loadSample.addEventListener("click", () => {
	editor.value = SAMPLE;
	scheduleRender();
	editor.focus();
});
clearEditor.addEventListener("click", () => {
	editor.value = "";
	scheduleRender();
	editor.focus();
});
copyHtml.addEventListener("click", async () => {
	try {
		await navigator.clipboard.writeText(preview.innerHTML);
		copyHtml.textContent = "Copied!";
		setTimeout(() => (copyHtml.textContent = "Copy HTML"), 1500);
	} catch (e) {
		copyHtml.textContent = "Failed";
		setTimeout(() => (copyHtml.textContent = "Copy HTML"), 1500);
	}
});

// Theme toggle: swap body class & highlight theme
themeToggle.addEventListener("change", (e) => {
	const dark = e.target.checked;
	document.body.classList.toggle("dark", dark);
	// swap hljs theme
	const link = document.getElementById("hljs-theme");
	link.href = dark ? "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/atom-one-dark.min.css" : "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github.min.css";
});

// Keyboard shortcuts: Ctrl/Cmd+S to save to localStorage (already auto-saves), Ctrl+L to load sample
document.addEventListener("keydown", (e) => {
	if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
		e.preventDefault();
		saveState();
		// tiny feedback
		clearEditor.textContent = "Saved";
		setTimeout(() => (clearEditor.textContent = "Clear"), 900);
	}
	if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "l") {
		e.preventDefault();
		editor.value = SAMPLE;
		scheduleRender();
	}
});

// Editor input
editor.addEventListener("input", scheduleRender);

// Initialize
restoreState();
scheduleRender();

// Accessibility: make toolbar buttons keyboard focusable via label
Array.from(document.querySelectorAll(".file-input-label")).forEach((lbl) => {
	lbl.tabIndex = 0;
	lbl.addEventListener("keydown", (e) => {
		if (e.key === "Enter" || e.key === " ") {
			document.getElementById("fileInput").click();
		}
	});
});

// Expose small API for testing
window.GitMD = { renderMarkdown, restoreState, saveState };

// End of app.js
