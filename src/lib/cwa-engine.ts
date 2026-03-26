export type DegreeClass = 
  | 'First Class'
  | 'Second Class Upper'
  | 'Second Class Lower'
  | 'Third Class'
  | 'Pass'
  | 'Fail'
  | 'No Class';

export const getClassFromCWA = (cwa: number): { title: DegreeClass; color: string; bg: string } => {
  if (cwa >= 70 && cwa <= 100) return { title: 'First Class', color: 'text-class-first', bg: 'bg-class-first-bg' };
  if (cwa >= 60 && cwa < 70) return { title: 'Second Class Upper', color: 'text-class-upper', bg: 'bg-class-upper-bg' };
  if (cwa >= 50 && cwa < 60) return { title: 'Second Class Lower', color: 'text-class-lower', bg: 'bg-class-lower-bg' };
  if (cwa >= 45 && cwa < 50) return { title: 'Third Class', color: 'text-class-third', bg: 'bg-class-third-bg' };
  if (cwa >= 40 && cwa < 45) return { title: 'Pass', color: 'text-class-pass', bg: 'bg-class-pass-bg' };
  if (cwa >= 0 && cwa < 40) return { title: 'Fail', color: 'text-class-fail', bg: 'bg-class-fail-bg' };
  return { title: 'No Class', color: 'text-text-secondary', bg: 'bg-surface-hover' };
};

export interface Course {
  id: string;
  name: string;
  credit: number;
  score: number;
}

export const calcSemesterMetrics = (courses: Course[]) => {
  const validCourses = courses.filter(c => c.credit > 0 && c.score >= 0);
  if (validCourses.length === 0) return { totalCredits: 0, totalWeightedScore: 0, cwa: 0 };

  const totalCredits = validCourses.reduce((sum, c) => sum + c.credit, 0);
  const totalWeightedScore = validCourses.reduce((sum, c) => sum + (c.score * c.credit), 0);
  
  const cwa = totalCredits > 0 ? totalWeightedScore / totalCredits : 0;

  return { totalCredits, totalWeightedScore, cwa };
};

export const calcContinuingCWA = (
  prevCWA: number, 
  prevCredits: number, 
  courses: Course[]
) => {
  const sem = calcSemesterMetrics(courses);
  
  if (prevCredits <= 0 || sem.totalCredits === 0) {
    if (sem.totalCredits > 0) return sem.cwa;
    return prevCWA || 0;
  }

  const prevTotal = prevCWA * prevCredits;
  const newTotal = prevTotal + sem.totalWeightedScore;
  const newCredits = prevCredits + sem.totalCredits;

  return newTotal / newCredits;
};

// Target mode calculation: 
// Finds the required semester average score to reach a target CWA.
export const calcRequiredSemesterAvg = (
  targetCWA: number, 
  prevCWA: number, 
  prevCredits: number, 
  semesterCredits: number
): number | null => {
  if (semesterCredits <= 0) return null;
  
  const totalRequiredPoints = targetCWA * (prevCredits + semesterCredits);
  const prevPoints = prevCWA * prevCredits;
  const requiredSemesterPoints = totalRequiredPoints - prevPoints;
  
  const requiredAvg = requiredSemesterPoints / semesterCredits;
  
  return requiredAvg;
};

// Impact analysis
export const getHighestImpactCourse = (courses: Course[], currentCWA: number, prevCWA: number, prevCredits: number): { course: Course | null, dropEffect: number } => {
  const validCourses = courses.filter(c => c.credit > 0 && c.score >= 0);
  if (validCourses.length === 0) return { course: null, dropEffect: 0 };

  // Sort by credit (highest credit has highest impact on CWA)
  const sorted = [...validCourses].sort((a, b) => b.credit - a.credit);
  const highestImpact = sorted[0];

  // Calculate effect of a 5-point drop on this specific course
  const testCourses = courses.map(c => 
    c.id === highestImpact.id 
      ? { ...c, score: Math.max(0, c.score - 5) } 
      : c
  );

  const newAnalysisCWA = calcContinuingCWA(prevCWA, prevCredits, testCourses);
  const dropEffect = currentCWA - newAnalysisCWA;
  
  return { course: highestImpact, dropEffect };
};
