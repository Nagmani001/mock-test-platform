export default function Faq({ heading, subHeading }: {
  heading: string,
  subHeading: string
}) {
  return <div className="flex flex-col gap-y-3 mt-5">
    <h1 className="font-semibold text-xl">{heading}</h1>
    <p className="text-base ">{subHeading}</p>
  </div>
}
