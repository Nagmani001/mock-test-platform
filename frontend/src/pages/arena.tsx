import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { BASE_URL } from "../config/utils";
import ArenaNav from "../components/arenaNav";
import ArenaFooter from "../components/arenaFooter";
import TimerSection from "../components/timeSection";
import SecondaryNav from "../components/secondaryNav";
import LeftPanel from "@/components/panel";
import { useAtom, useSetAtom } from "jotai";
import { answerAtom, questionAtom } from "@/atom/atom";

export default function Arena() {
  const questionId = useParams();
  const [questionInfo, setQuestionInfo] = useAtom(questionAtom);
  const setAnswer = useSetAtom(answerAtom);
  useEffect(() => {
    const main = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/test/${questionId.id}`);
        const { id, title, totalTimeHour, totalTimeMinute, totalTimeSecond, question } = res.data.msg;


        const actualQuestion = question.map((x: any) => {
          return {
            id: x.id,
            question: x.question,
            type: x.type,
            words: x.words,
            successMarks: x.successMarks,
            failureMarks: x.failureMarks,
            questionTimeHour: x.questionTimeHour,
            questionTimeMinute: x.questionTimeMinute,
          }
        });
        setAnswer(actualQuestion.map((x: any) => {
          return {
            id: x.id, // questionId
            words: x.words, // words allowed
            answer: "",
            type: x.type,
            status: "Not_Visited",
            questionTimeHour: x.questionTimeHour,
            questionTimeMinute: x.questionTimeMinute,
            //TODO: you want solution time : hour , minute and second
          }
        }));
        setQuestionInfo({
          id,
          title,
          totalTimeHour,
          totalTimeMinute,
          totalTimeSecond,
          question: actualQuestion
        });
      } catch (err) {
        console.log("error", err);
      }
    }
    main();
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 h-20 bg-white shadow-sm border-b border-gray-200">
        <ArenaNav title={questionInfo.title} name="Nagmani Upadhyay" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex min-h-0">
        {/* Left Panel */}
        <div className="flex-1 flex flex-col min-w-0">
          <SecondaryNav />
          <div className="flex-1 bg-white shadow-sm">
            <LeftPanel />
          </div>
        </div>

        {/* Right Panel - Timer Section */}
        <div className="w-80 flex-shrink-0 bg-white shadow-lg border-l border-gray-200">
          <TimerSection />
        </div>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 h-16 bg-white shadow-sm border-t border-gray-200">
        <ArenaFooter />
      </div>
    </div>
  );
}
