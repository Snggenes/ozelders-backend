import cors from "cors";
import cookieparser from "cookie-parser";
import express from "express";
import errorMiddleware from "./middlewares/error-middleware";

import authRoute from "./routes/auth";
import lessonRoute from "./routes/lesson";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.use("/auth", authRoute);
app.use("/lesson", lessonRoute);

app.use(errorMiddleware);

export default app;
