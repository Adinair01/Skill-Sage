import { Button } from "@/components/ui/button";
import { Brain, Share, Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  const shareRoadmap = () => {
    // TODO: Implement social sharing functionality
    alert("Share roadmap feature coming soon!");
  };

  return (
    <footer className="bg-gray-900 text-white py-12" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="text-white" size={20} />
              </div>
              <h3 className="text-xl font-bold">CareerAI Advisor</h3>
            </div>
            <p className="text-gray-400 mb-4">Empowering students to discover and achieve their career goals through AI-powered guidance.</p>
            <div className="flex space-x-4">
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700"
                data-testid="social-twitter"
              >
                <Twitter size={16} />
              </Button>
              <Button 
                size="sm" 
                className="bg-blue-800 hover:bg-blue-900"
                data-testid="social-linkedin"
              >
                <Linkedin size={16} />
              </Button>
              <Button 
                size="sm" 
                className="bg-gray-700 hover:bg-gray-600"
                data-testid="social-github"
              >
                <Github size={16} />
              </Button>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Career Guides</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Industry Reports</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Skill Assessments</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Interview Tips</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Share Your Progress</h4>
            <p className="text-gray-400 mb-4">Share your career roadmap with friends and mentors</p>
            <Button 
              onClick={shareRoadmap}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all"
              data-testid="button-share-roadmap"
            >
              <Share className="mr-2" size={16} />
              Share Roadmap
            </Button>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 CareerAI Advisor. All rights reserved. Built for students, by students.</p>
        </div>
      </div>
    </footer>
  );
}
