import { Metadata } from 'next';
import OperationsPageContent from './OperationsPageContent';

export const metadata: Metadata = {
  title: 'Operations | CHED Ghana',
  description: 'Learn about CHED\'s operations, programs, and regional coverage across Ghana.',
};

export default function OperationsPage() {
  return <OperationsPageContent />;
}
