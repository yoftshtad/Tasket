import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CTA() {
  return (
    <section 
      className="py-24 px-4 relative overflow-hidden"
      style={{
        backgroundImage: 
          'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to right, rgb(147,51,234), rgb(126,34,206))',
        backgroundSize: '50px 50px, 50px 50px, 100% 100%',
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Content */}
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Access All Your Study Materials?
        </h2>

        <p className="text-lg text-white/90 mb-8">
          Join thousands of students who trust our platform to access lecture notes, past exams, and study resources. Start browsing in minutes.
        </p>
        <Link href="/departments">
        <Button className="bg-white hover:bg-gray-100 text-purple-600 text-lg px-8 py-6 rounded-lg font-semibold">
          Start Exploring Courses Now →
        </Button>
        </Link>
      </div>
    </section>
  );
}