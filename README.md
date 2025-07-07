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

The API will be available at: `http://localhost:PORT` (where PORT is defined in your .env file)

## 🛡️ Authentication & Authorization

- Users must register and log in to receive a JWT token
- Use cookie-parser to handle JWTs in HTTP-only cookies
- Admin-only routes are protected with middleware

## 📚 API Endpoints

### Auth

#### Register User
- **POST** `/register-user`
- **Description**: Register a new user or login if user exists
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user" // or "admin"
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "_id": "user_id",
    "name": "john doe",
    "email": "john@example.com",
    "role": "user",
    "message": "User registered successfully."
  }
  ```

### Products (Protected Routes)

#### Get All Products
- **GET** `/products`
- **Headers**: `Authorization: Bearer <token>` (or cookie)
- **Response** (200 OK):
  ```json
  [
    {
      "_id": "product_id",
      "name": "Product Name",
      "description": "Product description",
      "price": 29.99,
      "category": "Electronics",
      "stock": 100
    }
  ]
  ```

#### Add Product (Admin Only)
- **POST** `/add-product`
- **Headers**: `Authorization: Bearer <token>` (or cookie)
- **Request Body**:
  ```json
  {
    "name": "New Product",
    "description": "Product description",
    "price": 49.99,
    "category": "Electronics",
    "stock": 50
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "_id": "product_id",
    "name": "New Product",
    "description": "Product description",
    "price": 49.99,
    "category": "Electronics",
    "stock": 50
  }
  ```

#### Update Product (Admin Only)
- **PATCH** `/update-product/:id`
- **Headers**: `Authorization: Bearer <token>` (or cookie)
- **Request Body** (any fields to update):
  ```json
  {
    "name": "Updated Product Name",
    "price": 59.99,
    "stock": 75
  }
  ```
- **Response** (200 OK): Updated product object

#### Delete Product (Admin Only)
- **DELETE** `/delete-product/:id`
- **Headers**: `Authorization: Bearer <token>` (or cookie)
- **Response** (200 OK):
  ```json
  {
    "message": "Product deleted successfully"
  }
  ```

### Cart (Protected Routes)

#### Create/Update Cart
- **POST** `/add-cart`
- **Headers**: `Authorization: Bearer <token>` (or cookie)
- **Request Body**:
  ```json
  {
    "items": [
      {
        "product": "product_id",
        "quantity": 2
      },
      {
        "product": "another_product_id",
        "quantity": 1
      }
    ]
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "_id": "cart_id",
    "user": "user_id",
    "items": [
      {
        "product": "product_id",
        "quantity": 2
      }
    ]
  }
  ```

#### Remove Items from Cart
- **POST** `/remove-cartitems`
- **Headers**: `Authorization: Bearer <token>` (or cookie)
- **Request Body**:
  ```json
  {
    "productIds": ["product_id_1", "product_id_2"]
  }
  ```
- **Response** (200 OK): Updated cart object

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
PORT=3000
MONGO_URI=mongodb+srv://yourusername:yourpassword@cluster.mongodb.net/ecommerce
JWT_SECRET=your_super_secret_key
```

## 📝 Notes

- All product and cart routes require authentication
- Admin-only routes (add, update, delete products) require admin role
- JWT tokens are handled via HTTP-only cookies
- User registration also handles login if user already exists
- Cart operations are user-specific and automatically linked to authenticated user