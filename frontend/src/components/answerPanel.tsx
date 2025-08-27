import { useAtom, useAtomValue } from "jotai";
import { Textarea } from "./ui/textarea";
import { answerAtom, currentSectionAtom } from "@/atom/atom";

export default function AnserPanel({ words }: {
  words: number,
}) {
  const [answer, setAnswer] = useAtom(answerAtom);
  const currentSection = useAtomValue(currentSectionAtom);

  //@ts-ignore
  let wordsArr = answer.find((x: any) => x.type == currentSection)?.answer.split(" ");
  let wordsLength = wordsArr.length;
  const remainingWords = words - wordsLength + 1;

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4">
        <h2 className="text-xl font-bold text-gray-800">Your Answer</h2>
      </div>
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {answer.map((x: any) => {
            if (x.type == currentSection) {
              return (
                <Textarea
                  key={x.id}
                  onChange={(e: any) => {
                    setAnswer((prev: any) => {
                      const newArr = prev.map((y: any) => {
                        if (y.id == x.id) {
                          return {
                            ...y,
                            answer: e.target.value,
                            wordsTyped: wordsLength
                          }
                        } else { return y }
                      })
                      return newArr;
                    });
                  }}
                  value={x.answer}
                  placeholder="Start typing your answer here..."
                  className="h-[50vh] overflow-y-auto resize-none border-0 focus:ring-0 text-gray-700 text-lg leading-relaxed p-6"
                />
              );
            }
            return null;
          })}
        </div>
        <div className="mt-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">Word Count</span>
            <div className="flex items-center space-x-2">
              {remainingWords > 0 ? (
                <span className="font-bold text-green-600">{remainingWords} words remaining</span>
              ) : (
                <span className="font-bold text-red-500">Word limit reached</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
