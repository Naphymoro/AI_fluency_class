# Online Testing Plan

## 1. Smoke test

- [ ] Open Vercel URL
- [ ] Page loads
- [ ] `/api/config` returns JSON
- [ ] Supabase magic-link gate appears if Supabase variables are set

## 2. Crawler test

Open:

```text
/api/search?query=green%20hydrogen%20Rwanda
```

Expected:
- JSON response
- papers array
- relevance scores

## 3. LLM test

In the app:

1. Enter topic
2. Refine title
3. Search literature
4. Send papers to synthesis
5. Generate synthesis
6. Generate prompt
7. Execute prompt

Expected:
- `/api/agent` is called
- thesis output is generated
- no scaffolding text appears

## 4. Supabase invite test

Use the instructor invite flow or call `/api/invite`.

Expected:
- student email stored in `course_invites`
- Supabase sends invite email

## 5. Export test

- [ ] Word-compatible export downloads
- [ ] LaTeX export downloads
- [ ] Print/save PDF works
- [ ] AIMS thesis logo appears inside generated thesis