import { Request, Response } from "express";
import { forgetPasswordServices, login, logoutUser, register, resetPasswordService} from "./auth.service";
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
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/"
  }
  return res.status(200)
  .cookie("accessToken", user.accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  })
  .cookie("refreshToken", user.refreshToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  })
  .json({
    success: true,
    message: `user login successfully`,
    data: user 
    
  })
})

export const userLogout = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id;
    
    await logoutUser(userId);

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  }
);

export const forgerPassword = asyncHandler(async(req: Request, res: Response)=>{
   const {email} = req.body as {email: string}
   if(!email || typeof email !== "string"){
    throw new Error("Email or Password is not valid")
   }
   await forgetPasswordServices(email)
   return res.status(200).json({
    success: true,
    message: "If an account is exist with that email, a reset link will be send "
   })
})

export const resetPassword = asyncHandler(async(req: Request, res: Response)=>{
  const {token} = req.params
  const {password} = req.body as {password: string}
  if(!password || !token || typeof token !== "string"){
    throw new Error("Invalid token or password is required")
  }
  const success = await resetPasswordService(token, password)
  if(!success){
    return res.status(400).json({
      message: "Invalid or expired reset link"
    })
  }
  return res.status(200).json({
    message: "Password reset successfully"
  })
})