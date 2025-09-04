import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const LeadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(7),
  modelId: z.string().optional(),
  message: z.string().optional(),
  locale: z.enum(['en', 'ur']).optional(),
});

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parse = LeadSchema.safeParse(json);
  if (!parse.success) {
    return NextResponse.json({ error: 'Invalid payload', issues: parse.error.flatten() }, { status: 400 });
  }
  const payload = parse.data;
  // Mock: log and return success
  console.log('[lead]', payload);
  return NextResponse.json({ ok: true });
}


