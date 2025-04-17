"use strict";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// User
// async function addUser() {
//   const newUser = await prisma.user.create({
//     data: {
//       username: "test123",
//       email: "second.email@example.com"
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
// async function modifyUser() {}
// add a new book
// async function addBook() {
//   const newBook = await prisma.media.create({
//     data: {
//       type: "BOOK",
//       book: {
//         create: {
//           isbn: "abcd",
//           title: "book one",
//           author: "author 1",
//         },
//       },
//       reviews: {
//         create: [
//           { 
//             content: "the first review", 
//             rating: 4.5,
//             userId: '3c6ba8f1-9fd8-4733-bd5f-0ba614be73ad',
//           }
//         ],
//       },
//     },
//   });
//   console.log(newBook)
// }
// addBook()
//   .then(() => {
//     console.log("✅ Done!");
//     return prisma.$disconnect();
//   })
//   .catch((e) => {
//     console.error(e);
//     return prisma.$disconnect().then(() => process.exit(1));
//   });
// Review
// async function addReview() {}
