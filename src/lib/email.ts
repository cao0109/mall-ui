import { render } from '@react-email/components';
import { createTransport } from 'nodemailer';

// 创建邮件传输器
export const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export interface SendEmailOptions {
  to: string;
  subject: string;
  component: React.ReactElement;
}

// 发送邮件的通用函数
export async function sendEmail({ to, subject, component }: SendEmailOptions) {
  try {
    const emailHtml = await render(component);
    const smtpUser = process.env.SMTP_USER;

    if (!smtpUser) {
      throw new Error('SMTP_USER 环境变量未设置');
    }

    const mailOptions = {
      from: smtpUser, // 使用与认证相同的邮箱地址
      to,
      subject,
      html: emailHtml,
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('发送邮件失败:', error);
    return { success: false, error };
  }
}
