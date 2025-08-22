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
  type: z.enum(["Paused", "Completed"]),
  testId: z.string(),
  submittedAt: z.string(),
  solution: z.array(z.object({
    answer: z.string(),
    status: z.enum(["Answered", "Not_Answered", "Not_Visited", "Marked_For_Review", "Answered_And_Marked_For_Review"]),
    wordsNumber: z.number(),
    questionId: z.string(),
  })),
});

export const createTestSchema = z.object({
  title: z.string(),
  totalQuestions: z.number(),
  totalTimeHour: z.number(),
  totalTimeMinute: z.number(),
  totalTimeSecond: z.number(),
  sectionId: z.string(),
  questions: z.array(z.object({
    question: z.string(),
    type: z.enum(["ESSAY", "LETTER", "COMPREHENSION"]),
    words: z.number(),
    successMarks: z.number(),
    failureMarks: z.number(),
    totalMarks: z.number(),
  }))
});


export const feedBackSchema = z.object({
  feedbacks: z.array(z.object({
    key: z.string(),
    value: z.string(),
  })),
  rating: z.array(z.object({
    key: z.string(),
    value: z.number(),
  })),
  id: z.string()
});
