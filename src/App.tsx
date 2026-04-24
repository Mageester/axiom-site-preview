/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
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

export default function App() {
  useEffect(() => {
    const lenis = initLenis();
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
  }, []);

  return (
    <div className="grain bg-[var(--ax-bg)] text-[var(--ax-text)] font-geist">
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <MarqueeStrip />
        <Work />
        <Capabilities />
        <Process />
        <WhyAxiom />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

