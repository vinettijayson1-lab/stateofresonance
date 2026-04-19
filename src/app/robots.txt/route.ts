import { NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse(`User-agent: *\nAllow: /\n\nSitemap: https://stateofresonance.ca/sitemap.xml`, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
