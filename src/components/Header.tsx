"use client";
import Link from 'next/link';

export function Header() {
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
            <Link href="/compare/evee-c1/vs/vlektra-bolt">Compare</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}


