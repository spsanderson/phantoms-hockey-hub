import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Schedule } from "@/components/site/Schedule";
import { Roster } from "@/components/site/Roster";
import { News } from "@/components/site/News";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Phantoms Dek Hockey — Official Team Site";
    const meta = document.querySelector('meta[name="description"]');
    const content = "Official site of the Phantoms dek hockey team. Schedule, roster, news, and how to join.";
    if (meta) meta.setAttribute("content", content);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = content;
      document.head.appendChild(m);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Schedule />
        <Roster />
        <News />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
