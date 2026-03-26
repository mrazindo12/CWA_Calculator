import { useCalculatorStore } from '@/store/calculator-store';
import { Trash2, Plus, Calculator, ListPlus } from 'lucide-react';

export function CourseTable() {
  const { courses, addCourse, addMultipleCourses, updateCourse, removeCourse, isCalculated, calculateCWA } = useCalculatorStore();

  return (
    <div className="bg-surface rounded-2xl border border-surface-hover shadow-sm overflow-hidden mb-8">
      <div className="p-6 border-b border-surface-hover bg-background/50 flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Courses This Semester</h2>
          <p className="text-sm text-text-secondary mt-1">Enter your courses, credit hours and expected scores</p>
        </div>
        
        <button
          onClick={() => addMultipleCourses(6)}
          className="flex items-center gap-2 px-4 py-2 bg-surface-hover text-primary hover:bg-primary-light/30 transition-colors rounded-lg text-sm font-medium border border-transparent hover:border-primary-light/50"
          title="Quickly add 6 empty courses"
        >
          <ListPlus className="w-4 h-4" />
          Quick Add 6 Courses
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-surface border-b border-surface-hover">
              <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-widest w-[40%]">Course Name</th>
              <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-widest w-[15%]">Credit Hours</th>
              <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-widest w-[35%]">Expected Score</th>
              <th className="px-6 py-4 w-[10%]"></th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr 
                key={course.id} 
                className={`border-b border-surface-hover/50 transition-colors hover:bg-surface-hover/30 ${index % 2 === 0 ? 'bg-surface' : 'bg-surface-hover/20'}`}
              >
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, { name: e.target.value })}
                    placeholder={`e.g. Course ${index + 1}`}
                    className="w-full bg-transparent border-0 border-b-2 border-transparent focus:border-primary px-0 py-2 text-text-primary placeholder:text-text-secondary/50 focus:ring-0 transition-colors"
                  />
                </td>
                <td className="px-6 py-4">
                  <select
                    value={course.credit}
                    onChange={(e) => updateCourse(course.id, { credit: parseInt(e.target.value) })}
                    className="w-full bg-surface-hover/50 border border-surface-hover rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none"
                  >
                    {[1, 2, 3, 4, 5, 6].map(cr => (
                      <option key={cr} value={cr}>{cr}</option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4">
                  <div className="relative w-full sm:w-[140px]">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={course.score === null || Number.isNaN(course.score) ? '' : course.score}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        updateCourse(course.id, { score: isNaN(val) ? NaN : val });
                      }}
                      placeholder="85"
                      className="w-full bg-surface-hover/50 border border-surface-hover rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all pr-12 text-lg font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary font-medium text-sm">/ 100</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => removeCourse(course.id)}
                    disabled={courses.length === 1}
                    className="p-2 text-text-secondary hover:text-class-fail hover:bg-class-fail-bg rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-text-secondary"
                    aria-label="Remove course"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 bg-surface flex flex-col sm:flex-row gap-4">
        <button
          onClick={addCourse}
          className="flex items-center justify-center gap-2 flex-1 py-4 border-2 border-dashed border-primary-light text-primary hover:bg-primary-light/20 hover:border-primary transition-colors rounded-xl font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Course
        </button>
        
        {!isCalculated && (
          <button
            onClick={calculateCWA}
            className="flex items-center justify-center gap-2 flex-1 py-4 bg-primary text-white hover:bg-primary-dark transition-colors rounded-xl font-bold shadow-md hover:shadow-lg"
          >
            <Calculator className="w-5 h-5" />
            Calculate CWA
          </button>
        )}
      </div>
    </div>
  );
}
