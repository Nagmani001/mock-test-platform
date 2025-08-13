import { Router, Request, Response } from "express";
import { prisma } from "..";

export const submissionRouter = Router();

interface Submissions {
  userName: string,
  testTitle: string,
  submittedAt: string,
  score?: number,
  status: string,
  totalQuestions: number,
  timeSpent: string
}

submissionRouter.get("/getAll", async (req: Request, res: Response) => {
  const findSubmissionl = await prisma.testAnswer.findMany({
    include: {
      solution: true
    }
  });

  const data: Submissions[] = [];

  findSubmissionl.map(x => {
    const timeSpentHour = x.totalTimeHour - x.remainingHour;
    const timeSpentMinute = x.totalTimeMinute - x.remainingMinute;
    const timeSpentSecond = x.totalTimeSecond - x.remainingSecond;

    let scored = false;
    let totalMarks = 0;
    let numberOfQuestion = 0;

    findSubmissionl.map(x => {
      x.solution.map(y => {
        if (y.score != null) {
          scored = true;
          totalMarks += y.score;
          numberOfQuestion++;
        }
      })
    });

    const percentage = (totalMarks / numberOfQuestion * 100) * 100;

    const toPush = {
      id: x.id,
      userName: x.name,
      testTitle: x.testTitle,
      submittedAt: x.submittedAt.toString(),
      timeSpent: `${timeSpentHour}h ${timeSpentMinute}m ${timeSpentSecond}s`,
      status: scored ? "graded" : "pending",
      score: percentage,
      totalQuestions: numberOfQuestion
    };
    data.push(toPush);
  });

  res.json(data);

});

submissionRouter.get("/getOne/:id", (req: Request, res: Response) => {
  const id = req.params.id;



});
