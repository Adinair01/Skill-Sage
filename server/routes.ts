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
      
      // Get the assessment data
      const assessment = await storage.getAssessment(assessmentId);
      if (!assessment) {
        return res.status(404).json({ message: "Assessment not found" });
      }

      // Create profile for Gemini AI
      const profile: AssessmentProfile = {
        skills: assessment.skills,
        interests: assessment.interests,
        careerGoals: assessment.careerGoals,
        educationLevel: assessment.educationLevel,
        fieldOfStudy: assessment.fieldOfStudy || '',
        learningStyle: assessment.learningStyle,
        workEnvironment: assessment.workEnvironment,
        salaryExpectations: assessment.salaryExpectations,
        workLifeBalance: assessment.workLifeBalance,
        geographicPreference: assessment.geographicPreference,
        previousExperience: assessment.previousExperience,
        careerChangeReason: assessment.careerChangeReason
      };

      // Generate AI-powered recommendations
      console.log('Generating AI-powered recommendations...');
      const [recommendedCareers, recommendedCourses, recommendedInternships] = await Promise.all([
        generateCareerRecommendations(profile),
        generateCourseRecommendations(profile),
        generateInternshipRecommendations(profile)
      ]);

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
