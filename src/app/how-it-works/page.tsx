"use client";

import Link from "next/link";
import { 
  ChevronLeft, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  Calculator, 
  TrendingUp, 
  Target, 
  GraduationCap,
  ArrowRight,
  MousePointerClick,
  FileText
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col font-sans">
      {/* Decorative background blur */}
      <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] rounded-full bg-primary-light/30 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-100/20 blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <nav className="w-full flex justify-between items-center px-6 py-6 md:px-12 backdrop-blur-md bg-surface/70 sticky top-0 z-50 border-b border-surface-hover/50">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-xl transition-all">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="font-semibold text-lg text-text-primary tracking-tight">
            How It <span className="text-primary">Works</span>
          </div>
        </div>
        <ThemeToggle />
      </nav>

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-16 relative z-10">
        
        {/* Why This Matters Section */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-red-100/50 rounded-lg text-red-600 dark:bg-red-500/10 dark:text-red-400">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-text-primary tracking-tight">Why This Matters</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-surface p-6 rounded-2xl border border-surface-hover shadow-sm hover:shadow-md transition-shadow">
              <p className="text-text-secondary leading-relaxed">
                Many students don’t know how their CWA is actually calculated until it&apos;s too late.
              </p>
            </div>
            <div className="bg-surface p-6 rounded-2xl border border-surface-hover shadow-sm hover:shadow-md transition-shadow">
              <p className="text-text-secondary leading-relaxed">
                It’s hard to predict final results accurately before exams without a proper tool.
              </p>
            </div>
            <div className="bg-surface p-6 rounded-2xl border border-surface-hover shadow-sm hover:shadow-md transition-shadow">
              <p className="text-text-secondary leading-relaxed">
                Small changes in scores can significantly affect your degree class (e.g. dropping from First Class).
              </p>
            </div>
            <div className="bg-surface p-6 rounded-2xl border border-surface-hover shadow-sm hover:shadow-md transition-shadow">
              <p className="text-text-secondary leading-relaxed">
                Many students only realize their mistakes after official results are released.
              </p>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-green-100/50 rounded-lg text-green-600 dark:bg-green-500/10 dark:text-green-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-text-primary tracking-tight">What This Tool Does</h2>
          </div>
          
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-hover/30 border border-surface-hover">
              <div className="mt-1 text-primary"><ArrowRight className="w-4 h-4" /></div>
              <p className="text-text-primary">Calculates your CWA instantly using KNUST’s official system.</p>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-hover/30 border border-surface-hover">
              <div className="mt-1 text-primary"><ArrowRight className="w-4 h-4" /></div>
              <p className="text-text-primary">Shows how each individual course affects your overall performance.</p>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-hover/30 border border-surface-hover">
              <div className="mt-1 text-primary"><ArrowRight className="w-4 h-4" /></div>
              <p className="text-text-primary">Helps you plan and adjust your expected scores based on your goals.</p>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-hover/30 border border-surface-hover">
              <div className="mt-1 text-primary"><ArrowRight className="w-4 h-4" /></div>
              <p className="text-text-primary">Lets you test different academic scenarios before the exam period.</p>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-text-primary tracking-tight">How to Use It</h2>
          </div>

          <div className="space-y-6">
            {[
              { 
                step: "Step 1", 
                title: "Select your student type", 
                desc: "Choose between Fresh or Continuing student to set the correct formula basis.",
                icon: <GraduationCap className="w-5 h-5 text-primary" />
              },
              { 
                step: "Step 2", 
                title: "Enter your academic details", 
                desc: "If continuing, input your current CWA and total credits completed so far.",
                icon: <FileText className="w-5 h-5 text-primary" />
              },
              { 
                step: "Step 3", 
                title: "Add your semester courses", 
                desc: "Input your credit hours and expected scores for all courses you are offering.",
                icon: <MousePointerClick className="w-5 h-5 text-primary" />
              },
              { 
                step: "Step 4", 
                title: "View your results instantly", 
                desc: "See your predicted CWA and classification (e.g. First Class) update in real-time.",
                icon: <Calculator className="w-5 h-5 text-primary" />
              },
              { 
                step: "Step 5", 
                title: "Experiment and improve", 
                desc: "Adjust scores to reach your target and save your best case scenarios.",
                icon: <TrendingUp className="w-5 h-5 text-primary" />
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-background z-10">
                    {i + 1}
                  </div>
                  {i < 4 && <div className="w-0.5 flex-1 bg-surface-hover group-hover:bg-primary/30 transition-colors" />}
                </div>
                <div className="pb-10 flex-1">
                  <div className="bg-surface p-6 rounded-2xl border border-surface-hover shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-2 mb-2">
                       <span className="text-xs font-bold text-primary uppercase tracking-widest">{item.step}</span>
                    </div>
                    <h3 className="text-xl font-bold text-text-primary mb-2 flex items-center gap-2">
                      {item.icon} {item.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Calculation Logic */}
        <section className="mb-24 overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-dark p-10 text-white shadow-ambient relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
             <Calculator className="w-32 h-32" />
          </div>
          
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 uppercase tracking-widest text-primary-light">How CWA Is Calculated</h2>
            <p className="text-lg text-white/90 mb-8 font-medium">
              Your CWA is calculated as a weighted average of your scores based on course credit hours.
            </p>
            
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20 inline-block shadow-inner">
              <span className="text-3xl md:text-4xl font-mono font-bold tracking-tighter">
                CWA = Σ(Score × Credit) / Σ(Credit)
              </span>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-24 text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-12 tracking-tight">What You Gain</h2>
          <div className="grid sm:grid-cols-2 gap-8 text-left">
            <div className="flex gap-4">
              <div className="p-2 h-fit rounded-lg bg-primary/10 text-primary">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-text-primary mb-1">Informed Decisions</h4>
                <p className="text-sm text-text-secondary">Make strategic choices about which courses need more attention based on weights.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="p-2 h-fit rounded-lg bg-primary/10 text-primary">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-text-primary mb-1">Avoid Surprises</h4>
                <p className="text-sm text-text-secondary">Know exactly where you stand before results are released to manage expectations.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="p-2 h-fit rounded-lg bg-primary/10 text-primary">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-text-primary mb-1">Strategic Focus</h4>
                <p className="text-sm text-text-secondary">Identify high-credit courses that impact your overall CWA the most.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="p-2 h-fit rounded-lg bg-primary/10 text-primary">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-text-primary mb-1">Plan for First Class</h4>
                <p className="text-sm text-text-secondary">Systematically work toward your goal of a First Class or a specific target average.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center py-16 bg-surface border border-surface-hover rounded-[2.5rem] shadow-ambient">
          <div className="inline-block p-3 rounded-full bg-primary-light/50 text-primary-dark mb-6">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h2 className="text-4xl font-bold text-text-primary mb-6 tracking-tight">Start Planning Your Results Today</h2>
          <p className="text-lg text-text-secondary mb-10 max-w-lg mx-auto leading-relaxed">
            Stop guessing and start predicting. Your academic success is just a few clicks away.
          </p>
          <Link 
            href="/calculator" 
            className="inline-flex items-center gap-2 bg-gradient-to-br from-primary to-primary-dark text-white px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-ambient hover:-translate-y-1 transition-all duration-300 transform active:scale-95"
          >
            Open CWA Calculator <ArrowRight className="w-6 h-6" />
          </Link>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-surface-hover py-8 px-6 mt-16 bg-surface">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4 text-sm text-text-secondary font-medium">
          <div>KNUST CWA Predictor</div>
          <div className="text-xs text-text-secondary/60">Designed for Students of Kwame Nkrumah University of Science and Technology</div>
        </div>
      </footer>
    </div>
  );
}
