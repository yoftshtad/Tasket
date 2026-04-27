import { X } from 'lucide-react';

export default function PainPoints() {
  const painPoints = [
    {
      title: 'Scattered Study Materials',
      description: 'Lecture notes on one platform, past exams on another, modules in an email? It\'s chaotic and time-consuming.',
    },
    {
      title: 'Hard to Find Resources',
      description: 'Spending hours searching for the right study materials instead of actually studying?',
    },
    {
      title: 'Outdated Content',
      description: 'Using old versions of notes and exams? Missing out on the latest study resources shared by peers.',
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Tired of the Study Hunt?
          </h2>
          <p className="text-lg text-gray-600">
            Scattered resources, outdated materials, and endless searching can waste your study time. Our platform centralizes everything you need.
          </p>
        </div>

        {/* Pain Points Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-gray-50 border border-gray-200 hover:shadow-lg transition-shadow text-center"
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                  <X className="w-8 h-8 text-red-500" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-black mb-3">{point.title}</h3>

              {/* Description */}
              <p className="text-gray-600">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}