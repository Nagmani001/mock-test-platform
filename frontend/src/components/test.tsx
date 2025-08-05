import PrimartBtn from "./primaryBtn"

export default function Test({ language, questions, time }: {
  language: string,
  questions: number,
  time: number
}) {
  return <div className="flex flex-col gap-y-4 w-6xl border border-black p-4">
    <div>
      SBI PO 2025 Prelims Mock Test - 1
    </div>
    <div className="flex justify-between">
      <div className="flex gap-x-3">
        <div>Language: <span>{language}</span></div>
        <div>Question: <span>{questions}</span></div>
        <div>Time: <span>{time} minutes</span></div>
      </div>
      <div className="">
        <PrimartBtn label="Resume" onClick={() => {

        }} />
      </div>
    </div>
  </div>

}
