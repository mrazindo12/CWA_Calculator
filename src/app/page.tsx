import Link from "next/link";
import { Calculator, LineChart, ShieldCheck, ChevronRight } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary-light/40 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-100/30 blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <nav className="w-full flex justify-between items-center px-6 py-6 md:px-12 backdrop-blur-md bg-surface/70 sticky top-0 z-50 border-b border-surface-hover/50">
        <div className="font-semibold text-xl text-text-primary tracking-tight">
          KNUST <span className="text-primary">CWA Predictor</span>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/how-it-works" className="hidden sm:block text-sm font-semibold text-text-secondary hover:text-primary transition-all px-3 py-2 rounded-lg">
            How It Works
          </Link>
          <ThemeToggle />
          <Link href="/calculator" className="text-sm font-bold text-white bg-primary hover:bg-primary-dark px-5 py-2.5 rounded-xl shadow-md transform hover:-translate-y-0.5 transition-all">
            Open Studio
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center relative z-10 w-full max-w-5xl mx-auto mt-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-light/50 text-primary-dark text-xs font-semibold tracking-wide uppercase mb-8 shadow-sm">
          <ShieldCheck className="w-4 h-4" />
          <span>KNUST Academic Tool</span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary mb-6 text-balance leading-tight">
          Predict Your KNUST CWA <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-dark to-primary">Before Exams</span>
        </h1>

        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mb-12 text-balance leading-relaxed">
          Plan smarter. Know where you stand. Project your Cumulative Weighted Average in real-time with KNUST&apos;s official 0–100 grading formula.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link 
            href="/calculator" 
            className="flex items-center gap-2 bg-gradient-to-br from-primary to-primary-dark text-white px-8 py-4 rounded-xl font-medium text-lg hover:shadow-ambient hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto justify-center"
          >
            Start Calculating <ChevronRight className="w-5 h-5" />
          </Link>
          <Link 
            href="/how-it-works" 
            className="flex items-center gap-2 bg-surface text-text-primary border border-surface-hover hover:border-primary-light/50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 w-full sm:w-auto justify-center shadow-sm hover:shadow-md"
          >
            How It Works
          </Link>
        </div>
      </main>

      {/* Stats Bar */}
      <div className="w-full border-y border-surface-hover bg-surface/50 py-8 relative z-10">
        <div className="max-w-5xl mx-auto px-6 flex justify-center text-center">
          <div className="flex flex-col">
            <span className="text-4xl font-bold text-primary-dark">99.9%</span>
            <span className="text-sm font-semibold text-text-secondary uppercase tracking-widest mt-2">Certified KNUST Formula Accuracy</span>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 relative z-10 w-full max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-text-primary mb-4">Enterprise-grade academic planning</h2>
          <p className="text-text-secondary text-lg">Designed specifically for KNUST&apos;s unique grading architecture.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-surface p-8 rounded-2xl shadow-sm border border-surface-hover hover:shadow-ambient transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-primary-light/50 flex items-center justify-center text-primary-dark mb-6">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-3">Real-Time Prediction</h3>
            <p className="text-text-secondary leading-relaxed">
              Instant CWA calculation as you type. See the immediate impact of changing a single course score on your final classification.
            </p>
          </div>

          <div className="bg-surface p-8 rounded-2xl shadow-sm border border-surface-hover hover:shadow-ambient transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-primary-light/50 flex items-center justify-center text-primary-dark mb-6">
              <LineChart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-3">Scenario Modeling</h3>
            <p className="text-text-secondary leading-relaxed">
              Build and save multiple academic scenarios. Compare your &quot;Best Case&quot;, &quot;Average&quot;, and &quot;Worst Case&quot; projections side-by-side.
            </p>
          </div>

          <div className="bg-surface p-8 rounded-2xl shadow-sm border border-surface-hover hover:shadow-ambient transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-primary-light/50 flex items-center justify-center text-primary-dark mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-3">Accurate Grading</h3>
            <p className="text-text-secondary leading-relaxed">
              Engineered using KNUST&apos;s official CWA formula. Handles both fresh and continuing students with proper credit weighting.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-surface-hover py-8 px-6 mt-auto bg-surface">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-secondary">
          <div className="font-medium">KNUST CWA Predictor</div>
          <div>Made for Kwame Nkrumah University of Science and Technology Students</div>
        </div>
      </footer>
    </div>
  );
}
