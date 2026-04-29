# AIMS Agentic Research Course LMS

This project is a deployable, local-first tutorial app for a hands-on AIMS research-writing session.

## What it includes

- `index.html`: the main app interface
- `api/agent.js`: a minimal API route that allows the frontend to stay stable in deployment
- `vercel.json`: Vercel deployment settings

## Deployment model

This build is designed to work well as a Git-based Vercel deployment.

- The interface is kept close to the original attached tutorial file.
- The app defaults to a stable local-first mode.
- If live scholarly APIs are unreliable, the crawler falls back to a clearly labeled local session library so the workshop can continue.

## Recommended Git-to-Vercel flow

1. Create or use a GitHub repository for this project.
2. Import that repository into Vercel.
3. Let Vercel detect the root automatically.
4. Deploy.

## Notes for the live session

- Google Scholar is treated as a manual comparison step, not an automated scraper.
- The dashboard tracks activity in the current browser session.
- Export flows support Word-compatible output, LaTeX, and print-friendly PDF.
