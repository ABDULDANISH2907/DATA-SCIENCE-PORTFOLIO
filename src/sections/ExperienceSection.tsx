import { Suspense, lazy } from 'react';
import { Briefcase } from 'lucide-react';
import { experienceData } from '../utils/data';
import { useScrollReveal } from '../utils/useScrollReveal';

const FloatingShapes = lazy(() => import('../components/FloatingShapes'));

export default function ExperienceSection() {
  const { ref, inView } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="experience"
      ref={ref}
      className="relative py-20 md:py-28 px-6 overflow-hidden"
    >
      {/* Floating 3D shapes background */}
      <Suspense fallback={null}>
        <FloatingShapes count={3} colors={['#ff2a6d', '#05d9e8', '#ff2a6d']} seed={456} />
      </Suspense>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div
          className={`mb-12 md:mb-16 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="text-neon-cyan text-sm font-semibold uppercase tracking-wider">
            Work History
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2 mb-4">
            Experience
          </h2>
        </div>

        <div className="space-y-8">
          {experienceData.map((exp, index) => (
            <div
              key={index}
              className={`relative bg-dark-surface/80 border border-dark-border rounded-xl p-6 md:p-8 hover:border-neon-cyan/30 transition-all duration-700 backdrop-blur-sm ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-dark-elevated border border-dark-border flex items-center justify-center flex-shrink-0 mt-1">
                  <Briefcase className="w-5 h-5 text-neon-cyan" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                    <h3 className="text-lg font-semibold text-text-primary">
                      {exp.role}
                    </h3>
                    <span className="text-xs font-medium text-neon-cyan bg-neon-cyan/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-text-secondary text-sm mb-4">
                    {exp.company} — {exp.location}
                  </p>
                  <ul className="space-y-2">
                    {exp.points.map((point, i) => (
                      <li
                        key={i}
                        className="text-text-secondary text-sm leading-relaxed flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan mt-2 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

