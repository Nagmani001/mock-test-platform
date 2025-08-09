export default function QuestionPanel({ question }: {
  question: string
}) {
  return <div className="font-bold text-xl p-4">
    Q. {question}
  </div>
}
