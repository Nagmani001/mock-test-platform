export default function QuestionPanel({ question }: { question: string }) {
  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4">
        <h2 className="text-xl font-bold text-gray-800">Question</h2>
      </div>
      <div className="flex-1 p-6">
        <div
          className="h-[61vh] w-full  overflow-y-auto resize-none border-0 focus:ring-0 text-gray-700 text-lg leading-relaxed p-6"
        >
          {question}
        </div>
      </div>
    </div>
  );
}
