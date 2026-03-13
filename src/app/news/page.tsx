import { Metadata } from 'next';
import NewsPageContent from './NewsPageContent';

export const metadata: Metadata = {
  title: 'News | CHED Ghana',
  description: 'Latest news and updates from the Cocoa Health and Extension Division.',
};

export default function NewsPage() {
  return <NewsPageContent />;
}
