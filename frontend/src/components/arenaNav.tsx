import { DialogDemo } from "./dialogue"

export default function ArenaNav({ title, name }: {
  title: string | undefined,
  name: string
}) {
  return (
    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
      <div className="flex items-center">
        <h3 className="text-2xl font-bold text-white tracking-wide">{title || "Test Arena"}</h3>
      </div>
      <div className="flex items-center space-x-6">
        <DialogDemo />
        <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-sm rounded-full py-2 px-4">
          <div className="flex items-center space-x-3">
            <span className="text-white font-medium text-base">{name}</span>
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white text-blue-600 font-bold text-lg shadow-sm">
              {name[0].toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
