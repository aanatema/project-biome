import express from "express"
import { newBookMedia, allBooks } from "../controllers/bookController";

const router = express.Router(); 

router.post("/new_book", newBookMedia);
router.get("/books_list", allBooks )
router.get("/books_list/isbn/:isbn", )
export default router;
