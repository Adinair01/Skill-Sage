import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface AssessmentProfile {
  skills: Record<string, number>;
  interests: string[];
  careerGoals: string;
  educationLevel: string;
  fieldOfStudy: string;
  learningStyle: string;
  workEnvironment?: string;
  salaryExpectations?: string;
  workLifeBalance?: string;
  careerChangeReason?: string;
  previousExperience?: string;
  preferredIndustries?: string[];
  geographicPreference?: string;
  remoteWorkPreference?: string;
}

export interface CareerRecommendation {
  id: string;
  title: string;
  description: string;
  matchScore: number;
  salary: string;
  growth: string;
  requiredSkills: string[];
  learningPath: string[];
  timeToAchieve: string;
  industryInsights: string;
  keyResponsibilities: string[];
  icon: string;
}

export interface CourseRecommendation {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  difficulty: string;
  provider: string;
  priority: number;
  skillsGained: string[];
  prerequisites: string[];
  estimatedCost: string;
}

export interface InternshipRecommendation {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  duration: string;
  stipend: string;
  requirements: string[];
  learningOutcomes: string[];
  applicationDeadline: string;
  field: string;
}

export async function generateCareerRecommendations(profile: AssessmentProfile): Promise<CareerRecommendation[]> {
  try {
    const prompt = `As an expert career advisor, analyze this student profile and recommend 3 specific career paths:

Profile:
- Skills: ${Object.entries(profile.skills).map(([skill, level]) => `${skill}: ${level}/5`).join(', ')}
- Interests: ${profile.interests.join(', ')}
- Career Goals: ${profile.careerGoals}
- Education: ${profile.educationLevel}
- Field of Study: ${profile.fieldOfStudy}
- Learning Style: ${profile.learningStyle}
- Work Environment Preference: ${profile.workEnvironment || 'Not specified'}
- Salary Expectations: ${profile.salaryExpectations || 'Not specified'}
- Geographic Preference: ${profile.geographicPreference || 'Not specified'}

For each career recommendation, provide:
1. Job title
2. Detailed description (2-3 sentences)
3. Match percentage (realistic based on profile)
4. Average salary range
5. Growth outlook
6. Top 5 required skills
7. Learning path (5 specific steps)
8. Time to achieve career
9. Current industry insights
10. 5 key responsibilities

Respond with JSON format for 3 careers.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            careers: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  matchScore: { type: "number" },
                  salary: { type: "string" },
                  growth: { type: "string" },
                  requiredSkills: { type: "array", items: { type: "string" } },
                  learningPath: { type: "array", items: { type: "string" } },
                  timeToAchieve: { type: "string" },
                  industryInsights: { type: "string" },
                  keyResponsibilities: { type: "array", items: { type: "string" } }
                },
                required: ["title", "description", "matchScore", "salary", "growth", "requiredSkills", "learningPath", "timeToAchieve", "industryInsights", "keyResponsibilities"]
              }
            }
          },
          required: ["careers"]
        }
      },
      contents: prompt
    });

    const data = JSON.parse(response.text || '{"careers": []}');
    
    return data.careers.map((career: any, index: number) => ({
      id: `career-${index + 1}`,
      ...career,
      icon: getCareerIcon(career.title)
    }));
  } catch (error) {
    console.error('Error generating career recommendations:', error);
    return [];
  }
}

export async function generateCourseRecommendations(profile: AssessmentProfile): Promise<CourseRecommendation[]> {
  try {
    const prompt = `As an expert learning advisor, recommend 4 specific courses for this student profile:

Profile:
- Skills: ${Object.entries(profile.skills).map(([skill, level]) => `${skill}: ${level}/5`).join(', ')}
- Interests: ${profile.interests.join(', ')}
- Career Goals: ${profile.careerGoals}
- Education: ${profile.educationLevel}
- Field of Study: ${profile.fieldOfStudy}
- Learning Style: ${profile.learningStyle}

For each course recommendation, provide:
1. Course title
2. Detailed description
3. Category/field
4. Duration
5. Difficulty level (Beginner/Intermediate/Advanced)
6. Recommended provider/platform
7. Priority (1-10, where 10 is highest priority)
8. Skills gained (5 specific skills)
9. Prerequisites
10. Estimated cost range

Focus on courses that address skill gaps and support career goals.

Respond with JSON format for 4 courses.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            courses: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  category: { type: "string" },
                  duration: { type: "string" },
                  difficulty: { type: "string" },
                  provider: { type: "string" },
                  priority: { type: "number" },
                  skillsGained: { type: "array", items: { type: "string" } },
                  prerequisites: { type: "array", items: { type: "string" } },
                  estimatedCost: { type: "string" }
                },
                required: ["title", "description", "category", "duration", "difficulty", "provider", "priority", "skillsGained", "prerequisites", "estimatedCost"]
              }
            }
          },
          required: ["courses"]
        }
      },
      contents: prompt
    });

    const data = JSON.parse(response.text || '{"courses": []}');
    
    return data.courses.map((course: any, index: number) => ({
      id: `course-${index + 1}`,
      ...course
    }));
  } catch (error) {
    console.error('Error generating course recommendations:', error);
    return [];
  }
}

export async function generateInternshipRecommendations(profile: AssessmentProfile): Promise<InternshipRecommendation[]> {
  try {
    const prompt = `As an expert career advisor, recommend 3 specific internship opportunities for this student:

Profile:
- Skills: ${Object.entries(profile.skills).map(([skill, level]) => `${skill}: ${level}/5`).join(', ')}
- Interests: ${profile.interests.join(', ')}
- Career Goals: ${profile.careerGoals}
- Education: ${profile.educationLevel}
- Field of Study: ${profile.fieldOfStudy}
- Geographic Preference: ${profile.geographicPreference || 'Flexible'}
- Remote Work Preference: ${profile.remoteWorkPreference || 'Open to both'}

For each internship, provide:
1. Internship title
2. Company name (realistic, well-known company)
3. Location (consider geographic preference)
4. Detailed description
5. Duration
6. Stipend/compensation
7. Key requirements (3-4 items)
8. Learning outcomes (4-5 specific outcomes)
9. Application deadline
10. Field/industry

Respond with JSON format for 3 internships.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            internships: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  company: { type: "string" },
                  location: { type: "string" },
                  description: { type: "string" },
                  duration: { type: "string" },
                  stipend: { type: "string" },
                  requirements: { type: "array", items: { type: "string" } },
                  learningOutcomes: { type: "array", items: { type: "string" } },
                  applicationDeadline: { type: "string" },
                  field: { type: "string" }
                },
                required: ["title", "company", "location", "description", "duration", "stipend", "requirements", "learningOutcomes", "applicationDeadline", "field"]
              }
            }
          },
          required: ["internships"]
        }
      },
      contents: prompt
    });

    const data = JSON.parse(response.text || '{"internships": []}');
    
    return data.internships.map((internship: any, index: number) => ({
      id: `internship-${index + 1}`,
      ...internship
    }));
  } catch (error) {
    console.error('Error generating internship recommendations:', error);
    return [];
  }
}

function getCareerIcon(title: string): string {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('engineer') || lowerTitle.includes('developer') || lowerTitle.includes('programmer')) return 'fas fa-code';
  if (lowerTitle.includes('data') || lowerTitle.includes('analyst') || lowerTitle.includes('scientist')) return 'fas fa-chart-bar';
  if (lowerTitle.includes('design') || lowerTitle.includes('creative') || lowerTitle.includes('art')) return 'fas fa-paint-brush';
  if (lowerTitle.includes('market') || lowerTitle.includes('sales') || lowerTitle.includes('business')) return 'fas fa-chart-line';
  if (lowerTitle.includes('manager') || lowerTitle.includes('lead') || lowerTitle.includes('director')) return 'fas fa-users';
  if (lowerTitle.includes('finance') || lowerTitle.includes('accounting') || lowerTitle.includes('financial')) return 'fas fa-dollar-sign';
  if (lowerTitle.includes('research') || lowerTitle.includes('academic') || lowerTitle.includes('scientist')) return 'fas fa-microscope';
  if (lowerTitle.includes('content') || lowerTitle.includes('writer') || lowerTitle.includes('media')) return 'fas fa-pen';
  if (lowerTitle.includes('consultant') || lowerTitle.includes('advisor') || lowerTitle.includes('strategy')) return 'fas fa-lightbulb';
  return 'fas fa-briefcase';
}