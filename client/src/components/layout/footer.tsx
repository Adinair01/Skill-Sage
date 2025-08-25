import { Button } from "@/components/ui/button";
import { Brain, Share, Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  const shareRoadmap = () => {
    // TODO: Implement social sharing functionality
    alert("Share roadmap feature coming soon!");
  };

  return (
    <footer className="bg-chocolate-800 text-cream-50 py-12" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-burgundy-600 via-brown-600 to-chocolate-600 rounded-xl flex items-center justify-center">
                <span className="text-cream-50 font-bold text-xl font-serif">S</span>
              </div>
              <h3 className="text-xl font-bold font-display">SkillSage</h3>
            </div>
            <p className="text-cream-200 mb-4 font-serif">Empowering students to discover and achieve their career goals through AI-powered guidance and personalized career roadmaps.</p>
            <div className="flex space-x-4">
              <Button 
                size="sm" 
                className="bg-burgundy-600 hover:bg-burgundy-700"
                data-testid="social-twitter"
              >
                <Twitter size={16} />
              </Button>
              <Button 
                size="sm" 
                className="bg-brown-600 hover:bg-brown-700"
                data-testid="social-linkedin"
              >
                <Linkedin size={16} />
              </Button>
              <Button 
                size="sm" 
                className="bg-chocolate-600 hover:bg-chocolate-700"
                data-testid="social-github"
              >
                <Github size={16} />
              </Button>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 font-serif">Resources</h4>
            <ul className="space-y-2 text-cream-200">
              <li><a href="#" className="hover:text-cream-50 transition-colors font-serif">Career Guides</a></li>
              <li><a href="#" className="hover:text-cream-50 transition-colors font-serif">Industry Reports</a></li>
              <li><a href="#" className="hover:text-cream-50 transition-colors font-serif">Skill Assessments</a></li>
              <li><a href="#" className="hover:text-cream-50 transition-colors font-serif">Interview Tips</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 font-serif">Support</h4>
            <ul className="space-y-2 text-cream-200">
              <li><a href="#" className="hover:text-cream-50 transition-colors font-serif">Help Center</a></li>
              <li><a href="#" className="hover:text-cream-50 transition-colors font-serif">Contact Us</a></li>
              <li><a href="#" className="hover:text-cream-50 transition-colors font-serif">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-cream-50 transition-colors font-serif">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 font-serif">Share Your Progress</h4>
            <p className="text-cream-200 mb-4 font-serif">Share your career roadmap with friends and mentors</p>
            <Button 
              onClick={shareRoadmap}
              className="w-full bg-gradient-to-r from-burgundy-600 to-brown-600 text-cream-50 hover:from-burgundy-700 hover:to-brown-700 transition-all font-serif"
              data-testid="button-share-roadmap"
            >
              <Share className="mr-2" size={16} />
              Share Roadmap
            </Button>
          </div>
        </div>
        <div className="border-t border-chocolate-700 mt-8 pt-8 text-center text-cream-200">
          <p className="font-serif">&copy; 2024 SkillSage. All rights reserved. Built for students, by students.</p>
        </div>
      </div>
    </footer>
  );
}
