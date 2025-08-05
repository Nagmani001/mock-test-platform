import express, { Request, response, Response } from "express";
import { PrismaClient } from "@prisma/client";


const app = express();
const prisma = new PrismaClient();
app.use(express.json());


// one more when user clicks on a specific yearBasedSection 
app.get("/yearBasedTest", async (req: Request, res: Response) => {
  const { section } = req.body();
  const ans = await prisma.yearBasedSection.findMany({
    where: {
      sectionId: section
    },
  });
  console.log(response);
  res.json({
    msg: "sent data",
    data: ans
  });
});


app.get("/tests", async (req: Request, res: Response) => {
  const { yearBasedId } = req.body();

  const ans = await prisma.test.findMany({
    where: {
      yearBasedSectionId: yearBasedId
    },
  });
  console.log(response);
  res.json({
    msg: "sent data",
    data: ans
  });
});





app.listen(3000, () => {
  console.log("Server is running on port 3000");
})
