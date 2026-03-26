import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import LZString from 'lz-string';
import { Course, DegreeClass, calcSemesterMetrics, calcContinuingCWA, getClassFromCWA, calcRequiredSemesterAvg, getHighestImpactCourse } from '@/lib/cwa-engine';

export type StudentType = 'fresh' | 'continuing';

export interface Scenario {
  id: string;
  name: string;
  courses: Course[];
}

interface CalculatorState {
  studentType: StudentType;
  
  // Continuing student metrics
  prevCWA: number;
  prevCredits: number;
  
  // Current semester
  courses: Course[];
  
  // Features
  targetCWA: number | null;
  scenarios: Scenario[];
  isCalculated: boolean;
  
  // Actions
  setStudentType: (type: StudentType) => void;
  setPastMetrics: (cwa: number, credits: number) => void;
  
  addCourse: () => void;
  addMultipleCourses: (count: number) => void;
  updateCourse: (id: string, updates: Partial<Course>) => void;
  removeCourse: (id: string) => void;
  
  setTargetCWA: (target: number | null) => void;
  calculateCWA: () => void;
  
  saveScenario: (name: string) => void;
  loadScenario: (id: string) => void;
  deleteScenario: (id: string) => void;
  resetCalculator: () => void;
  
  exportShareableURL: () => string;
  loadFromShareableURL: (hash: string) => boolean;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

const defaultCourseList: Course[] = [
  { id: generateId(), name: '', credit: 3, score: NaN },
];

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set, get) => ({
      studentType: 'continuing',
      
      prevCWA: 0,
      prevCredits: 0,
      
      courses: [...defaultCourseList],
      
      targetCWA: null,
      scenarios: [],
      isCalculated: false,
      
      setStudentType: (type) => set({ studentType: type }),
      setPastMetrics: (prevCWA, prevCredits) => set({ prevCWA, prevCredits }),
      
      addCourse: () => set((state) => ({
        courses: [...state.courses, { id: generateId(), name: '', credit: 3, score: NaN }]
      })),
      
      addMultipleCourses: (count) => set((state) => {
        const newCourses = Array.from({ length: count }, () => ({
          id: generateId(),
          name: '',
          credit: 3,
          score: NaN
        }));
        return { courses: [...state.courses, ...newCourses] };
      }),
      
      updateCourse: (id, updates) => set((state) => ({
        courses: state.courses.map(c => c.id === id ? { ...c, ...updates } : c)
      })),
      
      removeCourse: (id) => set((state) => ({
        courses: state.courses.filter(c => c.id !== id)
      })),
      
      setTargetCWA: (target) => set({ targetCWA: target }),
      calculateCWA: () => set({ isCalculated: true }),
      
      saveScenario: (name) => set((state) => ({
        scenarios: [
          ...state.scenarios.filter(s => s.name !== name),
          { id: generateId(), name, courses: JSON.parse(JSON.stringify(state.courses)) }
        ]
      })),
      
      loadScenario: (id) => set((state) => ({
        courses: state.scenarios.find(s => s.id === id)?.courses || state.courses,
        isCalculated: true
      })),
      
      deleteScenario: (id) => set((state) => ({
        scenarios: state.scenarios.filter(s => s.id !== id)
      })),
      
      resetCalculator: () => set({
        courses: [{ id: generateId(), name: '', credit: 3, score: NaN }],
        isCalculated: false,
        targetCWA: null,
        prevCWA: 0,
        prevCredits: 0
      }),
      
      exportShareableURL: () => {
        const state = get();
        const payload = {
          t: state.studentType,
          pC: state.prevCWA,
          pCr: state.prevCredits,
          tgt: state.targetCWA,
          c: state.courses.map(c => ({ n: c.name, cr: c.credit, s: isNaN(c.score) ? null : c.score }))
        };
        const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(payload));
        return `${window.location.origin}${window.location.pathname}?share=${compressed}`;
      },
      
      loadFromShareableURL: (hash) => {
        try {
          const decompressed = LZString.decompressFromEncodedURIComponent(hash);
          if (!decompressed) return false;
          const data = JSON.parse(decompressed);
          
          set({
            studentType: data.t || 'continuing',
            prevCWA: data.pC || 0,
            prevCredits: data.pCr || 0,
            targetCWA: data.tgt || null,
            courses: Array.isArray(data.c) && data.c.length > 0 
              ? data.c.map((c: any) => ({
                  id: generateId(),
                  name: c.n || '',
                  credit: c.cr || 3,
                  score: c.s === null || c.s === undefined ? NaN : c.s
                })) 
              : [{ id: generateId(), name: '', credit: 3, score: NaN }],
            isCalculated: true
          });
          return true;
        } catch (e) {
          return false;
        }
      }
    }),
    {
      name: 'knust-cwa-storage',
      partialize: (state) => {
        const { isCalculated, ...persistedState } = state;
        return persistedState as CalculatorState;
      },
    })
);

// Derived selectors for UI components
export const useDerivedMetrics = () => {
  const store = useCalculatorStore();
  
  const semesterMetrics = calcSemesterMetrics(store.courses);
  const semCWA = semesterMetrics.cwa;
  
  const projectedCWA = store.studentType === 'continuing' 
    ? calcContinuingCWA(store.prevCWA, store.prevCredits, store.courses)
    : semCWA;
    
  const classification = getClassFromCWA(projectedCWA);
  
  const cwaDelta = store.studentType === 'continuing' && store.prevCredits > 0
    ? projectedCWA - store.prevCWA 
    : 0;

  const requiredScore = store.targetCWA
    ? calcRequiredSemesterAvg(store.targetCWA, store.prevCWA, store.prevCredits, semesterMetrics.totalCredits)
    : null;

  const impact = getHighestImpactCourse(store.courses, projectedCWA, store.prevCWA, store.prevCredits);

  return {
    semesterMetrics,
    semCWA,
    projectedCWA,
    classification,
    cwaDelta,
    requiredScore,
    impact,
    isContinuing: store.studentType === 'continuing'
  };
};
