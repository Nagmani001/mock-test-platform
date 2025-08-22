import { atom } from "jotai";

export const testTimerAtom = atom({
  hour: 0,
  minute: 0,
  second: 0
});

export const questionTimeAtom = atom([]);
export const answerAtom = atom([]);

export const sectionAtom = atom([]);

export const currentSectionAtom = atom("ESSAY");


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

