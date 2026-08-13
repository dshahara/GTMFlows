# Netlify + Supabase migration for GTM Flows

## Target architecture

GTM Flows now uses a Netlify-first application architecture:

- Next.js app hosted on Netlify.
- Supabase Postgres for the automation catalogue.
- Supabase Auth for admin sign-in.
- Server-side allowlist for approved admin emails.
- Netlify environment variables for secrets.
- Slack webhook delivery through the existing `/api/contact` route.

The current production Sites deployment can stay live until the Netlify deployment is verified and the `gtmflows.co` DNS is switched.

## Required Supabase setup

1. Create a free Supabase project.
2. Open the Supabase SQL editor.
3. Run:

```text
supabase/migrations/0001_catalogue.sql
```

4. Go to Authentication settings and enable email login.
5. Add this production redirect URL:

```text
https://gtmflows.co/auth/callback
```

6. Also add the Netlify preview URL callback after the first Netlify deploy.

The app will seed the first 10 automation records automatically when the `automations` table exists and is empty.

## Required environment variables

Set these in Netlify:

```text
NEXT_PUBLIC_SITE_URL=https://gtmflows.co
SUPABASE_URL=
SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
SUPABASE_JWKS_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SLACK_WEBHOOK_URL=
```

Do not expose `SUPABASE_SECRET_KEY` in browser code, client components, screenshots, or public repositories.

## Admin access

Admin access is controlled in code by:

```text
deepanshu06@gmail.com
amrish.connect@gmail.com
```

Both emails must exist as Supabase Auth users after they sign in the first time. Any other signed-in user sees an access-denied page.

## Netlify setup

The repo includes:

```text
netlify.toml
```

Build settings:

```text
Build command: npm run build
Publish directory: .next
Node version: 22
```

Canonical automation pages are:

```text
/automations/[slug]
```

Legacy or mistaken singular URLs redirect:

```text
/automation/[slug] -> /automations/[slug]
/automation -> /catalogue
```

## Deployment sequence

1. Commit and push this repo to GitHub.
2. Import the repo into Netlify.
3. Add the environment variables.
4. Deploy once on the Netlify preview domain.
5. Add the preview callback URL to Supabase Auth.
6. Test:
   - homepage
   - catalogue
   - one automation detail page
   - `/admin` login
   - draft save/publish
   - contact form Slack delivery
7. Attach `gtmflows.co` and `www.gtmflows.co` in Netlify.
8. Update DNS only after preview testing passes.

## Rollback safety

Do not remove the existing Sites deployment or DNS setup until Netlify production is fully tested. The current Sites deployment remains the rollback path while this migration is in progress.
