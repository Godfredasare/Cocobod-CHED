import { Metadata } from 'next';
import ManagementPageContent from './ManagementPageContent';

export const metadata: Metadata = {
  title: 'Management | CHED Ghana',
  description: 'Meet the leadership team of the Cocoa Health and Extension Division.',
};

export default function ManagementPage() {
  return <ManagementPageContent />;
}
