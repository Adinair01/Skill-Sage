import { useState, useEffect } from "react";
import { AssessmentData, SkillData } from "@/lib/types";
import { localStorageService } from "@/lib/storage";

const defaultSkills: SkillData = {
  programming: 3,
  dataanalysis: 2,
  digitalmarketing: 4,
  communication: 4,
  leadership: 3,
  problemsolving: 5
};

const defaultAssessment: AssessmentData = {
  skills: defaultSkills,
  interests: ["Technology", "Creative"],
  careerGoals: "Short-term (6 months - 2 years)",
  educationLevel: "Currently in College",
  fieldOfStudy: "",
  learningStyle: "visual"
};

export function useAssessment() {
  const [assessmentData, setAssessmentData] = useState<AssessmentData>(defaultAssessment);
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorageService.getAssessment();
    if (savedData) {
      setAssessmentData(savedData);
    }
  }, []);

  // Save data when it changes
  useEffect(() => {
    localStorageService.saveAssessment(assessmentData);
  }, [assessmentData]);

  const updateSkill = (skill: string, value: number) => {
    setAssessmentData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [skill]: value
      }
    }));
  };

  const updateInterests = (interests: string[]) => {
    setAssessmentData(prev => ({
      ...prev,
      interests
    }));
  };

  const updateField = (field: keyof AssessmentData, value: any) => {
    setAssessmentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const completeAssessment = () => {
    setIsComplete(true);
  };

  const resetAssessment = () => {
    setAssessmentData(defaultAssessment);
    setCurrentStep(1);
    setIsComplete(false);
    localStorageService.clearAll();
  };

  return {
    assessmentData,
    currentStep,
    isComplete,
    updateSkill,
    updateInterests,
    updateField,
    nextStep,
    prevStep,
    completeAssessment,
    resetAssessment,
    totalSteps: 4,
    progressPercentage: (currentStep / 4) * 100
  };
}
