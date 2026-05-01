import { Suspense } from 'react';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import SkipLink from './components/SkipLink';
import LoadingSkeleton from './components/LoadingSkeleton';
import HeroSection from './sections/HeroSection';
import SkillsSection from './sections/SkillsSection';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import BlogSection from './sections/BlogSection';
import ContactSection from './sections/ContactSection';
import { useKeyboardNav } from './utils/useKeyboardNav';

// Loading skeleton for lazy loaded sections
function SectionSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSkeleton variant="rectangular" width="100%" height="400px" />
    </div>
  );
}

function App() {
  // Keyboard navigation for quick scrolling
  useKeyboardNav({
    onHome: () => {
      document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
    },
    onEnd: () => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    },
    onUp: () => {
      window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
    },
    onDown: () => {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    },
  });

  return (
    <div className="min-h-screen bg-dark-bg text-text-primary">
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <ScrollProgress />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <ErrorBoundary>
          <Suspense fallback={<SectionSkeleton />}>
            <SkillsSection />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionSkeleton />}>
            <ExperienceSection />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionSkeleton />}>
            <ProjectsSection />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionSkeleton />}>
            <BlogSection />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionSkeleton />}>
            <ContactSection />
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default App;
