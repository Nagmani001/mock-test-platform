export default function ShieldBadge({ number, type }:
  {
    number: number,
    type: "Success" | "Failure" | "Standard-neutral" | "Neutral"
  }) {
  return (
    <div className="relative w-12 h-10 cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-400 to-red-700 clip-shield flex items-center justify-center text-white font-semibold text-sm shadow-md">
        {number}
      </div>
    </div>
  );
}
