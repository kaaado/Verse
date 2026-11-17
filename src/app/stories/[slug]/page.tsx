import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getStoryBySlug, getPublishedStories } from '@/lib/data';
import { IconSparkles } from '@/components/icons';

interface StoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const stories = await getPublishedStories();
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) {
    return { title: 'Story Not Found — THE YACINEVERSE' };
  }

  return {
    title: `${story.title} | THE YACINEVERSE Chronicle`,
    description: story.excerpt,
    openGraph: {
      title: story.title,
      description: story.excerpt,
      type: 'article',
    },
  };
}

export default async function StoryDetailPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#F8FAFC] flex flex-col">
      <header className="border-b border-[#1E293B] bg-[#111827]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <nav className="flex items-center space-x-2 text-xs font-mono text-[#94A3B8]">
            <Link href="/" className="hover:text-[#F8FAFC]">
              THE YACINEVERSE
            </Link>
            <span>/</span>
            <span className="text-[#10B981]">Chronicle</span>
          </nav>

          <Link
            href="/?view=dossier"
            className="text-xs text-[#94A3B8] hover:text-[#F8FAFC] px-3 py-1 rounded-lg border border-[#1E293B] hover:border-[#334155]"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="flex items-center space-x-3 mb-4 text-xs font-mono text-[#10B981]">
          <span className="flex items-center space-x-1">
            <IconSparkles className="w-3.5 h-3.5" />
            <span>Technical Chronicle</span>
          </span>
          <span>•</span>
          <span className="text-[#94A3B8]">{story.read_time_minutes} min read</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold font-display text-[#F8FAFC] tracking-tight leading-tight">
          {story.title}
        </h1>

        <p className="text-base text-[#06B6D4] font-medium mt-3 pb-6 border-b border-[#1E293B]">
          {story.excerpt}
        </p>

        {story.tags && story.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 my-6">
            {story.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#111827] border border-[#1E293B] text-[#94A3B8]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <article className="prose prose-invert max-w-none text-sm sm:text-base text-[#94A3B8] leading-relaxed space-y-4">
          <div className="whitespace-pre-line font-body">
            {story.content_mdx}
          </div>
        </article>
      </main>

      <footer className="border-t border-[#1E293B] py-6 text-center text-xs text-[#94A3B8] font-mono">
        THE YACINEVERSE • A journey through the mind of a builder
      </footer>
    </div>
  );
}
