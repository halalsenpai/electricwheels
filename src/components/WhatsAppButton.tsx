import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function WhatsAppButton({ phone, text }: { phone: string; text: string }) {
  const href = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
  return (
    <Button asChild>
      <Link href={href} target="_blank" rel="noopener noreferrer">WhatsApp</Link>
    </Button>
  );
}


