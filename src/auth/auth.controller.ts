import { Request, Response } from "express";
import { login, logoutUser, register } from "./auth.service";
import { asyncHandler } from "../utils/asyncHandler";


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

export const userLogin = asyncHandler(async(req: Request, res: Response)=>{
  const {email, password} = req.body
  const user = await login({email, password})
  return res.status(200).json({
    success: true,
    message: `user login successfully`,
    data: user 
    
  })
})

export const userLogout = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user.id;

    await logoutUser(userId);

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  }
);