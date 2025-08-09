export default function NotVisited({ number }: {
  number: number
}) {
  return <div className="w-[38px] h-[47px] flex flex-col items-center justify-center bg-slate-300 rounded-md">
    <div className="h-full w-full flex items-center justify-center">
      {number}
    </div>
  </div>
}
