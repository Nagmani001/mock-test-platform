export default function Describe({ heading, subHeading }: {
  heading: string,
  subHeading: string
}) {
  return <div className="flex flex-col gap-y-3">
    <h1 className="font-semibold text-2xl">{heading}</h1>
    <p className="text-base ">{subHeading}</p>
  </div>
}
