import { Metadata } from 'next';
import GalleryPageContent from './GalleryPageContent';

export const metadata: Metadata = {
  title: 'Gallery | CHED Ghana',
  description: 'Photo gallery showcasing CHED\'s activities and events.',
};

export default function GalleryPage() {
  return <GalleryPageContent />;
}
