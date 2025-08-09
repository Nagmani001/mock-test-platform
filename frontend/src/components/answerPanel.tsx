import { useAtom, useAtomValue } from "jotai";
import { Textarea } from "./ui/textarea";
import { currentSectionAtom, questionAtom } from "@/atom/atom";

export default function AnserPanel({ words }: {
  words: number
}) {
  const [questionInfo, setQuestionInfo] = useAtom(questionAtom);
  const currentSection = useAtomValue(currentSectionAtom);
  const currentAnswer = questionInfo.question.filter(x => x.type == currentSection)[0].answer;

  let wordsArr = "sadf".split(" ");
  let wordsLength = wordsArr.length;
  return <div>
    {questionInfo.question.map(x => {
      if (x.type == currentSection)
        return <Textarea onChange={(e: any) => {
        }}
          value={x.answer}
        />
      return
    })}
    <div className="bg-slate-200 p-4 rounded-md flex justify-end">Words:{words - wordsLength + 1 > 0 ? words - wordsLength + 1 : <span className="text-red-500"> You have reached your word limit</span>}</div>
  </div>
}
