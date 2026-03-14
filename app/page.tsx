import Header from "@/components/Header";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="max-w-[640px] mx-auto px-6">
      <Header />
      <ExperienceSection />
      <ProjectsSection />
      <Footer />
    </div>
  );
}
