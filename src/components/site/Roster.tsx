const players = [
  { num: 9, name: "Alex Morgan", pos: "Forward", role: "Captain" },
  { num: 17, name: "Jamie Chen", pos: "Forward", role: "Alt" },
  { num: 4, name: "Sam Rivera", pos: "Defense", role: "Alt" },
  { num: 22, name: "Taylor Brooks", pos: "Forward" },
  { num: 11, name: "Jordan Hayes", pos: "Defense" },
  { num: 7, name: "Casey Ward", pos: "Forward" },
  { num: 14, name: "Riley Kim", pos: "Defense" },
  { num: 1, name: "Morgan Lee", pos: "Goalie" },
];

export const Roster = () => {
  return (
    <section id="roster" className="py-24 md:py-32 relative">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">The Squad</p>
          <h2 className="text-4xl md:text-6xl font-display">Meet the Phantoms</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {players.map((p) => (
            <div
              key={p.num}
              className="group relative bg-gradient-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute -top-2 -right-2 opacity-10 font-display text-[7rem] leading-none text-primary group-hover:opacity-20 transition-opacity">
                {p.num}
              </div>
              <div className="relative">
                <div className="font-display text-5xl text-gradient-phantom mb-2">#{p.num}</div>
                <div className="font-semibold text-foreground">{p.name}</div>
                <div className="text-sm text-muted-foreground mt-1">{p.pos}</div>
                {p.role && (
                  <span className="inline-block mt-3 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-primary/20 text-primary">
                    {p.role}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
