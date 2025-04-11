import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User  from '../models/user.model';

export const registerUser = async (data: any) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return await User.create({ ...data, password: hashedPassword });
};

export const loginUser = async ({ email, password }: { email: string; password: string }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return jwt.sign({ id: user._id, email: user.email }, "SECRET_KEY", { expiresIn: "1h" });
};
