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

## Production

```bash
npm run build
node ./dist/server/entry.mjs
```

Deploy with any Node-compatible host (Railway, Render, Fly.io) or adapt the Astro adapter for Vercel/Netlify.
