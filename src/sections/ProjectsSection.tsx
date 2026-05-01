import { useState, useMemo } from 'react';
import ProjectCard from '../components/ProjectCard';
import { projectsData } from '../utils/data';
import { useScrollReveal } from '../utils/useScrollReveal';

const allTags = Array.from(
  new Set(projectsData.flatMap((p) => p.techStack))
).sort();

const categories = ['All', ...allTags.slice(0, 5)];

export default function ProjectsSection() {
  const { ref, inView } = useScrollReveal<HTMLElement>();
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projectsData;
    return projectsData.filter((p) =>
      p.techStack.some((t) => t.toLowerCase() === activeFilter.toLowerCase())
    );
  }, [activeFilter]);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-20 md:py-28 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <div
          className={`mb-8 md:mb-12 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="text-neon-red text-sm font-semibold uppercase tracking-wider">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2 mb-4">
            Selected Projects
          </h2>
          <p className="text-text-secondary max-w-2xl">
            End-to-end data science projects demonstrating technical depth,
            business acumen, and measurable results.
          </p>
        </div>

        {/* Filter tabs */}
        <div
          className={`flex flex-wrap gap-2 mb-10 transition-all duration-700 delay-100 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
                activeFilter === cat
                  ? 'bg-neon-cyan/10 border-neon-cyan text-neon-cyan'
                  : 'bg-dark-elevated border-dark-border text-text-secondary hover:border-dark-border/80 hover:text-text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
          {filteredProjects.length === 0 && (
            <p className="text-text-muted text-center py-12">
              No projects match this filter.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

