import cors from "cors";
import cookieparser from "cookie-parser";
import express from "express";
import errorMiddleware from "./middlewares/error-middleware";

import authRoute from "./routes/auth";
import lessonRoute from "./routes/lesson";
import lessonPlaceRoute from "./routes/lesson-places";
import locationRoute from "./routes/location";
import teacherRoute from "./routes/teacher";

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

app.get("/cloudinary", (req, res) => {
  const preset = process.env.UPLOAD_PRESET;
  const cloudName = process.env.CLOUD_NAME;

  res.json({ preset, cloudName });
});

app.use("/auth", authRoute);
app.use("/lesson", lessonRoute);
app.use("/lesson-place", lessonPlaceRoute);
app.use("/location", locationRoute);
app.use("/teacher", teacherRoute);

app.use(errorMiddleware);

export default app;
