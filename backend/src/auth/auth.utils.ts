import jwt from "jsonwebtoken";

export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, "SECRET_KEY", { expiresIn: "1h" });
};
