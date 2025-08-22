import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useAssessment } from "@/hooks/use-assessment";

export default function GoalsSection() {
  const { assessmentData, updateField } = useAssessment();

  return (
    <div data-testid="goals-section">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Career Goals & Background</h3>
      <div className="space-y-4 sm:space-y-6">
        <div>
          <Label className="text-base sm:text-lg font-semibold text-gray-800 mb-3 block">Career Timeline</Label>
          <Select 
            value={assessmentData.careerGoals} 
            onValueChange={(value) => updateField('careerGoals', value)}
          >
            <SelectTrigger className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl touch-manipulation" data-testid="select-career-goals">
              <SelectValue placeholder="Select your career timeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Short-term (6 months - 2 years)">Short-term (6 months - 2 years)</SelectItem>
              <SelectItem value="Long-term (3-5 years)">Long-term (3-5 years)</SelectItem>
              <SelectItem value="Exploratory (Still deciding)">Exploratory (Still deciding)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="text-base sm:text-lg font-semibold text-gray-800 mb-3 block">Education Level</Label>
          <Select 
            value={assessmentData.educationLevel} 
            onValueChange={(value) => updateField('educationLevel', value)}
          >
            <SelectTrigger className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl touch-manipulation" data-testid="select-education-level">
              <SelectValue placeholder="Select your education level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="High School">High School</SelectItem>
              <SelectItem value="Currently in College">Currently in College</SelectItem>
              <SelectItem value="Bachelor's Degree">Bachelor's Degree</SelectItem>
              <SelectItem value="Master's Degree">Master's Degree</SelectItem>
              <SelectItem value="Professional Certification">Professional Certification</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="text-base sm:text-lg font-semibold text-gray-800 mb-3 block">Field of Study</Label>
          <Input
            type="text"
            placeholder="e.g., Computer Science, Business Administration"
            value={assessmentData.fieldOfStudy}
            onChange={(e) => updateField('fieldOfStudy', e.target.value)}
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl touch-manipulation"
            data-testid="input-field-of-study"
          />
        </div>
      </div>
    </div>
  );
}
