import { BASE_URL } from "@/config/utils";
import axios from "axios";

export default function ArenaFooter() {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => {
            // Handle mark for review and next
          }} 
          className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 transform hover:scale-105"
        >
          Mark for Review & Next
        </button>
        <button 
          onClick={() => {
            // Handle clear response
          }} 
          className="px-6 py-2 bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold rounded-lg shadow-md hover:from-gray-500 hover:to-gray-600 transition-all duration-200 transform hover:scale-105"
        >
          Clear Response
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => {
            // Handle next
          }} 
          className="px-8 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
        >
          Next
        </button>
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
          className="px-8 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105"
        >
          Submit Test
        </button>
      </div>
    </div>
  );
}
