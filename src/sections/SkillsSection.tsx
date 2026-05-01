import { Suspense, lazy } from 'react';
import SkillsChart from '../components/SkillsChart';
import { useScrollReveal } from '../utils/useScrollReveal';

const FloatingShapes = lazy(() => import('../components/FloatingShapes'));
const DataCube = lazy(() => import('../components/DataCube'));

function CanvasFallback() {
  return (
    <div className="w-full h-[200px] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function SkillsSection() {
  const { ref, inView } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-20 md:py-28 px-6 overflow-hidden"
    >
      {/* Floating 3D shapes background */}
      <Suspense fallback={null}>
        <FloatingShapes count={4} seed={123} />
      </Suspense>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div
          className={`transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="text-neon-cyan text-sm font-semibold uppercase tracking-wider">
            Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2 mb-4">
            Skills & Proficiencies
          </h2>
          <p className="text-text-secondary max-w-2xl mb-12">
            A toolkit built through academic training and hands-on internship
            experience working with real datasets and production ML pipelines.
          </p>
        </div>

        {/* 3D Data Cube */}
        <div
          className={`mb-10 transition-all duration-700 delay-100 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Suspense fallback={<CanvasFallback />}>
            <DataCube />
          </Suspense>
        </div>

        <div
          className={`grid grid-cols-1 lg:grid-cols-5 gap-10 items-center transition-all duration-700 delay-200 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Chart */}
          <div className="lg:col-span-3 bg-dark-surface/80 border border-dark-border rounded-xl p-4 md:p-6 backdrop-blur-sm">
            <SkillsChart />
          </div>

          {/* Skill list */}
          <div className="lg:col-span-2 space-y-4">
            {[
              { name: 'Languages', desc: 'Python, SQL' },
              { name: 'Libraries & Frameworks', desc: 'Pandas, NumPy, Scikit-learn, Flask' },
              { name: 'ML Techniques', desc: 'Classification, Clustering, NLP, Feature Engineering' },
              { name: 'Visualization', desc: 'Matplotlib, Seaborn, Tableau, Streamlit' },
              { name: 'Tools & Workflow', desc: 'Git, GitHub, EDA, REST APIs' },
            ].map((skill, i) => (
              <div
                key={skill.name}
                className={`p-4 rounded-lg bg-dark-elevated/80 border border-dark-border hover:border-neon-cyan/30 transition-all duration-500 backdrop-blur-sm ${
                  inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                }`}
                style={{ transitionDelay: `${300 + i * 100}ms` }}
              >
                <div className="font-medium text-text-primary text-sm">
                  {skill.name}
                </div>
                <div className="text-text-muted text-xs mt-0.5">
                  {skill.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

