import Header from '@/components/header';
import Hero from '@/components/hero';
import Features from '@/components/features';
import PainPoints from '@/components/pain-points';
import FAQ from '@/components/faq';
import CTA from '@/components/cta';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      
      <Hero />
      <Features />
      <PainPoints />
      <CTA />
      <FAQ />
      
    </main>
  );
}
