import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useAssessment } from "@/hooks/use-assessment";
import SkillsSection from "./skills-section";
import InterestsSection from "./interests-section";
import GoalsSection from "./goals-section";
import LearningStyleSection from "./learning-style-section";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function AssessmentForm() {
  const {
    assessmentData,
    currentStep,
    nextStep,
    prevStep,
    completeAssessment,
    progressPercentage,
    totalSteps
  } = useAssessment();
  
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateRecommendations = useMutation({
    mutationFn: async () => {
      // First create the assessment
      const assessmentResponse = await apiRequest('POST', '/api/assessments', assessmentData);
      const assessment = await assessmentResponse.json();
      
      // Then generate recommendations
      const recommendationResponse = await apiRequest('POST', '/api/recommendations', {
        assessmentId: assessment.id
      });
      
      return recommendationResponse.json();
    },
    onSuccess: () => {
      toast({
        title: "Recommendations Generated!",
        description: "Your personalized career recommendations are ready.",
      });
      completeAssessment();
      // Scroll to recommendations
      setTimeout(() => {
        const element = document.getElementById('recommendations');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to generate recommendations. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleGenerateRecommendations = () => {
    setIsGenerating(true);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      generateRecommendations.mutate();
      setIsGenerating(false);
    }, 3000);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <SkillsSection />;
      case 2:
        return <InterestsSection />;
      case 3:
        return <GoalsSection />;
      case 4:
        return <LearningStyleSection />;
      default:
        return <SkillsSection />;
    }
  };

  return (
    <section id="assessment" className="bg-white py-20" data-testid="assessment-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Career Assessment</h2>
          <p className="text-xl text-gray-600">Complete our comprehensive assessment to get personalized recommendations</p>
        </div>

        <div className="mb-8">
          <Progress 
            value={progressPercentage} 
            className="h-3"
            data-testid="assessment-progress"
          />
        </div>

        {isGenerating ? (
          <Card className="shadow-xl border border-gray-100">
            <CardContent className="pt-6">
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600">Analyzing your profile and generating recommendations...</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-xl border border-gray-100">
            <CardContent className="p-8">
              {renderCurrentStep()}

              <div className="flex justify-between mt-8">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className={`${currentStep === 1 ? 'invisible' : ''}`}
                  data-testid="button-previous"
                >
                  <ChevronLeft className="mr-2" size={16} />
                  Previous
                </Button>
                
                {currentStep === totalSteps ? (
                  <Button
                    onClick={handleGenerateRecommendations}
                    disabled={generateRecommendations.isPending}
                    className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white"
                    data-testid="button-generate-recommendations"
                  >
                    <Sparkles className="mr-2" size={16} />
                    Generate Recommendations
                  </Button>
                ) : (
                  <Button
                    onClick={nextStep}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    data-testid="button-next"
                  >
                    Next
                    <ChevronRight className="ml-2" size={16} />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
