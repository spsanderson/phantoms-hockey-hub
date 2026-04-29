import heroImg from "@/assets/hero-rink.jpg";
import banner from "@/assets/phantoms-banner.jpg";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroImg}
        alt="Misty hockey rink at night"
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-mist" />

      <div className="relative z-10 container text-center px-4">
        <img
          src={banner}
          alt="Phantoms script logo"
          className="mx-auto max-w-2xl w-full mix-blend-screen drop-shadow-[0_0_40px_hsl(220_70%_60%/0.4)]"
        />
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Dek hockey, played in the shadows. Skill, speed, and a little haunting.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-gradient-phantom text-primary-foreground shadow-phantom hover:opacity-90 transition-opacity">
            <a href="#schedule">View Schedule</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-primary/40 text-foreground hover:bg-primary/10">
            <a href="#contact">Join the Team</a>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground text-sm tracking-widest animate-pulse">
        SCROLL
      </div>
    </section>
  );
};
