# ✦ Akash Gaikwad — Portfolio

A dark, motion-heavy personal portfolio (Awwwards-style) showcasing full-stack, AI/ML, systems, and client work. Built as a **data-driven** static site — GSAP + Lenis motion, a horizontal cinematic work strip, a category-filterable project grid, and per-project detail modals.

**Live:** GitHub Pages → https://1akash3.github.io/portfolio/ · Netlify → _(connect the repo)_

## Add or edit a project
Everything is driven by one file — **`js/projects.js`**. To add a project, copy a block in the `PROJECTS` array and fill it in:

```js
{
  id: "my-project",
  name: "My Project",
  category: "Full-Stack",          // Full-Stack | AI/ML | Frontend | Backend & Systems | Client Work
  tags: ["React", "Node"],
  year: "2026",
  role: "Solo build",
  blurb: "One-line summary for the card.",
  summary: "Longer paragraph for the detail modal.",
  features: ["Highlight one", "Highlight two"],
  tech: ["React", "Node", "MongoDB"],
  links: { demo: "https://…", code: "https://github.com/…" },  // null hides the button
  accent: "violet",                // blue | violet | lime | cyan | magenta
  featured: true                   // also show in the cinematic top strip
}
```

Save and reload — it appears in the grid (and the featured strip if `featured: true`). New categories automatically get a filter tab.

## Structure
```
index.html        # all sections (hero, work strip, grid, about, contact)
css/style.css     # tokens, grid cards, filters, modal, reveal animations
js/projects.js    # ← project data (edit this to add projects)
js/main.js        # rendering + GSAP/Lenis motion controller
favicon.svg
netlify.toml
```

## Run locally
```bash
python -m http.server 8097     # then open http://localhost:8097
```

## Deploy
- **GitHub Pages** — Settings → Pages → deploy from `main` (root).
- **Netlify** — New site from Git → pick this repo → no build command, publish dir `.` (already set in `netlify.toml`).

## Tech
Vanilla HTML/CSS/JS · GSAP + ScrollTrigger + Draggable · Lenis smooth scroll · Canvas particle field. No build step, no framework — deploys anywhere static.

---
Design system ported from the **NOVA** concept. © 2026 Akash Gaikwad.
