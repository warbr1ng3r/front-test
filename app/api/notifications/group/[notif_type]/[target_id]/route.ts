import { NextRequest, NextResponse } from 'next/server';

import { baseUrl } from '@shared/api';

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ notif_type: string; target_id: string }> },
) {
  const { notif_type, target_id } = await ctx.params; // <- ждём params
  const { search } = new URL(req.url);

  try {
    const upstream = `${baseUrl}/notifications/group/${notif_type}/${target_id}${search}`;

    const res = await fetch(upstream, { cache: 'no-store' });
    const data = await res.json();

    return NextResponse.json(data, {
      status: res.status,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  } catch {
    return NextResponse.json(
      {
        type: notif_type,
        target_id,
        total: 0,
        limit: 10,
        offset: 0,
        results: [],
      },
      { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } },
    );
  }
}
