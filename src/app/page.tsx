import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

// HIGH FIX #4: Lazy load below-fold sections for better LCP
const Projects = dynamic(() => import('@/components/sections/projects').then(mod => ({ default: mod.Projects })), {
  loading: () => <div className="py-24 text-center">Loading projects...</div>,
});

const Methodology = dynamic(() => import('@/components/sections/methodology').then(mod => ({ default: mod.Methodology })), {
  loading: () => <div className="py-24 text-center">Loading methodology...</div>,
});

const Experience = dynamic(() => import('@/components/sections/experience').then(mod => ({ default: mod.Experience })), {
  loading: () => <div className="py-24 text-center">Loading experience...</div>,
});

const PortfolioAssistant = dynamic(() => import('@/components/ui/portfolio-assistant').then(mod => ({ default: mod.PortfolioAssistant })), {
  loading: () => <div className="py-16 text-center">Loading AI assistant...</div>,
});

// Enable ISR with revalidation
export const revalidate = 3600; // Revalidate every hour

export default function Home() {
  return (
    <div className="font-body text-foreground bg-background">
      {/* ABOVE THE FOLD - Load immediately for fast LCP */}
      <Header />
      <main>
        <Hero />
        <Stats />

        {/* BELOW THE FOLD - Lazy loaded */}
        <Suspense fallback={<div className="py-16 text-center">Loading...</div>}>
          <PortfolioAssistant />
        </Suspense>
        <Projects />
        <Methodology />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
