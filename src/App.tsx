import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { initLenis } from './lib/lenis';
import Cursor from './components/ui/Cursor';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import MarqueeStrip from './components/sections/MarqueeStrip';
import Work from './components/sections/Work';
import Capabilities from './components/sections/Capabilities';
import Process from './components/sections/Process';
import WhyAxiom from './components/sections/WhyAxiom';
import Pricing from './components/sections/Pricing';
import FinalCTA from './components/sections/FinalCTA';
import Footer from './components/sections/Footer';
import { WorkPage, PricingPage, ProcessPage, AboutPage, StartProjectPage, ContactPage, LegalPage } from './components/pages/SitePages';

function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <Work />
      <Capabilities />
      <Process />
      <WhyAxiom />
      <Pricing />
      <FinalCTA />
    </>
  );
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    const lenis = initLenis();
    
    // Scroll to top on route change
    window.scrollTo(0, 0);

    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      requestAnimationFrame(() => {
        const target = document.querySelector(hash);
        if (!target) return;
        lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.1 });
      });
    };

    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);

    return () => window.removeEventListener('hashchange', scrollToHash);
  }, [location.pathname]);

  return (
    <div className="grain bg-[var(--ax-bg)] text-[var(--ax-text)] font-geist">
      <Cursor />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/start-a-project" element={<StartProjectPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<LegalPage type="privacy" />} />
          <Route path="/terms" element={<LegalPage type="terms" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
