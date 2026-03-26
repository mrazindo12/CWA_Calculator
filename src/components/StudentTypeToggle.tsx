import { useCalculatorStore } from '@/store/calculator-store';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function StudentTypeToggle() {
  const { studentType, setStudentType } = useCalculatorStore();

  return (
    <div className="flex bg-surface-hover p-1 rounded-full border border-surface-hover/80 shadow-inner max-w-sm mx-auto w-full relative">
      <div 
        className="absolute inset-y-1 left-1 w-[calc(50%-4px)] bg-primary shadow-sm rounded-full transition-transform duration-300 ease-in-out"
        style={{ transform: studentType === 'continuing' ? 'translateX(100%)' : 'translateX(0)' }}
      />
      <button
        onClick={() => setStudentType('fresh')}
        className={cn(
          "flex-1 py-2 text-sm font-semibold rounded-full relative z-10 transition-colors duration-300",
          studentType === 'fresh' ? "text-white" : "text-text-secondary hover:text-text-primary"
        )}
      >
        Fresh Student
      </button>
      <button
        onClick={() => setStudentType('continuing')}
        className={cn(
          "flex-1 py-2 text-sm font-semibold rounded-full relative z-10 transition-colors duration-300",
          studentType === 'continuing' ? "text-white" : "text-text-secondary hover:text-text-primary"
        )}
      >
        Continuing Student
      </button>
    </div>
  );
}
