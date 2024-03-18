import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "no token found" });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, id) => {
    if (err) return res.status(403).json({ error: "not authorize" });
    req.id = id;
    next();
  });
};
export default verifyToken;
