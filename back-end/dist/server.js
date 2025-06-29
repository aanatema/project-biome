"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const app = (0, express_1.default)();
const PORT = 3000;
// uses express to parse incoming requests
// and allows cross-origin requests from the front-end
// also parses cookies from incoming requests
// credentials are set to true to allow cookies to be sent
app.use(express_1.default.json(), (0, cookie_parser_1.default)(), (0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
// REQUESTS
app.use("/users", userRoutes_1.default);
app.use("/books", bookRoutes_1.default);
app.use("/api/auth", authRoutes_1.default);
// localhost:3000 home page
app.get("/", (req, res) => {
    res.json({ message: "HOME PAGE", url: req.url });
});
// to verify that the server started
app.listen(PORT, () => {
    console.log("Server started and listening on port", PORT);
});
