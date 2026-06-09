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

Inquiries POST to `/api/inquiry`. Set `INQUIRY_WEBHOOK_URL` to forward submissions to your email service, CRM, or automation (Slack, Zapier, Resend, etc.).

Without a webhook, the API still validates and returns success in development; wire up delivery before production launch.

## Deploy on Vercel

This project uses the [`@astrojs/vercel`](https://docs.astro.build/en/guides/integrations-guide/vercel/) adapter (SSR + `/api/inquiry`).

1. Push the repo to GitHub and import it in Vercel, or run `vercel` from the project root.
2. Vercel should auto-detect **Astro** with:
   - **Build command:** `npm run build`
   - **Output:** handled by the adapter (do not set Output Directory to `dist` manually)
3. Redeploy after pulling the Vercel adapter change. A 404 usually means the old `@astrojs/node` standalone build was deployed, which Vercel cannot serve.

Optional env var in the Vercel dashboard:

- `INQUIRY_WEBHOOK_URL` — forwards form submissions to your email/CRM webhook

## Production (local)

```bash
npm run build
npm run preview
```

