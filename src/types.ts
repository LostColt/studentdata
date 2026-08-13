export type Term = 'All Time' | 'Semester 1' | 'Semester 2' | 'Q1' | 'Q2' | 'Q3' | 'Q4';

export interface PerformanceRecord {
  studentName: string;
  term: Term;
  category: string;
  assignment: string;
  score: number;
}

export interface StudentSummary {
  name: string;
  overallAverage: number;
  q1Average: number;
  q2Average: number;
  q3Average: number;
  q4Average: number;
  s1Average: number;
  s2Average: number;
  assessmentsCompleted: number;
  trend: number; // percentage change from previous term (e.g. S1 to S2, or Q3 to Q4)
}
