import * as React from 'react';

import { BaseEmail } from './base-email';

interface WelcomeEmailProps {
  username: string;
  loginUrl: string;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({ username, loginUrl }) => {
  return (
    <BaseEmail
      previewText="欢迎加入 HiDoo Mall"
      heading={`欢迎, ${username}!`}
      body="感谢您注册 HiDoo Mall。我们很高兴您能加入我们的平台。点击下方按钮开始您的跨境电商之旅。"
      buttonText="登录平台"
      buttonUrl={loginUrl}
    />
  );
};
