import { Router, Request, Response } from "express";
import prisma from "../prisma";
import { createTestSchema } from "../types/zodTypes";


export const adminRouter = Router();

adminRouter.get("/info", async (req: Request, res: Response) => {
  try {
    const totalSubmissions = await prisma.testAnswer.count();
    const testCount = await prisma.test.count();
    const activeUsers = await prisma.user.count();
    res.json({
      totalSubmissions,
      testCount,
      activeUsers,
    });
    return;
  } catch (err) {
    console.log(err);
    res.status(403).json({
      msg: "failed to fetch data",
    });
  }
});

adminRouter.post("/create-test", async (req: Request, res: Response) => {
  console.log(req.body);
  const parsedData = createTestSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({
      msg: "invalid data"
    });
    return;
  }
  try {
    await prisma.test.create({
      data: {
        title: parsedData.data.title,
        totalQuestions: parsedData.data.totalQuestions,
        totalTimeHour: parsedData.data.totalTimeHour,
        totalTimeMinute: parsedData.data.totalTimeMinute,
        totalTimeSecond: parsedData.data.totalTimeSecond,
        sectionId: parsedData.data.sectionId,
        question: {
          create: parsedData.data.questions.map(x => {
            return {
              question: x.question,
              type: x.type,
              words: x.words,
              successMarks: x.successMarks,
              failureMarks: x.failureMarks,
              totalMarks: x.totalMarks,
              comprehension: x.comprehension
            }
          }),
        },
      }
    });
    res.status(200).json({
      msg: "test created successfully"
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: "something went wrong, invalid data "
    })
  }
});


/*
adminRouter.post("/create-compreheision", async (req: Request, res: Response) => {
  const parsedData = createComprehension.safeParse(req.body);
  if (!parsedData.success) {
    res.status(401).json({
      msg: "invalid data",
    })
    return;
  }
  try {
    const question = await prisma.question.create({
      data: {
        totalMarks: parsedData.data.totalMarks,
        successMarks: parsedData.data.successMarks,
        failureMarks: parsedData.data.failureMarks,
        testId: parsedData.data.testId,
        question: parsedData.data.title,
        type: "COMPREHENSION"
      }
    });
    Promise.all(
      parsedData.data.questions.map(async (x: any) => {
        await prisma.comprehenshion.create({
          data: {
            title: x.title,
            questionId: question.id
          }
        });
      })
    );
    res.json({
      msg: "comprehenshion created successfully"
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      msg: "error occured"
    });
  }
});
  */
