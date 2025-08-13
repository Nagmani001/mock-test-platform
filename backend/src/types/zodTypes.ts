import { z } from "zod";


export const signupAdminSchema = z.object({
  email: z.string(),
  name: z.string(),
  password: z.string(),
  adminCreatePassword: z.string()
});



export const signupSchema = z.object({
  email: z.string(),
  name: z.string(),
  password: z.string()
});

export const signinSchema = z.object({
  email: z.string(),
  password: z.string()
});


export const reviewSchema = z.object({
  message: z.string().optional(),
  stars: z.number().min(1).max(5),
  meaning: z.enum(["Poor", "Needs_Improvement", "Satisfactory", "Good", "Excellent"]),
});

export const pauseOrSubmitSchema = z.object({
  remainingHour: z.number(),
  remainingMinute: z.number(),
  remainingSecond: z.number(),
  testId: z.string(),
  submittedAt: z.string(),
  solution: z.array(z.object({
    questionId: z.string(),
    answer: z.string(),
    wordsNumber: z.number(),
    solutionTimeHour: z.number(),
    solutionTimeMinute: z.number(),
    solutionTimeSecond: z.number(),
    score: z.number().optional(),
    status: z.enum(["Answered", "Not_Answered", "Not_Visited", "Marked_For_Review", "Answered_And_Marked_For_Review"]),
  })),
});

export const createTestSchema = z.object({
  title: z.string(),
  totalQuestions: z.number(),
  language: z.string(),
  totalTimeHour: z.number(),
  totalTimeMinute: z.number(),
  totalTimeSecond: z.number(),
  sectionId: z.string(),
  questions: z.array(z.object({
    question: z.string(),
    type: z.enum(["ESSAY", "LETTER", "COMPREHENSION"]),
    totalMarks: z.number(),
    passingMarks: z.number(),
    words: z.number(),
    successMarks: z.number(),
    failureMarks: z.number(),
    questionTimeMinute: z.number().optional(),
    questionTimeSecond: z.number().optional(),
  }))
});


/*
  questionTimeSecond Int
  questionTimeMinute Int
}
 */
