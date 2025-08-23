import { Router, Request, Response } from "express";
import { clerkClient, getAuth, requireAuth } from "@clerk/express";
import prisma from "../prisma";
import { pauseOrSubmitSchema } from "../types/zodTypes";

export const testRouter = Router();

testRouter.get("/", async (req: Request, res: Response) => {
  const tests = await prisma.test.findMany();
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
  res.json({
    msg: test
  })
});

testRouter.post("/submit", requireAuth(), async (req: Request, res: Response) => {

  const parsedData = pauseOrSubmitSchema.safeParse(req.body);
  const { userId } = getAuth(req);



  if (!parsedData.success || !userId) {
    res.json({
      msg: "invalid data"
    });
    return;
  };


  const user = await clerkClient.users.getUser(userId)

  const timeSpent = "asdf"

  try {
    await prisma.testAnswer.create({
      data: {
        timeSpent,
        type: parsedData.data.type,
        remainingHour: parsedData.data.remainingHour,
        remainingMinute: parsedData.data.remainingMinute,
        remainingSecond: parsedData.data.remainingSecond,
        submittedAt: parsedData.data.submittedAt,
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

testRouter.post("/pause", requireAuth(), async (req: Request, res: Response) => {
  const parsedData = pauseOrSubmitSchema.safeParse(req.body);
  const { userId } = getAuth(req);
  if (!parsedData.success || !userId) {
    res.json({
      msg: "invalid data"
    });
    return;
  };

  const user = await clerkClient.users.getUser(userId)

  const testDetails = await prisma.test.findFirst({
    where: {
      id: parsedData.data.testId
    }
  });

  if (!testDetails) {
    return;
  }

  const totalTimeInSeconds = (testDetails?.totalTimeHour * 3600) + (testDetails.totalTimeMinute * 60) + (testDetails.totalTimeSecond);
  const remainingTotalTimeInSeconds = (parsedData.data.remainingHour * 3600) + (parsedData.data.remainingMinute * 60) + parsedData.data.remainingSecond;
  console.log("totalTimeInSeconds", totalTimeInSeconds);
  console.log("remainingTotalTimeInSeconds ", remainingTotalTimeInSeconds);



  const timeSpent = "asdf";

  try {
    await prisma.testAnswer.create({
      data: {
        timeSpent,
        remainingHour: parsedData.data.remainingHour,
        remainingMinute: parsedData.data.remainingMinute,
        type: parsedData.data.type,
        remainingSecond: parsedData.data.remainingSecond,
        submittedAt: parsedData.data.submittedAt,
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
