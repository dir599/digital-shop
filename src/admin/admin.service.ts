import prisma from "../database/prisma";

export const makeAdmin = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role: "ADMIN",
    },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
    },
  });
};