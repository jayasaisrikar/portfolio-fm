# Jay’s field notes

Personal portfolio of Jaya Sai Srikar — Quoril co-founder and AI Full-Stack Engineer.

Canonical site: https://jayasaisrikar.xyz

## Development

- `npm ci`
- `npm run dev`
- `npm run lint`

## Production and SEO checks

- `npm run build` builds the client, server-renders `/`, `/profile`, and a no-index `404.html`, and generates the sitemap and robots file.
- `npm run check:seo` checks the emitted HTML, structured data, metadata, crawl files, social image, and resume exclusion.
- `npm run preview` serves the production output for local review.

Vercel serves the generated files directly using clean URLs. There is deliberately no catch-all rewrite to the homepage: missing URLs must return HTTP 404. Configure the apex domain in Vercel and redirect alternate domains to it.

## Search and AI discovery

`src/lib/seo.ts` owns the official domain, per-route titles/descriptions, canonicals, social metadata, and JSON-LD graph. `Seo.tsx` keeps metadata correct during client navigation. `src/entry-server.tsx` renders full content at build time; `src/main.tsx` hydrates it. Static content is visible without JavaScript; client navigation and interactive controls remain available.

The graph describes the Person, WebSite, WebPage/ProfilePage, Quoril founder relationship, employers, breadcrumbs, and project list using visible public facts. It does not invent ratings, dates, availability, project results, or financial performance.

`public/llms.txt` is a supplemental reading guide, not an established ranking requirement or a guarantee of AI citations. Maintain it when public roles or projects change. Google’s AI search guidance uses ordinary SEO fundamentals; no special AI schema is required. The wildcard robots rule permits search crawlers, including AI search crawlers, to access the public pages. CDN/WAF policies can still block them independently.

The social card is a committed 1200×630 PNG; its editable vector source is `public/social-card.svg`. Update both together. No resume asset is published.

## After deployment

1. Check live `/`, `/profile`, `/robots.txt`, `/sitemap.xml`, `/llms.txt`, and `/social-card.png` return the correct content. Confirm a random missing URL returns HTTP 404.
2. Verify domain ownership in Google Search Console and Bing Webmaster Tools, then submit `https://jayasaisrikar.xyz/sitemap.xml`.
3. Run Google URL Inspection and Rich Results Test on both pages. A valid schema does not guarantee a rich result.
4. Inspect social previews and monitor indexing, branded queries, and referrals. Avoid changing sitemap modification dates unless the content materially changes.

These account-side steps require the owner’s Search Console / Webmaster Tools access. The repository does not contain verification tokens or analytics credentials.
