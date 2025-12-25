import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: "Gmail",
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
    subject: 'Please verify your email',
    html: `
      <div style="background:#F9FAFB; padding:40px 10px; font-family: Arial, Helvetica, sans-serif;">
        <div style="max-width:520px; margin:0 auto; background:#ffffff; border-radius:14px; padding:40px 30px; text-align:center; border:1px solid #E5E7EB;">
          
          <!-- Icon -->
          <div style="margin-bottom:20px;">
            <div style="
              width:52px;
              height:52px;
              border-radius:12px;
              background:#000;
              color:#fff;
              display:inline-flex;
              align-items:center;
              justify-content:center;
              font-size:28px;
              font-weight:bold;
            ">
              <img 
  src="${process.env.NEXT_PUBLIC_APP_URL}/assets/images/brand-logo.png" 
  alt="VidyaSetu Logo"
/>

            </div>
          </div>

          <!-- Title -->
          <h2 style="margin:0 0 12px; font-size:22px; color:#111827;">
            Please verify your email 😃
          </h2>

          <!-- Text -->
          <p style="margin:0 0 28px; font-size:15px; color:#374151; line-height:1.6;">
            To use <strong>VidyaSetu</strong>, click the verification button below.
            This helps keep your account secure.
          </p>

          <!-- Button -->
          <a href="${verificationUrl}"
             style="
               background:#2563EB;
               color:#ffffff;
               padding:14px 26px;
               border-radius:8px;
               text-decoration:none;
               font-size:15px;
               font-weight:600;
               display:inline-block;
             ">
            Verify my account
          </a>

          <!-- Info -->
          <p style="margin:30px 0 0; font-size:13px; color:#6B7280; line-height:1.6;">
            You're receiving this email because you have an account with VidyaSetu.
            If you did not request this, you can safely ignore this email.
          </p>

          <!-- Subtle Box -->
          <div style="
            margin-top:28px;
            background:#F3F4F6;
            padding:14px;
            border-radius:8px;
            font-size:12px;
            color:#6B7280;
          ">
            If the button doesn’t work, copy and paste this link:<br>
            <span style="word-break:break-all;">${verificationUrl}</span>
          </div>

        </div>
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
      <div style="background:#F9FAFB; padding:40px 10px; font-family: Arial, Helvetica, sans-serif;">
        <div style="max-width:520px; margin:0 auto; background:#ffffff; border-radius:14px; padding:40px 30px; text-align:center; border:1px solid #E5E7EB;">
          
          <!-- Logo -->
          <img
            src="${process.env.NEXT_PUBLIC_APP_URL}/assets/images/brand-logo.png"
            alt="VidyaSetu Logo"
            width="120"
            style="display:block; margin:0 auto 20px;"
          />

          <!-- Title -->
          <h2 style="margin:0 0 12px; font-size:22px; color:#111827;">
            Reset your password
          </h2>

          <!-- Text -->
          <p style="margin:0 0 28px; font-size:15px; color:#374151; line-height:1.6;">
            We received a request to reset your password. Click the button below to choose a new one.
          </p>

          <!-- Button -->
          <a href="${resetUrl}"
             style="
               background:#2563EB;
               color:#ffffff;
               padding:14px 26px;
               border-radius:8px;
               text-decoration:none;
               font-size:15px;
               font-weight:600;
               display:inline-block;
             ">
            Reset password
          </a>

          <!-- Info -->
          <p style="margin:30px 0 0; font-size:13px; color:#6B7280; line-height:1.6;">
            This link will expire in <strong>1 hour</strong>.
            If you didn’t request a password reset, you can safely ignore this email.
          </p>

          <!-- Fallback Link -->
          <div style="
            margin-top:28px;
            background:#F3F4F6;
            padding:14px;
            border-radius:8px;
            font-size:12px;
            color:#6B7280;
          ">
            If the button doesn’t work, copy and paste this link:<br>
            <span style="word-break:break-all;">${resetUrl}</span>
          </div>

        </div>
      </div>
    `,
  });
};

