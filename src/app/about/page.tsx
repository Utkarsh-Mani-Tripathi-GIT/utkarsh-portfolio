import { AboutSection } from "@/components/AboutSection";
import { ThemeSwitchEffect } from "@/components/ThemeSwitchEffect";
import { Navbar } from "@/components/Navbar";

export default function AboutPage() {
  return (
    <>
      <ThemeSwitchEffect />
      <Navbar />
      <div className="pt-32">
        <AboutSection />
      </div>
    </>
  );
}
