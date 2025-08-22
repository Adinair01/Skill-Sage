import { Button } from "@/components/ui/button";
import { Rocket, TrendingUp, Route, Trophy } from "lucide-react";

export default function Hero() {
  const startAssessment = () => {
    const element = document.getElementById('assessment');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-16 bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 min-h-screen" data-testid="hero-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Discover Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Dream Career</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            Get personalized AI-powered recommendations for your career path, skill development, and internship opportunities tailored to your unique profile.
          </p>
          <Button 
            onClick={startAssessment}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg h-auto w-full sm:w-auto"
            data-testid="button-start-assessment"
          >
            <Rocket className="mr-2 sm:mr-3" size={18} />
            Start Your Career Assessment
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300" data-testid="feature-card-analysis">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              <TrendingUp className="text-white" size={24} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Smart Skills Analysis</h3>
            <p className="text-gray-600 text-sm sm:text-base">AI-powered assessment identifies your strengths and skill gaps with personalized improvement recommendations.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300" data-testid="feature-card-roadmaps">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              <Route className="text-white" size={24} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Personalized Roadmaps</h3>
            <p className="text-gray-600 text-sm sm:text-base">Custom learning paths with timeline milestones, course recommendations, and career progression tracking.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-1" data-testid="feature-card-achievements">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              <Trophy className="text-white" size={24} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Achievement System</h3>
            <p className="text-gray-600 text-sm sm:text-base">Earn badges, track progress, and celebrate milestones as you advance through your career journey.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
