import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-cream-50/90 backdrop-blur-md border-b border-brown-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-burgundy-600 via-brown-600 to-chocolate-600 rounded-xl flex items-center justify-center">
                <span className="text-cream-50 font-bold text-xl font-serif">S</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-burgundy-600 via-brown-600 to-chocolate-600 bg-clip-text text-transparent font-display">
                  SkillSage
                </h1>
                <p className="text-xs text-text-muted -mt-1 font-serif">AI-Powered Career Guidance</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#assessment" className="text-text-primary hover:text-burgundy-600 transition-colors font-medium font-serif">
              Assessment
            </a>
            <a href="#recommendations" className="text-text-primary hover:text-burgundy-600 transition-colors font-medium font-serif">
              Recommendations
            </a>
            <a href="#progress" className="text-text-primary hover:text-burgundy-600 transition-colors font-medium font-serif">
              Progress
            </a>
            <Button className="bg-gradient-to-r from-burgundy-600 to-brown-600 hover:from-burgundy-700 hover:to-brown-700 text-cream-50 font-serif">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="text-text-primary hover:text-burgundy-600"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-cream-50/95 backdrop-blur-md border-t border-brown-200">
              <a
                href="#assessment"
                className="block px-3 py-2 text-text-primary hover:text-burgundy-600 transition-colors font-medium font-serif"
                onClick={() => setIsMenuOpen(false)}
              >
                Assessment
              </a>
              <a
                href="#recommendations"
                className="block px-3 py-2 text-text-primary hover:text-burgundy-600 transition-colors font-medium font-serif"
                onClick={() => setIsMenuOpen(false)}
              >
                Recommendations
              </a>
              <a
                href="#progress"
                className="block px-3 py-2 text-text-primary hover:text-burgundy-600 transition-colors font-medium font-serif"
                onClick={() => setIsMenuOpen(false)}
              >
                Progress
              </a>
              <div className="px-3 py-2">
                <Button className="w-full bg-gradient-to-r from-burgundy-600 to-brown-600 hover:from-burgundy-700 hover:to-brown-700 text-cream-50 font-serif">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
