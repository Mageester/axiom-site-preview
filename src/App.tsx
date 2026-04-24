/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { initLenis } from './lib/lenis';
import Cursor from './components/ui/Cursor';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';

export default function App() {
  useEffect(() => {
    initLenis();
  }, []);

  return (
    <div className="grain bg-[var(--color-ax-bg)] text-[var(--color-ax-text)] font-geist">
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        {/* More sections will be added here in subsequent prompts */}
      </main>
    </div>
  );
}

