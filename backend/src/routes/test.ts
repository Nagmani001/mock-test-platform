import { Router, Request, Response } from "express";
import { prisma } from "..";
import { pauseOrSubmitSchema } from "../types/zodTypes";
import { authMiddleware } from "../middleware.ts/middleware";

export const testRouter = Router();

testRouter.get("/", async (req: Request, res: Response) => {
  const tests = await prisma.test.findMany();
  console.log(tests);
  res.json({
    tests,
  });
});

testRouter.get("/:testId", async (req: Request, res: Response) => {
  const testId = req.params.testId;
  const test = await prisma.test.findFirst({
    where: {
      id: testId
    },
    include: {
      question: true
    }
  });
  console.log(test);
  res.json({
    msg: test
  })
});


testRouter.post("/submit", authMiddleware, async (req: Request, res: Response) => {
  const parsedData = pauseOrSubmitSchema.safeParse(req.body);
  const userId = req.userId;
  if (!parsedData.success) {
    res.json({
      msg: "invalid data"
    });
    return;
  };
  try {
    const submit = await prisma.testAnswer.create({
      data: {
        type: "Completed",
        remainingHour: parsedData.data.remainingHour,
        remainingMinute: parsedData.data.remainingMinute,
        remainingSecond: parsedData.data.remainingSecond,
        userId,
        testId: parsedData.data.testId,
        solution: {
          create: parsedData.data.solution
        }
      }
    });
    res.json({
      msg: "submitted"
    });
    return;
  } catch (err) {
    console.log(err);
    res.json({
      msg: "error while submitting request"
    })
  }
});

testRouter.post("/pause", authMiddleware, async (req: Request, res: Response) => {
  const parsedData = pauseOrSubmitSchema.safeParse(req.body);
  const userId = req.userId;
  if (!parsedData.success) {
    res.json({
      msg: "invalid data"
    });
    return;
  };
  try {
    const submit = await prisma.testAnswer.create({
      data: {
        type: "Paused",
        remainingHour: parsedData.data.remainingHour,
        remainingMinute: parsedData.data.remainingMinute,
        remainingSecond: parsedData.data.remainingSecond,
        userId,
        testId: parsedData.data.testId,
        solution: {
          create: parsedData.data.solution
        }
      }
    });
    res.json({
      msg: "paused"
    })
  } catch (err) {
    console.log("error", err);
    res.json({
      msg: "error while submitting request"
    })
  }
});
