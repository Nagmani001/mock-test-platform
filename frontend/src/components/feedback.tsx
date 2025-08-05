import PrimartBtn from "./primaryBtn";
import Rating from "./rating-ui";

export default function Feedback() {
  return <div className="flex flex-col gap-y-4 border border-black rounded-xl p-4">
    <div className="font-semibold text-xl">Ratings and Reviews</div>
    <div>How was the test Experience?</div>
    <Rating />
    <input value="asdf" />
    <PrimartBtn label="Post" onClick={() => {
      alert("clicked")
    }} />
  </div>
}
