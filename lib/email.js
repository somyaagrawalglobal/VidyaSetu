import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    host: "127.0.0.1", // 🔥 force IPv4
    port: Number(process.env.EMAIL_SERVER_PORT), // 25 or 1025
    secure: false,
    auth: process.env.EMAIL_SERVER_USER
        ? {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
        }
        : undefined,
    tls: {
        rejectUnauthorized: false,
    },
});

export const sendVerificationEmail = async (to, token) => {
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject: 'Confirm your email',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to VidyaSetu!</h2>
        <p>Please confirm your email address by clicking the link below:</p>
        <p>
          <a href="${verificationUrl}" style="background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Verify Email
          </a>
        </p>
        <p>Or copy and paste this link in your browser: <br> ${verificationUrl}</p>
        <p>This link will expire in 24 hours.</p>
      </div>
    `,
    });
};

export const sendPasswordResetEmail = async (to, token) => {
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${token}`;

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject: 'Reset your password',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password Reset Request</h2>
        <p>You requested a password reset. Click the link below to set a new password:</p>
        <p>
          <a href="${resetUrl}" style="background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
        </p>
        <p>Or copy and paste this link in your browser: <br> ${resetUrl}</p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't ask to reset your password, you can ignore this email.</p>
      </div>
    `,
    });
};
