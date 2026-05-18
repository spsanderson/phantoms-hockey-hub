import { Mail, Instagram, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll be in touch soon.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">Get in Touch</p>
          <h2 className="text-4xl md:text-6xl font-display">Join the Phantoms</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Interested in playing, sponsoring, or just want to say hi? Drop us a line.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="space-y-6">
            <a href="mailto:admin@phantomshockey.org" className="glass rounded-xl p-5 flex items-center gap-4 hover:border-primary/50 transition-all">
              <div className="h-11 w-11 rounded-full bg-gradient-phantom flex items-center justify-center">
                <Mail className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Email</div>
                <div className="font-semibold text-foreground">hello@phantomshockey.org</div>
              </div>
            </a>
            <a href="#" className="glass rounded-xl p-5 flex items-center gap-4 hover:border-primary/50 transition-all">
              <div className="h-11 w-11 rounded-full bg-gradient-phantom flex items-center justify-center">
                <Instagram className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Instagram</div>
                <div className="font-semibold text-foreground">@phantomsdek</div>
              </div>
            </a>
            <div className="glass rounded-xl p-5 flex items-center gap-4">
              <div className="h-11 w-11 rounded-full bg-gradient-phantom flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Home Rink</div>
                <div className="font-semibold text-foreground">Rink 2 — Home Dek</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="glass rounded-xl p-6 space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Name</label>
              <Input required name="name" placeholder="Your name" className="bg-background/50" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Email</label>
              <Input required type="email" name="email" placeholder="you@example.com" className="bg-background/50" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Message</label>
              <Textarea required name="message" placeholder="Tell us a bit about yourself..." rows={4} className="bg-background/50" />
            </div>
            <Button type="submit" className="w-full bg-gradient-phantom text-primary-foreground shadow-phantom hover:opacity-90">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
