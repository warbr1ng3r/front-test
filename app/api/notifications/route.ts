import { NextRequest, NextResponse } from 'next/server';
const API_BASE = 'https://test-api.krascatalog.ru';
export async function GET(req: NextRequest) {
  const { search } = new URL(req.url);
  try {
    const upstream = `${API_BASE}/notifications${search}`;
    const res = await fetch(upstream, { cache: 'no-store' });
    const data = await res.json();
    return NextResponse.json(data, {
      status: res.status,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  } catch (e: any) {
    return NextResponse.json(
      { total: 0, limit: 10, offset: 0, results: [] },
      { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } },
    );
  }
}
