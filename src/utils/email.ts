import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMPT_HOST,
  port: Number(process.env.SMPT_HOST),
  secure: process.env.smtp_secure === "true",
  auth: {
    user: process.env.SMPT_USER,
    pass: process.env.SMPT_PASSWORD,
  },
});

export const sendResetEmail = async (
  email: string,
  resetUrl: string,
): Promise<void> => {
  await transporter.sendMail({
    from: process.env.SMPT_FROM,
    to: email,
    subject: "Reset your password",
    text: `Use this link to reset your password: ${resetUrl}\n This link expiresIn 15 minutes`,
  });
};
