
import { Router } from "express";
import bookRoutes from "../modules/book/book.routes";
import userRoutes from "../modules/user/user.routes";

const router = Router();

router.use("/books", bookRoutes);
router.use("/users", userRoutes);

export default router;
