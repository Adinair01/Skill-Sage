import { Slider } from "@/components/ui/slider";
import { useAssessment } from "@/hooks/use-assessment";

export default function SkillsSection() {
  const { assessmentData, updateSkill } = useAssessment();

  const skills = [
    { key: 'programming', label: 'Programming & Development', color: 'text-blue-600' },
    { key: 'dataanalysis', label: 'Data Analysis', color: 'text-blue-600' },
    { key: 'digitalmarketing', label: 'Digital Marketing', color: 'text-blue-600' },
    { key: 'communication', label: 'Communication', color: 'text-purple-600' },
    { key: 'leadership', label: 'Leadership', color: 'text-purple-600' },
    { key: 'problemsolving', label: 'Problem Solving', color: 'text-purple-600' }
  ];

  return (
    <div data-testid="skills-section">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Skills Assessment</h3>
      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Technical Skills</h4>
          <div className="space-y-4">
            {skills.slice(0, 3).map((skill) => (
              <div key={skill.key} className="skill-item" data-testid={`skill-${skill.key}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">{skill.label}</span>
                  <span className={`${skill.color} font-semibold`}>{assessmentData.skills[skill.key]}</span>
                </div>
                <Slider
                  value={[assessmentData.skills[skill.key]]}
                  onValueChange={([value]) => updateSkill(skill.key, value)}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Soft Skills</h4>
          <div className="space-y-4">
            {skills.slice(3).map((skill) => (
              <div key={skill.key} className="skill-item" data-testid={`skill-${skill.key}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">{skill.label}</span>
                  <span className={`${skill.color} font-semibold`}>{assessmentData.skills[skill.key]}</span>
                </div>
                <Slider
                  value={[assessmentData.skills[skill.key]]}
                  onValueChange={([value]) => updateSkill(skill.key, value)}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
