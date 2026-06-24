# Pete McPherson — Portfolio Site

A fast, minimal portfolio website built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com). Designed to introduce Pete McPherson, showcase projects, and drive newsletter signups.

## Tech Stack

- **Framework:** Astro (static site generator, zero JS by default)
- **Styling:** Tailwind CSS
- **Fonts:** [Fontshare](https://www.fontshare.com/) — Khand (headings) + Switzer (body)
- **Hosting:** Cloudflare Pages

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (included with Node.js)

## Setup

1. Clone or download this repository.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:4321](http://localhost:4321) in your browser.

## Build

Generate a static production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Output is written to the `dist/` directory.

## Project Structure

```
src/
  pages/
    index.astro        → Home page (/)
    about.astro        → About page (/about)
    projects.astro     → Projects page (/projects)
  components/
    Header.astro       → Site header with navigation
    Footer.astro       → Simple footer
    NewsletterForm.astro → Email capture form (frontend only)
    ProjectCard.astro  → Project preview card
  layouts/
    BaseLayout.astro   → Shared page layout (SEO, fonts, header/footer)
  styles/
    globals.css        → Tailwind base styles and utilities
public/
  favicon.svg          → Placeholder favicon
  robots.txt           → Search engine directives
  images/              → Placeholder images
```

## Customization

All content is marked with `[PLACEHOLDER]` for easy find-and-replace. Key files to edit:

| What to change | Where |
|---|---|
| Site URL (for sitemap & canonical URLs) | `astro.config.mjs` → `site` |
| Home page hero & intro | `src/pages/index.astro` |
| About page story | `src/pages/about.astro` |
| Projects list | `src/pages/projects.astro` → `projects` array |
| Accent color | `tailwind.config.mjs` → `colors.accent` |
| Newsletter form backend | `src/components/NewsletterForm.astro` → `action` attribute |

Replace placeholder images in `public/images/` with real photos and project screenshots.

## Deploy to Cloudflare Pages

### Option A — Connect a Git repository (recommended)

1. Push this project to GitHub, GitLab, or Bitbucket.

2. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.

3. Select your repository.

4. Configure build settings:

   | Setting | Value |
   |---|---|
   | **Framework preset** | Astro |
   | **Build command** | `npm run build` |
   | **Build output directory** | `dist` |
   | **Node.js version** | 18 or later (set via `NODE_VERSION` environment variable if needed) |

5. Click **Save and Deploy**. Cloudflare will build and deploy on every push to your default branch.

6. Update `site` in `astro.config.mjs` to your production URL (e.g. `https://petemcpherson.com`) so the sitemap and canonical URLs are correct.

### Option B — Direct upload (Wrangler CLI)

1. Install Wrangler:

   ```bash
   npm install -g wrangler
   ```

2. Build the site:

   ```bash
   npm run build
   ```

3. Deploy:

   ```bash
   npx wrangler pages deploy dist --project-name=pete-mcpherson-portfolio
   ```

### Custom domain

In the Cloudflare Pages project settings, go to **Custom domains** and add your domain. Cloudflare handles SSL automatically.

## SEO

- Each page has unique `<title>` and `<meta description>` tags via `BaseLayout.astro`.
- Sitemap is generated automatically by `@astrojs/sitemap` at build time (`/sitemap-index.xml`).
- `public/robots.txt` points crawlers to the sitemap.

## Newsletter Form

The newsletter form is a styled frontend placeholder. To connect it to a service (e.g. ConvertKit, Mailchimp, Buttondown), update the `action` and `method` attributes in `src/components/NewsletterForm.astro` and add any required hidden fields.

## License

Private — © Pete McPherson
