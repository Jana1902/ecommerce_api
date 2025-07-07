# 🛍️ E-commerce API

A RESTful API for an e-commerce application built with Node.js, Express, and MongoDB.

## ✨ Features

- User registration and login with JWT authentication
- Role-based access (admin & user)
- Product CRUD (create, read, update, delete)
- Shopping cart functionality per user
- Password hashing with bcrypt
- CORS support for frontend integration

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB Atlas or local MongoDB

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ecommerce-api.git
   cd ecommerce-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment variables**
   
   Create a `.env` file in the root directory:
   ```ini
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the server**
   ```bash
   npm start
   ```

## 🛡️ Authentication & Authorization

- Users must register and log in to receive a JWT token
- Use cookie-parser to handle JWTs in HTTP-only cookies
- Admin-only routes are protected with middleware

## 📚 API Endpoints

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register-user` | Register a new user |

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/add-product` | Create a product (admin) |
| GET | `/products` | List all products |
| PUT | `/update-product/:id` | Update product (admin) |
| DELETE | `/delete-product/:id` | Delete product (admin) |

### Cart

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/carts` | Create a cart for user |
| DELETE | `/api/carts/items` | Remove items from the cart |

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | Secret key for JWT signing |

## 🧰 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- bcrypt
- jsonwebtoken
- cookie-parser
- cors

## 📂 Project Structure

```
src/
  controllers/
    controller.js
  models/
    user.model.js
    product.model.js
    cart.model.js
  middleware/
    protectRoute.js
  routes/
    auth.route.js
    product.route.js
    cart.route.js
  index.js
```

## ✨ Example .env

```ini
MONGO_URI=mongodb+srv://yourusername:yourpassword@cluster.mongodb.net/ecommerce
JWT_SECRET=your_super_secret_key
```
