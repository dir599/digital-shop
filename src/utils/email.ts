
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendResetEmail = async (
  email: string,
  resetUrl: string,
): Promise<void> => {
  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: "Reset your password",
    text: `Use this link to reset your password: ${resetUrl}\nThis link expires in 15 minutes.`,
  });

  console.log("Email accepted:", info.accepted);
  console.log("Message ID:", info.messageId);
};

// Use this to test your SMTP connection.
export const verifyEmailConnection = async (): Promise<void> => {
  await transporter.verify();
  console.log("SMTP connection successful!");
};
