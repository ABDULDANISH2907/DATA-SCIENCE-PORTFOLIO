import { Suspense, lazy } from 'react';
import { ChevronDown, Code2, Globe, Mail, Download } from 'lucide-react';
import { personalInfo, summary } from '../utils/data';
import Typewriter from '../components/Typewriter';
import StatCounter from '../components/StatCounter';
import ParticleNetwork from '../components/ParticleNetwork';

const Hero3D = lazy(() => import('../components/Hero3D'));

function HeroFallback() {
  return (
    <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16 overflow-hidden"
    >
      {/* Particle network background */}
      <div className="absolute inset-0 z-0">
        <ParticleNetwork />
      </div>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/80 via-dark-bg/90 to-dark-surface pointer-events-none z-[1]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none z-[1]" />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Text content */}
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-elevated/80 border border-dark-border text-xs text-text-secondary mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
            Available for opportunities
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight tracking-tight mb-2">
            {personalInfo.name}
          </h1>
          <div className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 h-10">
            <Typewriter
              text={personalInfo.title}
              speed={100}
              delay={800}
              className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-red"
            />
          </div>

          <p className="text-text-secondary text-base md:text-lg max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed">
            {summary}
          </p>

          {/* Stats counters */}
          <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto lg:mx-0 mb-8 p-4 bg-dark-surface/60 border border-dark-border rounded-xl backdrop-blur-sm">
            <StatCounter end={70} suffix="K+" label="Records Processed" />
            <StatCounter end={2} suffix="+" label="Projects Deployed" />
            <StatCounter end={10} suffix="+" label="ML Models Built" />
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-4 mb-10">
            <a
              href="#projects"
              className="px-6 py-2.5 bg-neon-cyan text-dark-bg font-semibold rounded-lg hover:bg-neon-cyan/90 transition-colors"
            >
              View Projects
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="px-6 py-2.5 border border-dark-border text-text-primary rounded-lg hover:border-neon-cyan hover:text-neon-cyan transition-colors"
            >
              Contact Me
            </a>
            <a
              href="https://drive.google.com/file/d/19_WV_TT15fTpcAA6W409-bWVoUi-Jvk5/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 border border-neon-red/30 text-neon-red rounded-lg hover:bg-neon-red/10 transition-colors"
              title="Download Resume"
            >
              <Download className="w-4 h-4" />
              CV
            </a>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-dark-elevated border border-dark-border text-text-secondary hover:text-neon-cyan hover:border-neon-cyan/30 transition-colors"
              aria-label="GitHub"
            >
              <Code2 className="w-5 h-5" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-dark-elevated border border-dark-border text-text-secondary hover:text-neon-cyan hover:border-neon-cyan/30 transition-colors"
              aria-label="LinkedIn"
            >
              <Globe className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-2 rounded-lg bg-dark-elevated border border-dark-border text-text-secondary hover:text-neon-cyan hover:border-neon-cyan/30 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* 3D Visualization */}
        <div className="order-1 lg:order-2 w-full h-[350px] md:h-[450px] lg:h-[550px]">
          <Suspense fallback={<HeroFallback />}>
            <Hero3D />
          </Suspense>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-10">
        <span className="text-xs text-text-muted">Scroll</span>
        <ChevronDown className="w-4 h-4 text-text-muted" />
      </div>
    </section>
  );
}
