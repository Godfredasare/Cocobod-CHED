import { Metadata } from 'next';
import PartnershipPageContent from './PartnershipPageContent';

export const metadata: Metadata = {
  title: 'Partnerships | CHED Ghana',
  description: 'Learn about our partnerships and collaboration opportunities.',
};

export default function PartnershipPage() {
  return <PartnershipPageContent />;
}
