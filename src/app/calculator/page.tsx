"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, Calculator } from "lucide-react";
import { StudentTypeToggle } from "@/components/StudentTypeToggle";
import { ContinuingStudentCard } from "@/components/ContinuingStudentCard";
import { CourseTable } from "@/components/CourseTable";
import { ResultsPanel } from "@/components/ResultsPanel";
import { ScenarioManager } from "@/components/ScenarioManager";
import { useCalculatorStore } from "@/store/calculator-store";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function CalculatorDashboard() {
  const isCalculated = useCalculatorStore((state) => state.isCalculated);
  const loadFromShareableURL = useCalculatorStore((state) => state.loadFromShareableURL);

  useEffect(() => {
    // Only run on the client
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const shareParam = params.get('share');
      if (shareParam) {
        const success = loadFromShareableURL(shareParam);
        if (success) {
          // Remove the query parameter without reloading the page
          const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
          window.history.replaceState({ path: newUrl }, '', newUrl);
        }
      }
    }
  }, [loadFromShareableURL]);

  return (
    <div className="min-h-screen bg-background pb-32 md:pb-8 flex flex-col relative overflow-hidden">
      {/* Decorative background */}
      <div className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full bg-primary-light/30 blur-[100px] pointer-events-none" />
      
      {/* Top Bar */}
      <nav className="w-full flex justify-between items-center px-4 md:px-8 py-4 backdrop-blur-md bg-surface/70 sticky top-0 z-40 border-b border-surface-hover shadow-sm">
        <div className="flex items-center gap-2">
          <Link href="/" className="p-2 -ml-2 text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="font-semibold text-lg text-text-primary tracking-tight hidden sm:block">
            KNUST <span className="text-primary">Predictor</span>
          </div>
        </div>
        
        <div className="flex-1 max-w-sm mx-4">
          <StudentTypeToggle />
        </div>
        
        <div className="flex items-center justify-end w-12 sm:w-[124px]">
          <ThemeToggle />
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 relative z-10 flex flex-col lg:flex-row gap-8">
        
        {/* Left Panel (Input Section) */}
        <div className="flex-1 lg:w-[65%] w-full min-w-0 flex flex-col gap-2 order-2 lg:order-1">
          <ContinuingStudentCard />
          <ScenarioManager />
          <CourseTable />
        </div>

        {/* Right Panel (Sticky Results Panel) */}
        <div className="w-full lg:w-[35%] lg:min-w-[400px] order-1 lg:order-2">
          {isCalculated ? (
            <ResultsPanel />
          ) : (
            <div className="bg-surface border border-surface-hover rounded-2xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[300px] lg:sticky top-24 shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                <Calculator className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">Ready to Project</h3>
              <p className="text-sm text-text-secondary">
                Enter your courses and expected scores, then click <strong className="text-text-primary">Calculate CWA</strong> below to see your real-time academic projection.
              </p>
            </div>
          )}
        </div>
        
      </main>
    </div>
  );
}
