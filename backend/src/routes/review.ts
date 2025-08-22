import { Router, Request, Response } from "express";
import { prisma } from "..";
import { reviewSchema } from "../types/zodTypes";
import { authMiddleware } from "../middleware.ts/middleware";

export const reviewRouter = Router();

reviewRouter.get("/", async (req: Request, res: Response) => {
  const reviews = await prisma.review.findMany({
    skip: 0,
    take: 5,
    orderBy: {
      stars: "desc"
    }
  });
  res.json({
    msg: reviews
  });
});

reviewRouter.post("/", authMiddleware, async (req: Request, res: Response) => {
  const userId = req.userId;
  const userDetails = await prisma.user.findFirst({ where: { id: userId } });
  if (!userDetails) {
    res.json({
      msg: "error occured",
    });
    return;
  }
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
        meaning: parsedData.data.meaning,
        name: userDetails?.name
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
