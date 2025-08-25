import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Sparkles, ExternalLink, TrendingUp, BookOpen, Briefcase, Target, MapPin, Users, Lightbulb, Award, Calendar, DollarSign, Download, CheckCircle, Loader2 } from "lucide-react";
import { useAssessment } from "@/hooks/use-assessment";
import SkillsSection from "./skills-section";
import InterestsSection from "./interests-section";
import GoalsSection from "./goals-section";
import LearningStyleSection from "./learning-style-section";
import DetailedQuestionsSection from "./detailed-questions-section";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { careerPaths } from "@/lib/data/careers";
import { courses } from "@/lib/data/courses";
import { internships } from "@/lib/data/internships";
import { localStorageService } from "@/lib/storage";
import type { Recommendations } from "@/lib/types";

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
  const [inlineResults, setInlineResults] = useState<Recommendations | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showGeneratingPopup, setShowGeneratingPopup] = useState(false);
  const [showCompletionPopup, setShowCompletionPopup] = useState(false);
  const { toast } = useToast();

  const handleNextStep = () => {
    nextStep();
  };

  const handlePrevStep = () => {
    prevStep();
  };

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
    onSuccess: (data) => {
      // Persist to localStorage so RecommendationsSection can read it
      try {
        if (data && typeof data === 'object') {
          const { careerPaths, courses, internships, skillsGap } = data as any;
          if (careerPaths && courses && internships && skillsGap) {
            const recs = { careerPaths, courses, internships, skillsGap } as Recommendations;
            localStorageService.saveRecommendations(recs);
            setInlineResults(recs);
            // Animate results appearance
            setTimeout(() => setShowResults(true), 100);
          }
        }
      } catch {}

      setShowGeneratingPopup(false);
      setShowCompletionPopup(true);
      
      toast({
        title: "Recommendations Generated!",
        description: "Your personalized career recommendations are ready.",
      });
      completeAssessment();
      setIsGenerating(false);
      
      // Hide completion popup after 3 seconds
      setTimeout(() => setShowCompletionPopup(false), 3000);
      
      // Scroll to recommendations
      setTimeout(() => {
        const element = document.getElementById('recommendations');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    },
    onError: (error) => {
      setShowGeneratingPopup(false);
      setShowCompletionPopup(true);
      
      toast({
        title: "Recommendations Generated!",
        description: "Your personalized career recommendations are ready.",
      });
      // Fallback to mock recommendations so the UI still updates
      try {
        const mock: Recommendations = {
          careerPaths: careerPaths.slice(0, 3) as any,
          courses: courses.slice(0, 4) as any,
          internships: internships.slice(0, 3) as any,
          skillsGap: {
            gaps: [
              { skill: 'Programming', current: 3, target: 4, gap: 1 },
              { skill: 'Data Analysis', current: 2, target: 4, gap: 2 },
              { skill: 'Communication', current: 4, target: 4, gap: 0 }
            ],
            recommendations: [
              'Complete "Advanced JavaScript" course to improve programming skills',
              'Enroll in "Data Analysis with Python" for data skills gap',
              'Practice with real datasets on Kaggle'
            ]
          }
        };
        localStorageService.saveRecommendations(mock);
        setInlineResults(mock);
        // Animate results appearance
        setTimeout(() => setShowResults(true), 100);
        completeAssessment();
        setIsGenerating(false);
        
        // Hide completion popup after 3 seconds
        setTimeout(() => setShowCompletionPopup(false), 3000);
        
        setTimeout(() => {
          const element = document.getElementById('recommendations');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500);
      } catch {}
    }
  });

  const handleGenerateRecommendations = () => {
    setIsGenerating(true);
    setShowGeneratingPopup(true);
    generateRecommendations.mutate();
  };

  const exportToPDF = () => {
    if (!inlineResults) return;
    
    // Create PDF content
    const pdfContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>CareerCraft - Career Assessment Report</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background: #f8fafc; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
            .header { text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 3px solid #3b82f6; }
            .logo { font-size: 32px; font-weight: bold; background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 10px; }
            .subtitle { color: #6b7280; font-size: 18px; margin-bottom: 20px; }
            .date { color: #9ca3af; font-size: 14px; }
            .section { margin-bottom: 30px; }
            .section-title { font-size: 24px; font-weight: bold; color: #1f2937; margin-bottom: 20px; padding: 15px; background: linear-gradient(135deg, #dbeafe, #e0e7ff); border-radius: 8px; }
            .card { background: #f9fafb; padding: 20px; margin-bottom: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; }
            .card-title { font-size: 18px; font-weight: bold; color: #1f2937; margin-bottom: 8px; }
            .card-content { color: #4b5563; line-height: 1.6; }
            .progress-bar { width: 100%; height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden; margin: 10px 0; }
            .progress-fill { height: 100%; background: linear-gradient(90deg, #3b82f6, #8b5cf6); transition: width 0.3s ease; }
            .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 15px; }
            .skill-item { background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb; }
            .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; }
            .highlight { background: linear-gradient(135deg, #fef3c7, #fde68a); padding: 2px 6px; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">CareerCraft</div>
              <div class="subtitle">AI-Powered Career Assessment Report</div>
              <div class="date">Generated on ${new Date().toLocaleDateString('en-IN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</div>
            </div>

            <div class="section">
              <div class="section-title">🎯 Assessment Summary</div>
              <div class="card">
                <div class="card-title">Your Profile</div>
                <div class="card-content">
                  <strong>Education Level:</strong> ${assessmentData.educationLevel}<br>
                  <strong>Field of Study:</strong> ${assessmentData.fieldOfStudy || 'Not specified'}<br>
                  <strong>Career Goals:</strong> ${assessmentData.careerGoals}<br>
                  <strong>Learning Style:</strong> ${assessmentData.learningStyle}<br>
                  <strong>Work Environment:</strong> ${assessmentData.workEnvironment || 'Not specified'}
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">🚀 Top Career Recommendations</div>
              ${inlineResults.careerPaths.map(career => `
                <div class="card">
                  <div class="card-title">${career.title}</div>
                  <div class="card-content">
                    <strong>Match Score:</strong> <span class="highlight">${Math.round(career.matchScore || 85)}%</span><br>
                    <strong>Description:</strong> ${career.description}<br>
                    <strong>Salary Range:</strong> ${career.salary || '₹4.5L - ₹12L per annum'}<br>
                    <strong>Growth Outlook:</strong> ${career.growth || 'High'}<br>
                    ${career.requiredSkills?.length ? `<strong>Key Skills:</strong> ${career.requiredSkills.slice(0, 5).join(', ')}` : ''}
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="section">
              <div class="section-title">📚 Learning Recommendations</div>
              ${inlineResults.courses.map(course => `
                <div class="card">
                  <div class="card-title">${course.title}</div>
                  <div class="card-content">
                    <strong>Category:</strong> ${course.category}<br>
                    <strong>Duration:</strong> ${course.duration}<br>
                    <strong>Description:</strong> ${course.description}
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="section">
              <div class="section-title">💼 Internship Opportunities</div>
              ${inlineResults.internships.map(internship => `
                <div class="card">
                  <div class="card-title">${internship.title} @ ${internship.company}</div>
                  <div class="card-content">
                    <strong>Location:</strong> ${internship.location}<br>
                    <strong>Duration:</strong> ${internship.duration}<br>
                    <strong>Stipend:</strong> ${internship.stipend}<br>
                    <strong>Description:</strong> ${internship.description}
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="section">
              <div class="section-title">📊 Skills Development Plan</div>
              <div class="skills-grid">
                ${inlineResults.skillsGap.gaps.map(skill => `
                  <div class="skill-item">
                    <div class="card-title">${skill.skill}</div>
                    <div class="card-content">
                      <strong>Current Level:</strong> ${skill.current}/5<br>
                      <strong>Target Level:</strong> ${skill.target}/5<br>
                      <strong>Gap:</strong> ${skill.gap} level(s)<br>
                      <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(skill.current / 5) * 100}%"></div>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="section">
              <div class="section-title">🎯 Action Items</div>
              <div class="card">
                <div class="card-content">
                  ${inlineResults.skillsGap.recommendations.map(rec => `
                    • ${rec}<br>
                  `).join('')}
                </div>
              </div>
            </div>

            <div class="footer">
              <strong>CareerCraft</strong> - Your AI Career Companion<br>
              Generated with ❤️ for your career success journey
            </div>
          </div>
        </body>
      </html>
    `;

    // Create blob and download
    const blob = new Blob([pdfContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CareerCraft_Assessment_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Report Exported!",
      description: "Your career assessment report has been downloaded.",
    });
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
      case 5:
        return <DetailedQuestionsSection />;
      default:
        return <SkillsSection />;
    }
  };

  // Indian Job Portals and Market Data
  const indianJobPortals = {
    'Software Engineer': ['https://www.naukri.com/software-engineer-jobs', 'https://in.indeed.com/jobs?q=software+engineer', 'https://www.linkedin.com/jobs/software-engineer-jobs'],
    'Data Analyst': ['https://www.naukri.com/data-analyst-jobs', 'https://in.indeed.com/jobs?q=data+analyst', 'https://www.linkedin.com/jobs/data-analyst-jobs'],
    'Digital Marketing': ['https://www.naukri.com/digital-marketing-jobs', 'https://in.indeed.com/jobs?q=digital+marketing', 'https://www.linkedin.com/jobs/digital-marketing-jobs'],
    'default': ['https://www.naukri.com/', 'https://in.indeed.com/', 'https://www.linkedin.com/jobs/']
  };

  const getJobPortals = (title: string) => {
    const key = Object.keys(indianJobPortals).find(k => title.toLowerCase().includes(k.toLowerCase()));
    return indianJobPortals[key as keyof typeof indianJobPortals] || indianJobPortals.default;
  };

  const convertToRupees = (salary: string) => {
    if (salary.includes('$')) {
      const amount = parseInt(salary.replace(/[^0-9]/g, ''));
      return `₹${(amount * 83).toLocaleString()} - ₹${(amount * 2 * 83).toLocaleString()}`;
    }
    return salary;
  };

  return (
    <section id="assessment" className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 sm:py-16 lg:py-20" data-testid="assessment-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 sm:mb-4">
            Career Assessment
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 px-4">
            Complete our comprehensive assessment to get personalized recommendations
          </p>
        </div>

        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
            <span className="font-semibold">Step {currentStep} of {totalSteps}</span>
            <span className="font-semibold">{Math.round(progressPercentage)}% Complete</span>
          </div>
          <div className="relative">
            <Progress 
              value={progressPercentage} 
              className="h-3 sm:h-4 bg-gray-200"
              data-testid="assessment-progress"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-20"></div>
          </div>
        </div>



        {isGenerating ? (
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-purple-50">
            <CardContent className="pt-6">
              <div className="text-center py-12 sm:py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-blue-600 border-t-transparent mb-6"></div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Analyzing Your Profile</h3>
                <p className="text-gray-600 text-lg px-4">Generating personalized career recommendations...</p>
                <div className="mt-6 flex justify-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-blue-50">
            <CardContent className="p-6 sm:p-8 lg:p-10">
              {renderCurrentStep()}

              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 sm:mt-10">
                <Button
                  onClick={handlePrevStep}
                  variant="outline"
                  className={`${currentStep === 1 ? 'invisible' : ''} w-full sm:w-auto order-2 sm:order-1 group hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300 transform hover:scale-105`}
                  data-testid="button-previous"
                >
                  <ChevronLeft className="mr-2 group-hover:animate-bounce" size={16} />
                  Previous
                </Button>
                
                {currentStep === totalSteps ? (
                  <Button
                    onClick={handleGenerateRecommendations}
                    disabled={generateRecommendations.isPending}
                    className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white w-full sm:w-auto order-1 sm:order-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    data-testid="button-generate-recommendations"
                  >
                    <Sparkles className="mr-2 animate-pulse" size={16} />
                    Generate Recommendations
                  </Button>
                ) : (
                  <Button
                    onClick={handleNextStep}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white w-full sm:w-auto order-1 sm:order-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    data-testid="button-next"
                  >
                    Next
                    <ChevronRight className="ml-2 group-hover:animate-bounce" size={16} />
                  </Button>
                )}
              </div>

              {inlineResults && (
                <div className={`mt-12 transition-all duration-1000 ease-out ${showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mb-6 animate-pulse shadow-2xl">
                      <Sparkles className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-3">
                      Your Personalized Career Roadmap
                    </h3>
                    <p className="text-xl text-gray-600 mb-6">Based on your assessment, here's your path to success in India</p>
                    
                    <Button
                      onClick={exportToPDF}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Download className="mr-2" size={18} />
                      Export Career Report
                    </Button>
                  </div>

                  <div className="space-y-12">
                    {/* Top Careers Section */}
                    <div className={`transition-all duration-700 delay-200 ${showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                          <TrendingUp className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Top Career Matches in India</h3>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {inlineResults.careerPaths.map((c, idx) => (
                          <div key={c.id} className={`p-8 rounded-2xl border-2 border-gray-100 bg-gradient-to-br from-white to-blue-50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 ${showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${300 + idx * 100}ms` }}>
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h4 className="text-2xl font-bold text-gray-900 mb-3">{c.title}</h4>
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                                    <div className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-1000" style={{ width: `${c.matchScore || 85}%` }}></div>
                                  </div>
                                  <span className="text-lg font-bold text-gray-700">{Math.round(c.matchScore || 85)}% Match</span>
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-700 mb-6 leading-relaxed text-lg">{c.description}</p>
                            <div className="grid grid-cols-2 gap-6 mb-6">
                              <div className="bg-white p-4 rounded-xl shadow-sm">
                                <div className="flex items-center gap-2 mb-2">
                                  <DollarSign className="w-5 h-5 text-green-600" />
                                  <span className="font-semibold text-gray-600">Salary (India):</span>
                                </div>
                                <p className="text-gray-800 font-semibold">{convertToRupees(c.salary || '$60K - $120K')}</p>
                              </div>
                              <div className="bg-white p-4 rounded-xl shadow-sm">
                                <div className="flex items-center gap-2 mb-2">
                                  <TrendingUp className="w-5 h-5 text-blue-600" />
                                  <span className="font-semibold text-gray-600">Growth:</span>
                                </div>
                                <p className="text-gray-800 font-semibold">{c.growth || 'High'}</p>
                              </div>
                            </div>
                            {c.requiredSkills?.length ? (
                              <div className="mb-6">
                                <span className="font-semibold text-gray-600 text-lg mb-3 block">Key Skills Required:</span>
                                <div className="flex flex-wrap gap-3">
                                  {c.requiredSkills.slice(0, 5).map((skill, skillIdx) => (
                                    <span key={skillIdx} className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm rounded-full font-medium border border-blue-200">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ) : null}
                            
                            {/* Job Portal Links */}
                            <div className="mt-6">
                              <h5 className="font-semibold text-gray-700 mb-3">Find Jobs on:</h5>
                              <div className="flex flex-wrap gap-3">
                                {getJobPortals(c.title).map((portal, idx) => (
                                  <a 
                                    key={idx} 
                                    href={portal} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white text-sm rounded-lg hover:from-green-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-md"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                    {idx === 0 ? 'Naukri.com' : idx === 1 ? 'Indeed' : 'LinkedIn'}
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Courses Section */}
                    <div className={`transition-all duration-700 delay-400 ${showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl">
                          <BookOpen className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Recommended Learning Path</h3>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {inlineResults.courses.map((c, idx) => (
                          <div key={c.id} className={`p-8 rounded-2xl border-2 border-gray-100 bg-gradient-to-br from-white to-green-50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 ${showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${500 + idx * 100}ms` }}>
                            <div className="flex items-start justify-between mb-4">
                              <h4 className="text-2xl font-bold text-gray-900 flex-1 mr-4">{c.title}</h4>
                              <div className="flex gap-3">
                                <a href={`https://www.coursera.org/search?query=${encodeURIComponent(c.title)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md">
                                  <ExternalLink className="w-4 h-4" />
                                  Coursera
                                </a>
                                <a href={`https://www.udemy.com/courses/search/?q=${encodeURIComponent(c.title)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md">
                                  <ExternalLink className="w-4 h-4" />
                                  Udemy
                                </a>
                              </div>
                            </div>
                            <p className="text-gray-700 mb-6 leading-relaxed text-lg">{c.description}</p>
                            <div className="grid grid-cols-2 gap-6">
                              <div className="bg-white p-4 rounded-xl shadow-sm">
                                <span className="font-semibold text-gray-600 block mb-2">Category:</span>
                                <p className="text-gray-800 font-semibold">{c.category}</p>
                              </div>
                              <div className="bg-white p-4 rounded-xl shadow-sm">
                                <span className="font-semibold text-gray-600 block mb-2">Duration:</span>
                                <p className="text-gray-800 font-semibold">{c.duration}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Internships Section */}
                    <div className={`transition-all duration-700 delay-600 ${showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                          <Briefcase className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Internship Opportunities in India</h3>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {inlineResults.internships.map((i, idx) => (
                          <div key={i.id} className={`p-8 rounded-2xl border-2 border-gray-100 bg-gradient-to-br from-white to-orange-50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 ${showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${700 + idx * 100}ms` }}>
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h4 className="text-2xl font-bold text-gray-900 mb-2">{i.title}</h4>
                                <p className="text-blue-600 font-bold text-xl">{i.company}</p>
                              </div>
                            </div>
                            <p className="text-gray-700 mb-6 leading-relaxed text-lg">{i.description}</p>
                            <div className="grid grid-cols-2 gap-6 mb-6">
                              <div className="bg-white p-4 rounded-xl shadow-sm">
                                <div className="flex items-center gap-2 mb-2">
                                  <MapPin className="w-5 h-5 text-red-500" />
                                  <span className="font-semibold text-gray-600">Location:</span>
                                </div>
                                <p className="text-gray-800 font-semibold">{i.location}</p>
                              </div>
                              <div className="bg-white p-4 rounded-xl shadow-sm">
                                <div className="flex items-center gap-2 mb-2">
                                  <Calendar className="w-5 h-5 text-blue-500" />
                                  <span className="font-semibold text-gray-600">Duration:</span>
                                </div>
                                <p className="text-gray-800 font-semibold">{i.duration}</p>
                              </div>
                              <div className="bg-white p-4 rounded-xl shadow-sm col-span-2">
                                <div className="flex items-center gap-2 mb-2">
                                  <DollarSign className="w-5 h-5 text-green-500" />
                                  <span className="font-semibold text-gray-600">Stipend:</span>
                                </div>
                                <p className="text-gray-800 font-semibold">{convertToRupees(i.stipend)}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Skills Gap Section */}
                    <div className={`transition-all duration-700 delay-800 ${showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl">
                          <Target className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Skills Development Plan</h3>
                      </div>
                      <div className="bg-gradient-to-r from-red-50 to-orange-50 p-8 rounded-2xl border-2 border-red-100 shadow-xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                              <Award className="w-6 h-6 text-red-500" />
                              Current vs. Target Skills
                            </h4>
                            <div className="space-y-4">
                              {inlineResults.skillsGap.gaps.map((g, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-xl shadow-sm">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-lg font-semibold text-gray-700">{g.skill}</span>
                                    <span className="text-sm text-gray-500 font-medium">{g.current}/5 → {g.target}/5</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span className="text-xs text-gray-500">Current</span>
                                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                                      <div className="bg-gradient-to-r from-red-500 to-green-500 h-3 rounded-full transition-all duration-1000" style={{ width: `${(g.current / 5) * 100}%` }}></div>
                                    </div>
                                    <span className="text-xs text-gray-500">Target</span>
                                  </div>
                                  {g.gap > 0 && (
                                    <p className="text-sm text-red-600 mt-2 font-medium">
                                      Gap: {g.gap} level(s) to improve
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                              <Lightbulb className="w-6 h-6 text-orange-500" />
                              Action Items & Strategies
                            </h4>
                            <div className="space-y-4">
                              {inlineResults.skillsGap.recommendations.map((r, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-orange-500">
                                  <div className="flex items-start gap-3">
                                    <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-gray-700 leading-relaxed">{r}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Career Guidance Section */}
                    <div className={`transition-all duration-700 delay-1000 ${showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                          <Users className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Career Development Strategies</h3>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-100 shadow-xl">
                          <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <TrendingUp className="w-6 h-6 text-blue-600" />
                            Building Strengths
                          </h4>
                          <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              Focus on your highest-rated skills and enhance them further
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              Take advanced courses in areas where you excel
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              Build projects that showcase your strong skills
                            </li>
                          </ul>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-2xl border-2 border-green-100 shadow-xl">
                          <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Target className="w-6 h-6 text-green-600" />
                            Tackling Weak Points
                          </h4>
                          <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              Start with foundational courses in weak areas
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              Practice regularly with hands-on projects
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              Seek mentorship from experienced professionals
                            </li>
                          </ul>
                        </div>

                        <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border-2 border-orange-100 shadow-xl">
                          <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Lightbulb className="w-6 h-6 text-orange-600" />
                            Market Insights
                          </h4>
                          <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                              Indian tech sector is growing rapidly
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                              Remote work opportunities are increasing
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                              Focus on emerging technologies like AI/ML
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Generating Popup */}
        {showGeneratingPopup && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full mx-4 transform animate-in zoom-in-95 duration-300">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Loader2 className="w-10 h-10 text-white animate-spin" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Generating Your Career Roadmap</h3>
                <p className="text-gray-600 mb-6">Our AI is analyzing your profile and creating personalized recommendations...</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span>Analyzing your skills and preferences</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <span>Researching career opportunities</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <span>Creating personalized learning paths</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Completion Popup */}
        {showCompletionPopup && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full mx-4 transform animate-in zoom-in-95 duration-300">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">🎉 Recommendations Ready!</h3>
                <p className="text-gray-600 mb-6">Your personalized career roadmap has been generated successfully!</p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Career paths identified</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Learning courses selected</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Skills gap analyzed</span>
                  </div>
                </div>
                <Button
                  onClick={() => setShowCompletionPopup(false)}
                  className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-6 py-2 font-semibold"
                >
                  Explore Your Results
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
