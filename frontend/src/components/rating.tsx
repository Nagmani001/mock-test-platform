import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

import { toast } from "sonner"
import axios from "axios";
import { BASE_URL } from "@/config/utils";
import Review from "./review";

interface Review {
  id: string,
  meaning: string,
  message: string,
  stars: number,
  timeStamp: Date
}
export default function Rating() {
  const [comment, setComment] = useState<string | null>("");
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState<number>(2);
  const [meaning, setMeaning] = useState<string>("");
  const [reviews, setReview] = useState<Review[]>([]);

  useEffect(() => {
    const main = async () => {
      try {
        const ratings = await axios.get(`${BASE_URL}/api/v1/review`);
        setReview(ratings.data.msg);
      } catch (err) {
        console.log(err);
      }
    }
    main();
  }, []);

  return <div className="flex flex-col gap-y-5 mt-10">
    <h1 className="font-semibold text-2xl">Ratings and Reviews</h1>
    <div>How was the test Experience?</div>
    <div className="rating">
      <input onChange={() => {
        setRating(1);
        setMeaning("Poor");
      }} type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="1 star" />
      <input onChange={() => {
        setRating(2);
        setMeaning("Needs improvement");
      }}
        type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="2 star" defaultChecked />
      <input onChange={() => {
        setRating(3);
        setMeaning("Satisfactory");
      }}
        type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="3 star" />
      <input onChange={() => {
        setRating(4);
        setMeaning("Good");
      }}
        type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="4 star" />
      <input onChange={() => {
        setRating(5);
        setMeaning("Excellent");
      }}
        type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="5 star" />
    </div>
    <div className="font-semibold text-base">{meaning}</div>
    <Textarea placeholder="comment (optional)" onChange={(e: any) => {
      setComment(e.target.value);
    }} />
    <Button variant="primary" onClick={async () => {
      try {
        setLoading(true);
        await axios.post(`${BASE_URL}/api/v1/review`, {
          message: comment,
          stars: rating,
          meaning: meaning == "Needs improvement" ? "Needs_Improvement" : meaning
        });
        setLoading(false);
        // not working
        toast("review sent successfully");
      } catch (err) {
        console.log(err);
      }
    }} className="w-25">{loading ? <span className="loading loading-dots loading-md"></span> :
      "Post"
      }</Button>
    {reviews.map((review: Review) => {
      return <Review name="R20A031 ANUSHA " date="27th Nov 2024" stars={review.stars} comment={review.message} />
    })}
  </div >

}

