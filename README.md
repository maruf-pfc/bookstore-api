# 📚 Readify – Full-Stack Bookstore Application

Readify is a modern full-stack Bookstore application designed to provide a seamless experience for readers and administrators.  
Built with **Express.js, TypeScript, PostgreSQL** on the backend and **Next.js, TailwindCSS, ShadCN** on the frontend.

## ✨ Features

### 🔹 Backend (API)

- User authentication with JWT & refresh tokens
- Role-based access control (RBAC) – Admin, User
- CRUD operations for books, categories, and users
- Order & cart management
- Input validation with **Zod**
- PostgreSQL database
- Auto-generated API docs with **Swagger**

### 🔹 Frontend (Client)

- Built with **Next.js 15 & TypeScript**
- Modern UI with **TailwindCSS & ShadCN**
- Authentication & protected routes
- Browse, search, and filter books
- Shopping cart & checkout system
- Admin dashboard for managing users, books, and orders
- Responsive, SEO-friendly design

## 🛠 Tech Stack

**Backend**

- Node.js, Express.js, TypeScript
- PostgreSQL
- Zod for validation
- JWT for auth
- Swagger for API docs

**Frontend**

- Next.js 15, React, TypeScript
- TailwindCSS, ShadCN, Framer Motion
- Axios for API calls
- React Query / TanStack Query for data fetching

## 📂 Project Structure

```txt
readify/
│── server/ # Backend (Express + TS + PostgreSQL + Drizzle)
│ ├── src/
│ └── ...
│
│── client/ # Frontend (Next.js + TailwindCSS + TS + ShadCN)
│ ├── app/
│ ├── components/
│ └── ...
│── LICENSE
│── README.md # Project documentation

```

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/maruf-pfc/readify.git
cd readify
```

### 2. Setup Backend

```bash
cd server
cp .env.example .env
bun install
bun run dev
```

- Visit Swagger API docs → [http://localhost:5555/docs](http://localhost:5555/docs)

### 3. Setup Frontend

```bash
cd ../client
cp .env.example .env
pnpm install
pnpm run dev
```

- Visit frontend → [http://localhost:3000](http://localhost:3000)

## 📸 Screenshots (TODO)

- Home page (Upcoming)
- Book details (Upcoming)
- Admin dashboard (Upcoming)

## 🛡️ Security

- Hashed passwords with bcrypt
- JWT-based authentication
- Role-based access control

## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you’d like to improve.

## 📜 License

This project is licensed under the Apache License.
