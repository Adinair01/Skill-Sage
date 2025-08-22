import { Eye, Hand, Book, Headphones } from "lucide-react";
import { useAssessment } from "@/hooks/use-assessment";

export default function LearningStyleSection() {
  const { assessmentData, updateField } = useAssessment();

  const learningStyles = [
    {
      id: 'visual',
      label: 'Visual Learner',
      description: 'Learn through diagrams, videos, and visual content',
      icon: Eye
    },
    {
      id: 'hands-on',
      label: 'Hands-on Learner',
      description: 'Learn by doing and practical experience',
      icon: Hand
    },
    {
      id: 'reading',
      label: 'Reading/Writing',
      description: 'Learn through text, articles, and documentation',
      icon: Book
    },
    {
      id: 'auditory',
      label: 'Auditory Learner',
      description: 'Learn through lectures, podcasts, and discussions',
      icon: Headphones
    }
  ];

  return (
    <div data-testid="learning-style-section">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Learning Preferences</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {learningStyles.map((style) => {
          const IconComponent = style.icon;
          return (
            <label 
              key={style.id}
              className={`learning-style-card p-6 border rounded-xl cursor-pointer hover:border-purple-500 transition-all ${
                assessmentData.learningStyle === style.id 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-200'
              }`}
              data-testid={`learning-style-${style.id}`}
            >
              <input
                type="radio"
                name="learningStyle"
                value={style.id}
                checked={assessmentData.learningStyle === style.id}
                onChange={() => updateField('learningStyle', style.id)}
                className="sr-only"
              />
              <div className="text-center">
                <IconComponent className="mx-auto text-purple-600 mb-3" size={48} />
                <div className="font-semibold text-gray-900">{style.label}</div>
                <div className="text-sm text-gray-600 mt-2">{style.description}</div>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
