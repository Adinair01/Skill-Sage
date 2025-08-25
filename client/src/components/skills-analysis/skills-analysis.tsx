import { useAssessment } from "@/hooks/use-assessment";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function SkillsAnalysis() {
  const { isComplete, assessmentData } = useAssessment();

  if (!isComplete) {
    return null;
  }

  const skillsData = [
    { key: 'programming', label: 'Programming', current: assessmentData.skills.programming, target: 4, color: 'from-burgundy-500 to-burgundy-600' },
    { key: 'dataanalysis', label: 'Data Analysis', current: assessmentData.skills.dataanalysis, target: 4, color: 'from-brown-500 to-brown-600' },
    { key: 'digitalmarketing', label: 'Digital Marketing', current: assessmentData.skills.digitalmarketing, target: 3, color: 'from-hazelnut-500 to-hazelnut-600' },
    { key: 'communication', label: 'Communication', current: assessmentData.skills.communication, target: 4, color: 'from-chocolate-500 to-chocolate-600' },
    { key: 'problemsolving', label: 'Problem Solving', current: assessmentData.skills.problemsolving, target: 4, color: 'from-burgundy-600 to-brown-600' }
  ];

  const industryGaps = skillsData.map(skill => ({
    ...skill,
    gap: Math.max(0, skill.target - skill.current),
    percentage: (skill.current / 5) * 100,
    targetPercentage: (skill.target / 5) * 100
  }));

  return (
    <section id="skillsAnalysis" className="bg-cream-50 py-12 sm:py-16 lg:py-20" data-testid="skills-analysis-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-3 sm:mb-4 font-serif">Skills Gap Analysis</h2>
          <p className="text-base sm:text-lg lg:text-xl text-text-secondary px-4">Understand your strengths and areas for improvement</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Current Skills Chart */}
          <div className="bg-cream-100 rounded-2xl p-6 sm:p-8 border border-brown-100">
            <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 sm:mb-6 font-serif">Current Skill Levels</h3>
            <div className="space-y-4 sm:space-y-5">
              {skillsData.map((skill) => (
                <div key={skill.key} className="skill-visualization" data-testid={`current-skill-${skill.key}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-text-secondary text-sm sm:text-base font-serif">{skill.label}</span>
                    <span className="text-burgundy-600 font-semibold">{skill.current}/5</span>
                  </div>
                  <Progress value={(skill.current / 5) * 100} className="h-2 sm:h-3" />
                </div>
              ))}
            </div>
          </div>

          {/* Industry Requirements */}
          <div className="bg-gradient-to-br from-brown-50 to-hazelnut-50 rounded-2xl p-6 sm:p-8 border border-brown-100">
            <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 sm:mb-6 font-serif">Industry Requirements</h3>
            <div className="space-y-4 sm:space-y-6">
              {industryGaps.map((skill) => (
                <div key={skill.key} className="skill-gap-item" data-testid={`gap-skill-${skill.key}`}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2">
                    <span className="font-semibold text-text-primary text-sm sm:text-base font-serif">{skill.label}</span>
                    <div className="flex items-center space-x-2 text-xs sm:text-sm">
                      <span className="text-text-secondary">Current: {skill.current}</span>
                      <span className="text-text-secondary">Target: {skill.target}</span>
                    </div>
                  </div>
                  <div className="relative">
                    <Progress value={skill.percentage} className="h-2 sm:h-3" />
                    <div 
                      className="absolute top-0 h-2 sm:h-3 w-0.5 sm:w-1 bg-burgundy-500 rounded" 
                      style={{ left: `${skill.targetPercentage}%` }}
                    ></div>
                  </div>
                  {skill.gap > 0 ? (
                    <p className="text-xs sm:text-sm text-burgundy-600 mt-2">Gap: {skill.gap} level(s) to reach industry standard</p>
                  ) : (
                    <p className="text-xs sm:text-sm text-brown-600 mt-2">✓ Meets industry standard</p>
                  )}
                </div>
              ))}
            </div>

            <Card className="mt-6 sm:mt-8 bg-cream-50 border-brown-200">
              <CardContent className="p-4 sm:p-6">
                <h4 className="font-bold text-text-primary mb-3 text-sm sm:text-base font-serif">Recommended Actions</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
                  <li className="flex items-start">
                    <ArrowRight className="text-burgundy-600 mr-2 mt-0.5 flex-shrink-0" size={14} />
                    <span>Complete "Advanced JavaScript" course to improve programming skills</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="text-brown-600 mr-2 mt-0.5 flex-shrink-0" size={14} />
                    <span>Enroll in "Data Analysis with Python" for data skills gap</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="text-hazelnut-600 mr-2 mt-0.5 flex-shrink-0" size={14} />
                    <span>Practice with real datasets on Kaggle</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
