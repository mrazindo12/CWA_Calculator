import { useState } from 'react';
import { useCalculatorStore, useDerivedMetrics } from '@/store/calculator-store';
import { Save, FolderClock, Download, Trash2, RotateCcw, Share2, Check } from 'lucide-react';

export function ScenarioManager() {
  const { courses, scenarios, saveScenario, loadScenario, deleteScenario, resetCalculator, exportShareableURL } = useCalculatorStore();
  const { projectedCWA, classification, semCWA } = useDerivedMetrics();
  const [name, setName] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = () => {
    const url = exportShareableURL();
    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const exportCSV = () => {
    const lines = [];
    lines.push('KNUST CWA Projection');
    lines.push(`Date Exported,${new Date().toLocaleDateString()}`);
    lines.push(`Projected CWA,${projectedCWA.toFixed(2)}`);
    lines.push(`Semester CWA,${semCWA.toFixed(2)}`);
    lines.push(`Classification,${classification.title}`);
    lines.push('');
    
    lines.push('Course Name,Credit Hours,Expected Score');
    courses.forEach(c => {
      lines.push(`"${c.name || 'Unnamed Course'}",${c.credit},${c.score}`);
    });
    
    const csvContent = lines.join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `knust-cwa-projection-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="bg-surface rounded-2xl p-6 border border-surface-hover shadow-sm mb-6 flex flex-col md:flex-row gap-6 items-center justify-between">
      <div className="w-full md:w-1/2">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-3 flex items-center gap-2">
          <FolderClock className="w-4 h-4" /> Scenario Planning
        </h2>
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="e.g. Best Case"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 min-w-[140px] bg-surface-hover/50 border border-surface-hover rounded-xl px-4 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          <button
            onClick={() => {
              if (name.trim()) {
                saveScenario(name.trim());
                setName('');
              }
            }}
            disabled={!name.trim()}
            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
          >
            <Save className="w-4 h-4" /> Save
          </button>
          
          <button
            onClick={exportCSV}
            className="bg-surface border border-surface-hover hover:border-primary text-text-primary px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
            title="Export as CSV"
          >
            <Download className="w-4 h-4" /> Export
          </button>
          
          <button
            onClick={handleShare}
            className="bg-surface border border-surface-hover hover:border-primary text-text-primary px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
            title="Share Scenario via URL"
          >
            {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
            {isCopied ? "Copied!" : "Share"}
          </button>
          
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to clear all your current data to start a new scenario?')) {
                resetCalculator();
              }
            }}
            className="bg-surface border border-surface-hover hover:border-class-fail hover:text-class-fail text-text-primary px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
            title="Clear Everything"
          >
            <RotateCcw className="w-4 h-4" /> Clear All
          </button>
        </div>
      </div>

      {scenarios.length > 0 && (
        <div className="w-full md:w-1/2">
          <h2 className="text-xs font-medium text-text-secondary mb-2 uppercase tracking-wider">Saved Scenarios</h2>
          <div className="flex flex-wrap gap-2">
            {scenarios.map((s) => (
              <div key={s.id} className="flex items-center group bg-surface border border-surface-hover hover:border-primary/50 hover:shadow-sm rounded-lg overflow-hidden transition-all">
                <button
                  onClick={() => loadScenario(s.id)}
                  className="px-3 py-1.5 text-text-primary text-sm font-medium hover:bg-surface-hover/50 transition-colors"
                >
                  {s.name}
                </button>
                <button
                  onClick={() => deleteScenario(s.id)}
                  className="px-2 py-1.5 text-text-secondary hover:text-class-fail hover:bg-class-fail-bg/50 transition-colors border-l border-surface-hover"
                  title="Delete Scenario"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
