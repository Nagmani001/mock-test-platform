export default function MarkedForReview({ number }: {
  number: number
}) {
  return <div className="w-[47px] h-[47px] flex flex-col justify-center items-center rounded-full bg-purple-700">
    <div className="flex justify-center items-center h-full w-full">
      {number}
    </div>
  </div>
}
