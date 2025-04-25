"use strict";
// TODO : add router ? add delete and post route route
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const app = (0, express_1.default)();
const PORT = 3000;
// maybe change this to be more secure ? localhost:3000 doesn't work
app.use(express_1.default.json(), (0, cors_1.default)({
    origin: "http://localhost:5173",
}));
// REQUESTS
app.use("/users", userRoutes_1.default);
app.use("/books", bookRoutes_1.default);
// localhost:3000 home page
app.get("/", (req, res) => {
    res.send("this is a get request");
    res.json({ content: "this is some content", url: req.url });
});
// delete the book
app.delete("/delete/isbn/:isbn/reviews/:reviewId", (req, res) => {
    res.end();
});
app.listen(PORT, () => {
    console.log("Server started and listening on port", PORT);
});
