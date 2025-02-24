"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_1 = require("./books");
const app = (0, express_1.default)();
const PORT = 3000;
// model : app.METHOD(PATH,HANDLER)
app.get("/books_list", (req, res) => {
    res.json({ result: books_1.bookList });
    console.log(books_1.bookList);
});
app.get("/books_list/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    console.log(res.send(`isbn: ${isbn}`));
});
// localhost:3000 home page
app.get("/", (req, res) => {
    res.send("this is a get request");
    // example of json format
    res.json({ content: "this is some content", url: req.url });
});
// post the book
app.post("/post", (req, res) => {
    res.send("example");
});
// delete the book
app.delete("/delete", (req, res) => {
    res.end();
});
app.listen(PORT, () => {
    console.log("Server started and listening on port", PORT);
});
