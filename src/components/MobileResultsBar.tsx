import { useDerivedMetrics } from '@/store/calculator-store';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function MobileResultsBar() {
  const { projectedCWA, classification, cwaDelta, isContinuing } = useDerivedMetrics();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-surface to-surface-hover border-t border-surface-hover shadow-ambient px-6 py-4 md:hidden rounded-t-[24px]">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Projected CWA</span>
        <span className={cn(
          "px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider",
          classification.bg, classification.color
        )}>
          {classification.title}
        </span>
      </div>
      
      <div className="flex items-end gap-3">
        <div className="text-4xl font-bold tracking-tight text-text-primary leading-none">
          {projectedCWA.toFixed(2)}
        </div>
        
        {isContinuing && cwaDelta !== 0 && (
          <div className={cn(
            "text-sm font-semibold mb-0.5",
            cwaDelta > 0 ? "text-class-first" : "text-class-fail"
          )}>
            {cwaDelta > 0 ? '+' : ''}{cwaDelta.toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
}
