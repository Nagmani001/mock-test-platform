import { useNavigate } from "react-router-dom";

export default function DescriptiveTestCard({
  id,
  title,
  questions,
  time,
}: {
  id: string
  title: string;
  questions: number;
  time: number;
}) {
  const navigate = useNavigate();
  return (
    <div className="border rounded-md p-4 shadow-sm w-3xl mx-auto">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <hr className="my-2" />
      <div className="flex justify-between items-center flex-wrap text-sm text-gray-600">
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <span>
            <span className="font-medium text-gray-400">Questions :</span> {questions}
          </span>
          <span>
            <span className="font-medium text-gray-400">Time :</span> {time}
          </span>
        </div>
        <div className="text-purple-700 font-medium text-sm flex items-center gap-1">
          <button className="cursor-pointer" onClick={() => {
            navigate(`/tests/${id}`);
          }}>Start</button>
          <button className="text-black cursor-pointer">View Results</button>
        </div>
      </div>
    </div>
  );
}
