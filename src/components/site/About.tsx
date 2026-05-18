import logo from "@/assets/phantoms-logo.jpg";

export const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-mist blur-3xl" />
          <img src={logo} alt="Phantoms watercolor mascot" className="relative mx-auto max-w-sm w-full" />
        </div>
        <div>
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">About the Team</p>
          <h2 className="text-4xl md:text-6xl font-display mb-6">
            We Are <span className="text-gradient-phantom">Phantoms</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            A dek hockey team built on chemistry, hustle, and the cold edge of the boards. We compete hard,
            celebrate harder, and look out for one another on and off the rink.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From rookies to veterans, every Phantom plays a role. If you love the game and the grind, you'll fit right in.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-6">
            {[
              { n: "12", l: "Players" },
              { n: "~10", l: "Games / Season" },
              { n: "1", l: "Family" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-lg p-4 text-center">
                <div className="font-display text-3xl text-gradient-phantom">{s.n}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
