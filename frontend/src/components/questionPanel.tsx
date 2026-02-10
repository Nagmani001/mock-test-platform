export default function QuestionPanel({ question, comprehension }: { question: string, comprehension: string[] }) {
  return (
    <div className="h-full flex flex-col bg-gray-50 rounded-2xl shadow-md">
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
        <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">Question</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <p className="h-[40vh] w-full overflow-y-auto text-gray-800 text-lg leading-relaxed mb-6">
          {question}
        </p>

        {comprehension.length > 0 && (
          <div className="h-[25vh] overflow-y-auto space-y-4">
            {comprehension.map((x: string, idx: number) => (
              <div
                key={idx}
                className="overflow-y-auto flex flex-col gap-y-1 bg-white shadow-sm rounded-xl px-4 py-3 text-gray-700 text-base leading-relaxed hover:shadow-md transition"
              >
                <div>
                  Question: {idx + 1}
                </div>
                {x}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
