import { useCalculatorStore, useDerivedMetrics } from '@/store/calculator-store';
import { Target, TrendingUp, Award, ArrowRight, AlertCircle, Save } from 'lucide-react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import { useEffect, useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ResultsPanel() {
  const { 
    isCalculated, 
    targetCWA, 
    setTargetCWA, 
    courses, 
    prevCWA, 
    prevCredits 
  } = useCalculatorStore();

  const { 
    projectedCWA, 
    classification, 
    cwaDelta, 
    semCWA,
    isContinuing,
    impact,
    requiredScore
  } = useDerivedMetrics();
  
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isCalculated) {
      const isSuccess = targetCWA !== null ? projectedCWA >= targetCWA : projectedCWA >= 70;
      if (isSuccess) {
        setShowConfetti(true);
        const timer = setTimeout(() => setShowConfetti(false), 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [isCalculated, projectedCWA, targetCWA]);

  return (
    <div className="bg-gradient-to-br from-primary-dark to-primary rounded-2xl p-6 lg:p-8 text-white shadow-ambient lg:sticky top-24">
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti width={width} height={height} recycle={false} numberOfPieces={400} />
        </div>
      )}
      
      <div className="text-primary-light text-xs font-bold tracking-widest uppercase mb-2">Projected CWA</div>
      
      <div className="flex items-baseline gap-4 mb-4">
        <div className="text-6xl md:text-7xl font-bold tracking-tight">
          {projectedCWA.toFixed(2)}
        </div>
        {isContinuing && cwaDelta !== 0 && (
          <div className={cn(
            "px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1",
            cwaDelta > 0 ? "bg-class-first-bg/20 text-green-100" : "bg-class-fail-bg/20 text-red-100"
          )}>
            {cwaDelta > 0 ? '+' : ''}{cwaDelta.toFixed(2)}
          </div>
        )}
      </div>

      <div className="mb-8">
        <span className={cn(
          "inline-flex px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide",
          classification.bg, classification.color
        )}>
          {classification.title}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm text-primary-light mb-2 font-medium">
            <span>Progress to 100</span>
            <span>{projectedCWA.toFixed(2)} / 100</span>
          </div>
          <div className="h-3 w-full bg-primary-dark/50 rounded-full overflow-hidden">
            <div 
              className={cn("h-full transition-all duration-1000 ease-out", classification.bg)}
              style={{ width: `${projectedCWA}%` }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center py-4 border-b border-primary-light/20">
          <span className="text-primary-light font-medium">Semester Only CWA</span>
          <span className="font-bold text-lg">{semCWA.toFixed(2)}</span>
        </div>

        {/* Impact Analysis Mini */}
        {impact.course && (
          <div className="py-4 border-b border-primary-light/20 text-sm">
            <div className="flex items-center gap-2 text-primary-light font-medium mb-2">
              <TrendingUp className="w-4 h-4" /> Highest Impact Course
            </div>
            <p className="font-semibold">{impact.course.name || 'Unnamed Course'}</p>
            <p className="text-primary-light mt-1 text-xs">
              If your score drops by 5 points, your CWA becomes {(projectedCWA - impact.dropEffect).toFixed(2)}
            </p>
          </div>
        )}

        {/* Target Mode Mini */}
        <div className="py-4">
          <div className="flex items-center gap-2 text-primary-light font-medium mb-3">
            <Target className="w-4 h-4" /> Target Mode
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              max="100"
              placeholder="Target CWA"
              value={targetCWA || ''}
              onChange={(e) => setTargetCWA(e.target.value ? parseFloat(e.target.value) : null)}
              className="w-1/2 bg-primary-dark/50 border border-primary-light/20 rounded-lg px-3 py-2 text-white placeholder:text-primary-light/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm"
            />
            {requiredScore !== null && (
              <div className="w-1/2 bg-primary-dark/30 rounded-lg p-2 flex items-center text-xs font-medium border border-primary-light/10">
                {requiredScore <= 100 && requiredScore >= 0 
                  ? `Need avg ${requiredScore.toFixed(0)} this sem` 
                  : requiredScore > 100 
                    ? <span className="text-red-200">Mathmatically impossible</span> 
                    : <span className="text-green-200">Target already secured</span>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
