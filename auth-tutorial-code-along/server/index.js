import express from "express";
import jwt from "jsonwebtoken";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
const app = express();
const PORT = process.env.PORT || 5000;
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
app.use((req, res, next) => {
  console.log(`\n\n\n${req.method.toUpperCase()} : ${req.originalUrl}`);
  next();
});

app.use(
  express.static("../dist"),
  express.json(),
  express.urlencoded({ extended: true }),
  cookieParser()
);

connectDB();

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
