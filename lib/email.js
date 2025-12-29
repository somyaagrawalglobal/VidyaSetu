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
    from: `Vidya-Setu<${process.env.EMAIL_FROM}>`,
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
    from: `Vidya-Setu<${process.env.EMAIL_FROM}>`,
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
            If you didn't request a password reset, you can safely ignore this email.
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
            If the button doesn't work, copy and paste this link:<br>
            <span style="word-break:break-all;">${resetUrl}</span>
          </div>

        </div>
      </div>
    `,
  });
};


// ============================================
// PURCHASE EMAIL NOTIFICATIONS
// ============================================

const getStatusConfig = (status) => {
  const configs = {
    completed: {
      color: '#059669', // Emerald 600 - Deep Premium Green
      bg: '#ECFDF5',    // Emerald 50
      title: 'Order Confirmed',
      message: 'Thank you for your purchase. You now have full access to your course.',
      buttonText: 'Start Learning',
    },
    pending: {
      color: '#d97706', // Amber 600 - Deep Premium Orange
      bg: '#FFFBEB',    // Amber 50
      title: 'Payment Processing',
      message: 'We are verifying your payment. You will receive a confirmation shortly.',
      buttonText: null,
    },
    failed: {
      color: '#dc2626', // Red 600 - Deep Premium Red
      bg: '#FEF2F2',    // Red 50
      title: 'Payment Failed',
      message: 'We could not process your payment. Please try again.',
      buttonText: 'Try Again',
    },
    refunded: {
      color: '#4f46e5', // Indigo 600 - Deep Premium Blue
      bg: '#EEF2FF',    // Indigo 50
      title: 'Refund Processed',
      message: 'Your refund has been processed. If this was a Razorpay transaction, it will be credited within 5-7 days. For manual refunds, please contact your administrator.',
      buttonText: null,
    },
  };
  return configs[status] || configs.pending;
};

export const sendPurchaseEmail = async ({ to, userName, courseName, coursePrice, orderId, status, courseUrl }) => {
  const config = getStatusConfig(status);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const dashboardUrl = `${appUrl}/my-courses`;

  // Premium, clean inline styles
  const styles = {
    wrapper: 'background-color: #f3f4f6; padding: 40px 10px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;',
    container: `background-color: #ffffff; max-width: 500px; margin: 0 auto; border-radius: 12px; border: 1px solid #e5e7eb; padding: 40px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02); border-top: 6px solid ${config.color};`,
    header: 'text-align: center; margin-bottom: 32px;',
    logo: 'height: 40px; width: auto; margin-bottom: 24px;',
    statusBadge: `display: inline-block; background-color: ${config.bg}; color: ${config.color}; padding: 6px 12px; border-radius: 9999px; font-size: 13px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 16px;`,
    title: 'color: #111827; font-size: 24px; font-weight: 700; margin: 0 0 12px; letter-spacing: -0.5px;',
    text: 'color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0;',
    card: 'background: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb; padding: 24px; margin: 32px 0;',
    row: 'display: flex; justify-content: space-between; margin-bottom: 12px;',
    rowLabel: 'color: #6b7280; font-size: 14px;',
    rowValue: 'color: #111827; font-size: 14px; font-weight: 600; float: right;',
    divider: 'height: 1px; background-color: #e5e7eb; margin: 12px 0;',
    button: `display: block; background-color: ${config.color}; color: #ffffff; text-decoration: none; text-align: center; padding: 14px 24px; border-radius: 8px; font-weight: 600; font-size: 15px; margin-top: 32px; transition: opacity 0.2s;`,
    footer: 'text-align: center; margin-top: 40px; border-top: 1px solid #e5e7eb; padding-top: 24px;',
    footerText: 'color: #9ca3af; font-size: 12px; line-height: 1.5;',
    footerLink: 'color: #9ca3af; text-decoration: underline;',
    orderId: 'font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; letter-spacing: 0.5px;',
  };

  const actionUrl = status === 'failed' ? `${appUrl}/courses` : (courseUrl || dashboardUrl);
  const showButton = status === 'completed' || status === 'failed';

  await transporter.sendMail({
    from: `Vidya-Setu<${process.env.EMAIL_FROM}>`,
    to,
    subject: `${config.title} - ${courseName}`,
    html: `
      <div style="${styles.wrapper}">
        <div style="${styles.container}">
          
          <!-- Header -->
          <div style="${styles.header}">
            <img src="${appUrl}/assets/images/brand-logo.png" alt="VidyaSetu" style="${styles.logo}" />
            <div>
              <span style="${styles.statusBadge}">${config.title}</span>
            </div>
            <h1 style="${styles.title}">Hello, ${userName}</h1>
            <p style="${styles.text}">${config.message}</p>
          </div>

          <!-- Order Card -->
          <div style="${styles.card}">
            <div style="margin-bottom: 12px; overflow: hidden;">
              <span style="${styles.rowLabel}">Course</span>
              <span style="${styles.rowValue}">${courseName}</span>
            </div>
            
            <div style="${styles.divider}"></div>
            
            <div style="margin-bottom: 12px; overflow: hidden;">
              <span style="${styles.rowLabel}">Order ID</span>
              <span style="${styles.rowValue} ${styles.orderId}">${orderId}</span>
            </div>

            <div style="margin-bottom: 0; overflow: hidden;">
              <span style="${styles.rowLabel}">Amount</span>
              <span style="${styles.rowValue}">₹${coursePrice?.toLocaleString('en-IN') || '0'}</span>
            </div>
          </div>

          <!-- CTA Button -->
          ${showButton ? `
            <a href="${actionUrl}" style="${styles.button}">
              ${config.buttonText}
            </a>
          ` : ''}

          <!-- Footer -->
          <div style="${styles.footer}">
            <p style="${styles.footerText}">
              Need help? <a href="mailto:support@vidyasetu.com" style="${styles.footerLink}">Contact Support</a>
            </p>
            <p style="${styles.footerText}">
              &copy; ${new Date().getFullYear()} VidyaSetu. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    `,
  });
};

