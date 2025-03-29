"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// User
// async function addUser() {
//   const newUser = await prisma.user.create({
//     data: {
//       username: "test123",
//       email: "email@example.com"
//     }
//   })
//   console.log(newUser)
// }
// addUser()
//   .then(() => {
//     console.log("✅ Done!");
//     return prisma.$disconnect();
//   })
//   .catch((e) => {
//     console.error(e);
//     return prisma.$disconnect().then(() => process.exit(1));
//   });
function modifyUser() {
    return __awaiter(this, void 0, void 0, function* () { });
}
// add a new book
function addBook() {
    return __awaiter(this, void 0, void 0, function* () {
        const newBook = yield prisma.media.create({
            data: {
                type: "BOOK",
                book: {
                    create: {
                        isbn: "abcd",
                        title: "book one",
                        author: "author 1",
                    },
                },
                reviews: {
                    create: [
                        {
                            content: "the first review",
                            rating: 4.5,
                            userId: 'USER ABCD',
                            createdAt: ''
                        }
                    ],
                },
            },
        });
        console.log(newBook);
    });
}
addBook()
    .then(() => {
    console.log("✅ Done!");
    return prisma.$disconnect();
})
    .catch((e) => {
    console.error(e);
    return prisma.$disconnect().then(() => process.exit(1));
});
// Review
// async function addReview() {}
