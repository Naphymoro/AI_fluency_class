# AIMS Agentic Research LMS — Online Deployment Package

This package is ready for online deployment with:

- GitHub
- Vercel
- Supabase
- OpenRouter

## Files

```text
index.html                  Main LMS/course interface
api/agent.js                Real LLM thesis generation API
api/search.js               Live literature crawler API
api/arxiv-search.js         arXiv server-side proxy
api/invite.js               Supabase student invitation API
api/config.js               Public runtime config
lms-auth.js                 Supabase magic-link login gate
supabase/schema.sql         LMS database schema + RLS policies
ONLINE_DEPLOYMENT_GUIDE.md  Step-by-step online deployment
ONLINE_TEST_PLAN.md         Testing checklist
.env.example                Environment variable template
```

## Deploy

Read:

```text
ONLINE_DEPLOYMENT_GUIDE.md
```

## Minimum required keys

```text
OPENROUTER_API_KEY
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

## Local preview

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open:

```text
http://localhost:3000
```