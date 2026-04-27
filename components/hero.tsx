import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-8">
          <span className="text-lg">📚</span>
          <span className="font-medium">The Future of University Study Hub</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
          Stop Searching, Start Studying.
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
          Tasket is the all-in-one platform for university students. Access lecture notes, past exams, and study modules across all departments, so you can focus on what matters – acing your courses!
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link href="/departments">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6 rounded-lg">
              Start Exploring →
          </Button>
          </Link>
          
          <Button variant="outline" className="border-gray-300 text-purple-600 hover:bg-gray-50 text-lg px-8 py-6 rounded-lg">
            Learn More
          </Button>
        </div>

        {/* Subtext */}
        <p className="text-gray-500 text-sm">
          Free access for all students. No payment required.
        </p>
      </div>
    </section>
  );
}