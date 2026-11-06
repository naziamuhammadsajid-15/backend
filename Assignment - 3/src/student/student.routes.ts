
import { Router } from "express";

import {
    getAllStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent
} from "./student.controller";

const router = Router();

// Get all students
router.get("/", getAllStudents);

// Get student by ID
router.get("/:id", getStudentById);

// Add new student
router.post("/", addStudent);

// Update student
router.put("/:id", updateStudent);

// Delete student
router.delete("/:id", deleteStudent);

export default router;
