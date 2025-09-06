"use client";
import Link from 'next/link';
import { useCompare } from '@/contexts/CompareContext';
import { Badge } from '@/components/ui/badge';

export function Header() {
  const { compareList } = useCompare();
  const compareCount = compareList.length;

  return (
    <header className="border-b bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-semibold">Electric Wheels</Link>
          <nav className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/">Home</Link>
            <Link href="/bikes">Bikes</Link>
            <Link href="/dealers">Dealers</Link>
            <Link href="/guides/intro">Guides</Link>
            <Link href="/search">Advanced Search</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href="/compare" 
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Compare
            {compareCount > 0 && (
              <Badge variant="secondary" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                {compareCount}
              </Badge>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}


