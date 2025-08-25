import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAssessmentSchema, insertRecommendationSchema, insertUserProgressSchema } from "@shared/schema";
import { generateCareerRecommendations, generateCourseRecommendations, generateInternshipRecommendations, AssessmentProfile } from "./gemini";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Assessment endpoints
  app.post("/api/assessments", async (req, res) => {
    try {
      const validatedData = insertAssessmentSchema.parse(req.body);
      const assessment = await storage.createAssessment(validatedData);
      res.json(assessment);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : "Invalid assessment data" });
    }
  });

  app.get("/api/assessments/:id", async (req, res) => {
    try {
      const assessment = await storage.getAssessment(req.params.id);
      if (!assessment) {
        return res.status(404).json({ message: "Assessment not found" });
      }
      res.json(assessment);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve assessment" });
    }
  });

  // Recommendations endpoints
  app.post("/api/recommendations", async (req, res) => {
    try {
      const { assessmentId } = req.body;
      const assessment = await storage.getAssessment(assessmentId);
      
      if (!assessment) {
        return res.status(404).json({ message: "Assessment not found" });
      }

      const profile = {
        skills: assessment.skills,
        interests: assessment.interests,
        careerGoals: assessment.careerGoals,
        educationLevel: assessment.educationLevel,
        fieldOfStudy: assessment.fieldOfStudy || '',
        learningStyle: assessment.learningStyle,
        workEnvironment: assessment.workEnvironment ?? undefined,
        salaryExpectations: assessment.salaryExpectations ?? undefined,
        workLifeBalance: assessment.workLifeBalance ?? undefined,
        geographicPreference: assessment.geographicPreference ?? undefined,
        previousExperience: assessment.previousExperience ?? undefined,
        careerChangeReason: assessment.careerChangeReason ?? undefined
      };

      // Generate AI-powered recommendations
      console.log('Generating AI-powered recommendations...');
      const [recommendedCareers, recommendedCourses, recommendedInternships] = await Promise.all([
        generateCareerRecommendations(profile),
        generateCourseRecommendations(profile),
        generateInternshipRecommendations(profile)
      ]);

      if (!recommendedCareers?.length || !recommendedCourses?.length || !recommendedInternships?.length) {
        return res.status(502).json({ message: "AI generation returned empty results. Check GEMINI_API_KEY or try again." });
      }

      const skillsGap = generateBasicSkillsGap(assessment.skills);

      const recommendationData = {
        assessmentId,
        careerPaths: recommendedCareers,
        courses: recommendedCourses,
        internships: recommendedInternships,
        skillsGap,
      };

      const recommendation = await storage.createRecommendation(recommendationData);
      res.json(recommendation);
    } catch (error) {
      console.error("Generate recommendations failed:", error instanceof Error ? { message: error.message, stack: error.stack } : error);
      
      // If it's a missing API key error, return mock data instead of error
      if (error instanceof Error && error.message.includes('GEMINI_API_KEY')) {
        // Get the assessment data for personalized recommendations
        const { assessmentId } = req.body;
        const assessment = await storage.getAssessment(assessmentId);
        
        if (!assessment) {
          return res.status(404).json({ message: "Assessment not found" });
        }
        
        // Generate personalized mock data based on user assessment
        const personalizedCareers = generatePersonalizedCareers(assessment);
        const personalizedCourses = generatePersonalizedCourses(assessment);
        const personalizedInternships = generatePersonalizedInternships(assessment);
        
        const mockRecommendations = {
          assessmentId,
          careerPaths: personalizedCareers,
          courses: personalizedCourses,
          internships: personalizedInternships,
          skillsGap: generateBasicSkillsGap(assessment.skills)
        };
        
        const recommendation = await storage.createRecommendation(mockRecommendations);
        res.json(recommendation);
        return;
      }
      
      res.status(400).json({ message: error instanceof Error ? error.message : "Failed to generate recommendations" });
    }
  });

  app.get("/api/recommendations/assessment/:assessmentId", async (req, res) => {
    try {
      const recommendation = await storage.getRecommendationByAssessmentId(req.params.assessmentId);
      if (!recommendation) {
        return res.status(404).json({ message: "Recommendations not found" });
      }
      res.json(recommendation);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve recommendations" });
    }
  });

  // User progress endpoints
  app.post("/api/progress", async (req, res) => {
    try {
      const validatedData = insertUserProgressSchema.parse(req.body);
      const progress = await storage.createUserProgress(validatedData);
      res.json(progress);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : "Invalid progress data" });
    }
  });

  app.get("/api/progress/:userId", async (req, res) => {
    try {
      const progress = await storage.getUserProgress(req.params.userId);
      if (!progress) {
        return res.status(404).json({ message: "User progress not found" });
      }
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve progress" });
    }
  });

  app.put("/api/progress/:userId", async (req, res) => {
    try {
      const updateData = req.body;
      const progress = await storage.updateUserProgress(req.params.userId, updateData);
      res.json(progress);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : "Failed to update progress" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Helper function for basic skills gap analysis
function generateBasicSkillsGap(skills: Record<string, number>) {
  const industryStandards = {
    programming: 4,
    dataanalysis: 4,
    digitalmarketing: 3,
    communication: 4,
    leadership: 3,
    problemsolving: 4
  };
  
  const gaps = Object.entries(industryStandards).map(([skill, target]) => {
    const current = skills[skill] || 0;
    return {
      skill: skill.charAt(0).toUpperCase() + skill.slice(1).replace(/([A-Z])/g, ' $1'),
      current,
      target,
      gap: Math.max(0, target - current)
    };
  });
  
  return { gaps, recommendations: generateSkillImprovementRecommendations(gaps) };
}

function generateSkillImprovementRecommendations(gaps: any[]) {
  return gaps
    .filter(gap => gap.gap > 0)
    .map(gap => `Improve ${gap.skill} by ${gap.gap} level(s) to meet industry standards`)
    .slice(0, 3);
}

// Personalized recommendation generation functions
function generatePersonalizedCareers(assessment: any) {
  const { skills, interests, careerGoals, educationLevel } = assessment;
  
  // Determine user's strongest skills
  const skillEntries = Object.entries(skills);
  const strongestSkill = skillEntries.reduce((a, b) => skills[a[0]] > skills[b[0]] ? a : b)[0];
  const programmingLevel = skills.programming || 0;
  const dataLevel = skills.dataanalysis || 0;
  const marketingLevel = skills.digitalmarketing || 0;
  const communicationLevel = skills.communication || 0;
  
  const careers = [];
  
  // Programming-focused careers
  if (programmingLevel >= 3) {
    careers.push({
      id: "career-1",
      title: "Software Engineer",
      description: "Develop software applications and systems using programming languages and frameworks.",
      matchScore: Math.min(95, 70 + programmingLevel * 5),
      salary: "$80,000 - $120,000",
      growth: "High growth potential",
      requiredSkills: ["Programming", "Problem Solving", "Communication"],
      learningPath: ["Learn programming fundamentals", "Master a programming language", "Build projects"],
      timeToAchieve: "2-4 years",
      industryInsights: "High demand in tech industry",
      keyResponsibilities: ["Write clean code", "Debug applications", "Collaborate with teams"]
    });
  }
  
  // Data-focused careers
  if (dataLevel >= 2) {
    careers.push({
      id: "career-2", 
      title: "Data Analyst",
      description: "Analyze data to help organizations make informed business decisions.",
      matchScore: Math.min(90, 65 + dataLevel * 8),
      salary: "$65,000 - $95,000",
      growth: "Strong growth",
      requiredSkills: ["Data Analysis", "Statistics", "Communication"],
      learningPath: ["Learn statistics", "Master data tools", "Practice analysis"],
      timeToAchieve: "1-3 years",
      industryInsights: "Growing field with good opportunities",
      keyResponsibilities: ["Collect data", "Analyze trends", "Create reports"]
    });
  }
  
  // Marketing-focused careers
  if (marketingLevel >= 2) {
    careers.push({
      id: "career-3",
      title: "Digital Marketing Specialist", 
      description: "Create and manage digital marketing campaigns across various platforms.",
      matchScore: Math.min(85, 60 + marketingLevel * 8),
      salary: "$55,000 - $85,000",
      growth: "Steady growth",
      requiredSkills: ["Digital Marketing", "Creativity", "Analytics"],
      learningPath: ["Learn marketing basics", "Master digital tools", "Build portfolio"],
      timeToAchieve: "1-2 years",
      industryInsights: "Digital marketing is expanding rapidly",
      keyResponsibilities: ["Create campaigns", "Monitor performance", "Optimize strategies"]
    });
  }
  
  // Communication-focused careers
  if (communicationLevel >= 4) {
    careers.push({
      id: "career-4",
      title: "Business Analyst",
      description: "Bridge the gap between business needs and technical solutions.",
      matchScore: Math.min(88, 65 + communicationLevel * 6),
      salary: "$70,000 - $100,000",
      growth: "Strong growth",
      requiredSkills: ["Communication", "Analysis", "Business Acumen"],
      learningPath: ["Learn business processes", "Develop analytical skills", "Gain domain knowledge"],
      timeToAchieve: "2-3 years",
      industryInsights: "High demand across industries",
      keyResponsibilities: ["Analyze requirements", "Document processes", "Facilitate communication"]
    });
  }
  
  // Add a general career if we don't have enough
  if (careers.length < 3) {
    careers.push({
      id: "career-5",
      title: "Project Manager",
      description: "Lead and coordinate projects to ensure successful delivery.",
      matchScore: 75,
      salary: "$60,000 - $90,000",
      growth: "Steady growth",
      requiredSkills: ["Leadership", "Communication", "Organization"],
      learningPath: ["Learn project management", "Get certified", "Gain experience"],
      timeToAchieve: "2-3 years",
      industryInsights: "Versatile role across industries",
      keyResponsibilities: ["Plan projects", "Manage teams", "Track progress"]
    });
  }
  
  return careers.slice(0, 3);
}

function generatePersonalizedCourses(assessment: any) {
  const { skills, interests, learningStyle } = assessment;
  const courses = [];
  
  // Programming courses based on skill level
  if (skills.programming < 4) {
    courses.push({
      id: "course-1",
      title: skills.programming < 2 ? "JavaScript Fundamentals" : "Advanced JavaScript Programming",
      description: skills.programming < 2 ? 
        "Learn the basics of JavaScript programming language." :
        "Master modern JavaScript concepts and frameworks for web development.",
      category: "Programming",
      duration: skills.programming < 2 ? "6 weeks" : "8 weeks",
      difficulty: skills.programming < 2 ? "Beginner" : "Intermediate",
      provider: "Coursera",
      priority: 9,
      skillsGained: skills.programming < 2 ? 
        ["JavaScript Basics", "Variables", "Functions", "DOM Basics"] :
        ["JavaScript", "ES6+", "Async Programming", "DOM Manipulation", "Frameworks"],
      prerequisites: skills.programming < 2 ? ["None"] : ["Basic programming knowledge"],
      estimatedCost: "$49/month"
    });
  }
  
  // Data analysis courses
  if (skills.dataanalysis < 4) {
    courses.push({
      id: "course-2",
      title: skills.dataanalysis < 2 ? "Excel for Data Analysis" : "Data Analysis with Python",
      description: skills.dataanalysis < 2 ?
        "Learn to use Excel for basic data analysis and visualization." :
        "Learn to analyze and visualize data using Python libraries.",
      category: "Data Science",
      duration: skills.dataanalysis < 2 ? "4 weeks" : "10 weeks",
      difficulty: skills.dataanalysis < 2 ? "Beginner" : "Intermediate",
      provider: "edX",
      priority: 8,
      skillsGained: skills.dataanalysis < 2 ?
        ["Excel", "Basic Charts", "Data Filtering", "Pivot Tables"] :
        ["Python", "Pandas", "NumPy", "Matplotlib", "Data Visualization"],
      prerequisites: skills.dataanalysis < 2 ? ["Basic Excel knowledge"] : ["Basic Python knowledge"],
      estimatedCost: skills.dataanalysis < 2 ? "$29" : "$99"
    });
  }
  
  // Marketing courses
  if (skills.digitalmarketing < 4) {
    courses.push({
      id: "course-3",
      title: "Digital Marketing Fundamentals",
      description: "Learn the basics of digital marketing and social media strategy.",
      category: "Marketing",
      duration: "6 weeks",
      difficulty: "Beginner",
      provider: "Udemy",
      priority: 7,
      skillsGained: ["SEO", "Social Media", "Content Marketing", "Analytics", "Strategy"],
      prerequisites: ["None"],
      estimatedCost: "$29.99"
    });
  }
  
  // Communication courses
  if (skills.communication < 4) {
    courses.push({
      id: "course-4",
      title: "Communication Skills for Professionals",
      description: "Improve your communication skills for better workplace interactions.",
      category: "Soft Skills",
      duration: "4 weeks",
      difficulty: "Beginner",
      provider: "LinkedIn Learning",
      priority: 6,
      skillsGained: ["Public Speaking", "Writing", "Active Listening", "Presentation", "Negotiation"],
      prerequisites: ["None"],
      estimatedCost: "$19.99/month"
    });
  }
  
  return courses.slice(0, 4);
}

function generatePersonalizedInternships(assessment: any) {
  const { skills, interests, geographicPreference } = assessment;
  const internships = [];
  
  // Programming internships
  if (skills.programming >= 2) {
    internships.push({
      id: "internship-1",
      title: "Software Development Intern",
      company: "TechCorp Solutions",
      location: geographicPreference || "Remote",
      description: "Gain hands-on experience in software development and coding practices.",
      duration: "3 months",
      stipend: "$2,500/month",
      requirements: ["Programming knowledge", "Problem-solving skills", "Team collaboration"],
      learningOutcomes: ["Real-world coding experience", "Agile methodology", "Code review process"],
      applicationDeadline: "2024-03-15",
      field: "Software Development"
    });
  }
  
  // Data analysis internships
  if (skills.dataanalysis >= 2) {
    internships.push({
      id: "internship-2",
      title: "Data Analysis Intern", 
      company: "DataInsights Inc",
      location: geographicPreference || "New York, NY",
      description: "Work with real data sets and learn data analysis techniques.",
      duration: "4 months",
      stipend: "$3,000/month",
      requirements: ["Basic statistics", "Excel proficiency", "Attention to detail"],
      learningOutcomes: ["Data cleaning", "Statistical analysis", "Report creation"],
      applicationDeadline: "2024-04-01",
      field: "Data Analysis"
    });
  }
  
  // Marketing internships
  if (skills.digitalmarketing >= 2) {
    internships.push({
      id: "internship-3",
      title: "Marketing Assistant Intern",
      company: "Growth Marketing Agency",
      location: geographicPreference || "Los Angeles, CA", 
      description: "Assist with digital marketing campaigns and social media management.",
      duration: "3 months",
      stipend: "$2,200/month",
      requirements: ["Creativity", "Social media knowledge", "Writing skills"],
      learningOutcomes: ["Campaign management", "Content creation", "Analytics tracking"],
      applicationDeadline: "2024-03-30",
      field: "Digital Marketing"
    });
  }
  
  // General business internship
  if (internships.length < 3) {
    internships.push({
      id: "internship-4",
      title: "Business Operations Intern",
      company: "Global Business Solutions",
      location: geographicPreference || "Chicago, IL",
      description: "Learn about business operations and process improvement.",
      duration: "3 months",
      stipend: "$2,000/month",
      requirements: ["Analytical thinking", "Communication skills", "Microsoft Office"],
      learningOutcomes: ["Process analysis", "Business reporting", "Project coordination"],
      applicationDeadline: "2024-04-15",
      field: "Business Operations"
    });
  }
  
  return internships.slice(0, 3);
}
