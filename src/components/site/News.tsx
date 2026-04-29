const posts = [
  {
    date: "Apr 28, 2026",
    title: "Phantoms clinch playoff berth with road win",
    excerpt: "A gritty 5–3 victory over Steel City secures our spot in the spring bracket. Full recap inside.",
  },
  {
    date: "Apr 15, 2026",
    title: "New jerseys drop next week",
    excerpt: "Fresh navy & purple sweaters with the watercolor crest. Pre-orders open Monday.",
  },
  {
    date: "Apr 02, 2026",
    title: "Spring season kicks off",
    excerpt: "Ten games, one goal. Here's what to expect from the 2026 Phantoms campaign.",
  },
];

export const News = () => {
  return (
    <section id="news" className="py-24 md:py-32 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">Latest</p>
          <h2 className="text-4xl md:text-6xl font-display">News & Updates</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {posts.map((p, i) => (
            <article
              key={i}
              className="bg-gradient-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-card group cursor-pointer"
            >
              <div className="text-xs uppercase tracking-widest text-primary mb-3">{p.date}</div>
              <h3 className="text-xl font-display mb-3 text-foreground group-hover:text-gradient-phantom transition-all">
                {p.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.excerpt}</p>
              <div className="mt-4 text-sm font-semibold text-primary">Read more →</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
