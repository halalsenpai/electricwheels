import { listGuides } from '@/lib/md';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Electric Bike Guides | Electric Wheels',
  description: 'Expert guides and buying tips for electric bikes in Pakistan. Learn about EV bike maintenance, charging, and choosing the right model.',
  keywords: 'electric bike guides, EV bike tips, electric scooter maintenance, Pakistan electric vehicles',
  alternates: {
    canonical: '/guides'
  }
};

export default async function GuidesPage() {
  const guides = await listGuides();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs 
          items={[
            { label: "Guides", href: "/guides" }
          ]} 
        />
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Electric Bike Guides</h1>
          <p className="text-muted-foreground">
            Expert guides and tips to help you choose and maintain your electric bike
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Card key={guide.slug} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-lg group-hover:text-green-600 transition-colors">
                    {guide.title}
                  </CardTitle>
                </div>
                {guide.excerpt && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {guide.excerpt}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href={`/guides/${guide.slug}`}>
                    Read Guide
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
