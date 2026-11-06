
import express from "express";
import studentRoutes from "./student/student.routes";
const app = express();

// Middleware
app.use(express.json());

// Student Routes
app.use("/students", studentRoutes);

// Home Route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Student Management System API is running"
    });
});

export default app;
