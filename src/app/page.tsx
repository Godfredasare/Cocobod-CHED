'use client';

import Header from '@/components/ched/Header';
import Hero from '@/components/ched/Hero';
import AboutSection from '@/components/ched/AboutSection';
import CocoaPriceChart from '@/components/ched/CocoaPriceChart';
import EventsSection from '@/components/ched/EventsSection';
import VideoSection from '@/components/ched/VideoSection';
import NewsSection from '@/components/ched/NewsSection';
import Footer from '@/components/ched/Footer';
import Chatbot from '@/components/ched/Chatbot';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <AboutSection />
      <CocoaPriceChart />
      <VideoSection />
      <EventsSection />
      <NewsSection />
      <Footer />
      <Chatbot />
    </main>
  );
}
