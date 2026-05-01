import { Suspense, lazy } from 'react';
import { Mail, MapPin, ExternalLink, GraduationCap, Award } from 'lucide-react';
import { personalInfo, educationData, certificationsData } from '../utils/data';
import { useScrollReveal } from '../utils/useScrollReveal';

const MorphingSphere = lazy(() => import('../components/MorphingSphere'));

function CanvasFallback() {
  return (
    <div className="w-full h-[220px] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function ContactSection() {
  const { ref, inView } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-20 md:py-28 px-6 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="text-neon-cyan text-sm font-semibold uppercase tracking-wider">
            Get in Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2 mb-4">
            Let's Work Together
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            I'm actively seeking full-time data science roles and open to
            collaborative projects in ML, NLP, and analytics.
          </p>
        </div>

        {/* Morphing 3D Sphere */}
        <div
          className={`mb-12 transition-all duration-700 delay-100 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Suspense fallback={<CanvasFallback />}>
            <MorphingSphere />
          </Suspense>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <a
            href={`mailto:${personalInfo.email}`}
            className="group flex flex-col items-center p-6 bg-dark-surface/80 border border-dark-border rounded-xl hover:border-neon-cyan/40 transition-colors backdrop-blur-sm"
          >
            <div className="w-12 h-12 rounded-full bg-dark-elevated border border-dark-border flex items-center justify-center mb-4 group-hover:border-neon-cyan/30 transition-colors">
              <Mail className="w-5 h-5 text-neon-cyan" />
            </div>
            <span className="text-text-primary font-medium text-sm">Email</span>
            <span className="text-text-muted text-xs mt-1">{personalInfo.email}</span>
          </a>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center p-6 bg-dark-surface/80 border border-dark-border rounded-xl hover:border-neon-cyan/40 transition-colors backdrop-blur-sm"
          >
            <div className="w-12 h-12 rounded-full bg-dark-elevated border border-dark-border flex items-center justify-center mb-4 group-hover:border-neon-cyan/30 transition-colors">
              <ExternalLink className="w-5 h-5 text-neon-cyan" />
            </div>
            <span className="text-text-primary font-medium text-sm">LinkedIn</span>
            <span className="text-text-muted text-xs mt-1">linkedin.com/in/danish2129</span>
          </a>

          <div className="flex flex-col items-center p-6 bg-dark-surface/80 border border-dark-border rounded-xl backdrop-blur-sm">
            <div className="w-12 h-12 rounded-full bg-dark-elevated border border-dark-border flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5 text-neon-red" />
            </div>
            <span className="text-text-primary font-medium text-sm">Location</span>
            <span className="text-text-muted text-xs mt-1">{personalInfo.location}</span>
          </div>
        </div>

        {/* Education & Certifications */}
        <div
          className={`mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-700 delay-300 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="p-6 bg-dark-surface/80 border border-dark-border rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-5 h-5 text-neon-cyan" />
              <h3 className="text-text-primary font-semibold">Education</h3>
            </div>
            {educationData.map((edu) => (
              <div key={edu.degree} className="mb-2 last:mb-0">
                <div className="text-text-primary text-sm font-medium">
                  {edu.degree}
                </div>
                <div className="text-text-muted text-xs">
                  {edu.school} · {edu.period}
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-dark-surface/80 border border-dark-border rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-5 h-5 text-neon-red" />
              <h3 className="text-text-primary font-semibold">Certifications</h3>
            </div>
            <ul className="space-y-2">
              {certificationsData.map((cert) => (
                <li
                  key={cert}
                  className="text-text-secondary text-sm flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-red mt-2 flex-shrink-0" />
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className={`mt-16 pt-8 border-t border-dark-border text-center transition-all duration-700 delay-400 ${
            inView ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="text-text-muted text-xs">
            © {new Date().getFullYear()} {personalInfo.name}. Built with React, Three.js & Recharts.
          </p>
        </div>
      </div>
    </section>
  );
}

