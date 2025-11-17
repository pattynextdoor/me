import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <div style={{ background: 'linear-gradient(to bottom, #0b1829, #0b1829)' }}>
        <About />
        <Experience />
      </div>
      <Contact />
    </>
  );
}
