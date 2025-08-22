import { useState, useEffect } from "react";
import { useAssessment } from "@/hooks/use-assessment";
import { localStorageService } from "@/lib/storage";
import { Recommendations } from "@/lib/types";
import CareerCard from "./career-card";
import CourseCard from "./course-card";
import InternshipCard from "./internship-card";
import { careerPaths } from "@/lib/data/careers";
import { courses } from "@/lib/data/courses";
import { internships } from "@/lib/data/internships";

export default function RecommendationsSection() {
  const { isComplete } = useAssessment();
  const [recommendations, setRecommendations] = useState<Recommendations | null>(null);

  useEffect(() => {
    // Load recommendations from localStorage
    const savedRecommendations = localStorageService.getRecommendations();
    if (savedRecommendations) {
      setRecommendations(savedRecommendations);
    } else if (isComplete) {
      // Generate mock recommendations if assessment is complete
      generateMockRecommendations();
    }
  }, [isComplete]);

  const generateMockRecommendations = () => {
    const mockRecommendations: Recommendations = {
      careerPaths: careerPaths.slice(0, 3),
      courses: courses.slice(0, 4),
      internships: internships.slice(0, 3),
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
    
    setRecommendations(mockRecommendations);
    localStorageService.saveRecommendations(mockRecommendations);
  };

  if (!isComplete || !recommendations) {
    return null;
  }

  return (
    <section id="recommendations" className="bg-gradient-to-br from-gray-50 to-blue-50 py-12 sm:py-16 lg:py-20" data-testid="recommendations-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Personalized Recommendations</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 px-4">AI-curated career paths and learning opportunities just for you</p>
        </div>

        {/* Career Paths */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Recommended Career Paths</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {recommendations.careerPaths.map((career) => (
              <CareerCard key={career.id} career={career} />
            ))}
          </div>
        </div>

        {/* Skill Building Courses */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Recommended Courses</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recommendations.courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {/* Internship Opportunities */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Internship Opportunities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.internships.map((internship) => (
              <InternshipCard key={internship.id} internship={internship} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
