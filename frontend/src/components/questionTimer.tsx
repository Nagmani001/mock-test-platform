import { answerAtom, currentSectionAtom } from "@/atom/atom";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";

export default function QuestionTimer() {
  const [answer, setAnswer] = useAtom(answerAtom);
  const section = useAtomValue(currentSectionAtom);


  useEffect(() => {

    const intervalId = setInterval(() => {




    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  return <div>
    {answer.map((x: any) => {
      if (x.type == section) {
        return <div className="flex items-center space-x-1 bg-white rounded-md px-3 py-1 border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-1">
            <div className="font-bold text-lg text-gray-800">{x.questionTimeHour}</div>
            <div className="text-gray-400 font-bold">:</div>
            <div className="font-bold text-lg text-gray-800">{x.questionTimeMinute}</div>
          </div>
        </div>
      }
    })}
  </div>

}

