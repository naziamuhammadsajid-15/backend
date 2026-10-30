
import { Request, Response } from "express";

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  stock: number;
}

let books: Book[] = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 1200,
    stock: 10,
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    price: 1500,
    stock: 8,
  },
];

let nextId = 3;

// GET all books
export const getBooks = (req: Request, res: Response) => {
  res.status(200).json({ success: true, data: books });
};

// GET book by ID
export const getBookById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const book = books.find((item) => item.id === id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  return res.status(200).json({ success: true, data: book });
};

// POST new book
export const createBook = (req: Request, res: Response) => {
  const { title, author, price, stock } = req.body;

  if (
    !title ||
    !author ||
    typeof price !== "number" ||
    typeof stock !== "number"
  ) {
    return res.status(400).json({
      message: "Title, author, numeric price and numeric stock are required",
    });
  }

  const newBook: Book = {
    id: nextId++,
    title,
    author,
    price,
    stock,
  };

  books.push(newBook);
  return res.status(201).json({ success: true, data: newBook });
};

// PUT: replace all book details
export const replaceBook = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, author, price, stock } = req.body;
  const index = books.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (
    !title ||
    !author ||
    typeof price !== "number" ||
    typeof stock !== "number"
  ) {
    return res.status(400).json({
      message: "All book fields are required for PUT",
    });
  }

  books[index] = { id, title, author, price, stock };
  return res.status(200).json({ success: true, data: books[index] });
};

// PATCH: update selected book details
export const updateBook = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const book = books.find((item) => item.id === id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  const { title, author, price, stock } = req.body;

  if (title !== undefined) book.title = title;
  if (author !== undefined) book.author = author;
  if (price !== undefined) book.price = price;
  if (stock !== undefined) book.stock = stock;

  return res.status(200).json({ success: true, data: book });
};

// DELETE book
export const deleteBook = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = books.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  const deletedBook = books.splice(index, 1)[0];
  return res.status(200).json({
    success: true,
    message: "Book deleted successfully",
    data: deletedBook,
  });
};
