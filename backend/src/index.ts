import "dotenv/config";
import express from "express";
import cors from "cors";
import { userRouter } from "./routes/user";
import { testRouter } from "./routes/test";
import { reviewRouter } from "./routes/review";
import { adminUserRouter } from "./routes/adminUser";
import { adminRouter } from "./routes/admin";
import { submissionRouter } from "./routes/viewSubmission";
import { feedbackRouter } from "./routes/feedback";
import { clerkMiddleware } from "@clerk/express";
import { webhookRouter } from "./routes/webhook";
import { authMiddleware } from "./middleware.ts/middleware";
import { resultRouter } from "./routes/result";


declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}
const app = express();
app.use(express.json());
app.use(cors());

// user side routes
app.use("/api/v1/user", clerkMiddleware(), userRouter);
app.use("/api/v1/test", clerkMiddleware(), testRouter);
app.use("/api/v1/review", clerkMiddleware(), reviewRouter);


// admin side routes
app.use("/api/v1/admin/user", adminUserRouter);

app.use("/api/v1/admin/", authMiddleware, adminRouter);
app.use("/api/v1/admin/submission", authMiddleware, submissionRouter);

app.use("/api/v1/admin/feedback", authMiddleware, feedbackRouter);
app.use("/api/webhook/user", webhookRouter);
app.use("/api", resultRouter);




app.listen(3000, () => {
  console.log("Server is running on port 3000");
})
