
import { Request, Response } from "express";

interface User {
  id: number;
  name: string;
  email: string;
}

let users: User[] = [
  { id: 1, name: "Ali", email: "ali@example.com" },
  { id: 2, name: "Sara", email: "sara@example.com" },
];

let nextUserId = 3;

// GET all users
export const getUsers = (req: Request, res: Response) => {
  return res.status(200).json({ success: true, data: users });
};

// GET user by ID
export const getUserById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = users.find((item) => item.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ success: true, data: user });
};

// POST new user
export const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: "Name and email are required",
    });
  }

  const newUser: User = {
    id: nextUserId++,
    name,
    email,
  };

  users.push(newUser);
  return res.status(201).json({ success: true, data: newUser });
};

// PUT: replace all user details
export const replaceUser = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, email } = req.body;
  const index = users.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!name || !email) {
    return res.status(400).json({
      message: "Name and email are required for PUT",
    });
  }

  users[index] = { id, name, email };
  return res.status(200).json({ success: true, data: users[index] });
};

// PATCH: update selected user details
export const updateUser = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = users.find((item) => item.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { name, email } = req.body;

  if (name !== undefined) user.name = name;
  if (email !== undefined) user.email = email;

  return res.status(200).json({ success: true, data: user });
};

// DELETE user
export const deleteUser = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = users.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  const deletedUser = users.splice(index, 1)[0];

  return res.status(200).json({
    success: true,
    message: "User deleted successfully",
    data: deletedUser,
  });
};
