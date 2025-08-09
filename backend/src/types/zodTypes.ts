import { z } from "zod";
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
  solution: z.array(z.object({
    questionId: z.string(),
    answer: z.string(),
    wordsNumber: z.number(),
    solutionTimeHour: z.number(),
    solutionTimeMinute: z.number(),
    solutionTimeSecond: z.number(),
    status: z.enum(["Answered", "Not_Answered", "Not_Visited", "Marked_For_Review", "Answered_And_Marked_For_Review"]),
  })),
});


/*
model TestAnswer {
  id              String     @id @default(uuid())
  remainingSecond Int
  remainingMinute Int
  remainingHour   Int
  userId          String
  testId          String     @unique
  solution        Solution[]
  Test            Test       @relation(fields: [testId], references: [id])
  User            User       @relation(fields: [userId], references: [id])
}

model Solution {
  id                 String         @id @default(uuid())
  answer             String
  wordsNumber        Int
  solutionTimeMinute Int
  solutionTimeSecond Int
  solutionTimeHour   Int
  status             SolutionStatus
  questionId         String         @unique
  testAnswerId       String
  TesaAnswer         TestAnswer     @relation(fields: [testAnswerId], references: [id])
  question           Question       @relation(fields: [questionId], references: [id])
}
 */


/*
enum SolutionStatus {
  Answered
  Not_Answered
  Not_Visited
  Marked_For_Review
  Answered_And_Marked_For_Review
}
 */
