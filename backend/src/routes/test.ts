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

  const userId = req.userId;
  const userName = await prisma.user.findFirst({
    where: {
      id: userId
    },
  });
  const parsedData = pauseOrSubmitSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.json({
      msg: "invalid data"
    });
    return;
  };
  const testId = parsedData.data.testId;


  const fetchTestName = await prisma.test.findFirst({
    where: {
      id: testId
    },
    include: {
      question: true
    }
  });
  console.log(fetchTestName);
  if (!fetchTestName || !userName) {
    res.status(400).json({
      msg: "something went wrong "
    });
    return;
  }

  try {
    const submit = await prisma.testAnswer.create({
      data: {
        type: "Completed",
        remainingHour: parsedData.data.remainingHour,
        name: userName.name,
        testTitle: fetchTestName.title,
        totalQuestions: fetchTestName.question.length,
        totalTimeHour: fetchTestName.totalTimeHour,
        totalTimeMinute: fetchTestName.totalTimeMinute,
        totalTimeSecond: fetchTestName.totalTimeSecond,
        submittedAt: parsedData.data.submittedAt,
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

  const userName = await prisma.user.findFirst({
    where: {
      id: userId
    },
  });

  const testId = parsedData.data.testId;


  const fetchTestName = await prisma.test.findFirst({
    where: {
      id: testId
    },
    include: {
      question: true
    }
  });
  if (!fetchTestName || !userName) {
    res.status(400).json({
      msg: "something went wrong "
    });
    return;
  }
  try {
    const submit = await prisma.testAnswer.create({
      data: {
        type: "Paused",
        remainingHour: parsedData.data.remainingHour,
        remainingMinute: parsedData.data.remainingMinute,
        submittedAt: parsedData.data.submittedAt,
        remainingSecond: parsedData.data.remainingSecond,

        totalTimeHour: fetchTestName.totalTimeHour,
        totalTimeMinute: fetchTestName.totalTimeMinute,
        totalTimeSecond: fetchTestName.totalTimeSecond,
        name: userName.name,
        testTitle: fetchTestName.title,
        totalQuestions: fetchTestName.question.length,
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
