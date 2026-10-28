# Portfolio

Personal portfolio of Andrea Salvalaggio, built with Nuxt 4 and Bootstrap (SCSS).

## Development

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run build` | Production build |
| `npm run generate` | Static build |
| `npm run preview` | Preview the production build |
| `npm run lint` | ESLint (`lint:fix` to fix) |
| `npm run typecheck` | Type check with `nuxt typecheck` |
| `npm test` | Vitest (`test:watch` to watch) |

## Configuration

Set `NUXT_PUBLIC_SITE_URL` to the production domain (e.g. `https://example.com`): canonical links and `og:url` need it. Without it, `og:image` falls back to the origin the page is served from.

## Content

Content lives in `app/data/`: `projects.json`, `experiences.json`, `stacks.json` and `connections.json`. The contact button in the header uses the `mailto:` entry of `connections.json`.
