import Image from 'next/image';
import { Check } from 'lucide-react';

export default function Features() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Your Complete University Study Hub, Simplified.
          </h2>
          <p className="text-lg text-gray-600">
            We provide intuitive tools to access lecture notes, past exams, and study materials across all departments, effortlessly.
          </p>
        </div>

        {/* Feature Box 1 - Image Left */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Left: Image */}
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl bg-gray-100">
            <Image
              src="/books.jpg"
              alt="Students accessing course materials"
              fill
              className="object-cover"
            />
          </div>

          {/* Right: Features */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">📚</span>
              <h3 className="text-2xl font-bold text-purple-600">Comprehensive Course Materials</h3>
            </div>

            <h4 className="text-3xl font-bold text-black mb-4">
              Access All Your Study Resources in One Place
            </h4>

            <p className="text-gray-700 mb-8 leading-relaxed">
              Students can easily browse and download lecture notes, modules, and past exams organized by department, year, and course. Everything you need to succeed is just a click away.
            </p>

            {/* Feature List */}
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Check className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <span className="text-gray-700">Organized by department, year, and course</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <span className="text-gray-700">Instant PDF downloads</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <span className="text-gray-700">24/7 access to study materials</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Feature Box 2 - Image Right */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Left: Features */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">📝</span>
              <h3 className="text-2xl font-bold text-purple-600">Past Exams & Practice Tests</h3>
            </div>

            <h4 className="text-3xl font-bold text-black mb-4">
              Prepare Better with Previous Examinations
            </h4>

            <p className="text-gray-700 mb-8 leading-relaxed">
              Access a comprehensive collection of past exams and practice questions from previous years. Understand exam patterns and improve your performance with real test materials.
            </p>

            {/* Feature List */}
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Check className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <span className="text-gray-700">Previous years' examination papers</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <span className="text-gray-700">Practice tests with answer keys</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <span className="text-gray-700">Self-assessment tools</span>
              </li>
            </ul>
          </div>

          {/* Right: Image */}
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl bg-gray-100">
            <Image
              src="/exam.jpg"
              alt="Students studying with past exams"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Feature Box 3 - Image Left */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl bg-gray-100">
            <Image
              src="/interactive.jpg"
              alt="Modern lecture hall"
              fill
              className="object-cover"
            />
          </div>

          {/* Right: Features */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">📖</span>
              <h3 className="text-2xl font-bold text-purple-600">Interactive Study Modules</h3>
            </div>

            <h4 className="text-3xl font-bold text-black mb-4">
              Learn Smarter with Organized Course Content
            </h4>

            <p className="text-gray-700 mb-8 leading-relaxed">
              Access well-structured lecture notes and study modules designed to help you grasp complex concepts easily. Navigate through topics systematically and track your learning progress.
            </p>

            {/* Feature List */}
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Check className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <span className="text-gray-700">Well-organized lecture notes</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <span className="text-gray-700">Module-based learning structure</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <span className="text-gray-700">Easy course navigation</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}