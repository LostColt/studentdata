import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Menu,
  X,
  Sparkles,
  GraduationCap,
  Globe,
  Quote,
  Layers,
  Boxes,
  Compass,
  Code,
  BookOpen,
  Scroll,
  ExternalLink,
  Target,
  Bot,
  Wand2,
  MonitorPlay,
  Eye,
  Telescope,
  Orbit,
  Atom,
  LayoutGrid,
  Copy,
  AppWindow,
  Terminal,
  CheckCircle2,
  Users,
  Rocket,
  ArrowRight,
  Lightbulb,
  ShieldCheck,
  QrCode,
  Heart,
  GitBranch,
  CloudUpload,
  Share2,
  Workflow,
  Sparkle
} from 'lucide-react';

interface PresentationProps {
  onToggleDashboard?: () => void;
}

export default function Presentation({ onToggleDashboard }: PresentationProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const totalSlides = 13;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'Home') {
        setCurrentSlide(0);
      } else if (e.key === 'End') {
        setCurrentSlide(totalSlides - 1);
      } else if (e.key.toLowerCase() === 'f') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  const handleCopyPrompt = (promptText: string, label: string) => {
    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(label);
    setTimeout(() => setCopiedPrompt(null), 2500);
  };

  const slideTitles = [
    "Title Slide: From Consumer to Creator",
    "1. Overnight EdTech Innovators",
    "2. App Overload & Subscription Fatigue",
    "3. Stepping Into the Unknown",
    "4. Experiment 1: Scrollytelling",
    "5. Teacher Activity 1: The One-Stop Shop",
    "6. Visual Learning: Awe & Wonder",
    "7. Experiment 2: Black Hole Simulation",
    "8. Becoming the Builder: Padlet Clone",
    "9. Teacher Activity 2: Clone OR Create Your App",
    "10. Deployment Blueprint: GitHub & Netlify/Vercel",
    "11. Conclusion: Building What You Envision",
    "12. Feedback Form & Attendance QR Code"
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between select-none overflow-x-hidden font-sans">
      
      {/* Top Bar Header */}
      <header className="relative z-30 flex items-center justify-between px-6 py-4 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-black text-base shadow-md shadow-amber-400/20">
            GP
          </div>
          <div>
            <h1 className="text-base md:text-lg font-bold tracking-wide text-slate-100 font-['Montserrat']">
              GULLIVER PREP <span className="text-amber-400 font-normal">| GSET WORKSHOP</span>
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">From Consumer to Creator: A Teacher's Guide to Google AI Studio</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {onToggleDashboard && (
            <button
              onClick={onToggleDashboard}
              className="text-xs md:text-sm px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition border border-slate-700"
            >
              Student Dashboard View
            </button>
          )}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 text-xs md:text-sm px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold transition border border-slate-700"
          >
            <Menu className="w-4 h-4" />
            <span className="hidden md:inline">Slide Directory ({currentSlide + 1}/{totalSlides})</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition border border-slate-700"
            title="Toggle Fullscreen (F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Slide Drawer Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-16 right-6 z-40 w-80 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl p-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <h3 className="text-xs font-bold text-amber-400 tracking-wider uppercase">Jump to Slide</h3>
            <button onClick={() => setIsMenuOpen(false)} className="text-slate-400 hover:text-slate-200">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
            {slideTitles.map((title, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentSlide(idx);
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left text-xs px-3 py-2 rounded-lg transition flex items-center justify-between ${
                  currentSlide === idx
                    ? 'bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-slate-100'
                }`}
              >
                <span className="truncate">{title}</span>
                {currentSlide === idx && <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Slide Canvas */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8 max-w-7xl mx-auto w-full relative z-10">
        
        {/* SLIDE 0: TITLE SLIDE */}
        {currentSlide === 0 && (
          <div className="w-full h-full min-h-[580px] md:min-h-[660px] bg-gradient-to-br from-slate-900 via-[#001F3F] to-slate-950 rounded-3xl border border-slate-800 shadow-2xl p-8 md:p-14 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-sm font-semibold tracking-widest uppercase">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Gulliver Prep GSET Workshop Presentation
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-50 tracking-tight leading-tight font-['Montserrat'] max-w-5xl">
                From Consumer to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">Creator</span>
              </h1>
              <p className="text-2xl md:text-3xl font-medium text-amber-300/90 font-['Playfair_Display'] italic max-w-3xl">
                A Teacher's Guide to Google AI Studio
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h4 className="text-base md:text-lg font-bold text-slate-100">Pedagogical Shift</h4>
                <p className="text-sm text-slate-400 leading-relaxed">Moving teachers from software consumers to AI architects.</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
                  <Code className="w-6 h-6" />
                </div>
                <h4 className="text-base md:text-lg font-bold text-slate-100">Zero Code Barriers</h4>
                <p className="text-sm text-slate-400 leading-relaxed">Natural language prompting as the new building language.</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
                  <Wand2 className="w-6 h-6" />
                </div>
                <h4 className="text-base md:text-lg font-bold text-slate-100">Experiential Tech</h4>
                <p className="text-sm text-slate-400 leading-relaxed">Creating awe, wonder, and memorable learning tools.</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-800/80 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span className="font-medium">Gulliver Prep Educational Technology (GSET)</span>
              </div>
              <button 
                onClick={nextSlide}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-base transition shadow-xl shadow-amber-400/20"
              >
                Begin Presentation <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* SLIDE 1: OVERNIGHT EDTECH INNOVATORS */}
        {currentSlide === 1 && (
          <div className="w-full h-full min-h-[580px] md:min-h-[660px] bg-slate-900 rounded-3xl border border-slate-800 p-8 md:p-12 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div>
                <span className="text-sm font-bold text-amber-400 uppercase tracking-widest">THE PEDAGOGICAL SHIFT</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-50 font-['Montserrat'] mt-1">Overnight EdTech Innovators</h2>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800 text-amber-400 border border-slate-700">
                <Globe className="w-8 h-8" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-auto py-6">
              <div className="bg-slate-950/70 rounded-2xl p-8 border border-slate-800 space-y-6">
                <h3 className="text-xl md:text-2xl font-bold text-slate-100 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  The COVID-19 Acceleration
                </h3>
                <ul className="space-y-4 text-base md:text-lg text-slate-200 leading-relaxed font-medium">
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400 font-bold text-xl">•</span>
                    <span><strong className="text-amber-300 font-semibold">Forced Overnight Mastery:</strong> Teachers instantly became experts in Google Classroom, Teams, Zoom, Meet, and Skype.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400 font-bold text-xl">•</span>
                    <span><strong className="text-amber-300 font-semibold">Continuous Digital Sharing:</strong> Lessons evolved into rapid sharing of Docs, PDFs, slides, and video links.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400 font-bold text-xl">•</span>
                    <span><strong className="text-amber-300 font-semibold">The Digital Return:</strong> Returning to physical spaces meant join codes, QR codes, and constant presentations.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#001F3F] to-slate-950 rounded-2xl p-8 border border-amber-400/40 flex flex-col justify-between relative overflow-hidden shadow-xl">
                <Quote className="w-16 h-16 text-amber-400/20 absolute top-6 right-6" />
                <div className="space-y-6 relative z-10">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">CORE PEDAGOGICAL INSIGHT</span>
                  <blockquote className="text-xl md:text-2xl lg:text-3xl font-medium text-slate-50 italic font-['Playfair_Display'] leading-relaxed">
                    "We didn't just adopt technology—we survived and adapted through it. Every teacher proved they could master complex digital tools under pressure."
                  </blockquote>
                </div>
                <div className="pt-6 border-t border-amber-400/30 text-sm md:text-base text-amber-300 font-bold">
                  Now, the challenge shifts from survival to intentional creation.
                </div>
              </div>
            </div>

            <div className="text-sm text-slate-500 flex justify-between pt-4 border-t border-slate-800">
              <span>Gulliver Prep GSET Workshop</span>
              <span className="font-mono">Slide 2 of 13</span>
            </div>
          </div>
        )}

        {/* SLIDE 2: APP OVERLOAD */}
        {currentSlide === 2 && (
          <div className="w-full h-full min-h-[580px] md:min-h-[660px] bg-slate-900 rounded-3xl border border-slate-800 p-8 md:p-12 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div>
                <span className="text-sm font-bold text-amber-400 uppercase tracking-widest">SUBSCRIPTION FATIGUE</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-50 font-['Montserrat'] mt-1">The Search for Tangible Tech</h2>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800 text-amber-400 border border-slate-700">
                <Layers className="w-8 h-8" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto py-6">
              <div className="bg-slate-950/70 rounded-2xl p-7 border border-slate-800 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mb-3">
                  <Boxes className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-100">App Accumulation</h3>
                <p className="text-base text-slate-300 leading-relaxed font-medium">
                  Collecting tool after tool and subscription after subscription, creating fragmented logins and software overhead.
                </p>
              </div>

              <div className="bg-slate-950/70 rounded-2xl p-7 border border-amber-400/50 space-y-4 shadow-xl shadow-amber-400/5">
                <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center mb-3">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-50">The Search for Unity</h3>
                <p className="text-base text-slate-200 leading-relaxed font-medium">
                  Searching for a single flexible "one-stop shop" platform that can replace disparate apps and simplify tech stack.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#001F3F] to-slate-950 rounded-2xl p-7 border border-amber-400/60 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center mb-3 font-bold">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-amber-300">Tangible Experience</h3>
                <p className="text-base text-slate-100 leading-relaxed font-medium">
                  Moving beyond flat slideshows. Seeking technology that feels tangible—offering immersive, tactile student experiences.
                </p>
              </div>
            </div>

            <div className="text-sm text-slate-500 flex justify-between pt-4 border-t border-slate-800">
              <span>Gulliver Prep GSET Workshop</span>
              <span className="font-mono">Slide 3 of 13</span>
            </div>
          </div>
        )}

        {/* SLIDE 3: STEPPING INTO THE UNKNOWN */}
        {currentSlide === 3 && (
          <div className="w-full h-full min-h-[580px] md:min-h-[660px] bg-slate-900 rounded-3xl border border-slate-800 p-8 md:p-12 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div>
                <span className="text-sm font-bold text-amber-400 uppercase tracking-widest">DISCOVERING GOOGLE AI STUDIO</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-50 font-['Montserrat'] mt-1">Stepping Into the Unknown</h2>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800 text-amber-400 border border-slate-700">
                <Compass className="w-8 h-8" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-auto py-6">
              <div className="bg-slate-950/70 rounded-2xl p-8 border border-slate-800 space-y-5">
                <h3 className="text-xl md:text-2xl font-bold text-slate-100 flex items-center gap-3">
                  <Lightbulb className="w-6 h-6 text-amber-400" />
                  The Desire to Create
                </h3>
                <p className="text-base md:text-lg text-slate-200 leading-relaxed font-medium">
                  When I discovered Google AI Studio, the aim was that I wanted to create something. I didn't know what yet, but I knew I wanted interactive, high-impact learning experiences for my students.
                </p>
              </div>

              <div className="bg-slate-950/90 rounded-2xl p-8 border border-amber-400/40 space-y-6 shadow-xl">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">THE FEAR FACTOR</span>
                <blockquote className="text-xl md:text-2xl font-medium text-slate-100 italic font-['Playfair_Display'] leading-relaxed">
                  "Truth be told, I was scared because I didn't have a technology background."
                </blockquote>
                <div className="p-5 rounded-xl bg-blue-950/50 border border-blue-800/50 text-sm md:text-base text-blue-200 space-y-2">
                  <span className="font-extrabold text-blue-400 block uppercase tracking-wider">Breakthrough Insight</span>
                  <p className="leading-relaxed">AI Studio removes technical syntax barriers. Natural language prompting becomes your code.</p>
                </div>
              </div>
            </div>

            <div className="text-sm text-slate-500 flex justify-between pt-4 border-t border-slate-800">
              <span>Gulliver Prep GSET Workshop</span>
              <span className="font-mono">Slide 4 of 13</span>
            </div>
          </div>
        )}

        {/* SLIDE 4: EXPERIMENT 1 - SCROLLYTELLING */}
        {currentSlide === 4 && (
          <div className="w-full h-full min-h-[580px] md:min-h-[660px] bg-slate-900 rounded-3xl border border-slate-800 p-8 md:p-12 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div>
                <span className="text-sm font-bold text-amber-400 uppercase tracking-widest">SCROLLYTELLING DEMO</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-50 font-['Montserrat'] mt-1">Experiment 1: Literature in Motion</h2>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800 text-amber-400 border border-slate-700">
                <BookOpen className="w-8 h-8" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-auto py-6">
              <div className="bg-slate-950/70 rounded-2xl p-8 border border-slate-800 space-y-4">
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-100">Tim O'Brien's <em>The Things They Carried</em></h3>
                <ul className="space-y-4 text-base md:text-lg text-slate-200 leading-relaxed font-medium">
                  <li><strong className="text-amber-300">• Scrollytelling Concept:</strong> As the reader scrolls, elements on screen animate and shift to unpack narrative depth.</li>
                  <li><strong className="text-amber-300">• Prompting AI Studio:</strong> Asked AI Studio to build an HTML site explaining the emotional & physical weight of objects in the novel.</li>
                  <li><strong className="text-amber-300">• Result:</strong> Generated a dynamic, fluid web experience in minutes without manual coding.</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#001F3F] to-slate-950 rounded-2xl p-8 border border-amber-400/50 flex flex-col justify-between shadow-xl">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">EXPLORE LIVE DEMO</span>
                  <h4 className="text-lg font-bold text-slate-100">Experience the Scrollytelling Prototype</h4>
                  <p className="text-sm text-slate-300">Interactive literary web experience explaining classic literature.</p>
                </div>
                <a
                  href="https://scrollytell.netlify.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-base transition shadow-xl shadow-amber-400/20"
                >
                  Open scrollytell.netlify.app <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="text-sm text-slate-500 flex justify-between pt-4 border-t border-slate-800">
              <span>Gulliver Prep GSET Workshop</span>
              <span className="font-mono">Slide 5 of 13</span>
            </div>
          </div>
        )}

        {/* SLIDE 5: TEACHER ACTIVITY 1 */}
        {currentSlide === 5 && (
          <div className="w-full h-full min-h-[580px] md:min-h-[660px] bg-slate-900 rounded-3xl border border-slate-800 p-8 md:p-12 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div>
                <span className="text-sm font-bold text-amber-400 uppercase tracking-widest">HANDS-ON BUILDING SESSION</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-50 font-['Montserrat'] mt-1">Activity 1: The One-Stop Shop</h2>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800 text-amber-400 border border-slate-700">
                <Wand2 className="w-8 h-8" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
              <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800 space-y-1">
                <span className="text-xl font-black text-amber-400 font-['Montserrat']">01</span>
                <h4 className="text-sm font-bold text-slate-100">Select Concept</h4>
                <p className="text-xs text-slate-400">Identify a topic you are teaching.</p>
              </div>

              <div className="bg-slate-950/70 rounded-xl p-4 border border-amber-400/40 space-y-1">
                <span className="text-xl font-black text-amber-400 font-['Montserrat']">02</span>
                <h4 className="text-sm font-bold text-slate-100">Gemini Prompt</h4>
                <p className="text-xs text-slate-400">Open Gemini to refine your prompt.</p>
              </div>

              <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800 space-y-1">
                <span className="text-xl font-black text-amber-400 font-['Montserrat']">03</span>
                <h4 className="text-sm font-bold text-slate-100">AI Generation</h4>
                <p className="text-xs text-slate-400">Ask AI Studio to create HTML page.</p>
              </div>

              <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800 space-y-1">
                <span className="text-xl font-black text-amber-400 font-['Montserrat']">04</span>
                <h4 className="text-sm font-bold text-slate-100">Share Screen</h4>
                <p className="text-xs text-slate-400">Share & showcase with peers.</p>
              </div>
            </div>

            <div className="bg-slate-950/90 rounded-2xl border-2 border-amber-400 p-6 md:p-8 my-2 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Terminal className="w-4 h-4" /> Example Prompt for AI Studio
                  </div>
                  <span className="text-xs text-slate-400 hidden sm:inline">Use this prompt structure to build your scrollytelling page</span>
                </div>
                <button
                  onClick={() => handleCopyPrompt(
                    "Create an interactive, engaging scrollytelling HTML page for a high school literature lesson on Tim O'Brien's 'The Things They Carried'. As the user scrolls down, animate visual cards that unpack the physical and emotional weight of each item carried by the soldiers. Include clear section headers, modern typography, and smooth CSS transitions.",
                    "activity1"
                  )}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 text-xs font-bold transition"
                >
                  <Copy className="w-4 h-4" />
                  {copiedPrompt === "activity1" ? "Prompt Copied!" : "Copy Example Prompt"}
                </button>
              </div>

              <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 text-amber-300 font-['Fira_Code'] font-normal text-base md:text-lg leading-relaxed select-text">
                "Create an interactive, engaging scrollytelling HTML page for a lesson concept. As the user scrolls down, animate visual cards that unpack key narrative ideas with clean CSS transitions, high-contrast typography, and zero external frameworks."
              </div>
            </div>

            <div className="text-sm text-slate-500 flex justify-between pt-4 border-t border-slate-800">
              <span>Gulliver Prep GSET Workshop</span>
              <span className="font-mono">Slide 6 of 13</span>
            </div>
          </div>
        )}

        {/* SLIDE 6: VISUAL LEARNING - AWE & WONDER */}
        {currentSlide === 6 && (
          <div className="w-full h-full min-h-[580px] md:min-h-[660px] bg-slate-900 rounded-3xl border border-slate-800 p-8 md:p-12 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div>
                <span className="text-sm font-bold text-amber-400 uppercase tracking-widest">PEDAGOGICAL PHILOSOPHY</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-50 font-['Montserrat'] mt-1">The Power of Visual Learning</h2>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800 text-amber-400 border border-slate-700">
                <Telescope className="w-8 h-8" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-auto py-6">
              <div className="bg-slate-950/70 rounded-2xl p-8 border border-slate-800 space-y-4">
                <h3 className="text-xl md:text-2xl font-bold text-slate-100">Fascination Over Fear</h3>
                <ul className="space-y-4 text-base md:text-lg text-slate-200 leading-relaxed font-medium">
                  <li><strong className="text-amber-300">• Visual Learner Identity:</strong> I love videos and visual models that bring complex ideas to life.</li>
                  <li><strong className="text-amber-300">• Childhood Connection:</strong> As a kid, black holes were terrifying. Watching <em>Interstellar</em> changed everything—revealing the beauty of a central force pulling everything together.</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#001F3F] to-slate-950 rounded-2xl p-8 border border-amber-400/50 flex flex-col justify-center space-y-6 shadow-xl">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">CREATING AWE & WONDER</span>
                <blockquote className="text-xl md:text-2xl lg:text-3xl font-medium text-slate-50 italic font-['Playfair_Display'] leading-relaxed">
                  "When creating edtech, it is not so much about being clean or corporate. It is about creating something memorable—something that evokes awe and wonder in students."
                </blockquote>
              </div>
            </div>

            <div className="text-sm text-slate-500 flex justify-between pt-4 border-t border-slate-800">
              <span>Gulliver Prep GSET Workshop</span>
              <span className="font-mono">Slide 7 of 13</span>
            </div>
          </div>
        )}

        {/* SLIDE 7: EXPERIMENT 2 - BLACK HOLE SIMULATION */}
        {currentSlide === 7 && (
          <div className="w-full h-full min-h-[580px] md:min-h-[660px] bg-slate-900 rounded-3xl border border-slate-800 p-8 md:p-12 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div>
                <span className="text-sm font-bold text-amber-400 uppercase tracking-widest">INTERACTIVE SIMULATION</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-50 font-['Montserrat'] mt-1">Experiment 2: Visualizing the Impossible</h2>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800 text-amber-400 border border-slate-700">
                <Orbit className="w-8 h-8" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-auto py-6">
              <div className="bg-slate-950/70 rounded-2xl p-8 border border-slate-800 space-y-4">
                <h3 className="text-xl md:text-2xl font-bold text-slate-100">Interactive 3D Black Hole</h3>
                <ul className="space-y-4 text-base md:text-lg text-slate-200 leading-relaxed font-medium">
                  <li><strong className="text-amber-300">• Prompting AI Studio:</strong> "Make a visualization of a black hole and animate it in an HTML file."</li>
                  <li><strong className="text-amber-300">• Result:</strong> Real-time particle simulation rendered in browser canvas.</li>
                  <li><strong className="text-amber-300">• Pedagogical Impact:</strong> Turns abstract astronomical concepts into a tactile visual experience.</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#001F3F] to-slate-950 rounded-2xl p-8 border border-amber-400/50 flex flex-col justify-between shadow-xl">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">EXPLORE LIVE DEMO</span>
                  <h4 className="text-lg font-bold text-slate-100">Inspect 3D Black Hole Canvas</h4>
                  <p className="text-sm text-slate-300">Interactive WebGL / HTML Canvas Physics Demo.</p>
                </div>
                <a
                  href="https://blackholedemo.netlify.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-base transition shadow-xl shadow-amber-400/20"
                >
                  Open blackholedemo.netlify.app <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="text-sm text-slate-500 flex justify-between pt-4 border-t border-slate-800">
              <span>Gulliver Prep GSET Workshop</span>
              <span className="font-mono">Slide 8 of 13</span>
            </div>
          </div>
        )}

        {/* SLIDE 8: BECOMING THE BUILDER - PADLET CLONE */}
        {currentSlide === 8 && (
          <div className="w-full h-full min-h-[580px] md:min-h-[660px] bg-slate-900 rounded-3xl border border-slate-800 p-8 md:p-12 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div>
                <span className="text-sm font-bold text-amber-400 uppercase tracking-widest">APP CLONING DEMO</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-50 font-['Montserrat'] mt-1">Becoming the Builder: Cloning Padlet</h2>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800 text-amber-400 border border-slate-700">
                <LayoutGrid className="w-8 h-8" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-auto py-6">
              <div className="bg-slate-950/70 rounded-2xl p-8 border border-slate-800 space-y-4">
                <h3 className="text-xl md:text-2xl font-bold text-slate-100">Shifting Mindsets: Consumer to Builder</h3>
                <ul className="space-y-4 text-base md:text-lg text-slate-200 leading-relaxed font-medium">
                  <li><strong className="text-amber-300">• The Experiment:</strong> "I didn't have tech skills, but I wanted to know if I could copy a commercial app."</li>
                  <li><strong className="text-amber-300">• Prompting AI Studio:</strong> "Make a clone of Padlet."</li>
                  <li><strong className="text-amber-300">• Result:</strong> Functional collaborative digital board built without subscription fees.</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#001F3F] to-slate-950 rounded-2xl p-8 border border-amber-400/50 flex flex-col justify-between shadow-xl">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">EXPLORE LIVE DEMO</span>
                  <h4 className="text-lg font-bold text-slate-100">Inspect Functional Padlet Web Clone</h4>
                  <p className="text-sm text-slate-300">Interactive web application built with AI Studio.</p>
                </div>
                <a
                  href="https://pdlt.netlify.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-base transition shadow-xl shadow-amber-400/20"
                >
                  Open pdlt.netlify.app <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="text-sm text-slate-500 flex justify-between pt-4 border-t border-slate-800">
              <span>Gulliver Prep GSET Workshop</span>
              <span className="font-mono">Slide 9 of 13</span>
            </div>
          </div>
        )}

        {/* SLIDE 9: TEACHER ACTIVITY 2 (SCAFFOLDING FRAMEWORK: CLONE OR CREATE + 3 STAGES) */}
        {currentSlide === 9 && (
          <div className="w-full h-full min-h-[580px] md:min-h-[660px] bg-slate-900 rounded-3xl border border-slate-800 p-8 md:p-12 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-sm font-bold text-amber-400 uppercase tracking-widest">HANDS-ON BUILDER WORKSHOP</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-50 font-['Montserrat'] mt-1">Activity 2: Clone OR Create Your App</h2>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800 text-amber-400 border border-slate-700">
                <AppWindow className="w-8 h-8" />
              </div>
            </div>

            {/* 2 Track Choice Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-2">
              <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-400/10 text-amber-300 text-xs font-bold uppercase">
                  Track A: Clone an Existing App
                </div>
                <h4 className="text-base font-bold text-slate-100">Pick a Tool You Use Daily</h4>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  Padlet, Quizlet flashcards, classroom timer, spinner wheel, exit ticket form.
                </p>
              </div>

              <div className="bg-slate-950/80 rounded-2xl p-6 border border-amber-400/30 space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-400 text-slate-950 text-xs font-extrabold uppercase">
                  Track B: Create Your Custom Tool
                </div>
                <h4 className="text-base font-bold text-slate-100">Use Gemini to Refine Your Prompt</h4>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  Tell Gemini: <em>"Help me write a detailed prompt for Google AI Studio to build an app for..."</em>
                </p>
              </div>
            </div>

            {/* 3-Stage Thinking Framework Bar */}
            <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 my-2">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xs shrink-0">1</div>
                <div>
                  <h5 className="text-xs font-bold text-slate-200">The Shape (Wireframe)</h5>
                  <p className="text-[11px] text-slate-400">What does it look like on screen?</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xs shrink-0">2</div>
                <div>
                  <h5 className="text-xs font-bold text-slate-200">The Logic (Action)</h5>
                  <p className="text-[11px] text-slate-400">What happens when a student clicks?</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xs shrink-0">3</div>
                <div>
                  <h5 className="text-xs font-bold text-slate-200">The Content (Lesson)</h5>
                  <p className="text-[11px] text-slate-400">Insert your subject matter!</p>
                </div>
              </div>
            </div>

            {/* Prominent Example Prompt Card */}
            <div className="bg-slate-950/90 rounded-2xl border-2 border-amber-400 p-5 md:p-6 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">Example Prompt for AI Studio</span>
                </div>
                <button
                  onClick={() => handleCopyPrompt(
                    "Build a single-file functional web application clone of Padlet in HTML, CSS, and JavaScript. Allow users to post notes to a digital bulletin board with custom colors, text editing, and clean responsive layout.",
                    "activity2"
                  )}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 text-xs font-bold transition"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copiedPrompt === "activity2" ? "Copied!" : "Copy Prompt"}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-amber-300 font-['Fira_Code'] text-sm md:text-base leading-relaxed select-text">
                "Build a single-file functional web application clone of Padlet in HTML, CSS, and JavaScript. Allow users to post notes to a digital bulletin board with custom colors, text editing, and clean responsive layout."
              </div>
            </div>

            <div className="text-sm text-slate-500 flex justify-between pt-3 border-t border-slate-800">
              <span>Gulliver Prep GSET Workshop</span>
              <span className="font-mono">Slide 10 of 13</span>
            </div>
          </div>
        )}

        {/* SLIDE 10: NEW DEPLOYMENT BLUEPRINT (GITHUB & NETLIFY/VERCEL) */}
        {currentSlide === 10 && (
          <div className="w-full h-full min-h-[580px] md:min-h-[660px] bg-slate-900 rounded-3xl border border-slate-800 p-8 md:p-12 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div>
                <span className="text-sm font-bold text-amber-400 uppercase tracking-widest">DEPLOYMENT BLUEPRINT</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-50 font-['Montserrat'] mt-1">From Prototype to Live Link</h2>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800 text-amber-400 border border-slate-700">
                <Workflow className="w-8 h-8" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto py-6">
              
              {/* Step 1 */}
              <div className="bg-slate-950/70 rounded-2xl p-7 border border-slate-800 space-y-4 relative">
                <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
                  <Code className="w-5 h-5 text-amber-400" /> Export Code
                </h3>
                <p className="text-base text-slate-300 leading-relaxed font-medium">
                  Copy your single-file HTML code or download the project files directly from Google AI Studio.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-950/70 rounded-2xl p-7 border border-slate-800 space-y-4 relative">
                <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-amber-400" /> Push to GitHub
                </h3>
                <p className="text-base text-slate-300 leading-relaxed font-medium">
                  Save your code in a GitHub repository (or drag-and-drop your project folder directly).
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-gradient-to-br from-[#001F3F] to-slate-950 rounded-2xl p-7 border border-amber-400/60 space-y-4 relative shadow-xl">
                <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-extrabold text-amber-300 flex items-center gap-2">
                  <CloudUpload className="w-5 h-5" /> Live on Netlify/Vercel
                </h3>
                <p className="text-base text-slate-100 leading-relaxed font-medium">
                  Connect your GitHub repo to Netlify or Vercel for a free, permanent URL (e.g. <code>mytool.netlify.app</code>) to share with students!
                </p>
              </div>

            </div>

            {/* Pro Tip Card */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-amber-400/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-amber-400/10 text-amber-400">
                  <Share2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100">Why Publish a Live URL?</h4>
                  <p className="text-xs text-slate-400">Students can open your app on iPads, Chromebooks, or phones without logging in.</p>
                </div>
              </div>
            </div>

            <div className="text-sm text-slate-500 flex justify-between pt-4 border-t border-slate-800">
              <span>Gulliver Prep GSET Workshop</span>
              <span className="font-mono">Slide 11 of 13</span>
            </div>
          </div>
        )}

        {/* SLIDE 11: CONCLUSION */}
        {currentSlide === 11 && (
          <div className="w-full h-full min-h-[580px] md:min-h-[660px] bg-gradient-to-br from-slate-900 via-[#001F3F] to-slate-950 rounded-3xl border border-amber-400/40 shadow-2xl p-8 md:p-14 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-sm font-semibold tracking-widest uppercase">
                <Rocket className="w-4 h-4" />
                BUILDING THE WORLD YOU ENVISION
              </div>

              <blockquote className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-50 font-['Playfair_Display'] italic leading-relaxed max-w-5xl">
                "AI is not simply an automation of my life, but getting help to build the one that I envisioned."
              </blockquote>
            </div>

            <div className="my-8 p-8 rounded-2xl bg-slate-900/90 border border-amber-400/40 max-w-4xl space-y-3 shadow-xl">
              <h4 className="text-lg md:text-xl font-bold text-amber-300">Takeaway for Educators</h4>
              <p className="text-base md:text-lg text-slate-100 leading-relaxed font-medium">
                Shift from being an EdTech Consumer to an Educational Architect in Google AI Studio today.
              </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-800 text-sm text-slate-400">
              <span>Gulliver Prep GSET Workshop</span>
              <button
                onClick={nextSlide}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-base transition shadow-xl shadow-amber-400/20"
              >
                Proceed to Feedback Form <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* SLIDE 12: FEEDBACK FORM & ATTENDANCE QR CODE */}
        {currentSlide === 12 && (
          <div className="w-full h-full min-h-[580px] md:min-h-[660px] bg-gradient-to-br from-slate-900 via-[#001F3F] to-slate-950 rounded-3xl border border-amber-400/50 shadow-2xl p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div>
                <span className="text-sm font-bold text-amber-400 uppercase tracking-widest">WORKSHOP ATTENDANCE & FEEDBACK</span>
                <h2 className="text-3xl md:text-5xl font-black text-slate-50 font-['Montserrat'] mt-1">FEEDBACK FORM</h2>
              </div>
              <div className="p-4 rounded-2xl bg-amber-400 text-slate-950 font-black flex items-center gap-3 shadow-xl shadow-amber-400/20">
                <QrCode className="w-8 h-8" />
                <span className="text-sm tracking-wider uppercase font-extrabold hidden sm:inline">GSET</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 my-auto py-6 items-center">
              
              {/* Left Column: QR Code Display Card */}
              <div className="md:col-span-5 flex flex-col items-center justify-center">
                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl border-4 border-amber-400 text-center space-y-4 relative group">
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    Scan With Phone Camera
                  </div>
                  <img
                    src="/qr-code.png"
                    alt="GSET Workshop Feedback Form QR Code"
                    className="w-56 h-56 md:w-64 md:h-64 object-contain mx-auto transition-transform duration-300 group-hover:scale-105"
                  />
                  <p className="text-sm text-slate-800 font-bold font-mono">Feedback & Attendance Form</p>
                </div>
              </div>

              {/* Right Column: Attendance Instructions & Badge */}
              <div className="md:col-span-7 space-y-8">
                <div className="bg-slate-900/90 rounded-2xl p-8 border border-slate-800 space-y-4 shadow-xl">
                  <h3 className="text-xl md:text-3xl font-medium text-slate-100 font-['Playfair_Display'] italic leading-relaxed">
                    "Please fill out this form to confirm your attendance and leave valuable feedback for your workshop facilitator."
                  </h3>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-6 p-6 rounded-2xl bg-slate-950/80 border border-amber-400/40 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="p-4 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-slate-100 tracking-wide font-['Montserrat']">GSET</h4>
                      <p className="text-xs md:text-sm text-slate-400 uppercase tracking-widest font-bold">Supporting Excellence in Teaching</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-3xl md:text-4xl font-black text-amber-400 font-['Montserrat'] tracking-tight block">
                      THANK YOU!
                    </span>
                  </div>
                </div>
              </div>

            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-400" />
                <span>Thank you for participating in Gulliver Prep GSET</span>
              </div>
              <button
                onClick={() => setCurrentSlide(0)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold transition border border-slate-700"
              >
                Back to Start
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Bottom Floating Control Bar */}
      <footer className="relative z-30 flex items-center justify-between px-6 py-4 bg-slate-900/90 backdrop-blur-md border-t border-slate-800/80">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-200 text-sm font-semibold transition border border-slate-700"
        >
          <ChevronLeft className="w-5 h-5" /> Previous
        </button>

        {/* Progress Bar & Indicators */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-10 bg-amber-400' : 'w-2.5 bg-slate-700 hover:bg-slate-600'
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <span className="text-sm text-slate-400 font-mono font-bold">
            {currentSlide + 1} / {totalSlides}
          </span>
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-30 disabled:pointer-events-none text-slate-950 text-sm font-extrabold transition shadow-md shadow-amber-400/10"
        >
          Next <ChevronRight className="w-5 h-5" />
        </button>
      </footer>

    </div>
  );
}
