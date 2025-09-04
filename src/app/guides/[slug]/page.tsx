import { listGuides, readGuide } from '@/lib/md';

export async function generateStaticParams() {
  const guides = await listGuides();
  return guides.map((g) => ({ slug: g.slug }));
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = await readGuide(slug);
  if (!guide) return null;
  
  return (
    <div className="mx-auto max-w-3xl p-6 prose dark:prose-invert">
      <h1>{guide.title}</h1>
      <article dangerouslySetInnerHTML={{ __html: guide.contentHtml }} />
    </div>
  );
}
