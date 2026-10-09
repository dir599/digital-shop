import { Request, Response } from "express";
import { makeAdmin } from "./admin.service";


export const promoteToAdmin = async (
  req: Request,
  res: Response
) => {
  const userId = Number(req.params.id);

  const user = await makeAdmin(userId);

  return res.status(200).json({
    message: "User promoted to admin successfully",
    user,
  });
};