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
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Interest Categories</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {interestCategories.map((category) => (
          <label 
            key={category.id}
            className={`interest-card flex items-center p-4 border rounded-xl cursor-pointer hover:border-blue-500 transition-colors ${
              assessmentData.interests.includes(category.id) 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200'
            }`}
            data-testid={`interest-${category.id.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <Checkbox
              checked={assessmentData.interests.includes(category.id)}
              onCheckedChange={(checked) => handleInterestChange(category.id, !!checked)}
              className="mr-4"
            />
            <div>
              <div className="font-semibold text-gray-900">{category.label}</div>
              <div className="text-sm text-gray-600">{category.description}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
