# Netlify migration plan for GTM Flows

## Current hosting reality

The current GTM Flows app is not a plain static Vite site or standard Next.js app. It is built with Vinext for OpenAI Sites and uses:

- Cloudflare D1 through the `DB` binding.
- Server-side catalogue routes that read published records from D1.
- `/admin` and write endpoints protected by ChatGPT sign-in headers.
- Dynamic sitemap, `llms.txt`, automation pages and admin preview pages.

Because of this, deploying the current `dist` folder to Netlify would not produce a working copy of the same website. The build output is Cloudflare/Sites-oriented and `dist/client` does not contain a complete static `index.html` site.

## Recommended Git-based Netlify approach

### Path A — fastest public-site move

Use Netlify for the public marketing site and keep the admin/catalogue database on Sites until the backend is migrated.

This gives the speed benefit quickly, but catalogue edits from `/admin` will not automatically update the Netlify copy unless a static export or rebuild pipeline is added.

Required work:

1. Add a static public export pipeline for homepage, catalogue, FAQ, contact and every `/automations/[slug]` page.
2. Add a Netlify Function for `/api/contact` or point the form to another backend.
3. Keep `/admin` on the existing private Sites URL or move it to a private subdomain later.
4. Connect the Git repository to Netlify.
5. Set `gtmflows.co` as the Netlify primary domain after validating the static output.

### Path B — full Netlify migration

Move the entire app, including admin, catalogue publishing and APIs, to Netlify.

Required work:

1. Replace Cloudflare D1 with a Netlify-compatible database such as Neon Postgres, Supabase or another managed database.
2. Replace ChatGPT sign-in headers with Netlify-compatible authentication.
3. Move admin and public API routes to Netlify Functions or a standard framework runtime.
4. Rebuild the app as a Netlify-supported framework output.
5. Run database migration, route, auth and SEO tests.
6. Switch DNS after production verification.

## Netlify CLI status

The local Netlify CLI is authenticated as `deepanshu@indibuying.com`, but this repository is not linked to a Netlify site yet.

Useful commands after the migration path is chosen:

```bash
npx netlify init
npx netlify link
npx netlify deploy
npx netlify deploy --prod
```

## URL policy

Canonical automation pages remain:

```text
/automations/[slug]
```

Legacy or mistaken singular URLs now redirect:

```text
/automation/[slug] -> /automations/[slug]
/automation -> /catalogue
```

## Brand asset policy

The React app now reads the public logo path and wordmark from:

```text
lib/brand.ts
```

When the logo changes, update the files under `public/` and keep the source path constant unless the whole asset strategy changes.
