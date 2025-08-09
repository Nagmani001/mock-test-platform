
export default function QuestionTimer() {
  const minute = 1;
  const second = 1;

  return (
    <div className="flex items-center space-x-1 bg-white rounded-md px-3 py-1 border border-gray-200 shadow-sm">
      <div className="flex items-center space-x-1">
        <div className="font-bold text-lg text-gray-800">{minute.toString().padStart(2, '0')}</div>
        <div className="text-gray-400 font-bold">:</div>
        <div className="font-bold text-lg text-gray-800">{second.toString().padStart(2, '0')}</div>
      </div>
    </div>
  );
}
