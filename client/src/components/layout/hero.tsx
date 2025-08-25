import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Rocket, TrendingUp, Route, Trophy, Star, Target, Users, Zap, ArrowRight, Sparkles, Heart, Lightbulb } from "lucide-react";

export default function Hero() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const motivationalQuotes = [
    "Your future is created by what you do today, not tomorrow.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The only way to do great work is to love what you do.",
    "Your career is a journey, not a destination. Enjoy the ride!",
    "Every expert was once a beginner. Start where you are, use what you have, do what you can."
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 5000);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const startAssessment = () => {
    const element = document.getElementById('assessment');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-16 bg-gradient-to-br from-cream-50 via-cream-100 to-brown-100 min-h-screen relative overflow-hidden" data-testid="hero-section">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-burgundy-400 to-brown-400 rounded-full opacity-20 animate-pulse transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-20' : 'translate-y-10 opacity-0'}`} style={{ animationDelay: '0s' }}></div>
        <div className={`absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-brown-400 to-hazelnut-400 rounded-full opacity-20 animate-pulse transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-20' : 'translate-y-10 opacity-0'}`} style={{ animationDelay: '1s' }}></div>
        <div className={`absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-r from-hazelnut-400 to-chocolate-400 rounded-full opacity-20 animate-pulse transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-20' : 'translate-y-10 opacity-0'}`} style={{ animationDelay: '2s' }}></div>
        <div className={`absolute bottom-20 right-10 w-12 h-12 bg-gradient-to-r from-chocolate-400 to-burgundy-400 rounded-full opacity-20 animate-pulse transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-20' : 'translate-y-10 opacity-0'}`} style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Arrow Follower */}
      <div 
        className="fixed w-6 h-6 pointer-events-none z-50 transition-transform duration-100 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: 'rotate(45deg)'
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-burgundy-500 to-brown-500 rounded-sm opacity-60 animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
        {/* Main Content */}
        <div className="text-center mb-12 sm:mb-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 mb-6 bg-gradient-to-r from-burgundy-100 to-brown-100 px-4 py-2 rounded-full border border-burgundy-200">
              <Sparkles className="w-5 h-5 text-burgundy-600" />
              <span className="text-burgundy-700 font-medium font-display text-lg">AI-Powered Career Guidance</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6 sm:mb-8 leading-tight">
              Discover Your <span className="bg-gradient-to-r from-burgundy-600 via-brown-600 to-chocolate-600 bg-clip-text text-transparent animate-pulse font-display">Dream Career</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-text-secondary mb-8 sm:mb-10 max-w-4xl mx-auto px-4 leading-relaxed">
              Get personalized AI-powered recommendations for your career path, skill development, and internship opportunities tailored to your unique profile.
            </p>
            <div className="inline-flex items-center gap-2 mb-6 bg-gradient-to-r from-brown-100 to-hazelnut-100 px-4 py-2 rounded-full border border-brown-200">
              <Sparkles className="w-5 h-5 text-brown-600" />
              <span className="text-brown-700 font-medium font-accent text-lg">Powered by CareerCraft AI</span>
            </div>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-text-secondary mb-8 sm:mb-10 max-w-4xl mx-auto px-4 leading-relaxed">
              Get personalized AI-powered recommendations for your career path, skill development, and internship opportunities tailored to your unique profile.
            </p>

            {/* Motivational Quote */}
            <div className={`mb-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-cream-50/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-brown-100 max-w-3xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Heart className="w-6 h-6 text-burgundy-500 animate-pulse" />
                  <span className="text-lg font-semibold text-text-primary font-display">Daily Motivation</span>
                  <Heart className="w-6 h-6 text-burgundy-500 animate-pulse" />
                </div>
                <p className="text-text-primary text-lg italic leading-relaxed font-serif">
                  "{motivationalQuotes[currentQuote]}"
                </p>
              </div>
            </div>

            <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Button 
                onClick={startAssessment}
                className="bg-gradient-to-r from-burgundy-600 via-brown-600 to-chocolate-600 text-cream-50 px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-bold hover:from-burgundy-700 hover:via-brown-700 hover:to-chocolate-700 transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-3xl h-auto w-full sm:w-auto group"
                data-testid="button-start-assessment"
              >
                <Rocket className="mr-3 sm:mr-4 group-hover:animate-bounce" size={20} />
                Start Your Career Assessment
                <ArrowRight className="ml-3 sm:ml-4 group-hover:translate-x-2 transition-transform duration-300" size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Feature Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 sm:mb-16 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="group bg-cream-50/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-brown-100 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-gradient-to-br hover:from-cream-50 hover:to-brown-50" data-testid="feature-card-analysis">
            <div className="w-20 h-20 bg-gradient-to-r from-burgundy-500 to-burgundy-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="text-cream-50" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-4 font-serif">Smart Skills Analysis</h3>
            <p className="text-text-secondary text-lg leading-relaxed">AI-powered assessment identifies your strengths and skill gaps with personalized improvement recommendations.</p>
            <div className="mt-6 flex items-center text-burgundy-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
              <span>Learn More</span>
              <ArrowRight className="ml-2 w-5 h-5" />
            </div>
          </div>

          <div className="group bg-cream-50/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-brown-100 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-gradient-to-br hover:from-brown-50 hover:to-hazelnut-50" data-testid="feature-card-roadmaps">
            <div className="w-20 h-20 bg-gradient-to-r from-brown-500 to-brown-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Route className="text-cream-50" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-4 font-serif">Personalized Roadmaps</h3>
            <p className="text-text-secondary text-lg leading-relaxed">Custom learning paths with timeline milestones, course recommendations, and career progression tracking.</p>
            <div className="mt-6 flex items-center text-brown-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
              <span>Explore Paths</span>
              <ArrowRight className="ml-2 w-5 h-5" />
            </div>
          </div>

          <div className="group bg-cream-50/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-brown-100 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-gradient-to-br hover:from-hazelnut-50 hover:to-chocolate-50 md:col-span-2 lg:col-span-1" data-testid="feature-card-achievements">
            <div className="w-20 h-20 bg-gradient-to-r from-hazelnut-500 to-hazelnut-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Trophy className="text-cream-50" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-4 font-serif">Achievement System</h3>
            <p className="text-text-secondary text-lg leading-relaxed">Earn badges, track progress, and celebrate milestones as you advance through your career journey.</p>
            <div className="mt-6 flex items-center text-hazelnut-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
              <span>View Achievements</span>
              <ArrowRight className="ml-2 w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Progress Tracking Preview */}
        <div className={`text-center transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-cream-50/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-brown-100 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Target className="w-8 h-8 text-burgundy-600" />
              <h3 className="text-2xl font-bold text-text-primary font-serif">Track Your Career Progress</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-burgundy-500 to-brown-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="text-cream-50" size={24} />
                </div>
                <h4 className="text-lg font-semibold text-text-primary mb-2 font-serif">Skill Development</h4>
                <p className="text-text-secondary">Track your learning progress and skill improvements</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-brown-500 to-hazelnut-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="text-cream-50" size={24} />
                </div>
                <h4 className="text-lg font-semibold text-text-primary mb-2 font-serif">Career Milestones</h4>
                <p className="text-text-secondary">Celebrate achievements and career advancements</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-hazelnut-500 to-chocolate-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="text-cream-50" size={24} />
                </div>
                <h4 className="text-lg font-semibold text-text-primary mb-2 font-serif">Goal Achievement</h4>
                <p className="text-text-secondary">Monitor progress towards your career objectives</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
