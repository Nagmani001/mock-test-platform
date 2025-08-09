import { BASE_URL } from "@/config/utils";
import axios from "axios";

export default function ArenaFooter() {
  return <div className="flex justify-between">
    <div className="flex items-center gap-x-3 ">
      <button onClick={() => {

      }} className="cursor-pointer bg-slate-200 text-black p-3 rounded-md">Mark for review and next</button>
      <button onClick={() => {
      }} className="cursor-pointer bg-slate-200 text-black p-3 rounded-md">Clear response</button>
    </div>
    <div className="flex items-center gap-x-3">
      <button onClick={() => {

      }} className="cursor-pointer bg-slate-200 text-black p-3 rounded-md w-[150px]">Next</button>
      <button
        onClick={async () => {
          try {
            // managing state first 
            await axios.post(`${BASE_URL}/api/v1/test/submit`, {
              remainingHour: 0,
              type: "Completed",
              remainingMinute: 10,
              remainingSecond: 40,
              testId: "c431d030-f17d-4397-9d7b-cbb1ab8e06b5",
              solution: [{
                questionId: "b310448f-c10f-484e-8c20-cd591efcb564",
                answer: "this is example essay ",
                wordsNumber: 100,
                solutionTimeHour: 0,
                solutionTimeMinute: 10,
                solutionTimeSecond: 4,
                status: "Answered"
              }]
            });
          } catch (err) {
            console.log(err);
          }
        }}
        className="cursor-pointer bg-blue-500 text-white m-1 p-2  font-bold w-sm  rounded-md ">Submit</button>
    </div>
  </div>
}
