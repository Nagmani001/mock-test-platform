export default function YearBasedSection({ imageUrl, title, totalTests }: {
  imageUrl: string,
  title: string,
  totalTests: number
}) {
  return <div className="flex flex-col items-center gap-y-6 rounded-lg border border-black shadow-neutral-50 p-4 w-3xs">
    <div className="flex flex-col items-center gap-y-2">
      <div className="h-10 w-10 ">
        <img src={imageUrl} />
      </div>
      <div className="font-semibold">{title}</div>
    </div>
    <div className="flex flex-col items-center gap-y-2">
      <div className="text-slate-500">
        {totalTests} Online Mock Tests
      </div>
      <div className="border border-black px-6 py-2 rounded-xl w-full bg-[#fbdefb] text-sm hover:text-slate-700">
        View Mock Tests
      </div>
    </div>

  </div>
}
