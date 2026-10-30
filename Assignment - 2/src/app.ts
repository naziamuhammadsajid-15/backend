
import express from "express";
import routes from "./routes/routes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Book Store API is running!",
  });
});

app.use("/api", routes);

export default app;
