import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';

export async function GET() {
  if (!process.env.POSTGRES_URL) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "POSTGRES_URL is missing. Set the database environment variable before running /api/dev/init.",
      },
      { status: 503 },
    );
  }

  await sql`select 1`;

  return NextResponse.json({ ok: true });
}
