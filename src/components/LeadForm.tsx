"use client";
import { useState } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const LeadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(7),
  message: z.string().optional(),
  modelId: z.string().optional(),
});

export function LeadForm({ modelId }: { modelId?: string }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  async function onSubmit(formData: FormData) {
    setStatus(null);
    setLoading(true);
    const payload = {
      name: String(formData.get('name') || ''),
      phone: String(formData.get('phone') || ''),
      message: String(formData.get('message') || ''),
      modelId,
    };
    const parse = LeadSchema.safeParse(payload);
    if (!parse.success) {
      setLoading(false);
      setStatus('Please fill the required fields correctly.');
      return;
    }
    const res = await fetch('/api/lead', { method: 'POST', body: JSON.stringify(parse.data) });
    setLoading(false);
    setStatus(res.ok ? 'Sent! We will contact you shortly.' : 'Failed to send.');
  }
  return (
    <form id="lead-form" action={onSubmit} className="space-y-3">
      <Input name="name" placeholder="Your name" required />
      <Input name="phone" placeholder="Phone / WhatsApp" required />
      <Textarea name="message" placeholder="Message (optional)" />
      <Button disabled={loading} type="submit">{loading ? 'Sending...' : 'Send'}</Button>
      {status && <div className="text-sm text-muted-foreground">{status}</div>}
    </form>
  );
}


