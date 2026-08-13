import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar 
} from 'recharts';
import { Users, GraduationCap, TrendingUp, TrendingDown, ClipboardList, BookOpen, User, Minus, ChevronDown, Printer, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { fetchAndParseData } from '../data';
import { 
  getTerms, 
  getUniqueStudents, 
  filterRecordsByTerm, 
  getClassAverage, 
  getGroupSummary, 
  getLineChartData, 
  getCategoryBarData,
  getAssignments
} from '../utils';
import { PerformanceRecord, Term } from '../types';

const DATA_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQriMbT3lqQ-_tkrSxenEZUPq6NLAT94WCnJR3PWj4_0G2rDQJqo1ViFYp49aUVDPEf32RFakD8FJZs/pub?output=csv";

const STUDENT_COLORS = ['#003057', '#0072CE', '#3EBBB6', '#707372', '#F5E6CC', '#8A8D8F', '#9BCBEB', '#329994'];

export default function Dashboard() {
  const [data, setData] = useState<PerformanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [term, setTerm] = useState<Term>('All Time');
  const [selectedAssignment, setSelectedAssignment] = useState<string>('All');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [showClassAvg, setShowClassAvg] = useState<boolean>(true);

  // UI State
  const [isStudentDropdownOpen, setIsStudentDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handlePrint = async () => {
    if (!printRef.current) return;
    try {
      setIsGeneratingPDF(true);
      // Small delay to allow UI to settle
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(printRef.current, { 
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#f8fafc' // slate-50
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Gulliver_Prep_Performance_Report.pdf');
    } catch (err) {
      console.error('Failed to generate PDF', err);
      // Fallback
      window.print();
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const records = await fetchAndParseData(DATA_URL);
      setData(records);
      
      const studentsList = getUniqueStudents(records);
      if (studentsList.length > 0) {
        setSelectedStudents([studentsList[0]]);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsStudentDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const students = useMemo(() => getUniqueStudents(data), [data]);
  const terms = getTerms();

  // Filtered data based on selected term
  const termFilteredData = useMemo(() => filterRecordsByTerm(data, term), [data, term]);
  const assignments = useMemo(() => getAssignments(termFilteredData), [termFilteredData]);

  // Derived summaries
  const classAvg = useMemo(() => getClassAverage(data, term), [data, term]);
  const groupSummary = useMemo(() => {
    if (selectedStudents.length === 0) return null;
    return getGroupSummary(data, selectedStudents, term, selectedAssignment);
  }, [data, selectedStudents, term, selectedAssignment]);

  // Chart Data
  const lineChartData = useMemo(() => {
    if (selectedStudents.length === 0) return [];
    return getLineChartData(termFilteredData, selectedStudents, showClassAvg);
  }, [termFilteredData, selectedStudents, showClassAvg]);

  const barChartData = useMemo(() => {
    if (selectedStudents.length === 0) return [];
    let records = termFilteredData;
    if (selectedAssignment !== 'All') {
      records = records.filter(r => r.assignment === selectedAssignment);
    }
    return getCategoryBarData(records, selectedStudents, showClassAvg);
  }, [termFilteredData, selectedStudents, showClassAvg, selectedAssignment]);


  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="flex flex-col items-center text-slate-500 gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
          <p className="text-sm font-medium">Loading Student Data...</p>
        </div>
      </div>
    );
  }

  if (selectedStudents.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="text-slate-500">No data available or no student selected.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12" ref={printRef}>
      {/* Header & Controls */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-brand-600 p-2 rounded-lg text-white">
                <GraduationCap size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 leading-tight">Gulliver Prep Performance Portal</h1>
                <p className="text-sm text-slate-500">Analytics & Insights Dashboard</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Term Filter */}
              <div className="flex items-center bg-slate-100 rounded-md p-1 border border-slate-200">
                <select 
                  className="bg-transparent border-none text-sm font-medium focus:ring-0 text-slate-700 py-1.5 pl-3 pr-8 rounded cursor-pointer outline-none"
                  value={term}
                  onChange={e => {
                    setTerm(e.target.value as Term);
                    setSelectedAssignment('All'); // Reset assignment on term change
                  }}
                >
                  {terms.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* Assignment Filter */}
              <div className="flex items-center bg-white rounded-md border border-slate-300 shadow-sm">
                <div className="pl-3 text-slate-400"><ClipboardList size={16} /></div>
                <select 
                  className="bg-transparent border-none text-sm font-semibold focus:ring-0 text-slate-700 py-2 pl-2 pr-8 rounded cursor-pointer outline-none"
                  value={selectedAssignment}
                  onChange={e => setSelectedAssignment(e.target.value)}
                >
                  <option value="All">All Assignments</option>
                  {assignments.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>

              {/* Multi-Student Filter */}
              <div className="relative flex items-center bg-white rounded-md border border-slate-300 shadow-sm" ref={dropdownRef}>
                <div className="pl-3 text-brand-500"><User size={16} /></div>
                <button 
                  className="flex items-center justify-between gap-2 bg-transparent text-sm font-semibold focus:outline-none text-brand-700 py-2 pl-2 pr-4 rounded cursor-pointer min-w-[150px]"
                  onClick={() => setIsStudentDropdownOpen(!isStudentDropdownOpen)}
                >
                  <span>{selectedStudents.length} Student{selectedStudents.length !== 1 ? 's' : ''} Selected</span>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform ${isStudentDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isStudentDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 max-h-80 overflow-y-auto bg-white border border-slate-200 shadow-lg rounded-md z-50">
                    <div className="p-2 border-b border-slate-100 bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Select Students
                    </div>
                    {students.map((s, i) => {
                      const isSelected = selectedStudents.includes(s);
                      return (
                        <label key={s} className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-0">
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
                            checked={isSelected}
                            onChange={(e) => {
                              if (e.target.checked) setSelectedStudents([...selectedStudents, s]);
                              else setSelectedStudents(selectedStudents.filter(x => x !== s));
                            }}
                          />
                          <span className="text-sm text-slate-700 font-medium flex-1">{s}</span>
                          {isSelected && (
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: STUDENT_COLORS[selectedStudents.indexOf(s) % STUDENT_COLORS.length] }}></span>
                          )}
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Benchmark Toggle */}
              <div className="flex items-center bg-white rounded-md border border-slate-300 shadow-sm">
                <label className="flex items-center gap-2 py-2 px-3 cursor-pointer text-sm font-medium text-slate-700">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
                    checked={showClassAvg}
                    onChange={e => setShowClassAvg(e.target.checked)}
                  />
                  Show Class Average
                </label>
              </div>

              {/* Print Button */}
              <button 
                onClick={handlePrint}
                disabled={isGeneratingPDF}
                data-html2canvas-ignore="true"
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-4 rounded-md text-sm font-semibold transition-colors border border-slate-300 shadow-sm print:hidden ml-auto md:ml-2 disabled:opacity-50"
              >
                {isGeneratingPDF ? <Loader2 size={16} className="animate-spin" /> : <Printer size={16} />}
                <span>{isGeneratingPDF ? 'Generating...' : 'Print PDF'}</span>
              </button>

            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-slate-500">Selected Group Average</h3>
              <div className="p-2 bg-brand-50 text-brand-600 rounded-lg">
                <BookOpen size={18} />
              </div>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-slate-900">{groupSummary?.average.toFixed(1)}%</span>
            </div>
            <p className="text-xs text-slate-500 mt-2 truncate">Current filter: {term} {selectedAssignment !== 'All' ? `(${selectedAssignment})` : ''}</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-slate-500">Class Benchmark</h3>
              <div className="p-2 bg-slate-100 text-slate-500 rounded-lg">
                <Users size={18} />
              </div>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-slate-700">{classAvg.toFixed(1)}%</span>
            </div>
            <p className="text-xs text-slate-500 mt-2 truncate">Overall class average</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-slate-500">Group Trend</h3>
              <div className={`p-2 rounded-lg ${!groupSummary?.trend ? 'bg-slate-100 text-slate-500' : groupSummary.trend > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {!groupSummary?.trend ? <Minus size={18} /> : groupSummary.trend > 0 ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
              </div>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-slate-900">
                {groupSummary?.trend ? `${groupSummary.trend > 0 ? '+' : ''}${groupSummary.trend}%` : 'N/A'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2 truncate">vs previous term</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-slate-500">Assessments</h3>
              <div className="p-2 bg-sky-50 text-sky-600 rounded-lg">
                <ClipboardList size={18} />
              </div>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-slate-900">{groupSummary?.assessments}</span>
            </div>
            <p className="text-xs text-slate-500 mt-2 truncate">Total items completed</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Line Chart */}
          <div className="col-span-1 lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Progress & Trajectory over Time</h2>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }} 
                    domain={[0, 100]} 
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => [`${value}%`]}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                  
                  {selectedStudents.map((student, i) => (
                    <Line 
                      key={student}
                      type="monotone" 
                      dataKey={student} 
                      name={student} 
                      stroke={STUDENT_COLORS[i % STUDENT_COLORS.length]} 
                      strokeWidth={3} 
                      dot={{ r: 4, fill: STUDENT_COLORS[i % STUDENT_COLORS.length], strokeWidth: 2, stroke: '#fff' }} 
                      activeDot={{ r: 6 }} 
                    />
                  ))}
                  
                  {showClassAvg && (
                    <Line 
                      type="monotone" 
                      dataKey="Class Average" 
                      name="Class Avg" 
                      stroke="#94a3b8" 
                      strokeWidth={2} 
                      strokeDasharray="4 4" 
                      dot={{ r: 3, fill: '#94a3b8' }} 
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart by Category */}
          <div className="col-span-1 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Performance by Category</h2>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }} 
                    domain={[0, 100]} 
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => [`${value}%`]}
                    cursor={{ fill: '#f1f5f9' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                  
                  {selectedStudents.map((student, i) => (
                    <Bar 
                      key={student}
                      dataKey={student} 
                      name={student} 
                      fill={STUDENT_COLORS[i % STUDENT_COLORS.length]} 
                      radius={[4, 4, 0, 0]} 
                      maxBarSize={40} 
                    />
                  ))}
                  
                  {showClassAvg && (
                    <Bar dataKey="Class Average" name="Class Avg" fill="#94a3b8" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Radar Chart for Peer Comparison */}
          {selectedStudents.length > 1 && (
            <div className="col-span-1 lg:col-span-3 bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row items-center gap-8 animate-in fade-in duration-500">
              <div className="w-full md:w-1/3 flex flex-col justify-center">
                <h2 className="text-lg font-semibold text-slate-800 mb-2">Direct Skill Comparison</h2>
                <p className="text-sm text-slate-500 mb-6">Contrasting specific category strengths across {selectedStudents.length} selected students.</p>
                
                {selectedStudents.length === 2 && (
                  <div className="space-y-4">
                    {barChartData.map((d: any) => {
                      const p = d[selectedStudents[0]] || 0;
                      const b = d[selectedStudents[1]] || 0;
                      const diff = Math.abs(p - b).toFixed(1);
                      const isWinning = p > b;
                      
                      return (
                        <div key={d.name} className="flex flex-col gap-1">
                          <div className="flex justify-between text-sm font-medium">
                            <span className="text-slate-700">{d.name}</span>
                            <span className={isWinning ? "text-brand-600" : (p < b ? "text-amber-600" : "text-slate-500")}>
                              {p === b ? 'Tied' : (isWinning ? `+${diff}%` : `-${diff}%`)}
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden flex">
                            <div 
                              className="h-full" 
                              style={{ width: `${(p / (p + b)) * 100}%`, backgroundColor: STUDENT_COLORS[0] }}
                            />
                            <div 
                              className="h-full" 
                              style={{ width: `${(b / (p + b)) * 100}%`, backgroundColor: STUDENT_COLORS[1] }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
                
                {selectedStudents.length > 2 && (
                  <div className="text-sm text-slate-500">
                    <p>Select exactly two students for a detailed strength breakdown, or refer to the radar chart for a high-level shape comparison.</p>
                  </div>
                )}
              </div>
              
              <div className="w-full md:w-2/3 h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={barChartData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="name" tick={{ fill: '#475569', fontSize: 13, fontWeight: 500 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    
                    {selectedStudents.map((student, i) => (
                      <Radar 
                        key={student} 
                        name={student} 
                        dataKey={student} 
                        stroke={STUDENT_COLORS[i % STUDENT_COLORS.length]} 
                        fill={STUDENT_COLORS[i % STUDENT_COLORS.length]} 
                        fillOpacity={0.2} 
                        strokeWidth={2} 
                      />
                    ))}
                    
                    {showClassAvg && (
                      <Radar 
                        name="Class Avg" 
                        dataKey="Class Average" 
                        stroke="#94a3b8" 
                        fill="#94a3b8" 
                        fillOpacity={0.1} 
                        strokeWidth={2} 
                        strokeDasharray="4 4" 
                      />
                    )}
                    
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: number) => [`${value}%`]}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
          
          {/* Individual Students List */}
          {selectedStudents.length > 0 && (
            <div className="col-span-1 lg:col-span-3 bg-white rounded-xl border border-slate-200 p-0 shadow-sm overflow-hidden mt-2">
              <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <h2 className="text-lg font-semibold text-slate-800">Selected Students Breakdown</h2>
                <span className="text-xs font-medium bg-slate-200 text-slate-600 px-2.5 py-1 rounded-full">{selectedStudents.length} Students</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      <th className="px-6 py-3 bg-white">Student Name</th>
                      <th className="px-6 py-3 bg-white">Average</th>
                      <th className="px-6 py-3 bg-white">Trend</th>
                      <th className="px-6 py-3 bg-white">Assessments</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {selectedStudents.map((student, i) => {
                      const summary = getGroupSummary(data, [student], term, selectedAssignment);
                      return (
                        <tr key={student} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-800 flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: STUDENT_COLORS[i % STUDENT_COLORS.length] }}></span>
                            {student}
                          </td>
                          <td className="px-6 py-4 text-slate-600 font-medium">{summary.average.toFixed(1)}%</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1 text-sm font-medium ${!summary.trend ? 'text-slate-500' : summary.trend > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                              {!summary.trend ? <Minus size={14} /> : summary.trend > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                              {summary.trend ? `${summary.trend > 0 ? '+' : ''}${summary.trend}%` : 'N/A'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-500 text-sm">{summary.assessments}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
