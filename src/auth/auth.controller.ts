import { Request, Response } from "express";
import { register } from "./auth.service";


export const registerUser = async (
  req: Request,
  res: Response
) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({
      message: "Username, email and password are required",
    });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({
      message: "Password must be at least 6 characters",
    });
    return;
  }
  

  const user = await register({
    username,
    email,
    password,
  });

  res.status(201).json({
    message: "User registered successfully",
    user,
  });
};