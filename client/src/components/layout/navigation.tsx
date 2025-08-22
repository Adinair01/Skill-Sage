import { Button } from "@/components/ui/button";
import { Download, Brain } from "lucide-react";

export default function Navigation() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const exportToPDF = () => {
    // TODO: Implement PDF export functionality
    alert("PDF export feature coming soon!");
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 fixed top-0 w-full z-50" data-testid="main-navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-bold text-gray-900">CareerAI Advisor</h1>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('assessment')}
              className="text-gray-600 hover:text-blue-600 transition-colors"
              data-testid="nav-assessment"
            >
              Assessment
            </button>
            <button 
              onClick={() => scrollToSection('recommendations')}
              className="text-gray-600 hover:text-blue-600 transition-colors"
              data-testid="nav-recommendations"
            >
              Recommendations
            </button>
            <button 
              onClick={() => scrollToSection('progress')}
              className="text-gray-600 hover:text-blue-600 transition-colors"
              data-testid="nav-progress"
            >
              Progress
            </button>
            <Button 
              onClick={exportToPDF}
              className="bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              data-testid="button-export-pdf"
            >
              <Download className="mr-2" size={16} />
              Export PDF
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
