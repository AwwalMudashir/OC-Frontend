import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const proto = req.headers.get('x-forwarded-proto') || 'https'
  const host = req.headers.get('host') || 'localhost'
  const base = (process.env.NEXT_PUBLIC_SITE_URL || `${proto}://${host}`).replace(/\/$/, '')

  const staticUrls = [
    { path: '', priority: '1.0' },
    { path: 'about', priority: '0.8' },
    { path: 'donate', priority: '0.8' },
    { path: 'manifesto', priority: '0.7' },
    { path: 'contact', priority: '0.7' }
  ]

  const lastmod = new Date().toISOString()

  // fetch dynamic event list from the internal API route which proxies to backend
  let eventUrls: Array<{ loc: string; lastmod?: string; priority?: string }> = []

  try {
    const res = await fetch(`${base}/api/event-history`, { cache: 'no-store' })
    if (res.ok) {
      const payload = await res.json()
      // api responses in this app are usually { statusCode, message, data }
      const items = Array.isArray(payload?.data) ? payload.data : Array.isArray(payload) ? payload : []

      for (const ev of items) {
        if (!ev || !ev.id) continue
        const loc = `${base}/events/${ev.id}`
        const lm = ev.eventDate || ev.createdAt || lastmod
        eventUrls.push({ loc, lastmod: lm, priority: '0.6' })
      }
    }
  } catch (err) {
    // ignore and fall back to static-only sitemap
  }

  const urlEntries = [...staticUrls.map((u) => {
    const loc = u.path ? `${base}/${u.path.replace(/^\/+|\/+$/g, '')}` : `${base}/`
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>`
  }), ...eventUrls.map((e) => `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <priority>${e.priority}</priority>\n  </url>`)].join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>`

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } })
}
