# Mindlet — superproject

Micro-frontends: **dashboard**, **auth**, **profile**, **study**, **decks** (Next.js 16, `basePath` per zone), plus **`@ross2p/shared`** and **`@ross2p/types`**.

## Layout

- `apps/*` — submodule repos (`mindlet-dashboard`, `mindlet-auth`, …)
- `libs/shared` — `@ross2p/shared` (GitHub Packages name under scope `ross2p`)
- `libs/types` — `@ross2p/types` (existing submodule)
- `infra/nginx` — dev reverse proxy
- `compose.yml` — one-command local stack (Node + nginx)

## Clone with submodules

```bash
git clone --recurse-submodules https://github.com/ross2p/mindlet-app.git
cd mindlet-app
```

If already cloned:

```bash
git submodule update --init --recursive
```

## Local dev (Docker)

From repo root:

```bash
docker compose up
```

- Gateway: **http://localhost:8080** (nginx maps host 8080 → container 80)
- Zones: `/dashboard/`, `/auth/login`, `/profile/me`, `/study/`, `/decks/`

Each service runs `npm install` then `npm run dev` inside `node:20-alpine` with the repo mounted at `/workspace`.

## Local dev (host, no Docker)

In separate terminals, from each app (after `npm install`):

| App       | Port |
|-----------|------|
| dashboard | 3001 |
| auth      | 3002 |
| profile   | 3003 |
| study     | 3004 |
| decks     | 3005 |

Use `compose.yml` / nginx for a single entrypoint, or hit ports directly with the correct `basePath` URLs.

## GitHub Packages (`@ross2p/shared`)

Published from [mindlet-shared](https://github.com/ross2p/mindlet-shared).

From `libs/shared` after configuring auth (PAT with `write:packages`):

```bash
# ~/.npmrc or project .npmrc
echo '@ross2p:registry=https://npm.pkg.github.com' >> .npmrc
echo '//npm.pkg.github.com/:_authToken=${NPM_TOKEN}' >> .npmrc
export NPM_TOKEN=ghp_xxx
npm publish
```

In consuming apps, `.npmrc`:

```
@ross2p:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

For local monorepo development, apps use `"@ross2p/shared": "file:../../libs/shared"`.

## Updating a submodule

```bash
cd apps/auth
git checkout main && git pull
cd ../..
git add apps/auth
git commit -m "chore: bump auth submodule"
```
