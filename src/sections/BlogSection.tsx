import { useScrollReveal } from '../utils/useScrollReveal';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  link: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Understanding TF-IDF for Resume Screening',
    excerpt: 'A comprehensive guide to using TF-IDF vectorization for matching resumes to job descriptions.',
    date: 'Coming Soon',
    readTime: '5 min read',
    category: 'NLP',
    link: '#',
  },
  {
    id: '2',
    title: 'Feature Engineering Techniques for Loan Prediction',
    excerpt: 'Best practices for handling missing values and creating predictive features.',
    date: 'Coming Soon',
    readTime: '8 min read',
    category: 'ML',
    link: '#',
  },
  {
    id: '3',
    title: 'Deploying ML Models with Streamlit',
    excerpt: 'Step-by-step guide to building interactive data science dashboards.',
    date: 'Coming Soon',
    readTime: '6 min read',
    category: 'Deployment',
    link: '#',
  },
];

export default function BlogSection() {
  const { ref, inView } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="blog"
      ref={ref}
      className="relative py-20 md:py-28 px-6 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        <div
          className={`transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="text-neon-cyan text-sm font-semibold uppercase tracking-wider">
            Insights
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2 mb-4">
            Blog & Articles
          </h2>
          <p className="text-text-secondary max-w-2xl mb-12">
            Sharing knowledge and insights from my data science journey.
            Technical tutorials, project walkthroughs, and best practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className={`group p-6 rounded-xl bg-dark-surface/80 border border-dark-border hover:border-neon-cyan/30 transition-all duration-300 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-neon-cyan font-medium">
                  {post.category}
                </span>
                <span className="text-xs text-text-muted">{post.readTime}</span>
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-neon-cyan transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">{post.date}</span>
                <span className="text-xs text-neon-cyan group-hover:underline">
                  Read more →
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-text-muted text-sm">
            More articles coming soon! Subscribe to get updates.
          </p>
        </div>
      </div>
    </section>
  );
}
