# Bookstore API

A RESTful API for managing a Bookstore, built with **TypeScript**, **Express**, and **PostgreSQL**. Supports role-based access, JWT authentication, and full CRUD operations for users, books, and orders.

## Table of Contents

- [Bookstore API](#bookstore-api)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
  - [Environment Variables](#environment-variables)
  - [Database](#database)
  - [API Endpoints](#api-endpoints)
    - [Auth](#auth)
    - [Users (ADMIN only)](#users-admin-only)
    - [Books](#books)
    - [Orders](#orders)
  - [Swagger Documentation](#swagger-documentation)
  - [License](#license)

## Features

- User registration and login with JWT access and refresh tokens
- Role-based access control: `ADMIN`, `STAFF`, `CUSTOMER`
- Books module with stock tracking and soft deletion (`is_active`)
- Orders module with multiple items, status tracking (`PENDING`, `PAID`, `CANCELLED`)
- Password security with hashing and account lock on multiple failed attempts
- Error handling, input validation, and logging
- API documentation with Swagger UI

## Tech Stack

- **Node.js** + **Express.js**
- **TypeScript**
- **PostgreSQL**
- **Zod** for input validation
- **JWT** for authentication
- **Swagger** for API documentation
- **Docker** (optional for database setup)

## Getting Started

- **Clone the repository**

```bash
git clone https://github.com/maruf-pfc/bookstore-api
cd bookstore-api/server
```

- **Install dependencies**

```bash
bun install
```

- **Setup environment variables**

See [Environment Variables](#environment-variables)

- **Run the API**

```bash
bun dev
```

API will run at `http://localhost:5000/docs`

## Environment Variables

Create a `.env` file in the root:

```env
PORT=5000
DATABASE_URL=postgres://user:password@localhost:5432/bookstore
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d
```

## Database

- `users` table: store user info, roles, password hash, failed login attempts
- `books` table: store book info, price, stock, and active status
- `orders` table: store user orders with total and status
- `order_items` table: store books in each order with price snapshots

## API Endpoints

### Auth

* `POST /api/v1/auth/register`
* `POST /api/v1/auth/login`
* `POST /api/v1/auth/refresh`

### Users (ADMIN only)

* `GET /api/v1/users`
* `GET /api/v1/users/:id`
* `PUT /api/v1/users/:id`
* `DELETE /api/v1/users/:id`

### Books

* `GET /api/v1/books`
* `GET /api/v1/books/:id`
* `POST /api/v1/books` (ADMIN/STAFF)
* `PUT /api/v1/books/:id` (ADMIN/STAFF)
* `DELETE /api/v1/books/:id` (ADMIN)

### Orders

* `GET /api/v1/orders` (ADMIN/STAFF)
* `GET /api/v1/orders/:id` (ADMIN/STAFF/CUSTOMER)
* `POST /api/v1/orders` (CUSTOMER)
* `PUT /api/v1/orders/:id/status` (ADMIN/STAFF)

## Swagger Documentation

Visit `http://localhost:5000/docs` for interactive API docs.

## License

Apache License
