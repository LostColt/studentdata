import { PerformanceRecord, Term } from './types';

export function getTerms(): Term[] {
  return ['All Time', 'Semester 1', 'Semester 2', 'Q1', 'Q2', 'Q3', 'Q4'];
}

export function filterRecordsByTerm(records: PerformanceRecord[], term: Term): PerformanceRecord[] {
  if (term === 'All Time') return records;
  if (term === 'Semester 1') return records.filter(r => r.term === 'Q1' || r.term === 'Q2');
  if (term === 'Semester 2') return records.filter(r => r.term === 'Q3' || r.term === 'Q4');
  return records.filter(r => r.term === term);
}

export function getUniqueStudents(records: PerformanceRecord[]): string[] {
  const students = new Set<string>();
  for (const r of records) {
    students.add(r.studentName);
  }
  return Array.from(students).sort();
}

export function calculateAverage(records: PerformanceRecord[]): number {
  if (records.length === 0) return 0;
  const sum = records.reduce((acc, r) => acc + r.score, 0);
  return Math.round((sum / records.length) * 10) / 10;
}

export function getClassAverage(records: PerformanceRecord[], term: Term): number {
  const filtered = filterRecordsByTerm(records, term);
  return calculateAverage(filtered);
}

export function filterRecords(records: PerformanceRecord[], term: Term, assignment: string): PerformanceRecord[] {
  let filtered = filterRecordsByTerm(records, term);
  if (assignment !== 'All') {
    filtered = filtered.filter(r => r.assignment === assignment);
  }
  return filtered;
}

export function getAssignments(records: PerformanceRecord[]): string[] {
  return Array.from(new Set(records.map(r => r.assignment))).sort((a, b) => {
    const numA = parseInt(a.replace(/[^0-9]/g, '')) || 0;
    const numB = parseInt(b.replace(/[^0-9]/g, '')) || 0;
    const typeA = a.replace(/[0-9]/g, '');
    const typeB = b.replace(/[0-9]/g, '');
    if (typeA === typeB) return numA - numB;
    return typeA.localeCompare(typeB);
  });
}

export function getGroupSummary(records: PerformanceRecord[], studentNames: string[], selectedTerm: Term, selectedAssignment: string): {
  average: number;
  assessments: number;
  trend: number | null;
} {
  const groupRecords = records.filter(r => studentNames.includes(r.studentName));
  const filtered = filterRecords(groupRecords, selectedTerm, selectedAssignment);
  
  const average = calculateAverage(filtered);
  const assessments = filtered.length;
  
  let trend: number | null = null;
  
  // Calculate trend based on previous term logic (only if no specific assignment is selected)
  let prevRecords: PerformanceRecord[] = [];
  if (selectedAssignment === 'All') {
    if (selectedTerm === 'Q2') prevRecords = filterRecords(groupRecords, 'Q1', 'All');
    else if (selectedTerm === 'Q3') prevRecords = filterRecords(groupRecords, 'Q2', 'All');
    else if (selectedTerm === 'Q4') prevRecords = filterRecords(groupRecords, 'Q3', 'All');
    else if (selectedTerm === 'Semester 2') prevRecords = filterRecords(groupRecords, 'Semester 1', 'All');
  }
  
  if (prevRecords.length > 0) {
    const prevAverage = calculateAverage(prevRecords);
    if (prevAverage > 0) {
      trend = Math.round(((average - prevAverage) / prevAverage) * 100 * 10) / 10;
    }
  }
  
  return { average, assessments, trend };
}

// Data for Line Chart (Progress over time)
export function getLineChartData(
  records: PerformanceRecord[],
  selectedStudents: string[],
  showClassAvg: boolean
) {
  const allAssignments = getAssignments(records);
  
  const data = allAssignments.map(assignment => {
    const dataPoint: any = { name: assignment };
    
    let hasDataForSelected = false;
    
    selectedStudents.forEach(student => {
      const sRecord = records.find(r => r.studentName === student && r.assignment === assignment);
      if (sRecord) {
        dataPoint[student] = sRecord.score;
        hasDataForSelected = true;
      }
    });
    
    if (showClassAvg) {
      const classRecords = records.filter(r => r.assignment === assignment);
      dataPoint['Class Average'] = calculateAverage(classRecords);
    }
    
    // Only return the dataPoint if it has data or we are rendering class avg.
    // Actually we will map it completely, then filter.
    return dataPoint;
  });
  
  // Filter out assignments that have no data for any of the selected students
  return data.filter(d => selectedStudents.some(s => d[s] !== undefined) || Object.keys(d).length > 1);
}

// Data for Grouped Bar Chart (Performance by Category)
export function getCategoryBarData(
  records: PerformanceRecord[],
  selectedStudents: string[],
  showClassAvg: boolean
) {
  const categories = Array.from(new Set(records.map(r => r.category)));
  
  return categories.map(category => {
    const dataPoint: any = { name: category };
    
    const catRecords = records.filter(r => r.category === category);
    
    selectedStudents.forEach(student => {
      const sRecords = catRecords.filter(r => r.studentName === student);
      if (sRecords.length > 0) {
        dataPoint[student] = calculateAverage(sRecords);
      }
    });
    
    if (showClassAvg) {
      dataPoint['Class Average'] = calculateAverage(catRecords);
    }
    
    return dataPoint;
  });
}
