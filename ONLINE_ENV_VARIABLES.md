# Online Environment Variables

Add these in Vercel Project Settings → Environment Variables.

## Required for LLM thesis generation

```text
OPENROUTER_API_KEY=
OPENROUTER_DEFAULT_MODEL=deepseek/deepseek-chat-v3.1
APP_URL=https://YOUR-VERCEL-APP.vercel.app
```

## Required for LMS Auth

```text
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## Optional crawler keys

```text
SEMANTIC_SCHOLAR_API_KEY=
CORE_API_KEY=
```

## Model options

You can use:

```text
deepseek/deepseek-chat-v3.1
qwen/qwen-2.5-72b-instruct
meta-llama/llama-3.1-70b-instruct
```

The UI can still pass model choices to `/api/agent`.