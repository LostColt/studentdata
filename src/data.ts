import Papa from 'papaparse';
import { PerformanceRecord, Term } from './types';

// Mock fallback dataset in case CSV fetch fails
export const MOCK_DATA: PerformanceRecord[] = [
  // Alice Smith
  { studentName: 'Alice Smith', term: 'Q1', category: 'Formative', assignment: 'F1', score: 97 },
  { studentName: 'Alice Smith', term: 'Q1', category: 'Formative', assignment: 'F2', score: 97 },
  { studentName: 'Alice Smith', term: 'Q1', category: 'Quizzes', assignment: 'Qz1', score: 98 },
  { studentName: 'Alice Smith', term: 'Q1', category: 'Assessments', assignment: 'A1', score: 92 },
  { studentName: 'Alice Smith', term: 'Q2', category: 'Formative', assignment: 'F3', score: 91 },
  { studentName: 'Alice Smith', term: 'Q2', category: 'Formative', assignment: 'F4', score: 100 },
  { studentName: 'Alice Smith', term: 'Q2', category: 'Quizzes', assignment: 'Qz2', score: 94 },
  { studentName: 'Alice Smith', term: 'Q2', category: 'Assessments', assignment: 'A2', score: 90 },
  { studentName: 'Alice Smith', term: 'Q3', category: 'Formative', assignment: 'F5', score: 97 },
  { studentName: 'Alice Smith', term: 'Q3', category: 'Formative', assignment: 'F6', score: 96 },
  { studentName: 'Alice Smith', term: 'Q3', category: 'Quizzes', assignment: 'Qz3', score: 96 },
  { studentName: 'Alice Smith', term: 'Q3', category: 'Assessments', assignment: 'A3', score: 94 },
  { studentName: 'Alice Smith', term: 'Q4', category: 'Formative', assignment: 'F7', score: 92 },
  { studentName: 'Alice Smith', term: 'Q4', category: 'Formative', assignment: 'F8', score: 92 },
  { studentName: 'Alice Smith', term: 'Q4', category: 'Formative', assignment: 'F9', score: 94 },
  { studentName: 'Alice Smith', term: 'Q4', category: 'Formative', assignment: 'F10', score: 90 },
  { studentName: 'Alice Smith', term: 'Q4', category: 'Quizzes', assignment: 'Qz4', score: 94 },
  { studentName: 'Alice Smith', term: 'Q4', category: 'Quizzes', assignment: 'Qz5', score: 90 },
  { studentName: 'Alice Smith', term: 'Q4', category: 'Assessments', assignment: 'A4', score: 90 },
  
  // Bob Johnson
  { studentName: 'Bob Johnson', term: 'Q1', category: 'Formative', assignment: 'F1', score: 90 },
  { studentName: 'Bob Johnson', term: 'Q1', category: 'Formative', assignment: 'F2', score: 94 },
  { studentName: 'Bob Johnson', term: 'Q1', category: 'Quizzes', assignment: 'Qz1', score: 99 },
  { studentName: 'Bob Johnson', term: 'Q1', category: 'Assessments', assignment: 'A1', score: 95 },
  { studentName: 'Bob Johnson', term: 'Q2', category: 'Formative', assignment: 'F3', score: 93 },
  { studentName: 'Bob Johnson', term: 'Q2', category: 'Formative', assignment: 'F4', score: 92 },
  { studentName: 'Bob Johnson', term: 'Q2', category: 'Quizzes', assignment: 'Qz2', score: 98 },
  { studentName: 'Bob Johnson', term: 'Q2', category: 'Assessments', assignment: 'A2', score: 94 },
  { studentName: 'Bob Johnson', term: 'Q3', category: 'Formative', assignment: 'F5', score: 94 },
  { studentName: 'Bob Johnson', term: 'Q3', category: 'Formative', assignment: 'F6', score: 91 },
  { studentName: 'Bob Johnson', term: 'Q3', category: 'Quizzes', assignment: 'Qz3', score: 93 },
  { studentName: 'Bob Johnson', term: 'Q3', category: 'Assessments', assignment: 'A3', score: 100 },
  { studentName: 'Bob Johnson', term: 'Q4', category: 'Formative', assignment: 'F7', score: 99 },
  { studentName: 'Bob Johnson', term: 'Q4', category: 'Formative', assignment: 'F8', score: 93 },
  { studentName: 'Bob Johnson', term: 'Q4', category: 'Formative', assignment: 'F9', score: 92 },
  { studentName: 'Bob Johnson', term: 'Q4', category: 'Formative', assignment: 'F10', score: 100 },
  { studentName: 'Bob Johnson', term: 'Q4', category: 'Quizzes', assignment: 'Qz4', score: 100 },
  { studentName: 'Bob Johnson', term: 'Q4', category: 'Quizzes', assignment: 'Qz5', score: 96 },
  { studentName: 'Bob Johnson', term: 'Q4', category: 'Assessments', assignment: 'A4', score: 90 },
];

export async function fetchAndParseData(url: string): Promise<PerformanceRecord[]> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const csvText = await response.text();
    
    // The specific CSV format has two header rows.
    // Row 0: Formative (20%),,,,,,,,,,Quizzes (30%),,,,,Assessments (50%),,,
    // Row 1: Student Name,F1,F2,F3,F4,F5,F6,F7,F8,F9,F10,Qz1,Qz2,Qz3,Qz4,Qz5,A1,A2,A3,A4
    
    const parsed = Papa.parse(csvText, { skipEmptyLines: true });
    const rows = parsed.data as string[][];
    
    if (rows.length < 3) {
      return MOCK_DATA;
    }
    
    const topHeader = rows[0];
    const subHeader = rows[1];
    const dataRows = rows.slice(2);
    
    const records: PerformanceRecord[] = [];
    
    let currentCategory = 'Other';
    const colMetadata: { index: number; assignment: string; category: string; term: Term }[] = [];
    
    // Parse headers to build metadata
    for (let i = 1; i < subHeader.length; i++) {
      if (topHeader[i] && topHeader[i].trim() !== '') {
        currentCategory = topHeader[i].trim().replace(/\s*\([^)]*\)/, ''); // Remove (20%) part
      }
      
      const assignment = subHeader[i].trim();
      let term: Term = 'Q1';
      
      // Simple heuristic to distribute assignments into quarters based on their index or name
      if (assignment.startsWith('F')) {
        const num = parseInt(assignment.replace('F', ''));
        if (num <= 2) term = 'Q1';
        else if (num <= 4) term = 'Q2';
        else if (num <= 6) term = 'Q3';
        else term = 'Q4';
      } else if (assignment.startsWith('Qz')) {
        const num = parseInt(assignment.replace('Qz', ''));
        if (num === 1) term = 'Q1';
        else if (num === 2) term = 'Q2';
        else if (num === 3) term = 'Q3';
        else term = 'Q4';
      } else if (assignment.startsWith('A')) {
        const num = parseInt(assignment.replace('A', ''));
        if (num === 1) term = 'Q1';
        else if (num === 2) term = 'Q2';
        else if (num === 3) term = 'Q3';
        else term = 'Q4';
      }
      
      colMetadata.push({ index: i, assignment, category: currentCategory, term });
    }
    
    for (const row of dataRows) {
      const studentName = row[0]?.trim();
      if (!studentName) continue;
      
      for (const meta of colMetadata) {
        const scoreStr = row[meta.index];
        if (scoreStr && scoreStr.trim() !== '') {
          const score = parseFloat(scoreStr);
          if (!isNaN(score)) {
            records.push({
              studentName,
              term: meta.term,
              category: meta.category,
              assignment: meta.assignment,
              score,
            });
          }
        }
      }
    }
    
    return records.length > 0 ? records : MOCK_DATA;
    
  } catch (error) {
    console.error('Error fetching/parsing CSV:', error);
    return MOCK_DATA;
  }
}
