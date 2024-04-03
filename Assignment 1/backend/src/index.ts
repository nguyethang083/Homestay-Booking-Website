import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express(); //create new express app
app.use(express.json()); //convert the body of API requests into Json automatically
app.use(express.urlencoded({ extended: true })); //parse the URL to get to create the parameters
app.use(cors()); //prevent certain requests from certain URLS if it doesnt agree with them
// our frontend and backend will be on different port -> block. this helps to configure and stop the block

app.use("/api/users", userRoutes);

app.listen(7000, () => {
  console.log("server is running on localhost:7000");
});
