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
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the server**
   ```bash
   npm start
   ```

The API will be available at: `http://localhost:5000`

## 🛡️ Authentication & Authorization

- Users must register and log in to receive a JWT token
- Use cookie-parser to handle JWTs in HTTP-only cookies
- Admin-only routes are protected with middleware

## 📚 API Endpoints

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register a new user |
| POST | `/api/users/login` | Log in an existing user |
| POST | `/api/users/logout` | Log out |

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/products` | Create a product (admin) |
| GET | `/api/products` | List all products |
| GET | `/api/products/:id` | Get product details |
| PUT | `/api/products/:id` | Update product (admin) |
| DELETE | `/api/products/:id` | Delete product (admin) |

### Cart

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/carts` | Create a cart for user |
| PUT | `/api/carts` | Update cart items |
| DELETE | `/api/carts/items` | Remove items from the cart |

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Server port |
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
    auth.controller.js
    product.controller.js
    cart.controller.js
  models/
    user.model.js
    product.model.js
    cart.model.js
  middleware/
    protectRoute.js
    adminOnly.js
  routes/
    auth.route.js
    product.route.js
    cart.route.js
  app.js
```

## ✨ Example .env

```ini
PORT=5000
MONGO_URI=mongodb+srv://yourusername:yourpassword@cluster.mongodb.net/ecommerce
JWT_SECRET=your_super_secret_key
```
