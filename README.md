# Inaudible Web

Inaudible Web is an alternative frontend for Audiobookshelf with local caching, offline-friendly metadata, and a built‑in audiobook player.

It is designed to feel significantly faster than the original audiobookshelf frontend after first load and should reduce requests toe the audiobookshelf API long term. 

The project is visually in the style of libadwaita (or a rough representation of).


## AI Statement
This project was written 95% without the use of any AI at all. AI has been used to:
 - Generate this initial readme.
 - Generate the logo svg
 - Fix a bug with playing audiobooks / streaming
 - Fix a bug with audiobook downloads due to the various formats / file layouts possible in audiobookshelf.

This was not code generation, just chatting with an AI agent and reviewing code it generated before adding it in to the project manually myself. There will be AI use in the future - however it will be kept to a minimum (my end at least) as it has been so far. AI generated pull requests will be accepted so long as they are clearly stated to be AI and are of sufficient standard / do not cause problems. Therefore I would strongly advise anyone considering such a request to be an experienced software developer who can read and understand the generated code and wider implications. Expedience is okay - degrading the codebase is not.

## Features
- Library browsing: books, series, authors
- Discover view with categories
- Audiobook playing
- Local metadata cache for faster browsing
- "My Library" concept with ability to add items to it that you intend on listening to later.

## Screenshots

Please see screenshots below with mock data provided by [Audiameta](https://audimeta.de).

![Discover](screenshots/discover.png)

![Playing](screenshots/playing.png)

![My Library](screenshots/my-library.png)

![Books](screenshots/books.png)

![Book](screenshots/book.png)

![Series](screenshots/series.png)

![Series Item](screenshots/series-item.png)

![Authors](screenshots/authors.png)

![Stats](screenshots/stats.png)


## Roadmap / Planned future features
 - Upgrade to a better UI library ( I have a proper adwaita web port in the works).
 - OAUTH / OIDC login support
 - Ability to remove items from "my library".
 - Profile screen that isnt absolute garbage.
 - Stats that are more useful
 - WIP: Move over to using a worker for the service, model / store and api access (simplify frontend)
 - Consider ditching react for a pure web components approach? Perhaps lit?
 - Consider ditching react for solidjs?
 - Dark mode support

## Requirements

- Node.js 20+
- npm

## Quick Start (Docker Compose)

Please note that this is subject to change in future. Right now it's just a container that runs npm commands and everything goes through vite preview. This will be rectified in future builds. With a proper docker image.

```sh
services:
  inaudible:
    build:
      context: https://github.com/elliott-parkinson/inaudible-web-react.git
    container_name: inaudible
    environment:
      VITE_ALLOWED_HOSTS: ${VITE_ALLOWED_HOSTS:-""}
      INAUDIBLE_AUDIOBOOKSHELF_API_BASE_URL: ${INAUDIBLE_AUDIOBOOKSHELF_API_BASE_URL:-""}
      DENO_ENV: "production"
```

## Quick Start (Local)

```sh
npm ci
npm run dev
```

- Dev server: `http://localhost:3000`
- Preview server (built app): `http://localhost:5173`

## Build

```sh
npm run build
```

## Preview (Production‑like)

```sh
npm run preview
```

## Environment Configuration

Copy the template and edit as needed:

```sh
cp .env.example .env.local
```

### Supported Variables

 - `INAUDIBLE_AUDIOBOOKSHELF_API_BASE_URL` - Required* - Audiobookshelf api url domain (without /api or /audiobookshelf)
- `VITE_HTTPS_KEY_PATH` — path to dev HTTPS key (optional)
- `VITE_HTTPS_CERT_PATH` — path to dev HTTPS cert (optional)
- `VITE_ALLOWED_HOSTS` — comma‑separated list for `vite preview` host allowlist

Notes:
- Dev HTTPS is enabled only if both cert files exist.
- `VITE_ALLOWED_HOSTS` is used only for `vite preview`.
- Local overrides go in `.env.local` (not committed).

## Docker

### Build Image

```sh
docker build -t inaudible-web .
```

### Run Container

```sh
docker run --rm -p 5173:5173 inaudible-web
```

The container runs:
- `npm run build`
- `npm run preview`

So the app will be available at:
- `http://localhost:5173`

### Notes for Reverse Proxies

If you run behind a reverse proxy (e.g., Caddy, Nginx), set `VITE_ALLOWED_HOSTS` to include the proxy host. Example:

```env
VITE_ALLOWED_HOSTS=your.domain.com
```

## Scripts

- `npm run dev` — dev server on port 3000
- `npm run build` — production build
- `npm run preview` — preview build on port 5173
- `npm run prod` — alias for preview host/port 5173

## Troubleshooting
- HTTPS is required to use the Audible API - so when running in dev or not behind a reverse proxy we need to generate our own certificates. 
- If preview fails behind a proxy, ensure `VITE_ALLOWED_HOSTS` includes the proxy host.
- If dev HTTPS fails, check `VITE_HTTPS_KEY_PATH` and `VITE_HTTPS_CERT_PATH` or remove them to fall back to HTTP.
