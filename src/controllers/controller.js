import bcrypt from "bcryptjs";
import User from "../model/users.model.js";
import Product from "../model/product.model.js";
import { generateToken } from "../lib/utils.js";
import Cart from "../model/cart.model.js";

export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must contain at least 6 characters!" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!passwordMatch) {
        return res
          .status(400)
          .json({ message: "Invalid credentials. Incorrect password." });
      }

      generateToken(existingUser._id, res);

      return res.status(200).json({
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        message: "User already exists. Logged in successfully.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
    });

    await newUser.save();

    generateToken(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      message: "User registered successfully.",
    });
  } catch (err) {
    console.error(`Error in registerUser controller: ${err.message}`);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const getProductsList = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const addProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  try {
    const role = req.user.role;
    if (role !== "admin") {
      return res.status(400).json({ message: "Access denied!" });
    }
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Failed to create product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const role = req.user.role;
    if (role !== "admin") {
      return res.status(400).json({ message: "Access denied!" });
    }
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const role = req.user.role;
    if (role !== "admin") {
      return res.status(400).json({ message: "Access denied!" });
    }
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};

export const createCart = async (req, res) => {
  const userId = req.user._id;
  const { items = [] } = req.body;

  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { items } },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error("Error in createOrUpdateCart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const removeItemsFromCart = async (req, res) => {
  const userId = req.user._id;
  const { productIds } = req.body;

  if (!Array.isArray(productIds) || productIds.length === 0) {
    return res
      .status(400)
      .json({ message: "productIds must be a non-empty array" });
  }

  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { items: { product: { $in: productIds } } } },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error("Error removing items from cart:", error);
    res.status(500).json({ message: "Failed to remove items" });
  }
};
