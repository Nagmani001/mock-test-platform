export interface Test {
  id: string;
  title: string;
  totalQuestions: number;
  language: string;
  totalTimeMinute: number;
  totalTimeSecond: number;
  totalTimeHour: number;
  sectionId: string;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: string;
  question: string;
  type: TestType;
  words: number;
  questionTimeHour: number;
  questionTimeMinute: number;
  successMarks: number;
  failureMarks: number;
  testId: string;
}

export interface Section {
  id: string;
  name: string;
  description?: string;
}

export interface TestAnswer {
  id: string;
  testId: string;
  userId: string;
  answers: QuestionAnswer[];
  submittedAt: string;
  totalScore?: number;
  status: 'pending' | 'reviewed' | 'graded';
}

export interface QuestionAnswer {
  questionId: string;
  answer: string;
  timeSpent: number;
  score?: number;
}

export interface Solution {
  id: string;
  questionId: string;
  solution: string;
  explanation?: string;
}

export enum TestType {
  MULTIPLE_CHOICE = 'Multiple Choice',
  TRUE_FALSE = 'True/False',
  SHORT_ANSWER = 'Short Answer',
  ESSAY = 'Essay',
  CODE = 'Code',
  FILL_IN_BLANK = 'Fill in the Blank'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
}
