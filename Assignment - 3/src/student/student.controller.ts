
import { Request, Response } from "express";
import { Student } from "../interfaces/student.interface";

// In-memory array
let students: Student[] = [];

// GET: Get all students
export const getAllStudents = (req: Request, res: Response) => {
    try {
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// GET: Get student by ID
export const getStudentById = (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid student ID" });
        }

        const student = students.find(s => s.id === id);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// POST: Add new student
export const addStudent = (req: Request, res: Response) => {
    try {
        const { name, age, email, course, isActive } = req.body;

        if (
            typeof name !== "string" || !name.trim() ||
            typeof age !== "number" || age <= 0 ||
            typeof email !== "string" || !email.includes("@") ||
            typeof course !== "string" || !course.trim() ||
            typeof isActive !== "boolean"
        ) {
            return res.status(400).json({ message: "Invalid student data" });
        }

        const newStudent: Student = {
            id: students.length > 0
                ? Math.max(...students.map(s => s.id)) + 1
                : 1,
            name,
            age,
            email,
            course,
            isActive
        };

        students.push(newStudent);

        res.status(201).json({
            message: "Student added successfully",
            student: newStudent
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// PUT: Update student
export const updateStudent = (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid student ID" });
        }

        const { name, age, email, course, isActive } = req.body;

        if (
            typeof name !== "string" || !name.trim() ||
            typeof age !== "number" || age <= 0 ||
            typeof email !== "string" || !email.includes("@") ||
            typeof course !== "string" || !course.trim() ||
            typeof isActive !== "boolean"
        ) {
            return res.status(400).json({ message: "Invalid student data" });
        }

        const student = students.find(s => s.id === id);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        student.name = name;
        student.age = age;
        student.email = email;
        student.course = course;
        student.isActive = isActive;

        res.status(200).json({
            message: "Student updated successfully",
            student
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// DELETE: Delete student
export const deleteStudent = (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid student ID" });
        }

        const index = students.findIndex(s => s.id === id);

        if (index === -1) {
            return res.status(404).json({ message: "Student not found" });
        }

        students.splice(index, 1);

        res.status(200).json({
            message: "Student deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
