import { useRef, useState } from 'react';
import { ArrowUpRight, BarChart3 } from 'lucide-react';
import type { Project } from '../utils/data';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');
  const [glowOpacity, setGlowOpacity] = useState(0);

  const isCyan = project.color === 'cyan';
  const glowColor = isCyan ? 'rgba(5, 217, 232, 0.4)' : 'rgba(255, 42, 109, 0.4)';
  const accentColor = isCyan ? 'text-neon-cyan' : 'text-neon-red';
  const borderColor = isCyan ? 'border-neon-cyan/20' : 'border-neon-red/20';
  const hoverBorder = isCyan ? 'hover:border-neon-cyan/50' : 'hover:border-neon-red/50';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    setGlowOpacity(1);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg)');
    setGlowOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: 'transform 0.15s ease-out, border-color 0.3s ease',
      }}
      className={`relative bg-dark-surface border ${borderColor} ${hoverBorder} rounded-xl p-6 md:p-8 overflow-hidden group`}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
        style={{
          boxShadow: `inset 0 0 40px ${glowColor}`,
          opacity: glowOpacity,
        }}
      />

      {/* Index badge */}
      <div className="absolute top-4 right-4 text-text-muted text-xs font-mono">
        0{index + 1}
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl md:text-2xl font-semibold text-text-primary pr-8">
            {project.title}
          </h3>
          <BarChart3 className={`w-5 h-5 ${accentColor} flex-shrink-0 mt-1`} />
        </div>

        <div className="space-y-4">
          <div>
            <span className={`text-xs font-semibold uppercase tracking-wider ${accentColor}`}>
              Problem
            </span>
            <p className="text-text-secondary text-sm mt-1 leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div>
            <span className={`text-xs font-semibold uppercase tracking-wider ${accentColor}`}>
              Solution
            </span>
            <p className="text-text-secondary text-sm mt-1 leading-relaxed">
              {project.solution}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-medium rounded-full bg-dark-elevated border border-dark-border text-text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="pt-3 border-t border-dark-border">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-semibold uppercase tracking-wider ${accentColor}`}>
                Result
              </span>
              <ArrowUpRight className={`w-3.5 h-3.5 ${accentColor}`} />
            </div>
            <p className="text-text-primary text-sm leading-relaxed mb-3">
              {project.result}
            </p>
            <div className="flex flex-wrap gap-4">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="text-center">
                  <div className={`text-lg md:text-xl font-bold ${accentColor}`}>
                    {metric.value}
                  </div>
                  <div className="text-xs text-text-muted">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

