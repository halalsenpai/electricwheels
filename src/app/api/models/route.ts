import { NextResponse } from 'next/server';
import { allModels } from '@/lib/data';

export const revalidate = 60 * 60 * 24 * 7; // 7 days

export async function GET() {
  return NextResponse.json(allModels, {
    headers: {
      'Cache-Control': `s-maxage=${revalidate}, stale-while-revalidate`,
    },
  });
}


