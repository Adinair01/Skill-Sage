import { AssessmentData, UserProgressData, Recommendations } from "./types";

const STORAGE_KEYS = {
  ASSESSMENT: 'careerAdvisor_assessment',
  PROGRESS: 'careerAdvisor_progress',
  RECOMMENDATIONS: 'careerAdvisor_recommendations',
  USER_ID: 'careerAdvisor_userId'
};

export const localStorageService = {
  // Assessment data
  saveAssessment: (data: AssessmentData): void => {
    localStorage.setItem(STORAGE_KEYS.ASSESSMENT, JSON.stringify(data));
  },

  getAssessment: (): AssessmentData | null => {
    const data = localStorage.getItem(STORAGE_KEYS.ASSESSMENT);
    return data ? JSON.parse(data) : null;
  },

  // User progress
  saveProgress: (data: UserProgressData): void => {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(data));
  },

  getProgress: (): UserProgressData | null => {
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    return data ? JSON.parse(data) : null;
  },

  // Recommendations
  saveRecommendations: (data: Recommendations): void => {
    localStorage.setItem(STORAGE_KEYS.RECOMMENDATIONS, JSON.stringify(data));
  },

  getRecommendations: (): Recommendations | null => {
    const data = localStorage.getItem(STORAGE_KEYS.RECOMMENDATIONS);
    return data ? JSON.parse(data) : null;
  },

  // User ID
  saveUserId: (userId: string): void => {
    localStorage.setItem(STORAGE_KEYS.USER_ID, userId);
  },

  getUserId: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.USER_ID);
  },

  // Clear all data
  clearAll: (): void => {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
};
