import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./model/User.js";
import jwt from "jsonwebtoken";
dotenv.config();
console.log("process.env.MONGO_URL : ", process.env.MONGO_URL);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("process.env.MONGO_URL : ", process.env.MONGO_URL);
    console.log("connected to mongoDB");
  });

const app = express();

app.use(express.json());
app.get("/api", (req, res) => {
  res.send("hello from the server");
});

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  console.log("username : ", username);
  console.log("password : ", password);
  const createdUser = await User.create({ username, password });
  jwt.sign(
    { userID: createdUser._id },
    process.env.JWT_SECRET,
    (err, token) => {
      if (err) {
        console.log("err : ", err);
        throw err;
      } else {
        res.cookie("token", token);
        res.status(201).json(user);
      }
    },
  );
});

app.listen(process.env.PORT || 6968, () => {
  console.log("======================================================");
  console.log("listening on port ", process.env.PORT || 6968);
});
