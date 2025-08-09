import { DialogDemo } from "./dialogue"

export default function ArenaNav({ title, name }: {
  title: string | undefined,
  name: string
}) {
  return <div className="flex justify-between bg-blue-500 p-4 ">
    <div className="flex items-center text-white font-semibold">{title}</div>
    <div className="flex gap-x-3 items-center text-white">
      <DialogDemo />
      <div className="flex items-center gap-x-3">
        <div>{name}</div>
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white text-black">
          {name[0].toUpperCase()}
        </div>
      </div>
    </div>
  </div>
}
