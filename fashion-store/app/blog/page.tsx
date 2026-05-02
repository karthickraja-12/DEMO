import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — LUXE THREAD",
  description: "Style tips, trend guides, and fashion inspiration from LUXE THREAD.",
};

const posts = [
  {
    id: 1,
    title: "Top 10 Fashion Trends for Summer 2026",
    excerpt: "From elevated basics to bold silhouettes, here's what's defining summer style this season.",
    date: "April 18, 2026",
    category: "Trends",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "How to Build a Capsule Wardrobe in 2026",
    excerpt: "A minimal, versatile wardrobe that works for every occasion. Quality over quantity, always.",
    date: "April 14, 2026",
    category: "Style Guide",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "The Rise of Sustainable Fashion",
    excerpt: "Why conscious fashion choices matter and how we're making them at LUXE THREAD.",
    date: "April 10, 2026",
    category: "Sustainability",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80",
    readTime: "4 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen pb-16" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">
            Our Journal
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold" style={{ color: "var(--text-primary)" }}>
            Style &amp; Inspiration
          </h1>
          <p className="text-base mt-3 max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Trend guides, style tips, and behind-the-scenes stories.
          </p>
        </div>

        {/* Featured */}
        <div className="rounded-3xl overflow-hidden mb-10 relative" style={{ minHeight: "360px" }}>
          <img src={posts[0].image} alt={posts[0].title} className="absolute inset-0 w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="relative z-10 p-10 flex flex-col justify-end" style={{ minHeight: "360px" }}>
            <span className="badge mb-3 w-fit">{posts[0].category}</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2 max-w-lg">{posts[0].title}</h2>
            <p className="text-white/60 text-sm max-w-md">{posts[0].excerpt}</p>
            <div className="flex items-center gap-3 mt-4 text-xs text-white/40">
              <span>{posts[0].date}</span><span>·</span><span>{posts[0].readTime}</span>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {posts.slice(1).map((post) => (
            <div key={post.id} className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-col)" }}>
              <div className="relative h-48 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                <span className="badge absolute top-3 left-3">{post.category}</span>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-base mb-2" style={{ color: "var(--text-primary)" }}>{post.title}</h3>
                <p className="text-sm line-clamp-2" style={{ color: "var(--text-secondary)" }}>{post.excerpt}</p>
                <div className="flex gap-3 mt-4 text-xs" style={{ color: "var(--text-muted)" }}>
                  <span>{post.date}</span><span>·</span><span>{post.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
