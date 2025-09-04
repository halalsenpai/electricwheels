import matter from 'gray-matter';
import { marked } from 'marked';
import fs from 'node:fs/promises';
import path from 'node:path';

export type Guide = { slug: string; title: string; contentHtml: string };

export async function readGuide(slug: string): Promise<Guide | null> {
  const file = path.join(process.cwd(), 'src', 'content', 'guides', `${slug}.md`);
  try {
    const raw = await fs.readFile(file, 'utf8');
    const parsed = matter(raw);
    const html = await marked.parse(parsed.content);
    const title = (parsed.data?.title as string) || slug;
    return { slug, title, contentHtml: String(html) };
  } catch {
    return null;
  }
}

export async function listGuides(): Promise<{ slug: string; title: string }[]> {
  const dir = path.join(process.cwd(), 'src', 'content', 'guides');
  try {
    const files = await fs.readdir(dir);
    const entries = await Promise.all(
      files.filter((f) => f.endsWith('.md')).map(async (f) => {
        const raw = await fs.readFile(path.join(dir, f), 'utf8');
        const parsed = matter(raw);
        const title = (parsed.data?.title as string) || f.replace(/\.md$/, '');
        return { slug: f.replace(/\.md$/, ''), title };
      })
    );
    return entries;
  } catch {
    return [];
  }
}


