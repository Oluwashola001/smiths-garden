import Header from "@/components/Header";
import Hero from "@/components/Hero";
import IntroSection from "@/components/IntroSection";
import GardenSection from "@/components/GardenSection";
import ResourcesSection from "@/components/ResourcesSection";
import FelineSection from "@/components/FelineSection";
import Footer from "@/components/Footer";





export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <IntroSection />
      <GardenSection />
      <ResourcesSection />
      <FelineSection />
      <Footer />
    </>
  );
}