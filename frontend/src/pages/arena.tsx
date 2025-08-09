import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { BASE_URL } from "../config/utils";
import ArenaNav from "../components/arenaNav";
import ArenaFooter from "../components/arenaFooter";
import TimerSection from "../components/timeSection";
import SecondaryNav from "../components/secondaryNav";
import LeftPanel from "@/components/panel";
import { useAtom } from "jotai";
import { questionAtom } from "@/atom/atom";

/*
interface Question {
  id: string,
  title: string,
  totalTimeHour: 0,
  totalTimeMinute: 0,
  totalTimeSecond: 0,
  question: [{
    id: string,
    question: string,
    type: string,
    words: 0,
    successMarks: 0,
    failureMarks: 0,
  }, {
    id: string,
    question: string,
    type: string,
    words: 0,
    successMarks: 0,
    failureMarks: 0,
  }]
}
*/

export default function Arena() {
  const questionId = useParams();
  const [questionInfo, setQuestionInfo] = useAtom(questionAtom);
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
            failureMarks: x.failureMarks
          }
        });
        setQuestionInfo({
          id,
          title,
          totalTimeHour,
          totalTimeMinute,
          totalTimeSecond,
          question: actualQuestion
        });
        console.log("nagmani", questionInfo);
      } catch (err) {
        console.log("error", err);
      }
    }
    main();
  }, []);

  return <div className="h-screen ">
    <div className="h-[8%]">
      <ArenaNav title={questionInfo.title} name="Nagmani Upadhyay" />
    </div>
    <div className="flex h-[84%] ">
      <div className="basis-[80%] ">
        <SecondaryNav />
        <hr className="border-t border-slate-300 " />
        <LeftPanel />
      </div>
      <div className="basis-[20%]">
        <TimerSection />
      </div>
    </div>
    <hr className="border-t border-slate-300 " />
    <div className="flex flex-col justify-center h-[8%]">
      <ArenaFooter />
    </div>
  </div >
}
