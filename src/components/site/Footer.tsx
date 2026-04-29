import logo from "@/assets/phantoms-logo.jpg";

export const Footer = () => {
  return (
    <footer className="border-t border-border py-10">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Phantoms" className="h-8 w-8 mix-blend-screen" />
          <span className="font-display text-xl tracking-widest">PHANTOMS</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Phantoms Dek Hockey · phantomshockey.org
        </p>
      </div>
    </footer>
  );
};
