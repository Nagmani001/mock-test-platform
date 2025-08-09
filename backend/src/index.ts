import express, { Request, response, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { userRouter } from "./routes/user";
import { testRouter } from "./routes/test";
import { reviewRouter } from "./routes/review";


declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}
const app = express();
export const prisma = new PrismaClient();
app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/test", testRouter);
app.use("/api/v1/review", reviewRouter);



app.listen(3000, () => {
  console.log("Server is running on port 3000");
})
