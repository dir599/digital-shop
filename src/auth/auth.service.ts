import prisma from "../database/prisma";
import { compare_Password, hash_Password } from "../utils/password";
import { randomBytes, createHash } from "crypto";
import { sendResetEmail } from "../utils/email";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}
interface LoginData {
  email: string;
  password: string;
}
export const register = async (data: RegisterData) => {
  const { username, email, password } = data;
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (existingUser) {
    throw new Error("user already exist");
  }

  const hashedPassword = await hash_Password(password);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
  return user;
};

export const login = async (data: LoginData) => {
  const { email, password } = data;
  if (!email) {
    throw new Error("Invalid email or password");
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const validPassword = await compare_Password(password, user.password);
  if (!validPassword) {
    throw new Error("Email or password is invalid");
  }
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
};

export const logoutUser = async (userId: number) => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      refreshToken: null,
    },
  });
};

export const forgetPasswordServices = async (email: string): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) return;
  const resetToken = randomBytes(32).toString("hex");

  const hashedToken = createHash("sha256").update(resetToken).digest("hex");

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      resetPasswordToken: hashedToken,
      resetPasswordExpires: new Date(Date.now() + 15 * 60 * 1000),
    },
  });
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`
  await sendResetEmail(user.email, resetUrl)
};

