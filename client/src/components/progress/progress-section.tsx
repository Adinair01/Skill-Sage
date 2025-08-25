import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp, Calendar, Award, MapPin, Users, BookOpen, Briefcase, Star, Zap, Lightbulb, CheckCircle, Clock, Flag } from "lucide-react";
import { useAssessment } from "@/hooks/use-assessment";
import { localStorageService } from "@/lib/storage";

interface CareerGoal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
  category: 'skill' | 'career' | 'learning' | 'internship';
  priority: 'low' | 'medium' | 'high';
  status: 'not-started' | 'in-progress' | 'completed';
}

interface SkillProgress {
  skill: string;
  currentLevel: number;
  targetLevel: number;
  progress: number;
  lastUpdated: string;
}

export default function ProgressSection() {
  const { assessmentData, isComplete } = useAssessment();
  const [careerGoals, setCareerGoals] = useState<CareerGoal[]>([]);
  const [skillProgress, setSkillProgress] = useState<SkillProgress[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [motivationalMessage, setMotivationalMessage] = useState("");

  const motivationalMessages = [
    "Every step forward is progress, no matter how small! 🚀",
    "Your dedication today builds your success tomorrow! 💪",
    "Skills are like muscles - they grow stronger with practice! 🏋️",
    "You're not just learning, you're transforming your future! ✨",
    "Success is a journey, and you're on the right path! 🎯"
  ];

  useEffect(() => {
    if (isComplete && assessmentData) {
      // Generate career goals based on assessment
      const goals: CareerGoal[] = [
        {
          id: '1',
          title: 'Improve Programming Skills',
          description: 'Reach advanced level in programming languages',
          targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          progress: 0,
          category: 'skill',
          priority: 'high',
          status: 'not-started'
        },
        {
          id: '2',
          title: 'Complete Data Analysis Course',
          description: 'Master data analysis and visualization',
          targetDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          progress: 0,
          category: 'learning',
          priority: 'medium',
          status: 'not-started'
        },
        {
          id: '3',
          title: 'Secure Internship',
          description: 'Get hands-on experience in your field',
          targetDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          progress: 0,
          category: 'internship',
          priority: 'high',
          status: 'not-started'
        },
        {
          id: '4',
          title: 'Build Portfolio',
          description: 'Create impressive projects to showcase skills',
          targetDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          progress: 0,
          category: 'career',
          priority: 'medium',
          status: 'not-started'
        }
      ];

      // Generate skill progress based on assessment
      const skills: SkillProgress[] = Object.entries(assessmentData.skills).map(([skill, level]) => ({
        skill: skill.charAt(0).toUpperCase() + skill.slice(1),
        currentLevel: level,
        targetLevel: Math.min(5, level + 1),
        progress: (level / 5) * 100,
        lastUpdated: new Date().toISOString().split('T')[0]
      }));

      setCareerGoals(goals);
      setSkillProgress(skills);
      setOverallProgress(calculateOverallProgress(goals, skills));
      setMotivationalMessage(motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]);
    }
  }, [isComplete, assessmentData]);

  const calculateOverallProgress = (goals: CareerGoal[], skills: SkillProgress[]): number => {
    const goalProgress = goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length;
    const skillProgress = skills.reduce((acc, skill) => acc + skill.progress, 0) / skills.length;
    return Math.round((goalProgress + skillProgress) / 2);
  };

  const updateGoalProgress = (goalId: string, progress: number) => {
    setCareerGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { ...goal, progress, status: progress >= 100 ? 'completed' : progress > 0 ? 'in-progress' : 'not-started' }
        : goal
    ));
  };

  const updateSkillProgress = (skillName: string, newLevel: number) => {
    setSkillProgress(prev => prev.map(skill => 
      skill.skill.toLowerCase() === skillName.toLowerCase()
        ? { ...skill, currentLevel: newLevel, progress: (newLevel / skill.targetLevel) * 100, lastUpdated: new Date().toISOString().split('T')[0] }
        : skill
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-burgundy-600 bg-burgundy-100';
      case 'medium': return 'text-brown-600 bg-brown-100';
      case 'low': return 'text-hazelnut-600 bg-hazelnut-100';
      default: return 'text-text-muted bg-cream-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'skill': return <TrendingUp className="w-5 h-5" />;
      case 'learning': return <BookOpen className="w-5 h-5" />;
      case 'internship': return <Briefcase className="w-5 h-5" />;
      case 'career': return <Target className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  if (!isComplete) {
    return null;
  }

  return (
    <section id="progress" className="py-16 bg-gradient-to-br from-cream-50 to-brown-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4 bg-gradient-to-r from-burgundy-100 to-brown-100 px-6 py-3 rounded-full border border-burgundy-200">
            <Target className="w-6 h-6 text-burgundy-600" />
            <span className="text-burgundy-700 font-semibold font-serif">SkillSage Progress Tracker</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4 font-serif">
            Your Career Journey Progress
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto font-serif">
            Track your skills, goals, and achievements as you work towards your dream career with SkillSage
          </p>
        </div>

        {/* Motivational Banner */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-burgundy-500 to-brown-500 rounded-2xl p-8 text-center text-cream-50 shadow-xl">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Lightbulb className="w-8 h-8 animate-pulse" />
              <h3 className="text-2xl font-bold font-serif">Daily Motivation</h3>
              <Lightbulb className="w-8 h-8 animate-pulse" />
            </div>
            <p className="text-xl leading-relaxed font-serif">{motivationalMessage}</p>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="mb-12">
          <Card className="bg-cream-50/80 backdrop-blur-sm border-brown-200 shadow-xl">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-text-primary mb-2 font-serif">Overall Career Progress</h3>
                <p className="text-text-secondary font-serif">Your journey to success</p>
              </div>
              <div className="flex items-center justify-center gap-6 mb-6">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-r from-burgundy-500 to-brown-500 rounded-full flex items-center justify-center">
                    <span className="text-3xl font-bold text-cream-50">{overallProgress}%</span>
                  </div>
                  <div className="absolute inset-0 w-32 h-32 bg-gradient-to-r from-burgundy-500 to-brown-500 rounded-full opacity-20 animate-ping"></div>
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-burgundy-500" />
                    <span className="text-text-primary font-serif">Career Goals: {careerGoals.filter(g => g.status === 'completed').length}/{careerGoals.length}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-brown-500" />
                    <span className="text-text-primary font-serif">Skills Enhanced: {skillProgress.filter(s => s.currentLevel > s.targetLevel - 1).length}/{skillProgress.length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-hazelnut-500" />
                    <span className="text-text-primary font-serif">Days Active: {Math.ceil((Date.now() - new Date(assessmentData?.lastUpdated || Date.now()).getTime()) / (1000 * 60 * 60 * 24))}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Career Goals */}
          <div>
            <Card className="bg-cream-50/80 backdrop-blur-sm border-brown-200 shadow-xl h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-burgundy-500 to-brown-500 rounded-xl">
                    <Flag className="w-6 h-6 text-cream-50" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary font-serif">Career Goals</h3>
                </div>
                <div className="space-y-4">
                  {careerGoals.map((goal) => (
                    <div key={goal.id} className="bg-gradient-to-r from-cream-100 to-brown-50 p-4 rounded-xl border border-brown-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-burgundy-100 rounded-lg">
                            {getCategoryIcon(goal.category)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-text-primary font-serif">{goal.title}</h4>
                            <p className="text-sm text-text-secondary font-serif">{goal.description}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                          {goal.priority}
                        </span>
                      </div>
                      <div className="mb-3">
                        <div className="flex justify-between text-sm text-text-secondary mb-1 font-serif">
                          <span>Progress</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-text-muted font-serif">
                          <Calendar className="w-4 h-4" />
                          <span>Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateGoalProgress(goal.id, Math.max(0, goal.progress - 10))}
                            className="px-3 py-1 bg-burgundy-100 text-burgundy-600 rounded-lg text-sm hover:bg-burgundy-200 transition-colors"
                          >
                            -
                          </button>
                          <button
                            onClick={() => updateGoalProgress(goal.id, Math.min(100, goal.progress + 10))}
                            className="px-3 py-1 bg-brown-100 text-brown-600 rounded-lg text-sm hover:bg-brown-200 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Skills Progress */}
          <div>
            <Card className="bg-cream-50/80 backdrop-blur-sm border-brown-200 shadow-xl h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-brown-500 to-hazelnut-500 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-cream-50" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary font-serif">Skills Development</h3>
                </div>
                <div className="space-y-4">
                  {skillProgress.map((skill) => (
                    <div key={skill.skill} className="bg-gradient-to-r from-cream-100 to-hazelnut-50 p-4 rounded-xl border border-brown-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-text-primary font-serif">{skill.skill}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-text-secondary font-serif">Level {skill.currentLevel}/5</span>
                          <span className="text-sm text-text-muted">→</span>
                          <span className="text-sm text-text-secondary font-serif">Level {skill.targetLevel}</span>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="flex justify-between text-sm text-text-secondary mb-1 font-serif">
                          <span>Progress</span>
                          <span>{Math.round(skill.progress)}%</span>
                        </div>
                        <Progress value={skill.progress} className="h-2" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-text-muted font-serif">
                          Updated: {new Date(skill.lastUpdated).toLocaleDateString()}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateSkillProgress(skill.skill, Math.max(1, skill.currentLevel - 1))}
                            className="px-3 py-1 bg-burgundy-100 text-burgundy-600 rounded-lg text-sm hover:bg-burgundy-200 transition-colors"
                          >
                            -
                          </button>
                          <button
                            onClick={() => updateSkillProgress(skill.skill, Math.min(5, skill.currentLevel + 1))}
                            className="px-3 py-1 bg-brown-100 text-brown-600 rounded-lg text-sm hover:bg-brown-200 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Job Market Insights */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-hazelnut-50 to-chocolate-50 border-brown-200 shadow-xl">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-3 mb-4 bg-gradient-to-r from-hazelnut-100 to-chocolate-100 px-6 py-3 rounded-full border border-hazelnut-200">
                  <MapPin className="w-6 h-6 text-hazelnut-600" />
                  <span className="text-hazelnut-700 font-semibold font-serif">Job Market Insights</span>
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-2 font-serif">Career Opportunities</h3>
                <p className="text-text-secondary font-serif">Stay updated with the latest trends and opportunities</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center bg-cream-50/80 p-6 rounded-xl border border-brown-200">
                  <div className="w-16 h-16 bg-gradient-to-r from-burgundy-500 to-brown-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="text-cream-50" size={24} />
                  </div>
                  <h4 className="text-lg font-semibold text-text-primary mb-2 font-serif">Tech Sector Growth</h4>
                  <p className="text-text-secondary font-serif">The tech industry is growing rapidly with high demand for skilled professionals</p>
                </div>
                <div className="text-center bg-cream-50/80 p-6 rounded-xl border border-brown-200">
                  <div className="w-16 h-16 bg-gradient-to-r from-brown-500 to-hazelnut-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="text-cream-50" size={24} />
                  </div>
                  <h4 className="text-lg font-semibold text-text-primary mb-2 font-serif">Remote Opportunities</h4>
                  <p className="text-text-secondary font-serif">Remote work is becoming the new norm, opening global opportunities</p>
                </div>
                <div className="text-center bg-cream-50/80 p-6 rounded-xl border border-brown-200">
                  <div className="w-16 h-16 bg-gradient-to-r from-hazelnut-500 to-chocolate-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="text-cream-50" size={24} />
                  </div>
                  <h4 className="text-lg font-semibold text-text-primary mb-2 font-serif">Emerging Technologies</h4>
                  <p className="text-text-secondary font-serif">AI/ML, Data Science, and Cloud Computing are the hottest skills in demand</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
