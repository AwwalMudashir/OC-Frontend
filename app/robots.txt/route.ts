export async function GET(req: Request) {
  const proto = req.headers.get('x-forwarded-proto') || 'https'
  const host = req.headers.get('host') || 'localhost'
  const site = (process.env.NEXT_PUBLIC_SITE_URL || `${proto}://${host}`).replace(/\/$/, '')

  const body = `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
