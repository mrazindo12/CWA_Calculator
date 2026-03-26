import { useCalculatorStore } from '@/store/calculator-store';

export function ContinuingStudentCard() {
  const { studentType, prevCWA, prevCredits, setPastMetrics } = useCalculatorStore();

  if (studentType !== 'continuing') return null;

  return (
    <div className="bg-surface rounded-2xl p-6 border border-surface-hover shadow-sm mb-6 animate-in fade-in slide-in-from-top-4 duration-300">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-4">Your Current Academic Standing</h2>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-text-primary mb-1.5">Current CWA</label>
          <div className="relative">
            <input 
              type="number" 
              min="0" 
              max="100" 
              step="0.01"
              value={prevCWA === null || Number.isNaN(prevCWA) ? '' : prevCWA}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setPastMetrics(isNaN(val) ? NaN : val, prevCredits);
              }}
              placeholder="e.g. 65.00"
              className="w-full bg-surface-hover/50 border border-surface-hover rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all pr-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary font-medium">/ 100</span>
          </div>
          <p className="text-xs text-text-secondary mt-2">Enter CWA between 0–100</p>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-text-primary mb-1.5">Total Credits Completed</label>
          <input 
            type="number" 
            min="0"
            value={prevCredits === null || Number.isNaN(prevCredits) ? '' : prevCredits}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setPastMetrics(prevCWA, isNaN(val) ? NaN : val);
            }}
            placeholder="e.g. 90"
            className="w-full bg-surface-hover/50 border border-surface-hover rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </div>
    </div>
  );
}
