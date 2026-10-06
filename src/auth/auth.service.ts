import prisma from "../database/prisma";
import { hash_Password } from "../utils/password";

interface RegisterData {
  username: string;
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
