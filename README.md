# The Movie DBv2
A site built through [The MovieDB API](https://www.themoviedb.org/), showing all the latest, most popular and upcoming movies through a lovely colourful UI. See all the actors, trailers, reviews and Similar movies all in one spot. Not seeing what you're looking for? Give the search a try!

## Version 2
A remake of the old site [The Movie DBv1](https://github.com/JadeHendricks/movie-db). Now focusing on better and more professional UI.
Allowing the site to be more aligned with a real world complete application.

## Tools
- React 19 and TypeScript (strict), built with Vite
- react-router (declarative mode) for routing
- TanStack Query for data fetching and caching
- Sass, written as BEM blocks in an atomic design layout (`src/styles`)
- Vitest and Testing Library for unit tests, Playwright (with axe) for end-to-end and visual tests
- ESLint, Stylelint and Prettier
- Data from [The MovieDB API](https://www.themoviedb.org/)

## Requirements
Node 24 (see `.nvmrc`). The `engines` field allows Node 22.22 or newer.

## Getting started

**Quickstart** (details below):
```bash
git clone https://github.com/JadeHendricks/react-moviedb.git
cd react-moviedb
npm install
cp .env.example .env            # Windows PowerShell: Copy-Item .env.example .env
# then edit .env and set REACT_APP_API_KEY to your TMDB v3 key
npm run dev                     # opens on http://localhost:5173
```

You need [Node 24](https://nodejs.org/) and npm. Then:

1. **Clone and install**
   ```bash
   git clone https://github.com/JadeHendricks/react-moviedb.git
   cd react-moviedb
   npm install
   ```

2. **Create your `.env`** from the template, then add your key (see [API key](#api-key) below).
   - macOS / Linux: `cp .env.example .env`
   - Windows (PowerShell): `Copy-Item .env.example .env`

3. **Start the dev server**
   ```bash
   npm run dev
   ```
   Vite prints a local URL (default http://localhost:5173). Open it in your browser.

To check a production build locally instead, run `npm run build` then `npm run preview`.

### API key
1. Get a TMDB **v3 API key** at https://www.themoviedb.org/settings/api (free; sign in, then request an API key under API).
2. Open the `.env` file you created and set the key:
   ```
   REACT_APP_API_KEY=your_v3_key_here
   ```
3. Restart `npm run dev` if it was already running, so Vite picks up the new value.
4. `.env` is gitignored and must never be committed. `.env.example` is the committed template and has no value.

Without a valid key the app loads but shows no movies, and TMDB requests return 401.

The variable keeps the name `REACT_APP_API_KEY` so existing deploy settings keep working (`vite.config.ts` exposes `VITE_` and `REACT_APP_` variables).

The v3 key is inlined into the public JavaScript bundle at build time, so anyone can read it from the deployed site. Do not put the v4 **read access token** in any `REACT_APP_` or `VITE_` variable, because that would publish it.

## Scripts
| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build into `build/` |
| `npm run preview` | Serve the production build locally |
| `npm test` | Run unit tests once (Vitest) |
| `npm run lint` | ESLint and Stylelint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format` | Format with Prettier |
| `npm run test:e2e` | Playwright tests against the production build (all TMDB calls are mocked, no real key needed) |
| `npm run test:e2e:update` | Regenerate Playwright screenshot baselines |

## Deployment
The site is hosted on Netlify. `netlify.toml` sets the build command (`npm run build`), the publish directory (`build`), Node 24 and a single-page-app fallback so deep links survive a refresh.

Set `REACT_APP_API_KEY` (the TMDB v3 key) in the Netlify site environment variables. Use a deploy preview to check a branch before it goes to production.

## View
[Demo](https://react-the-moviedb.netlify.app/)
