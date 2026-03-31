import { useEffect } from 'react';
import { HeroSection } from '@/sections/HeroSection';
import { GiftsSection } from '@/sections/GiftsSection';
import { FancySection } from '@/sections/FancySection';
import { GoodThingsSection } from '@/sections/GoodThingsSection';
import { NewSection } from '@/sections/NewSection';
import { ArrivalsSection } from '@/sections/ArrivalsSection';
import { ViewAllSection } from '@/sections/ViewAllSection';
import { BeautifulSection } from '@/sections/BeautifulSection';
import { ContactSection } from '@/sections/ContactSection';

export function HomePage() {
  useEffect(() => {
    // Smooth scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative">
      {/* Noise Overlay */}
      <div className="noise-overlay" />
      
      {/* Sections with z-index stacking */}
      <HeroSection />
      <GiftsSection />
      <FancySection />
      <GoodThingsSection />
      <NewSection />
      <ArrivalsSection />
      <ViewAllSection />
      <BeautifulSection />
      <ContactSection />
    </main>
  );
}
