interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function SkipLink({ href, children }: SkipLinkProps) {
  return (
    <a
      href={href}
      className="absolute left-0 top-0 z-50 -translate-y-full bg-neon-cyan px-4 py-2 text-dark-bg font-medium transition-transform focus:translate-y-0"
    >
      {children}
    </a>
  );
}
