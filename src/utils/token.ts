import jwt, { SignOptions } from "jsonwebtoken";

interface token {
  id: string;
  username: string;
  email: string;
  role: "USER" | "ADMIN";
}
export const generateAccessToken = (user: token): string => {
  const option: SignOptions = {
    expiresIn: "1d",
  };
  return jwt.sign(
    {
      userId: user.id,
      userName: user.username,
      email: user.email,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    option,
  );
};

export const generateRefreshToken = (user: token): string => {
  const option: SignOptions = {
    expiresIn: "20d",
  };
  return jwt.sign(
    {
      userId: user.id,
      userName: user.username,
      email: user.email,
      role: user.role,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    option,
  );
};
