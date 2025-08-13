import { atom } from "jotai";

export const testTimerAtom = atom({
  hour: 1,
  minute: 1,
  second: 5
});

export const questionTimeAtom = atom([]);
export const answerAtom = atom([]);

export const currentSectionAtom = atom("ESSAY");


// locked
export const questionAtom = atom({
  id: "",
  title: "",
  totalTimeHour: 0,
  totalTimeMinute: 0,
  totalTimeSecond: 0,
  question: [{
    id: "",
    question: "",
    type: "",
    words: 0,
    successMarks: 0,
    failureMarks: 0,
  }, {
    id: "",
    question: "",
    type: "",
    words: 0,
    successMarks: 0,
    failureMarks: 0,
  }]
});

export const solutionAtom = atom({
  testId: "",
  remainingHour: "",
  remainingMinute: "",
  remainingSecond: "",
  solution: [{
    questionId: "",
    answer: "",
    wordsNumber: "", // total number of words user typed
    solutionTimeHour: "",
    solutionTimeMinute: "",
    solutionTimeSecond: "",
    status: ""
  },
  {
    questionId: "",
    answer: "",
    wordsNumber: "", // total number of words user typed
    solutionTimeHour: "",
    solutionTimeMinute: "",
    solutionTimeSecond: "",
    status: ""
  }
  ]
});

/*
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
 */
