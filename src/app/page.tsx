'use client';

import Header from '@/components/ched/Header';
import Hero from '@/components/ched/Hero';
import AboutSection from '@/components/ched/AboutSection';
import CocoaPriceChart from '@/components/ched/CocoaPriceChart';
import NewsSection from '@/components/ched/NewsSection';
import Footer from '@/components/ched/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <AboutSection />
      <CocoaPriceChart />
      <NewsSection />
      <Footer />
    </main>
  );
}
