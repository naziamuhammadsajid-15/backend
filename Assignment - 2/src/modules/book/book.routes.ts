
import { Router } from "express";
import {
  getBooks,
  getBookById,
  createBook,
  replaceBook,
  updateBook,
  deleteBook,
} from "./book.controller";

const router = Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", createBook);
router.put("/:id", replaceBook);
router.patch("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
