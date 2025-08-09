import clsx from "clsx"
import QuestionTimer from "./questionTimer";
import { useAtom, useAtomValue } from "jotai";
import { currentSectionAtom, questionAtom } from "@/atom/atom";

export default function SecondaryNav() {
  const questionInfo = useAtomValue(questionAtom);
  const [currentSection, setCurrentSection] = useAtom(currentSectionAtom);

  return <div className="flex justify-between gap-x-2 p-3 ">
    <div className="flex gap-x-2">
      {questionInfo.question.map((question) => {
        return <button key={question.id} onClick={() => {
          console.log(question.id);
          console.log(question.type)
          setCurrentSection(question.type);
        }} className={clsx(currentSection == question.type ? "cursor-pointer bg-blue-500 text-white p-3 rounded-md " : " cursor-pointer bg-slate-200 text-black p-3 rounded-md ")}>{question.type == "ESSAY" ? "Essay" : question.type == "LETTER" ? "Letter" : "Comprehension"} Writing</button>
      })}
    </div>

    <div className="flex items-center gap-x-4">
      <div className="flex gap-x-2">
        {/*TODO: timer should work properly and persisted to solution state */}
        <div className="font-semibold">Question time:  </div>
        <QuestionTimer minute={2} second={30} />
      </div>
      {questionInfo.question.map(x => {
        if (x.type == currentSection) {
          return <div className="font-semibold">Marks: <span className="text-green-600">+{x.successMarks}</span> | <span className="text-red-600">-{x.failureMarks}</span></div>
        }
      })}
    </div>
  </div>
}
/*
      <button onClick={() => {

      }} className={clsx(questionInfo.question[0].type == "ESSAY" ? "cursor-pointer bg-blue-500 text-white p-3 rounded-md " : " cursor-pointer bg-slate-200 text-black p-3 rounded-md ")}>Essary writing</button>
 */
