import { Metadata } from 'next';
import NewsDetailContent from './NewsDetailContent';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `${id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} | CHED Ghana`,
    description: 'Read the full article from the Cocoa Health and Extension Division.',
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <NewsDetailContent slug={id} />;
}
