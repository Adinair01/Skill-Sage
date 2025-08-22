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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Dream Career</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get personalized AI-powered recommendations for your career path, skill development, and internship opportunities tailored to your unique profile.
          </p>
          <Button 
            onClick={startAssessment}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg h-auto"
            data-testid="button-start-assessment"
          >
            <Rocket className="mr-3" size={20} />
            Start Your Career Assessment
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300" data-testid="feature-card-analysis">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Skills Analysis</h3>
            <p className="text-gray-600">AI-powered assessment identifies your strengths and skill gaps with personalized improvement recommendations.</p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300" data-testid="feature-card-roadmaps">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <Route className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Personalized Roadmaps</h3>
            <p className="text-gray-600">Custom learning paths with timeline milestones, course recommendations, and career progression tracking.</p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300" data-testid="feature-card-achievements">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6">
              <Trophy className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Achievement System</h3>
            <p className="text-gray-600">Earn badges, track progress, and celebrate milestones as you advance through your career journey.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
