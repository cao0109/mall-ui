import { NextRequest, NextResponse } from 'next/server';
import { createElement } from 'react';

import { WelcomeEmail } from '@/components/emails/welcome-email';
import { sendEmail } from '@/lib/email';
import { EmailType, SendEmailRequest, SendEmailResponse } from '@/types/email';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SendEmailRequest;
    const { to, type, data } = body;

    if (!to || !type) {
      return NextResponse.json<SendEmailResponse>(
        { success: false, error: '缺少必要参数' },
        { status: 400 }
      );
    }

    // 根据不同的邮件类型使用不同的模板
    let emailComponent: React.ReactElement;
    let subject: string;

    switch (type) {
      case EmailType.WELCOME:
        const { username, loginUrl } = data;
        if (!username || !loginUrl) {
          return NextResponse.json<SendEmailResponse>(
            { success: false, error: '缺少必要的模板数据' },
            { status: 400 }
          );
        }
        emailComponent = createElement(WelcomeEmail, { username, loginUrl });
        subject = '欢迎加入 HiDoo Mall';
        break;

      // 可以在这里添加更多的邮件类型
      default:
        return NextResponse.json<SendEmailResponse>(
          { success: false, error: '不支持的邮件类型' },
          { status: 400 }
        );
    }

    const result = await sendEmail({
      to,
      subject,
      component: emailComponent,
    });

    if (!result.success) {
      return NextResponse.json<SendEmailResponse>(
        { success: false, error: '发送邮件失败' },
        { status: 500 }
      );
    }

    return NextResponse.json<SendEmailResponse>({
      success: true,
      messageId: result.messageId,
    });
  } catch (error) {
    console.error('发送邮件时出错:', error);
    return NextResponse.json<SendEmailResponse>(
      { success: false, error: '服务器内部错误' },
      { status: 500 }
    );
  }
}
