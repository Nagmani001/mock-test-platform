import { FaList } from "react-icons/fa";
export default function AnsweredAndMarkedForReview({ number }: { number: number }) {
  return (
    <div className="relative w-[47px] h-[47px]">
      <div className="w-full h-full flex flex-col justify-center items-center rounded-full bg-purple-700 text-white">
        {number}
      </div>

      <div className="absolute bottom-0 right-0 w-[16px] h-[16px] bg-green-500 rounded-[4px] flex items-center justify-center border border-white">
        <FaList className="text-white text-[10px]" />
      </div>
    </div>
  );
}
