import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/phantoms-logo.jpg";

const links = [
  { href: "#about", label: "About" },
  { href: "#schedule", label: "Schedule" },
  
  { href: "#news", label: "News" },
  { href: "#contact", label: "Contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 z-50 w-full glass">
      <nav className="container flex items-center justify-between py-3">
        <a href="#top" className="flex items-center gap-3">
          <img src={logo} alt="Phantoms dek hockey logo" className="h-10 w-10 object-contain mix-blend-screen" />
          <span className="font-display text-2xl tracking-widest text-foreground">PHANTOMS</span>
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <ul className="md:hidden border-t border-border px-6 py-4 space-y-3 bg-background/95">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block text-muted-foreground hover:text-foreground">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};
