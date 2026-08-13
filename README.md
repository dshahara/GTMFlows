# GTM Flows

GTM Flows is a Next.js site for automated revenue systems, an automation catalogue, SEO/AEO pages, contact capture and a protected admin dashboard.

## Stack

- Next.js
- Netlify hosting
- Supabase Postgres
- Supabase Auth
- Slack webhook for contact inquiries

## Local commands

```bash
npm install
npm run dev
npm run build
npm test
```

## Environment

Copy `.env.example` to `.env.local` for local development.

```text
NEXT_PUBLIC_SITE_URL=https://gtmflows.co
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SLACK_WEBHOOK_URL=
```

## Supabase setup

Run the SQL migration before using the admin dashboard:

```text
supabase/migrations/0001_catalogue.sql
```

The first server-side catalogue request seeds the 10 starter automations if the table is empty.

## Admin access

Admin login uses Supabase magic-link authentication. The app still checks an explicit email allowlist in code:

```text
deepanshu06@gmail.com
amrish.connect@gmail.com
```

## Netlify

`netlify.toml` contains the production build settings and legacy singular automation redirects.

See:

- `docs/netlify-migration.md`
- `docs/supabase-netlify-credentials.md`
