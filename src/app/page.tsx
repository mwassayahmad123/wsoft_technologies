import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import AIApproach from "@/components/AIApproach";
import Services from "@/components/Services";
import BlogTicker from "@/components/BlogTicker";
import Approach from "@/components/Approach";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <AIApproach />
      <Services />
      <BlogTicker />
      <Approach />
      <Team />
      <Testimonials />
      <CTA />
    </>
  );
}
