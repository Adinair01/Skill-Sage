import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useAssessment } from "@/hooks/use-assessment";

// Simple textarea component since we don't have it in shadcn
const Textarea = ({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};

export default function DetailedQuestionsSection() {
  const { assessmentData, updateField } = useAssessment();

  return (
    <div data-testid="detailed-questions-section">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Additional Details</h3>
      <p className="text-gray-600 mb-6 text-sm sm:text-base">Help us provide more personalized recommendations</p>
      
      <div className="space-y-4 sm:space-y-6">
        <div>
          <Label className="text-base sm:text-lg font-semibold text-gray-800 mb-3 block">Work Environment Preference</Label>
          <Select 
            value={assessmentData.workEnvironment || ''} 
            onValueChange={(value) => updateField('workEnvironment', value)}
          >
            <SelectTrigger className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl touch-manipulation" data-testid="select-work-environment">
              <SelectValue placeholder="How do you prefer to work?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Remote">Remote - Work from anywhere</SelectItem>
              <SelectItem value="Office">Traditional Office Environment</SelectItem>
              <SelectItem value="Hybrid">Hybrid - Mix of remote and office</SelectItem>
              <SelectItem value="Startup">Fast-paced startup environment</SelectItem>
              <SelectItem value="Corporate">Large corporate setting</SelectItem>
              <SelectItem value="Freelance">Independent/Freelance work</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-base sm:text-lg font-semibold text-gray-800 mb-3 block">Salary Expectations</Label>
          <Select 
            value={assessmentData.salaryExpectations || ''} 
            onValueChange={(value) => updateField('salaryExpectations', value)}
          >
            <SelectTrigger className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl touch-manipulation" data-testid="select-salary-expectations">
              <SelectValue placeholder="What are your salary expectations?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Entry Level ($35k-$50k)">Entry Level ($35k-$50k)</SelectItem>
              <SelectItem value="Mid Level ($50k-$80k)">Mid Level ($50k-$80k)</SelectItem>
              <SelectItem value="Senior Level ($80k-$120k)">Senior Level ($80k-$120k)</SelectItem>
              <SelectItem value="Executive Level ($120k+)">Executive Level ($120k+)</SelectItem>
              <SelectItem value="Flexible">I'm flexible with salary</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-base sm:text-lg font-semibold text-gray-800 mb-3 block">Work-Life Balance Priority</Label>
          <Select 
            value={assessmentData.workLifeBalance || ''} 
            onValueChange={(value) => updateField('workLifeBalance', value)}
          >
            <SelectTrigger className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl touch-manipulation" data-testid="select-work-life-balance">
              <SelectValue placeholder="How important is work-life balance?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Essential">Essential - Top priority</SelectItem>
              <SelectItem value="Important">Important - High priority</SelectItem>
              <SelectItem value="Moderate">Moderate - Balanced importance</SelectItem>
              <SelectItem value="Flexible">Flexible - Can adapt as needed</SelectItem>
              <SelectItem value="Career Focus">Career-focused - Willing to work long hours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-base sm:text-lg font-semibold text-gray-800 mb-3 block">Geographic Preference</Label>
          <Input
            type="text"
            placeholder="e.g., San Francisco, New York, Remote, Flexible"
            value={assessmentData.geographicPreference || ''}
            onChange={(e) => updateField('geographicPreference', e.target.value)}
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl touch-manipulation"
            data-testid="input-geographic-preference"
          />
        </div>

        <div>
          <Label className="text-base sm:text-lg font-semibold text-gray-800 mb-3 block">Previous Experience</Label>
          <Textarea
            placeholder="Describe any relevant work experience, projects, or internships (optional)"
            value={assessmentData.previousExperience || ''}
            onChange={(e) => updateField('previousExperience', e.target.value)}
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl touch-manipulation resize-none"
            rows={3}
            data-testid="textarea-previous-experience"
          />
        </div>

        <div>
          <Label className="text-base sm:text-lg font-semibold text-gray-800 mb-3 block">Career Change Motivation (if applicable)</Label>
          <Textarea
            placeholder="What's driving you to explore new career opportunities? (optional)"
            value={assessmentData.careerChangeReason || ''}
            onChange={(e) => updateField('careerChangeReason', e.target.value)}
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl touch-manipulation resize-none"
            rows={3}
            data-testid="textarea-career-change-reason"
          />
        </div>
      </div>
    </div>
  );
}