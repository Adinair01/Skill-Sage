export interface SkillData {
  [key: string]: number;
}

export interface AssessmentData {
  skills: SkillData;
  interests: string[];
  careerGoals: string;
  educationLevel: string;
  fieldOfStudy: string;
  learningStyle: string;
  workEnvironment?: string;
  salaryExpectations?: string;
  workLifeBalance?: string;
  geographicPreference?: string;
  previousExperience?: string;
  careerChangeReason?: string;
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  matchScore: number;
  salary: string;
  growth: string;
  icon: string;
  requiredSkills: string[];
  matchingInterests: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  rating: number;
  duration: string;
  students: string;
  price: string;
  image: string;
}

export interface Internship {
  id: string;
  company: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  stipend: string;
  schedule: string;
  icon: string;
  field: string;
}

export interface UserProgressData {
  userId?: string;
  completedCourses: string[];
  achievements: string[];
  milestones: Record<string, boolean>;
  progressPercentage: number;
}

export interface SkillGap {
  skill: string;
  current: number;
  target: number;
  gap: number;
}

export interface Recommendations {
  careerPaths: CareerPath[];
  courses: Course[];
  internships: Internship[];
  skillsGap: {
    gaps: SkillGap[];
    recommendations: string[];
  };
}
