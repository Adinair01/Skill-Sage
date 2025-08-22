import { Checkbox } from "@/components/ui/checkbox";
import { useAssessment } from "@/hooks/use-assessment";

export default function InterestsSection() {
  const { assessmentData, updateInterests } = useAssessment();

  const interestCategories = [
    { id: 'Technology', label: 'Technology', description: 'Software, AI, Cybersecurity' },
    { id: 'Business', label: 'Business', description: 'Finance, Management, Consulting' },
    { id: 'Creative', label: 'Creative', description: 'Design, Marketing, Content' },
    { id: 'Science', label: 'Science', description: 'Research, Healthcare, Engineering' },
    { id: 'Education', label: 'Education', description: 'Teaching, Training, Academia' },
    { id: 'Social Impact', label: 'Social Impact', description: 'Non-profit, Policy, Community' }
  ];

  const handleInterestChange = (interestId: string, checked: boolean) => {
    const currentInterests = assessmentData.interests;
    if (checked && !currentInterests.includes(interestId)) {
      updateInterests([...currentInterests, interestId]);
    } else if (!checked && currentInterests.includes(interestId)) {
      updateInterests(currentInterests.filter(id => id !== interestId));
    }
  };

  return (
    <div data-testid="interests-section">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Interest Categories</h3>
      <p className="text-gray-600 mb-6 text-sm sm:text-base">Select all areas that interest you (multiple selections allowed)</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {interestCategories.map((category) => (
          <label 
            key={category.id}
            className={`interest-card flex items-start p-4 sm:p-5 border rounded-xl cursor-pointer hover:border-blue-500 transition-colors touch-manipulation ${
              assessmentData.interests.includes(category.id) 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200'
            }`}
            data-testid={`interest-${category.id.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <Checkbox
              checked={assessmentData.interests.includes(category.id)}
              onCheckedChange={(checked) => handleInterestChange(category.id, !!checked)}
              className="mr-3 sm:mr-4 mt-0.5 touch-manipulation"
            />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 text-sm sm:text-base">{category.label}</div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1">{category.description}</div>
            </div>
          </label>
        ))}
      </div>
      
      <div className="mt-4 text-xs sm:text-sm text-gray-500">
        Selected: {assessmentData.interests.length} of {interestCategories.length} categories
      </div>
    </div>
  );
}
