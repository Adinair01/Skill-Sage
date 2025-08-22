import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAssessment } from "@/hooks/use-assessment";
import { localStorageService } from "@/lib/storage";
import { UserProgressData } from "@/lib/types";
import { 
  CheckCircle, 
  Clock, 
  Loader, 
  Code, 
  GraduationCap, 
  TrendingUp, 
  Star, 
  Trophy, 
  Rocket,
  Briefcase
} from "lucide-react";

export default function ProgressSection() {
  const { isComplete } = useAssessment();
  const [userProgress, setUserProgress] = useState<UserProgressData | null>(null);

  useEffect(() => {
    if (isComplete) {
      // Load or create user progress
      const savedProgress = localStorageService.getProgress();
      if (savedProgress) {
        setUserProgress(savedProgress);
      } else {
        // Create initial progress data
        const initialProgress: UserProgressData = {
          completedCourses: ["web-dev-bootcamp", "ux-ui-masterclass", "leadership-communication"],
          achievements: ["first-course", "skill-builder", "progress-tracker"],
          milestones: {
            "html-css-mastery": true,
            "javascript-basics": true,
            "first-project": true,
            "react-fundamentals": false,
            "state-management": false,
            "api-integration": false
          },
          progressPercentage: 65
        };
        setUserProgress(initialProgress);
        localStorageService.saveProgress(initialProgress);
      }
    }
  }, [isComplete]);

  if (!isComplete || !userProgress) {
    return null;
  }

  const completedMilestones = Object.values(userProgress.milestones).filter(Boolean).length;
  const totalMilestones = Object.keys(userProgress.milestones).length;

  const achievements = [
    {
      id: "first-course",
      name: "First Course",
      icon: Code,
      gradient: "from-yellow-400 to-orange-500",
      earned: userProgress.achievements.includes("first-course")
    },
    {
      id: "skill-builder",
      name: "Skill Builder", 
      icon: GraduationCap,
      gradient: "from-blue-500 to-purple-600",
      earned: userProgress.achievements.includes("skill-builder")
    },
    {
      id: "progress-tracker",
      name: "Progress Tracker",
      icon: TrendingUp,
      gradient: "from-green-500 to-teal-600", 
      earned: userProgress.achievements.includes("progress-tracker")
    },
    {
      id: "expert-level",
      name: "Expert Level",
      icon: Star,
      gradient: "from-purple-500 to-pink-600",
      earned: userProgress.achievements.includes("expert-level")
    },
    {
      id: "career-ready",
      name: "Career Ready",
      icon: Trophy,
      gradient: "from-emerald-500 to-teal-600",
      earned: userProgress.achievements.includes("career-ready")
    },
    {
      id: "leader",
      name: "Leader",
      icon: Rocket,
      gradient: "from-indigo-500 to-purple-600",
      earned: userProgress.achievements.includes("leader")
    }
  ];

  const nextSteps = [
    {
      id: 1,
      title: "Complete React Course",
      dueDate: "Next week",
      color: "bg-blue-600"
    },
    {
      id: 2,
      title: "Build Portfolio Project", 
      dueDate: "2 weeks",
      color: "bg-purple-600"
    },
    {
      id: 3,
      title: "Apply to Internships",
      dueDate: "1 month", 
      color: "bg-teal-600"
    }
  ];

  const timelineItems = [
    {
      id: 1,
      title: "Foundation Skills (Month 1-2)",
      description: "Master HTML, CSS, and JavaScript fundamentals",
      status: "completed",
      icon: CheckCircle,
      gradient: "from-green-500 to-teal-600",
      milestones: ["✓ HTML/CSS Mastery", "✓ JavaScript Basics", "✓ First Project"]
    },
    {
      id: 2,
      title: "Framework Specialization (Month 3-4)",
      description: "Deep dive into React and modern development tools",
      status: "in-progress",
      icon: Loader,
      gradient: "from-blue-500 to-purple-600",
      milestones: ["🔄 React Fundamentals", "State Management", "API Integration"]
    },
    {
      id: 3,
      title: "Portfolio Development (Month 5)",
      description: "Build comprehensive portfolio with 3-5 projects",
      status: "pending",
      icon: Clock,
      gradient: "from-gray-400 to-gray-500",
      milestones: ["Portfolio Website", "E-commerce Project", "API Project"]
    },
    {
      id: 4,
      title: "Job Search & Applications (Month 6)",
      description: "Apply to internships and entry-level positions",
      status: "pending",
      icon: Briefcase,
      gradient: "from-gray-400 to-gray-500",
      milestones: ["Resume Optimization", "Interview Prep", "Network Building"]
    }
  ];

  return (
    <section id="progress" className="bg-gradient-to-br from-gray-50 to-blue-50 py-12 sm:py-16 lg:py-20" data-testid="progress-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Learning Roadmap</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 px-4">Track your progress and celebrate achievements</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Progress Overview */}
          <Card className="shadow-lg border border-gray-100" data-testid="progress-overview">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Overall Progress</h3>
              <div className="text-center mb-4 sm:mb-6">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-3 sm:mb-4">
                  <svg className="w-24 h-24 sm:w-32 sm:h-32 transform -rotate-90" viewBox="0 0 36 36">
                    <path 
                      className="text-gray-200" 
                      stroke="currentColor" 
                      strokeWidth="3" 
                      fill="none" 
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path 
                      className="text-blue-600" 
                      stroke="currentColor" 
                      strokeWidth="3" 
                      fill="none" 
                      strokeDasharray={`${userProgress.progressPercentage}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl sm:text-2xl font-bold text-gray-900">{userProgress.progressPercentage}%</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm sm:text-base">{completedMilestones} of {totalMilestones} milestones completed</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Courses Completed</span>
                  <span className="font-semibold text-blue-600">{userProgress.completedCourses.length}/5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Skills Improved</span>
                  <span className="font-semibold text-purple-600">7/10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Applications Sent</span>
                  <span className="font-semibold text-teal-600">2/3</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievement Badges */}
          <Card className="shadow-lg border border-gray-100" data-testid="achievement-badges">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Achievement Badges</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {achievements.map((achievement) => {
                  const IconComponent = achievement.icon;
                  return (
                    <div key={achievement.id} className="text-center" data-testid={`badge-${achievement.id}`}>
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-2 ${
                        achievement.earned 
                          ? `bg-gradient-to-r ${achievement.gradient}`
                          : 'bg-gray-300'
                      }`}>
                        <IconComponent 
                          className={achievement.earned ? 'text-white' : 'text-gray-500'} 
                          size={16} 
                        />
                      </div>
                      <span className={`text-xs ${achievement.earned ? 'text-gray-600' : 'text-gray-400'} leading-tight`}>
                        {achievement.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="shadow-lg border border-gray-100" data-testid="next-steps">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Next Steps</h3>
              <div className="space-y-3 sm:space-y-4">
                {nextSteps.map((step) => (
                  <div key={step.id} className="flex items-start space-x-3" data-testid={`next-step-${step.id}`}>
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 ${step.color} rounded-full flex items-center justify-center mt-1 flex-shrink-0`}>
                      <span className="text-white text-xs sm:text-sm font-bold">{step.id}</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{step.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Due: {step.dueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timeline Roadmap */}
        <Card className="shadow-lg border border-gray-100" data-testid="timeline-roadmap">
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">6-Month Career Roadmap</h3>
            <div className="relative">
              <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              
              {timelineItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.id} className={`relative flex items-start space-x-4 sm:space-x-6 ${index < timelineItems.length - 1 ? 'pb-6 sm:pb-8' : ''}`} data-testid={`timeline-item-${item.id}`}>
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${item.gradient} rounded-full flex items-center justify-center flex-shrink-0 z-10`}>
                      <IconComponent className="text-white" size={20} />
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1">
                        <h4 className={`text-base sm:text-lg font-semibold ${item.status === 'pending' ? 'text-gray-500' : 'text-gray-900'}`}>
                          {item.title}
                        </h4>
                        <span className={`text-xs sm:text-sm font-semibold ${
                          item.status === 'completed' 
                            ? 'text-green-600' 
                            : item.status === 'in-progress' 
                            ? 'text-blue-600' 
                            : 'text-gray-500'
                        }`}>
                          {item.status === 'completed' ? 'Completed' : item.status === 'in-progress' ? 'In Progress' : 'Pending'}
                        </span>
                      </div>
                      <p className={`mb-3 text-sm sm:text-base ${item.status === 'pending' ? 'text-gray-500' : 'text-gray-600'}`}>
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.milestones.map((milestone, milestoneIndex) => (
                          <span 
                            key={milestoneIndex}
                            className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full ${
                              item.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : item.status === 'in-progress' && milestoneIndex === 0
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {milestone}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
