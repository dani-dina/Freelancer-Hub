import nodemailer from 'nodemailer';
import { Admin } from '../models/admin.model';

interface User {
  name: string;
  email: string;
}

// Function to send the email verification email
const sendVerificationEmail = async (user: any, token: string): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${token}`;

  const mailOptions = {
    from: 'your-email@example.com',
    to: user.email,
    subject: 'Verify Your Email',
    html: `
      <p>Hello ${user.name},</p>
      <p>Thank you for registering. Please verify your email by clicking the link below:</p>
      <a href="${verificationUrl}">Verify Email</a>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send verification email');
  }
};

export { sendVerificationEmail };
