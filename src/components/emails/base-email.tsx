import { Body, Button, Container, Head, Html, Section, Text } from '@react-email/components';
import * as React from 'react';

interface BaseEmailProps {
  previewText?: string;
  heading: string;
  body: string;
  buttonText?: string;
  buttonUrl?: string;
}

export const BaseEmail: React.FC<BaseEmailProps> = ({
  previewText,
  heading,
  body,
  buttonText,
  buttonUrl,
}) => {
  return (
    <Html>
      <Head>{previewText && <title>{previewText}</title>}</Head>
      <Body style={main}>
        <Container style={container}>
          <Section style={content}>
            <Text style={paragraph}>{heading}</Text>
            <Text style={paragraph}>{body}</Text>
            {buttonText && buttonUrl && (
              <Button href={buttonUrl} style={button}>
                {buttonText}
              </Button>
            )}
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// 样式定义
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const content = {
  padding: '0 48px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#525f7f',
};

const button = {
  backgroundColor: '#656ee8',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px',
};
