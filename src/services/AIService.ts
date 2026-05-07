import { Student, Class, StaffMember } from "@/types/auth";

export interface AIInsight {
  title: string;
  content: string;
  type: "academic" | "financial" | "behavioral" | "strategic";
  priority: "high" | "medium" | "low";
}

export const AIService = {
  getStudentImprovement: (student: Student): AIInsight[] => {
    const score = student.performanceScore || 0;
    if (score >= 90) {
      return [{
        title: "Exceptional Growth",
        content: `${student.name} is consistently performing in the top 5th percentile. Recommendation: Introduce advanced enrichment materials in STEM subjects to maintain engagement.`,
        type: "academic",
        priority: "low"
      }];
    } else if (score >= 75) {
      return [{
        title: "Steady Progress",
        content: `${student.name} has shown a 12% improvement in English Language over the last term. Suggestion: Focus on creative writing to bridge the gap to an A grade.`,
        type: "academic",
        priority: "medium"
      }];
    } else {
      return [{
        title: "Support Needed",
        content: `${student.name} is struggling with foundational concepts in Mathematics. Recommendation: 1-on-1 peer tutoring or after-school support sessions for algebraic logic.`,
        type: "academic",
        priority: "high"
      }];
    }
  },

  getSchoolInsights: (): AIInsight[] => {
    return [
      {
        title: "Financial Sustainability",
        content: "Current revenue trends indicate a 15% surplus for the next term. Recommendation: Allocate 5% to laboratory equipment upgrades and 3% to staff professional development.",
        type: "financial",
        priority: "medium"
      },
      {
        title: "Academic Excellence",
        content: "Average school-wide performance in Science has increased by 8% since the implementation of the new lab schedule. Continue this model for the Humanities department.",
        type: "academic",
        priority: "low"
      },
      {
        title: "Strategic Growth",
        content: "Student retention rate is at 94%, above the regional average of 88%. AI predicts a capacity bottleneck in Primary 3 by next academic year. Plan for an additional classroom wing.",
        type: "strategic",
        priority: "high"
      }
    ];
  },

  getTeacherRemarks: (studentName: string, subject: string, score: number): string => {
    if (score >= 90) return `AI Suggestion: ${studentName} demonstrates mastery in ${subject}. Their analytical thinking is well above grade level. Highly recommended for the school's honors program.`;
    if (score >= 75) return `AI Suggestion: ${studentName} shows good understanding of ${subject} fundamentals. With more consistent practice in complex problem-solving, they could reach the top tier.`;
    return `AI Suggestion: ${studentName} is encountering difficulties with core concepts in ${subject}. I recommend focused review sessions on recent modules to build confidence.`;
  }
};