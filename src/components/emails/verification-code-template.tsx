/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface VerificationCodeEmailProps {
  verificationCode: number;
  websiteName: string;
  logoUrl: string;
  buttonUrl: string;
  expiryMinutes?: number;
}

const VerificationCodeEmail = ({
  verificationCode,
  websiteName,
  logoUrl,
  buttonUrl,
  expiryMinutes = 30,
}: VerificationCodeEmailProps) => {
  return (
    <Html lang="zh">
      <Head />
      <Preview>{websiteName} - 请验证您的电子邮箱地址</Preview>
      <Tailwind>
        <Body className="bg-[#6366F1] py-[40px] font-sans">
          {/* Header with gradient background */}
          <Container className="mx-auto max-w-[600px]">
            <Section className="rounded-t-[8px] bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] p-[32px]">
              <Row>
                <Column>
                  <Img
                    src={logoUrl}
                    width="120"
                    height="40"
                    alt={websiteName}
                    className="h-auto w-[120px] object-cover"
                  />
                </Column>
                <Column className="text-right">
                  <Text className="m-0 text-[16px] font-bold text-white">{websiteName}</Text>
                </Column>
              </Row>
            </Section>

            {/* Main content */}
            <Section className="bg-white p-[32px]">
              <Heading className="mx-0 my-[24px] text-center text-[28px] font-bold text-[#4F46E5]">
                验证您的电子邮箱
              </Heading>

              <Text className="mb-[16px] text-[16px] leading-[24px] text-[#374151]">
                欢迎加入{websiteName}！
              </Text>

              <Text className="text-[16px] leading-[24px] text-[#374151]">
                请使用以下验证码完成您的账户注册流程。这是确保您的电子邮箱地址有效的重要步骤。
              </Text>

              {/* Verification code box with shadow and gradient border */}
              <Section className="mx-0 my-[24px] rounded-[8px] border-l-[4px] border-[#6366F1] bg-[#F9FAFB] p-[24px] text-center shadow-[0_4px_6px_rgba(0,0,0,0.05)]">
                <Text className="m-0 text-[32px] font-bold tracking-[8px] text-[#4F46E5]">
                  {verificationCode}
                </Text>
              </Section>

              <Text className="mb-[24px] text-[16px] leading-[24px] text-[#374151]">
                请在注册页面输入此验证码，或点击下方按钮直接完成验证：
              </Text>

              <Section className="mb-[24px] text-center">
                <Button
                  href={buttonUrl}
                  className="box-border rounded-[8px] bg-[#4F46E5] px-[24px] py-[12px] text-[16px] font-bold text-white no-underline"
                >
                  验证我的邮箱
                </Button>
              </Section>

              {/* Colorful info boxes */}
              <Row className="mt-[24px]">
                <Column className="pr-[12px]">
                  <Section className="rounded-[8px] border-t-[3px] border-[#3B82F6] bg-[#EFF6FF] p-[16px]">
                    <Text className="m-0 text-[14px] leading-[20px] text-[#1E40AF]">
                      <strong>有效期限</strong>
                      <br />
                      该验证码将在 {expiryMinutes} 分钟内有效
                    </Text>
                  </Section>
                </Column>
                <Column className="pl-[12px]">
                  <Section className="rounded-[8px] border-t-[3px] border-[#10B981] bg-[#ECFDF5] p-[16px]">
                    <Text className="m-0 text-[14px] leading-[20px] text-[#065F46]">
                      <strong>注册优势</strong>
                      <br />
                      验证后即可享受所有会员功能
                    </Text>
                  </Section>
                </Column>
              </Row>

              <Text className="mt-[24px] text-[16px] leading-[24px] text-[#374151]">
                如果您没有尝试在{websiteName}上注册账户，请忽略此邮件，无需采取任何操作。
              </Text>
            </Section>

            {/* Footer with gradient background */}
            <Section className="rounded-b-[8px] bg-gradient-to-r from-[#4F46E5] to-[#6366F1] p-[32px]">
              <Text className="m-0 text-center text-[14px] leading-[24px] text-white">
                © {new Date().getFullYear()} {websiteName}. 保留所有权利。
              </Text>
              <Text className="m-0 text-center text-[14px] leading-[24px] text-white">
                地址：某某市某某区某某街道某某号
              </Text>
              <Text className="m-0 text-center text-[14px] leading-[24px]">
                <a href="#" className="text-white underline">
                  隐私政策
                </a>
                {' • '}
                <a href="#" className="text-white underline">
                  服务条款
                </a>
                {' • '}
                <a href="#" className="text-white underline">
                  取消订阅
                </a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerificationCodeEmail;
