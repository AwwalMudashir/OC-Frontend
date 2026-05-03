Sitemap & Search Console — Quick Setup

1) Environment
- Set `NEXT_PUBLIC_SITE_URL` to your canonical site URL (e.g. `https://www.example.com`) in Vercel (and locally in `.env.local`). This ensures `/sitemap.xml` and `/robots.txt` use the proper domain.

2) Deploy
- Push to your repository and deploy to Vercel (or your hosting). Ensure the site is publicly accessible.

3) Verify sitemap and robots
- Visit `https://your-domain.com/sitemap.xml` and `https://your-domain.com/robots.txt` to confirm they return the expected content.

4) Submit to Google Search Console
- Add a property (Domain or URL-prefix) and verify ownership (DNS TXT recommended for Domain).
- Open Search Console → Sitemaps, and submit: `https://your-domain.com/sitemap.xml`.
- Monitor the Coverage and Indexing reports.

5) Local testing
- Start dev server and request endpoints:
```bash
pnpm dev
# or
npm run dev

curl -i http://localhost:3000/sitemap.xml
curl -i http://localhost:3000/robots.txt
```

6) Next steps (optional)
- Expand `app/sitemap.xml/route.ts` to include other dynamic content (pages, blog posts). I can add that if you provide the public API endpoints (e.g. `/api/posts`).

If you want, I can also submit the sitemap automatically via the Google Indexing API for individual pages — tell me which pages and provide an API key/service account (this is optional and requires extra credentials).
