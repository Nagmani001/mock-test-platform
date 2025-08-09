import Timer from "./timer";
import Badge from "./successbadge";
import FailBadge from "./failBadge";
import MarkedForReview from "./markedForReview";
import NotVisited from "./notVisited";
import AnsweredAndMarkedForReview from "./answeredAndMarkedForReview";

export default function TimerSection() {

  return <div>
    <div className="flex items-center justify-center p-2 font-medium text-md bg-slate-100 gap-x-2">
      <div>Time left </div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke-width="1.5" stroke="currentColor" className="size-5">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    </div>
    <Timer hour={1} minute={2} />
    <div className="flex justify-center bg-slate-100 p-1 mt-1 font-bold text-md"> Instructions</div>
    <div className="grid grid-cols-2 gap-3 mt-2 mx-2">

      <div className="flex gap-x-2 items-center">
        <Badge number={0} />
        <div>Answered</div>
      </div>

      <div className="flex gap-x-2 items-center">
        <FailBadge number={0} />
        <div>Not Answered</div>
      </div>

      <div className="flex gap-x-2 items-center">
        <NotVisited number={0} />
        <div>Not Visited</div>
      </div>

      <div className="flex gap-x-2 items-center">
        <MarkedForReview number={0} />
        <div>Marked For Review</div>
      </div>

    </div>

    <div className="flex gap-x-2 items-center mt-2 mx-2">
      <AnsweredAndMarkedForReview number={0} />
      <div>Answered and Marked For Review</div>
    </div>

    <div className="flex justify-center bg-blue-500 text-white p-2 mt-4">section writing</div>
    <div className="grid grid-cols-3 bg-blue-200 gap-2 h-[300px] ">
      <div className="flex justify-center">
        <FailBadge number={0} />
      </div>

      <div className="flex justify-center">
        <FailBadge number={0} />
      </div>

      <div className="flex justify-center">
        <FailBadge number={0} />
      </div>

    </div>


  </div>
}
