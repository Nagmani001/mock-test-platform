import { Router, Request, Response } from "express";
import { prisma } from "..";
import { reviewSchema } from "../types/zodTypes";

export const reviewRouter = Router();

reviewRouter.get("/", async (req: Request, res: Response) => {
  const reviews = await prisma.review.findMany({
    skip: 0,
    take: 5,
    orderBy: {
      stars: "desc"
    }
  });
  console.log(reviews);
  res.json({
    msg: reviews
  });
});

reviewRouter.post("/", async (req: Request, res: Response) => {
  console.log(req.body);
  const parsedData = reviewSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      msg: "invalid data"
    });
    return;
  }
  try {
    const addReview = await prisma.review.create({
      data: {
        stars: parsedData.data.stars,
        message: parsedData.data.message,
        meaning: parsedData.data.meaning
      }
    });
    res.json({
      msg: addReview
    });
    return;
  } catch (err) {
    console.log(err);
  }
});
