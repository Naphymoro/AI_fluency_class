# AIMS Agentic Research LMS — Online Deployment Guide

This guide deploys the LMS online using **GitHub + Vercel + Supabase + OpenRouter**.

## What you are deploying

- `index.html` — course/LMS interface
- `/api/agent.js` — real LLM thesis generation endpoint
- `/api/search.js` — live literature crawler endpoint
- `/api/invite.js` — invite students by email through Supabase
- `/api/config.js` — exposes safe public Supabase settings to the browser
- `supabase/schema.sql` — database tables and RLS policies

---

## Part A — Create required accounts

Create or sign in to:

1. GitHub
2. Vercel
3. Supabase
4. OpenRouter

OpenRouter is used for the real LLM thesis generation. Supabase is used for Auth, invitations, progress and LMS data.

---

## Part B — Create Supabase project

1. Go to Supabase.
2. Create a project named:

```text
aims-agentic-research-lms
```

3. Copy these values from Supabase Project Settings:

```text
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

Important:
- `SUPABASE_ANON_KEY` can be used in the browser.
- `SUPABASE_SERVICE_ROLE_KEY` is server-side only. Never paste it into `index.html`.

---

## Part C — Create Supabase tables

1. In Supabase, open **SQL Editor**.
2. Open this project file:

```text
supabase/schema.sql
```

3. Copy all SQL.
4. Paste it into Supabase SQL Editor.
5. Click **Run**.

The schema enables Row Level Security and creates LMS tables.

---

## Part D — Configure Supabase Auth

In Supabase:

```text
Authentication → URL Configuration
```

For now set:

```text
Site URL = https://YOUR-VERCEL-APP.vercel.app
Redirect URL = https://YOUR-VERCEL-APP.vercel.app/**
```

You will only know the exact Vercel URL after the first deployment. So after Vercel deploys, return here and update these values.

For local testing use:

```text
http://localhost:3000
```

---

## Part E — Upload project to GitHub

1. Create a new GitHub repository:

```text
aims-agentic-research-lms
```

2. Upload all files from this folder to the repository.

The final GitHub repo should contain:

```text
index.html
package.json
vercel.json
lms-auth.js
api/
supabase/
README.md
ONLINE_DEPLOYMENT_GUIDE.md
.env.example
```

---

## Part F — Deploy on Vercel

1. Go to Vercel.
2. Click **Add New → Project**.
3. Import the GitHub repository.
4. Framework preset: **Other**.
5. Build command: leave blank.
6. Output directory: leave blank.
7. Click **Deploy**.

After deployment, Vercel gives you a URL like:

```text
https://aims-agentic-research-lms.vercel.app
```

---

## Part G — Add environment variables in Vercel

In Vercel:

```text
Project → Settings → Environment Variables
```

Add these:

```text
OPENROUTER_API_KEY
OPENROUTER_DEFAULT_MODEL
APP_URL
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
SEMANTIC_SCHOLAR_API_KEY
CORE_API_KEY
```

Recommended values:

```text
OPENROUTER_DEFAULT_MODEL=deepseek/deepseek-chat-v3.1
APP_URL=https://YOUR-VERCEL-APP.vercel.app
```

Optional variables:

```text
SEMANTIC_SCHOLAR_API_KEY
CORE_API_KEY
```

After adding variables, redeploy the project.

---

## Part H — Update Supabase redirect URL

Go back to Supabase:

```text
Authentication → URL Configuration
```

Set:

```text
Site URL = https://YOUR-VERCEL-APP.vercel.app
Redirect URL = https://YOUR-VERCEL-APP.vercel.app/**
```

Save.

---

## Part I — Test the online app

Open your Vercel URL.

Test:

1. Sign in with magic link.
2. Enter research topic.
3. Refine scientific topic.
4. Search literature.
5. Send papers to synthesis.
6. Generate synthesis.
7. Generate executable prompt.
8. Execute prompt.
9. Confirm thesis generation uses the LLM.
10. Export Word/PDF/LaTeX.

---

## Part J — Test API endpoints

In browser, test:

```text
https://YOUR-VERCEL-APP.vercel.app/api/config
```

Expected: JSON with Supabase public config.

Test crawler:

```text
https://YOUR-VERCEL-APP.vercel.app/api/search?query=green%20hydrogen%20Rwanda
```

Expected: JSON list of papers.

Test LLM route from the app by clicking **Execute Prompt**.

---

## Troubleshooting

### Execute Prompt does not generate thesis

Check:
- `OPENROUTER_API_KEY` is set in Vercel.
- You redeployed after adding variables.
- `/api/agent` is not returning an error.

### Students do not receive email

Check:
- Supabase Auth email provider is enabled.
- Supabase redirect URL matches the Vercel URL.
- Student email is correct.

### Invite route fails

Check:
- `SUPABASE_SERVICE_ROLE_KEY` is set in Vercel.
- `course_invites` table exists.
- RLS SQL was run.

### Crawler returns few papers

Use OpenAlex first. Semantic Scholar and CORE can be enabled with API keys.

---

## Security notes

- Never put `SUPABASE_SERVICE_ROLE_KEY` in browser code.
- Never put `OPENROUTER_API_KEY` in browser code.
- Keep keys in Vercel environment variables.
- Keep RLS enabled on Supabase tables.