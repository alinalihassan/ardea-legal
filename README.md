# Ardea Legal

Production landing page for a freelance lawyer in the Netherlands. A fixed split layout: photo panel left, contact form right, no scrolling.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Customize content

Edit `src/data/site.ts` for copy, credentials, practice areas, and contact details.

Replace the portrait at `public/images/portrait.jpg` with a professional photo (same filename).

Bracketed placeholders like `[Surname]`, `[University]`, and `[KVK number]` are meant to be filled in before launch.

## Contact form

Inquiries POST to `/api/inquiry` and are sent by email via **Nodemailer** (Strato SMTP).

Set these environment variables locally (`.env`) and in the Vercel dashboard:

| Variable | Description |
|----------|-------------|
| `EMAIL_USERNAME` | Strato mailbox username (usually your full email address) |
| `EMAIL_PASSWORD` | Strato mailbox password |
| `EMAIL_FROM` | Optional. Defaults to `EMAIL_USERNAME` |
| `EMAIL_TO` | Optional. Defaults to `berend@ArdeaLegal.nl` |

Copy `.env.example` to `.env` and fill in your credentials for local testing.

Without credentials, the API returns success in development (logged to console) but fails in production.

## Deploy on Vercel

This project uses the [`@astrojs/vercel`](https://docs.astro.build/en/guides/integrations-guide/vercel/) adapter (SSR + `/api/inquiry`).

1. Push the repo to GitHub and import it in Vercel, or run `vercel` from the project root.
2. Vercel should auto-detect **Astro** with:
   - **Build command:** `npm run build`
   - **Output:** handled by the adapter (do not set Output Directory to `dist` manually)
3. Redeploy after pulling the Vercel adapter change. A 404 usually means the old `@astrojs/node` standalone build was deployed, which Vercel cannot serve.

Optional env vars in the Vercel dashboard:

- `EMAIL_USERNAME` / `EMAIL_PASSWORD` — Strato SMTP for the contact form
- `EMAIL_FROM` / `EMAIL_TO` — optional overrides

## Production (local)

```bash
npm run build
npm run preview
```

