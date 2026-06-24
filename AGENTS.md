# AGENTS.md — Pete McPherson Portfolio

Guide for AI agents working on this repository.

## Project Purpose

Static portfolio site for **Pete McPherson**. Goals:

1. Educate visitors about Pete's background, accomplishments, and current projects.
2. Drive newsletter signups through a clear, bold email capture CTA on every major page.

Primary conversion action: **newsletter subscription**.

## Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Astro 5 | Static output, zero JS by default |
| Styling | Tailwind CSS 3 | Via `@astrojs/tailwind` |
| Fonts | Fontshare | Khand (headings) + Switzer (body) |
| SEO | `@astrojs/sitemap` | Generates sitemap at build time |
| Hosting | Cloudflare Pages | Static deploy from `dist/` |

**Do not add client-side JavaScript** unless strictly necessary. Prefer Astro components and static HTML.

## Commands

Requires **Node.js 18+** and npm.

```bash
npm install       # Install dependencies
npm run dev       # Dev server → http://localhost:4321
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
```

## Repository Structure

```
src/
  pages/
    index.astro          # Home (/)
    about.astro          # About (/about)
    projects.astro       # Projects (/projects)
  components/
    Header.astro         # Logo + nav; highlights active page
    Footer.astro         # Copyright with dynamic year
    NewsletterForm.astro # Email capture (frontend only)
    ProjectCard.astro    # Project preview card
  layouts/
    BaseLayout.astro     # Shared HTML shell, SEO, fonts, header/footer
  styles/
    globals.css          # Tailwind layers + shared utility classes
  env.d.ts               # Astro type references
public/
  favicon.svg
  robots.txt
  images/
    about-placeholder.svg
    project-placeholder.svg
astro.config.mjs         # Site URL, integrations
tailwind.config.mjs      # Design tokens
package.json
README.md                  # Human-facing setup & deploy docs
```

## Pages

All pages use `BaseLayout.astro` and pass `title`, `description`, and `currentPath`.

### Home (`/`)

- Hero: bold heading, tagline, **primary newsletter CTA** (`NewsletterForm`)
- Secondary section: brief intro + button linking to `/projects`

### About (`/about`)

- Placeholder bio/story content with placeholder photo
- Newsletter signup section near the bottom

### Projects (`/projects`)

- Grid of `ProjectCard` components (data in `projects` array in `projects.astro`)
- Newsletter signup section at the bottom

## Design System

### Aesthetic

Clean, minimal, bold. Lots of white space. No clutter.

### Colors

| Token | Value | Usage |
|---|---|---|
| White | `#ffffff` | Background |
| Black | `#000000` | Text, borders |
| Accent | `#E10600` | CTAs, links, active nav, highlights |

Tailwind: `bg-accent`, `text-accent`, `border-accent`, etc. Use accent **sparingly** — mainly for CTAs and key highlights.

### Typography

- **Headings:** `font-heading` (Khand, bold, uppercase)
- **Body:** `font-body` (Switzer)

Loaded in `BaseLayout.astro` via Fontshare CDN.

### Layout

- Max content width: `max-w-content` (960px), centered via `content-container`
- Section spacing: `section-padding` utility class
- Mobile-first, responsive at `sm` / `md` / `lg` breakpoints

### Shared CSS Utilities (`globals.css`)

- `.btn-primary` — red accent button (newsletter submit, primary actions)
- `.btn-secondary` — black outline button (e.g. "View Projects")
- `.section-padding` — consistent vertical/horizontal section spacing
- `.content-container` — centered max-width wrapper

## Components

### Header

- Site title "Pete McPherson" links to `/`
- Nav links: Home, About, Projects
- Active page: red text + underline (`aria-current="page"`)

### Footer

- Centered copyright: `© {year} Pete McPherson`

### NewsletterForm

Props: `id`, `heading`, `description`, `class`

- Accessible `<form>` with labeled email input and submit button
- **No backend wired up** — `action="#"` placeholder
- To connect a provider (ConvertKit, Mailchimp, etc.): update `action`, `method`, and add hidden fields in `src/components/NewsletterForm.astro`

### ProjectCard

Props: `title`, `description`, `href`, `imageAlt`

- Uses `/images/project-placeholder.svg` until real images are added

## Content Conventions

- All placeholder copy is prefixed with **`[PLACEHOLDER]`** for easy search/replace
- Do **not** add real biographical content unless Pete provides it
- When adding new placeholder text, keep the `[PLACEHOLDER]` prefix

### Key Customization Targets

| Change | File |
|---|---|
| Production site URL | `astro.config.mjs` → `site` |
| Home hero & intro | `src/pages/index.astro` |
| About story | `src/pages/about.astro` |
| Projects list | `src/pages/projects.astro` → `projects` array |
| Accent color | `tailwind.config.mjs` → `colors.accent` |
| Newsletter backend | `src/components/NewsletterForm.astro` |
| Images | `public/images/` |

## SEO Requirements

Every page must set unique `title` and `description` via `BaseLayout`.

- Canonical URLs generated from `Astro.site` + pathname
- Sitemap: auto-generated at `/sitemap-index.xml` on build (requires correct `site` in config)
- `public/robots.txt` references the sitemap URL

When changing the production domain, update **both** `astro.config.mjs` and `public/robots.txt`.

## Deployment (Cloudflare Pages)

### Git-connected (recommended)

| Setting | Value |
|---|---|
| Framework preset | Astro |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node.js version | 18+ |

After deploy, set `site` in `astro.config.mjs` to the live URL.

### Wrangler CLI

```bash
npm run build
npx wrangler pages deploy dist --project-name=pete-mcpherson-portfolio
```

## Agent Guidelines

### Do

- Keep changes minimal and scoped to the request
- Match existing Tailwind utility patterns and component APIs
- Preserve accessibility: semantic HTML, labels, `aria-*`, focus styles, alt text
- Use `BaseLayout` for all new pages
- Prefer editing existing components over duplicating markup
- Mark new temporary content with `[PLACEHOLDER]`

### Do Not

- Add unnecessary JavaScript frameworks or client-side hydration
- Remove or weaken the newsletter CTA without explicit instruction
- Hardcode real personal content for Pete
- Commit secrets (API keys, `.env` files)
- Create commits unless the user explicitly asks

### Adding a New Page

1. Create `src/pages/{slug}.astro`
2. Wrap content in `BaseLayout` with `title`, `description`, `currentPath`
3. Add nav link in `src/components/Header.astro` → `navLinks` array
4. Sitemap picks it up automatically on build

### Adding a Project

Edit the `projects` array in `src/pages/projects.astro`. Each entry needs `title`, `description`, `href`, and `imageAlt`.

### Connecting the Newsletter Form

Update `NewsletterForm.astro`:

```astro
<form action="https://your-provider-endpoint" method="post">
  <!-- provider-specific hidden fields -->
</form>
```

Test form submission manually after wiring up a backend.

## Configuration Reference

### `astro.config.mjs`

```js
const site = 'https://petemcpherson.com'; // Update for production
integrations: [tailwind(), sitemap()]
```

### `tailwind.config.mjs`

```js
colors: { accent: '#E10600' }
fontFamily: { heading: ['Khand', 'sans-serif'], body: ['Switzer', 'sans-serif'] }
maxWidth: { content: '960px' }
```

## Related Docs

- `README.md` — setup, build, and deployment instructions for humans
- [Astro docs](https://docs.astro.build)
- [Tailwind docs](https://tailwindcss.com/docs)
- [Cloudflare Pages docs](https://developers.cloudflare.com/pages)
