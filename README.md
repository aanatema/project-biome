# Biome - Online reading journal 📖

**Biome** is a personal library where you can add your latest reading and share your thoughts on it.
Each user can register, login, add a book and a review. Infos like the title and author are retrieved with [Open Library](https://openlibrary.org/dev/docs/api/books) or [Google Books Api](https://developers.google.com/books/docs/v1/using?hl=en), using the book ISBN.

---

## Goal

This project was created in the process of obtaining the **RNCP level 6 qualification - Applications Designer and Developer**. It covers the three blocks of skills required by the reference framework:


- Development of a secure application
- Layered design and development
- Preparation for deployment as part of a DevOps approach


## Targeted users


- People interested in reading and keeping track of their books
- People interested in sharing and reading other opinions


## Main features


- 🧾 Account creation (registration)
- 🔐 Secure connection (JWT + httpOnly cookies)
- 📚 Add read books to your library
- 🔎 Retrieve book information via the Open Library API
- 📝 Add a personal review of each book read


## Technical stack 

### Frontend
- React 19 + Vite
- TypeScript
- Tailwind CSS 4 (shadcn)
- Radix UI (shadcn)
- React Hook Form
- React Router
- Lucide Icons (shadcn)
- Sonner (notifications) (shadcn)
- ESLint / TypeScript strict

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL (relational database)
- JWT (authentication)
- Bcrypt (password hash)
- Cookie-parser (secure handling of tokens)
- Dotenv

## Installation

### Backend
1. ``` cd back-end ```
Install dependencies
2. ``` yarn install ```
Typescript compile
3. ``` yarn build ```
Launch dev server
4. ``` yarn dev ```

### Frontend
1. ``` cd front-end ```
Install dependencies
2. ``` yarn install ```
Typescript compile
3. ``` yarn build ```
Launch dev server
4. ``` yarn dev ```


## Documentation

- This README
- Google doc referencing common errors/mistake encountered 
- Biome thesis


## Improvements

### User oriented

- Allow user to modify their reviews
- Add in app ratings
- Allow users to like and comment under other users reviews
- Add a follow system
- Add a "library card" summarizing monthly reads


### Dev oriented 

- Add CI/CD
- Add tests to ensure quality


## Credits 

Project created by Romane Boireau as part of the **RNCP level 6 qualification - Applications Designer and Developer**.


## node_modules and .env issue

At moments, I rushed the developpement of this project and did not pay enough attention to my pushes, and on some older branches you can see that the node_modules and .env are present. 
Now, all sensitive information has been removed and changed to ensure the security of this project. I will pay more attention to the subject in the future.

