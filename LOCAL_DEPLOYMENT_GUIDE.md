# Local Plug-and-Play Deployment Guide

## 1. Install tools

Install:

1. Node.js LTS
2. Git
3. Vercel CLI

After installing Node, open Terminal / PowerShell inside this folder and run:

```bash
npm install
```

## 2. Create `.env.local`

Copy:

```bash
cp .env.example .env.local
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Open `.env.local` and add at least:

```text
OPENROUTER_API_KEY=your_openrouter_key
APP_URL=http://localhost:3000
```

## 3. Run locally

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 4. Test the LLM thesis engine

1. Enter topic
2. Refine title/topic
3. Search literature
4. Send papers to synthesis
5. Generate synthesis
6. Generate executable prompt
7. Execute prompt

If the LLM key is correct, the request goes:

```text
index.html → /api/agent → OpenRouter model → thesis output
```

## 5. Supabase setup

1. Create Supabase project
2. Go to SQL Editor
3. Paste and run `supabase/schema.sql`
4. Add Supabase values into `.env.local`
5. Restart `npm run dev`

Supabase magic links use the configured Site URL / Redirect URL. During local testing, use:

```text
http://localhost:3000
```

## 6. Push to GitHub later

```bash
git init
git add .
git commit -m "Initial AIMS LMS deployment"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## 7. Deploy on Vercel later

1. Import GitHub repo into Vercel
2. Add environment variables
3. Deploy
4. Set Supabase Auth redirect URL to your Vercel URL

## Troubleshooting

### Thesis not generating
Check:
- `OPENROUTER_API_KEY` exists
- `/api/agent` returns JSON
- Vercel dev terminal has no error

### Magic link not working
Check:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- Supabase Auth redirect URL

### Invites not working
Check:
- `SUPABASE_SERVICE_ROLE_KEY`
- `/api/invite`
- `course_invites` table exists