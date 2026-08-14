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
  ShieldCheck
} from 'lucide-react';

interface PresentationProps {
  onToggleDashboard?: () => void;
}

export default function Presentation({ onToggleDashboard }: PresentationProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalSlides = 11;

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
    "9. Teacher Activity 2: Clone an App",
    "10. Conclusion: Building What You Envision"
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between select-none overflow-hidden font-sans">
      
      {/* Top Bar Header */}
      <header className="relative z-30 flex items-center justify-between px-6 py-4 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-extrabold text-sm shadow-md shadow-amber-400/20">
            GP
          </div>
          <div>
            <h1 className="text-sm md:text-base font-bold tracking-wide text-slate-100 font-['Montserrat']">
              GULLIVER PREP <span className="text-amber-400 font-normal">| GSET WORKSHOP</span>
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">From Consumer to Creator: A Teacher's Guide to Google AI Studio</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {onToggleDashboard && (
            <button
              onClick={onToggleDashboard}
              className="text-xs px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition border border-slate-700"
            >
              Student Dashboard View
            </button>
          )}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold transition border border-slate-700"
          >
            <Menu className="w-4 h-4" />
            <span className="hidden md:inline">Slide Directory ({currentSlide + 1}/{totalSlides})</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition border border-slate-700"
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
          <div className="w-full h-full min-h-[500px] md:min-h-[580px] bg-gradient-to-br from-slate-900 via-[#001F3F] to-slate-950 rounded-2xl border border-slate-800/90 shadow-2xl p-8 md:p-14 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                Gulliver Prep GSET Workshop Presentation
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-50 tracking-tight leading-tight font-['Montserrat'] max-w-4xl">
                From Consumer to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">Creator</span>
              </h1>
              <p className="text-xl md:text-2xl font-medium text-amber-300/90 font-['Playfair_Display'] italic">
                A Teacher's Guide to Google AI Studio
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">Pedagogical Shift</h4>
                  <p className="text-xs text-slate-400 mt-1">Moving teachers from software consumers to AI architects.</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">Zero Code Barriers</h4>
                  <p className="text-xs text-slate-400 mt-1">Natural language prompting as the new building language.</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400">
                  <Wand2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">Experiential Tech</h4>
                  <p className="text-xs text-slate-400 mt-1">Creating awe, wonder, and memorable learning tools.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-800/80 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Gulliver Prep Educational Technology (GSET)</span>
              </div>
              <button 
                onClick={nextSlide}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition shadow-lg shadow-amber-400/20"
              >
                Begin Presentation <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SLIDE 1: OVERNIGHT EDTECH INNOVATORS */}
        {currentSlide === 1 && (
          <div className="w-full h-full min-h-[500px] md:min-h-[580px] bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-10 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">THE PEDAGOGICAL SHIFT</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-50 font-['Montserrat']">Overnight EdTech Innovators</h2>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 text-amber-400 border border-slate-700">
                <Globe className="w-6 h-6" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-auto py-6">
              <div className="bg-slate-950/60 rounded-xl p-6 border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                  The COVID-19 Acceleration
                </h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong className="text-slate-100">Forced Overnight Mastery:</strong> Teachers instantly became experts in Google Classroom, Teams, Zoom, Meet, and Skype.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong className="text-slate-100">Continuous Digital Sharing:</strong> Lessons evolved into rapid sharing of Docs, PDFs, slides, and video links.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong className="text-slate-100">The Digital Return:</strong> Returning to physical spaces meant join codes, QR codes, and constant presentations.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#001F3F] to-slate-900 rounded-xl p-6 border border-amber-400/30 flex flex-col justify-between relative overflow-hidden">
                <Quote className="w-12 h-12 text-amber-400/20 absolute top-4 right-4" />
                <div className="space-y-4 relative z-10">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">CORE PEDAGOGICAL INSIGHT</span>
                  <blockquote className="text-lg md:text-xl font-medium text-slate-100 italic font-['Playfair_Display'] leading-relaxed">
                    "We didn't just adopt technology—we survived and adapted through it. Every teacher proved they could master complex digital tools under pressure."
                  </blockquote>
                </div>
                <div className="pt-4 border-t border-amber-400/20 text-xs text-amber-300 font-semibold">
                  Now, the challenge shifts from survival to intentional creation.
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-500 flex justify-between pt-3 border-t border-slate-800">
              <span>Gulliver Prep GSET Workshop</span>
              <span>Slide 2 of 11</span>
            </div>
          </div>
        )}

        {/* SLIDE 2: APP OVERLOAD */}
        {currentSlide === 2 && (
          <div className="w-full h-full min-h-[500px] md:min-h-[580px] bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-10 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">SUBSCRIPTION FATIGUE</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-50 font-['Montserrat']">The Search for Tangible Tech</h2>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 text-amber-400 border border-slate-700">
                <Layers className="w-6 h-6" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto py-6">
              <div className="bg-slate-950/60 rounded-xl p-6 border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center mb-2">
                  <Boxes className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-200">App Accumulation</h3>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                  Collecting tool after tool and subscription after subscription, creating fragmented logins and software overhead.
                </p>
              </div>

              <div className="bg-slate-950/60 rounded-xl p-6 border border-amber-400/40 space-y-3 relative shadow-lg shadow-amber-400/5">
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center mb-2">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-100">The Search for Unity</h3>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  Searching for a single flexible "one-stop shop" platform that can replace disparate apps and simplify tech stack.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#001F3F] to-slate-950 rounded-xl p-6 border border-amber-400/50 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center mb-2 font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-amber-300">Tangible Experience</h3>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                  Moving beyond flat slideshows. Seeking technology that feels tangible—offering immersive, tactile student experiences.
                </p>
              </div>
            </div>

            <div className="text-xs text-slate-500 flex justify-between pt-3 border-t border-slate-800">
              <span>Gulliver Prep GSET Workshop</span>
              <span>Slide 3 of 11</span>
            </div>
          </div>
        )}

        {/* SLIDE 3: STEPPING INTO THE UNKNOWN */}
        {currentSlide === 3 && (
          <div className="w-full h-full min-h-[500px] md:min-h-[580px] bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-10 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">DISCOVERING GOOGLE AI STUDIO</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-50 font-['Montserrat']">Stepping Into the Unknown</h2>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 text-amber-400 border border-slate-700">
                <Compass className="w-6 h-6" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-auto py-6">
              <div className="bg-slate-950/60 rounded-xl p-6 border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-400" />
                  The Desire to Create
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  When I discovered Google AI Studio, the aim was that I wanted to create something. I didn't know what yet, but I knew I wanted interactive, high-impact learning experiences for my students.
                </p>
              </div>

              <div className="bg-slate-950/80 rounded-xl p-6 border border-amber-400/30 space-y-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">THE FEAR FACTOR</span>
                <blockquote className="text-base font-medium text-slate-200 italic font-['Playfair_Display']">
                  "Truth be told, I was scared because I didn't have a technology background."
                </blockquote>
                <div className="p-4 rounded-lg bg-blue-950/40 border border-blue-800/40 text-xs text-blue-200 space-y-1">
                  <span className="font-bold text-blue-400 block uppercase">Breakthrough Insight</span>
                  <p>AI Studio removes technical syntax barriers. Natural language prompting becomes your code.</p>
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-500 flex justify-between pt-3 border-t border-slate-800">
              <span>Gulliver Prep GSET Workshop</span>
              <span>Slide 4 of 11</span>
            </div>
          </div>
        )}

        {/* SLIDE 4: EXPERIMENT 1 - SCROLLYTELLING */}
        {currentSlide === 4 && (
          <div className="w-full h-full min-h-[500px] md:min-h-[580px] bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-10 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">SCROLLYTELLING DEMO</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-50 font-['Montserrat']">Experiment 1: Literature in Motion</h2>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 text-amber-400 border border-slate-700">
                <BookOpen className="w-6 h-6" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-auto py-6">
              <div className="bg-slate-950/60 rounded-xl p-6 border border-slate-800 space-y-3">
                <h3 className="text-base font-bold text-slate-100">Tim O'Brien's <em>The Things They Carried</em></h3>
                <ul className="space-y-2 text-xs md:text-sm text-slate-300">
                  <li><strong className="text-amber-300">• Scrollytelling Concept:</strong> As the reader scrolls, elements on screen animate and shift to unpack narrative depth.</li>
                  <li><strong className="text-amber-300">• Prompting AI Studio:</strong> Asked AI Studio to build an HTML site explaining the emotional & physical weight of objects in the novel.</li>
                  <li><strong className="text-amber-300">• Result:</strong> Generated a dynamic, fluid web experience in minutes without manual coding.</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#001F3F] to-slate-950 rounded-xl p-6 border border-amber-400/40 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">EXPLORE LIVE DEMO</span>
                  <h4 className="text-sm font-semibold text-slate-200">Experience the Scrollytelling Prototype</h4>
                  <p className="text-xs text-slate-400">Interactive literary web experience explaining classic literature.</p>
                </div>
                <a
                  href="https://scrollytell.netlify.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm transition shadow-lg shadow-amber-400/20"
                >
                  Open scrollytell.netlify.app <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="text-xs text-slate-500 flex justify-between pt-3 border-t border-slate-800">
              <span>Gulliver Prep GSET Workshop</span>
              <span>Slide 5 of 11</span>
            </div>
          </div>
        )}

        {/* SLIDE 5: TEACHER ACTIVITY 1 */}
        {currentSlide === 5 && (
          <div className="w-full h-full min-h-[500px] md:min-h-[580px] bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-10 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">HANDS-ON BUILDING</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-50 font-['Montserrat']">Activity 1: The One-Stop Shop</h2>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 text-amber-400 border border-slate-700">
                <Wand2 className="w-6 h-6" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-auto py-6">
              <div className="bg-slate-950/60 rounded-xl p-5 border border-slate-800 space-y-2">
                <span className="text-2xl font-black text-amber-400 font-['Montserrat']">01</span>
                <h4 className="text-sm font-bold text-slate-100">Select Concept</h4>
                <p className="text-xs text-slate-400">Identify a topic or concept you are currently teaching.</p>
              </div>

              <div className="bg-slate-950/60 rounded-xl p-5 border border-amber-400/40 space-y-2">
                <span className="text-2xl font-black text-amber-400 font-['Montserrat']">02</span>
                <h4 className="text-sm font-bold text-slate-100">Gemini Prompt</h4>
                <p className="text-xs text-slate-400">Open Gemini to draft & polish a prompt for AI Studio.</p>
              </div>

              <div className="bg-slate-950/60 rounded-xl p-5 border border-slate-800 space-y-2">
                <span className="text-2xl font-black text-amber-400 font-['Montserrat']">03</span>
                <h4 className="text-sm font-bold text-slate-100">AI Generation</h4>
                <p className="text-xs text-slate-400">Ask AI Studio to create a Scrollytelling page.</p>
              </div>

              <div className="bg-slate-950/60 rounded-xl p-5 border border-slate-800 space-y-2">
                <span className="text-2xl font-black text-amber-400 font-['Montserrat']">04</span>
                <h4 className="text-sm font-bold text-slate-100">Share Screen</h4>
                <p className="text-xs text-slate-400">Share screen & showcase your prototype with peers.</p>
              </div>
            </div>

            <div className="text-xs text-slate-500 flex justify-between pt-3 border-t border-slate-800">
              <span>Gulliver Prep GSET Workshop</span>
              <span>Slide 6 of 11</span>
            </div>
          </div>
        )}

        {/* SLIDE 6: VISUAL LEARNING - AWE & WONDER */}
        {currentSlide === 6 && (
          <div className="w-full h-full min-h-[500px] md:min-h-[580px] bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-10 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">PEDAGOGICAL PHILOSOPHY</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-50 font-['Montserrat']">The Power of Visual Learning</h2>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 text-amber-400 border border-slate-700">
                <Telescope className="w-6 h-6" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-auto py-6">
              <div className="bg-slate-950/60 rounded-xl p-6 border border-slate-800 space-y-3">
                <h3 className="text-base font-bold text-slate-200">Fascination Over Fear</h3>
                <ul className="space-y-3 text-xs md:text-sm text-slate-300">
                  <li><strong className="text-amber-300">• Visual Learner Identity:</strong> I love videos and visual models that bring complex ideas to life.</li>
                  <li><strong className="text-amber-300">• Childhood Connection:</strong> As a kid, black holes were terrifying. Watching <em>Interstellar</em> changed everything—revealing the beauty of a central force pulling everything together.</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#001F3F] to-slate-950 rounded-xl p-6 border border-amber-400/40 flex flex-col justify-center space-y-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">CREATING AWE & WONDER</span>
                <blockquote className="text-base md:text-lg font-medium text-slate-100 italic font-['Playfair_Display'] leading-relaxed">
                  "When creating edtech, it is not so much about being clean or corporate. It is about creating something memorable—something that evokes awe and wonder in students."
                </blockquote>
              </div>
            </div>

            <div className="text-xs text-slate-500 flex justify-between pt-3 border-t border-slate-800">
              <span>Gulliver Prep GSET Workshop</span>
              <span>Slide 7 of 11</span>
            </div>
          </div>
        )}

        {/* SLIDE 7: EXPERIMENT 2 - BLACK HOLE SIMULATION */}
        {currentSlide === 7 && (
          <div className="w-full h-full min-h-[500px] md:min-h-[580px] bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-10 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">INTERACTIVE SIMULATION</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-50 font-['Montserrat']">Experiment 2: Visualizing the Impossible</h2>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 text-amber-400 border border-slate-700">
                <Orbit className="w-6 h-6" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-auto py-6">
              <div className="bg-slate-950/60 rounded-xl p-6 border border-slate-800 space-y-3">
                <h3 className="text-base font-bold text-slate-200">Interactive 3D Black Hole</h3>
                <ul className="space-y-2 text-xs md:text-sm text-slate-300">
                  <li><strong className="text-amber-300">• Prompting AI Studio:</strong> "Make a visualization of a black hole and animate it in an HTML file."</li>
                  <li><strong className="text-amber-300">• Result:</strong> Real-time particle simulation rendered in browser canvas.</li>
                  <li><strong className="text-amber-300">• Pedagogical Impact:</strong> Turns abstract astronomical concepts into a tactile visual experience.</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#001F3F] to-slate-950 rounded-xl p-6 border border-amber-400/40 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">EXPLORE LIVE DEMO</span>
                  <h4 className="text-sm font-semibold text-slate-200">Inspect 3D Black Hole Canvas</h4>
                  <p className="text-xs text-slate-400">Interactive WebGL / HTML Canvas Physics Demo.</p>
                </div>
                <a
                  href="https://blackholedemo.netlify.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm transition shadow-lg shadow-amber-400/20"
                >
                  Open blackholedemo.netlify.app <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="text-xs text-slate-500 flex justify-between pt-3 border-t border-slate-800">
              <span>Gulliver Prep GSET Workshop</span>
              <span>Slide 8 of 11</span>
            </div>
          </div>
        )}

        {/* SLIDE 8: BECOMING THE BUILDER - PADLET CLONE */}
        {currentSlide === 8 && (
          <div className="w-full h-full min-h-[500px] md:min-h-[580px] bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-10 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">APP CLONING DEMO</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-50 font-['Montserrat']">Becoming the Builder: Cloning Padlet</h2>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 text-amber-400 border border-slate-700">
                <LayoutGrid className="w-6 h-6" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-auto py-6">
              <div className="bg-slate-950/60 rounded-xl p-6 border border-slate-800 space-y-3">
                <h3 className="text-base font-bold text-slate-200">Shifting Mindsets: Consumer to Builder</h3>
                <ul className="space-y-2 text-xs md:text-sm text-slate-300">
                  <li><strong className="text-amber-300">• The Experiment:</strong> "I didn't have tech skills, but I wanted to know if I could copy a commercial app."</li>
                  <li><strong className="text-amber-300">• Prompting AI Studio:</strong> "Make a clone of Padlet."</li>
                  <li><strong className="text-amber-300">• Result:</strong> Functional collaborative digital board built without subscription fees.</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#001F3F] to-slate-950 rounded-xl p-6 border border-amber-400/40 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">EXPLORE LIVE DEMO</span>
                  <h4 className="text-sm font-semibold text-slate-200">Inspect Functional Padlet Web Clone</h4>
                  <p className="text-xs text-slate-400">Interactive web application built with AI Studio.</p>
                </div>
                <a
                  href="https://pdlt.netlify.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm transition shadow-lg shadow-amber-400/20"
                >
                  Open pdlt.netlify.app <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="text-xs text-slate-500 flex justify-between pt-3 border-t border-slate-800">
              <span>Gulliver Prep GSET Workshop</span>
              <span>Slide 9 of 11</span>
            </div>
          </div>
        )}

        {/* SLIDE 9: TEACHER ACTIVITY 2 */}
        {currentSlide === 9 && (
          <div className="w-full h-full min-h-[500px] md:min-h-[580px] bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-10 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">HANDS-ON BUILDER SESSION</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-50 font-['Montserrat']">Activity 2: Clone an App You Use</h2>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 text-amber-400 border border-slate-700">
                <AppWindow className="w-6 h-6" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-auto py-6">
              <div className="bg-slate-950/60 rounded-xl p-5 border border-slate-800 space-y-2">
                <span className="text-2xl font-black text-amber-400 font-['Montserrat']">01</span>
                <h4 className="text-sm font-bold text-slate-100">Choose App</h4>
                <p className="text-xs text-slate-400">Select an app you use often in class.</p>
              </div>

              <div className="bg-slate-950/60 rounded-xl p-5 border border-amber-400/40 space-y-2">
                <span className="text-2xl font-black text-amber-400 font-['Montserrat']">02</span>
                <h4 className="text-sm font-bold text-slate-100">AI Prompt</h4>
                <p className="text-xs text-slate-400">Ask Google AI Studio to build a clone.</p>
              </div>

              <div className="bg-slate-950/60 rounded-xl p-5 border border-slate-800 space-y-2">
                <span className="text-2xl font-black text-amber-400 font-['Montserrat']">03</span>
                <h4 className="text-sm font-bold text-slate-100">Refine</h4>
                <p className="text-xs text-slate-400">Tweak functionality by prompting AI.</p>
              </div>

              <div className="bg-slate-950/60 rounded-xl p-5 border border-slate-800 space-y-2">
                <span className="text-2xl font-black text-amber-400 font-['Montserrat']">04</span>
                <h4 className="text-sm font-bold text-slate-100">Peer Review</h4>
                <p className="text-xs text-slate-400">Showcase creation to neighboring teachers.</p>
              </div>
            </div>

            <div className="text-xs text-slate-500 flex justify-between pt-3 border-t border-slate-800">
              <span>Gulliver Prep GSET Workshop</span>
              <span>Slide 10 of 11</span>
            </div>
          </div>
        )}

        {/* SLIDE 10: CONCLUSION */}
        {currentSlide === 10 && (
          <div className="w-full h-full min-h-[500px] md:min-h-[580px] bg-gradient-to-br from-slate-900 via-[#001F3F] to-slate-950 rounded-2xl border border-amber-400/40 shadow-2xl p-8 md:p-14 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold tracking-widest uppercase">
                <Rocket className="w-3.5 h-3.5" />
                BUILDING THE WORLD YOU ENVISION
              </div>

              <blockquote className="text-2xl md:text-4xl font-extrabold text-slate-50 font-['Playfair_Display'] italic leading-relaxed max-w-4xl">
                "AI is not simply an automation of my life, but getting help to build the one that I envisioned."
              </blockquote>
            </div>

            <div className="my-6 p-6 rounded-xl bg-slate-900/80 border border-amber-400/30 max-w-3xl space-y-2">
              <h4 className="text-base font-bold text-amber-300">Takeaway for Educators</h4>
              <p className="text-sm text-slate-200">
                Shift from being an EdTech Consumer to an Educational Architect in Google AI Studio today.
              </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-800 text-xs text-slate-400">
              <span>Gulliver Prep GSET Workshop</span>
              <button
                onClick={() => setCurrentSlide(0)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition shadow-lg shadow-amber-400/20"
              >
                Replay Presentation <ChevronRight className="w-4 h-4" />
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
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-200 text-xs font-semibold transition border border-slate-700"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>

        {/* Progress Bar & Indicators */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-8 bg-amber-400' : 'w-2 bg-slate-700 hover:bg-slate-600'
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {currentSlide + 1} / {totalSlides}
          </span>
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-30 disabled:pointer-events-none text-slate-950 text-xs font-bold transition shadow-md shadow-amber-400/10"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </footer>

    </div>
  );
}
