import jwt from "jsonwebtoken";
import User from "../model/users.model.js";

export const protectRoute = async (req, res, next) => {
  const token = req.cookies.jwt;
  try {
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Invalid token provided" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    console.log(user);
    next();
  } catch (error) {
    console.log("Error in protect route middleware: " + error.message);
    return res.status(500).json({ message: "Internal server error!" });
  }
};
