export default function PrimartBtn({ label, onClick }: {
  label: string,
  onClick: any
}) {
  return <button className="cursor-pointer" onClick={onClick}>{label}</button>
}
