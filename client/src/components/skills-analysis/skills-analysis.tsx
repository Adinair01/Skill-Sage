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
    { key: 'programming', label: 'Programming', current: assessmentData.skills.programming, target: 4, color: 'from-blue-500 to-blue-600' },
    { key: 'dataanalysis', label: 'Data Analysis', current: assessmentData.skills.dataanalysis, target: 4, color: 'from-purple-500 to-purple-600' },
    { key: 'digitalmarketing', label: 'Digital Marketing', current: assessmentData.skills.digitalmarketing, target: 3, color: 'from-teal-500 to-teal-600' },
    { key: 'communication', label: 'Communication', current: assessmentData.skills.communication, target: 4, color: 'from-green-500 to-green-600' },
    { key: 'problemsolving', label: 'Problem Solving', current: assessmentData.skills.problemsolving, target: 4, color: 'from-orange-500 to-orange-600' }
  ];

  const industryGaps = skillsData.map(skill => ({
    ...skill,
    gap: Math.max(0, skill.target - skill.current),
    percentage: (skill.current / 5) * 100,
    targetPercentage: (skill.target / 5) * 100
  }));

  return (
    <section id="skillsAnalysis" className="bg-white py-12 sm:py-16 lg:py-20" data-testid="skills-analysis-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Skills Gap Analysis</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 px-4">Understand your strengths and areas for improvement</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Current Skills Chart */}
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Current Skill Levels</h3>
            <div className="space-y-4 sm:space-y-5">
              {skillsData.map((skill) => (
                <div key={skill.key} className="skill-visualization" data-testid={`current-skill-${skill.key}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 text-sm sm:text-base">{skill.label}</span>
                    <span className="text-blue-600 font-semibold">{skill.current}/5</span>
                  </div>
                  <Progress value={(skill.current / 5) * 100} className="h-2 sm:h-3" />
                </div>
              ))}
            </div>
          </div>

          {/* Industry Requirements */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Industry Requirements</h3>
            <div className="space-y-4 sm:space-y-6">
              {industryGaps.map((skill) => (
                <div key={skill.key} className="skill-gap-item" data-testid={`gap-skill-${skill.key}`}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2">
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">{skill.label}</span>
                    <div className="flex items-center space-x-2 text-xs sm:text-sm">
                      <span className="text-gray-600">Current: {skill.current}</span>
                      <span className="text-gray-600">Target: {skill.target}</span>
                    </div>
                  </div>
                  <div className="relative">
                    <Progress value={skill.percentage} className="h-2 sm:h-3" />
                    <div 
                      className="absolute top-0 h-2 sm:h-3 w-0.5 sm:w-1 bg-red-500 rounded" 
                      style={{ left: `${skill.targetPercentage}%` }}
                    ></div>
                  </div>
                  {skill.gap > 0 ? (
                    <p className="text-xs sm:text-sm text-red-600 mt-2">Gap: {skill.gap} level(s) to reach industry standard</p>
                  ) : (
                    <p className="text-xs sm:text-sm text-green-600 mt-2">✓ Meets industry standard</p>
                  )}
                </div>
              ))}
            </div>

            <Card className="mt-6 sm:mt-8">
              <CardContent className="p-4 sm:p-6">
                <h4 className="font-bold text-gray-900 mb-3 text-sm sm:text-base">Recommended Actions</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                  <li className="flex items-start">
                    <ArrowRight className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" size={14} />
                    <span>Complete "Advanced JavaScript" course to improve programming skills</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="text-purple-600 mr-2 mt-0.5 flex-shrink-0" size={14} />
                    <span>Enroll in "Data Analysis with Python" for data skills gap</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="text-teal-600 mr-2 mt-0.5 flex-shrink-0" size={14} />
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
