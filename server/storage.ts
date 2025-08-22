import { type User, type InsertUser, type Assessment, type InsertAssessment, type Recommendation, type InsertRecommendation, type UserProgress, type InsertUserProgress } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createAssessment(assessment: InsertAssessment): Promise<Assessment>;
  getAssessment(id: string): Promise<Assessment | undefined>;
  getAssessmentByUserId(userId: string): Promise<Assessment | undefined>;
  
  createRecommendation(recommendation: InsertRecommendation): Promise<Recommendation>;
  getRecommendation(id: string): Promise<Recommendation | undefined>;
  getRecommendationByAssessmentId(assessmentId: string): Promise<Recommendation | undefined>;
  
  createUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  getUserProgress(userId: string): Promise<UserProgress | undefined>;
  updateUserProgress(userId: string, progress: Partial<InsertUserProgress>): Promise<UserProgress>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private assessments: Map<string, Assessment>;
  private recommendations: Map<string, Recommendation>;
  private userProgress: Map<string, UserProgress>;

  constructor() {
    this.users = new Map();
    this.assessments = new Map();
    this.recommendations = new Map();
    this.userProgress = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createAssessment(insertAssessment: InsertAssessment): Promise<Assessment> {
    const id = randomUUID();
    const assessment: Assessment = {
      ...insertAssessment,
      id,
      userId: insertAssessment.userId || null,
      completedAt: new Date(),
    };
    this.assessments.set(id, assessment);
    return assessment;
  }

  async getAssessment(id: string): Promise<Assessment | undefined> {
    return this.assessments.get(id);
  }

  async getAssessmentByUserId(userId: string): Promise<Assessment | undefined> {
    return Array.from(this.assessments.values()).find(
      (assessment) => assessment.userId === userId
    );
  }

  async createRecommendation(insertRecommendation: InsertRecommendation): Promise<Recommendation> {
    const id = randomUUID();
    const recommendation: Recommendation = {
      ...insertRecommendation,
      id,
      generatedAt: new Date(),
    };
    this.recommendations.set(id, recommendation);
    return recommendation;
  }

  async getRecommendation(id: string): Promise<Recommendation | undefined> {
    return this.recommendations.get(id);
  }

  async getRecommendationByAssessmentId(assessmentId: string): Promise<Recommendation | undefined> {
    return Array.from(this.recommendations.values()).find(
      (recommendation) => recommendation.assessmentId === assessmentId
    );
  }

  async createUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const id = randomUUID();
    const progress: UserProgress = {
      ...insertProgress,
      id,
      completedCourses: (insertProgress.completedCourses as string[]) || [],
      achievements: (insertProgress.achievements as string[]) || [],
      milestones: insertProgress.milestones || {},
      progressPercentage: insertProgress.progressPercentage || 0,
      updatedAt: new Date(),
    };
    this.userProgress.set(id, progress);
    return progress;
  }

  async getUserProgress(userId: string): Promise<UserProgress | undefined> {
    return Array.from(this.userProgress.values()).find(
      (progress) => progress.userId === userId
    );
  }

  async updateUserProgress(userId: string, updateData: Partial<InsertUserProgress>): Promise<UserProgress> {
    const existing = await this.getUserProgress(userId);
    if (!existing) {
      throw new Error("User progress not found");
    }
    
    const updated: UserProgress = {
      ...existing,
      ...updateData,
      completedCourses: (updateData.completedCourses as string[]) || existing.completedCourses,
      achievements: (updateData.achievements as string[]) || existing.achievements,
      updatedAt: new Date(),
    };
    
    this.userProgress.set(existing.id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
