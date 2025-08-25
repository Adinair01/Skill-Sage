import Navigation from "@/components/layout/navigation";
import Hero from "@/components/layout/hero";
import AssessmentForm from "@/components/assessment/assessment-form";
import RecommendationsSection from "@/components/recommendations/recommendations-section";
import SkillsAnalysis from "@/components/skills-analysis/skills-analysis";
import ProgressSection from "@/components/progress/progress-section";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-brown-50">
      <Navigation />
      <Hero />
      <AssessmentForm />
      <RecommendationsSection />
      <SkillsAnalysis />
      <ProgressSection />
      <Footer />
    </div>
  );
}
