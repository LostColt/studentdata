import React, { useState } from 'react';
import Presentation from './components/Presentation';
import Dashboard from './components/Dashboard';

export default function App() {
  const [view, setView] = useState<'presentation' | 'dashboard'>('presentation');

  if (view === 'dashboard') {
    return (
      <div className="relative">
        <div className="bg-slate-900 px-6 py-2 border-b border-slate-800 flex justify-between items-center text-xs text-slate-300">
          <span>Viewing: Student Performance Dashboard</span>
          <button
            onClick={() => setView('presentation')}
            className="px-3 py-1 bg-amber-400 text-slate-950 font-bold rounded hover:bg-amber-300 transition"
          >
            ← Back to GSET Slide Deck
          </button>
        </div>
        <Dashboard />
      </div>
    );
  }

  return <Presentation onToggleDashboard={() => setView('dashboard')} />;
}
