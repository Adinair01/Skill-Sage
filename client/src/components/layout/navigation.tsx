import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Brain, Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const exportToPDF = () => {
    alert("PDF export feature coming soon!");
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 fixed top-0 w-full z-50" data-testid="main-navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center">
              <Brain className="text-white" size={16} />
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">CareerAI Advisor</h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <button 
              onClick={() => scrollToSection('assessment')}
              className="text-gray-600 hover:text-blue-600 transition-colors text-sm lg:text-base"
              data-testid="nav-assessment"
            >
              Assessment
            </button>
            <button 
              onClick={() => scrollToSection('recommendations')}
              className="text-gray-600 hover:text-blue-600 transition-colors text-sm lg:text-base"
              data-testid="nav-recommendations"
            >
              Recommendations
            </button>
            <button 
              onClick={() => scrollToSection('progress')}
              className="text-gray-600 hover:text-blue-600 transition-colors text-sm lg:text-base"
              data-testid="nav-progress"
            >
              Progress
            </button>
            <Button 
              onClick={exportToPDF}
              className="bg-blue-600 text-white hover:bg-blue-700 transition-colors px-3 py-2 text-sm"
              data-testid="button-export-pdf"
            >
              <Download className="mr-1 lg:mr-2" size={14} />
              <span className="hidden lg:inline">Export </span>PDF
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            data-testid="mobile-menu-toggle"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <div className="px-4 py-3 space-y-3">
              <button 
                onClick={() => scrollToSection('assessment')}
                className="block w-full text-left px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                data-testid="nav-assessment-mobile"
              >
                Take Assessment
              </button>
              <button 
                onClick={() => scrollToSection('recommendations')}
                className="block w-full text-left px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                data-testid="nav-recommendations-mobile"
              >
                View Recommendations
              </button>
              <button 
                onClick={() => scrollToSection('progress')}
                className="block w-full text-left px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                data-testid="nav-progress-mobile"
              >
                Track Progress
              </button>
              <Button 
                onClick={exportToPDF}
                className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors mt-2"
                data-testid="button-export-pdf-mobile"
              >
                <Download className="mr-2" size={16} />
                Export PDF
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
