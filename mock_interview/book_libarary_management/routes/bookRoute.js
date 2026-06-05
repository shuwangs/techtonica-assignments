import { Router } from "express";
import {
    addBook, getAllBooks, getOutStockBooks, getBooksByAuthor, borrowBook,
    returnBook, getBorrowHistory
} from "../controller/bookController.js";
const router = Router();



router.post("/", addBook);
router.get("/", getAllBooks);
router.get("/out-of-stock", getOutStockBooks);
router.get("/author", getBooksByAuthor);

router.post("/:id/borrow", borrowBook);
router.post("/:id/return", returnBook);

router.get("/:id/history", getBorrowHistory);

export default router;