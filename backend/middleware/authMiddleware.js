import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];  
  
  if (!token) return res.status(401).send("Access Denied: No Token Provided");

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; 
    next();
  } catch (error) {
    console.log("Token verification failed:", error.message);
    res.status(400).send("Invalid Token");
  }
}

export default authMiddleware;
