// 邮件类型枚举
export enum EmailType {
  WELCOME = 'welcome',
  // 可以添加更多邮件类型
}

// 欢迎邮件数据结构
export interface WelcomeEmailData {
  username: string;
  loginUrl: string;
}

// 邮件数据联合类型
export type EmailTemplateData = WelcomeEmailData;

// API 请求体类型
export interface SendEmailRequest {
  to: string;
  type: EmailType;
  data: EmailTemplateData;
}

// API 响应体类型
export interface SendEmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}
