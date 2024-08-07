import http from "http";
import dotenv from "dotenv";
import app from "./app";
import mongoose from "mongoose";
dotenv.config();

mongoose.connect(process.env.MONGO_URI!)
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});