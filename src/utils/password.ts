import bcrypt from "bcrypt";

export const hash_Password = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};
export const compare_Password = async (newPassword: string, password: string):Promise <boolean> => {
  return await bcrypt.compare(newPassword, password);
};
