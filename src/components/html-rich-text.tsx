import parse from 'html-react-parser';
import Image from 'next/image';
import React from 'react';

interface RichTextProps {
  content: string; // 富文本内容
}

const HtmlRichText: React.FC<RichTextProps> = ({ content }) => {
  // 处理图片标签，替换为 Next.js 的 Image 组件
  const replaceImgTag = (node: any) => {
    if (node.name === 'img') {
      const { src, alt } = node.attribs;
      return (
        <Image
          src={src}
          alt={alt || 'Product Image'}
          width={500} // 可以根据需要调整图片的宽度
          height={300} // 可以根据需要调整图片的高度
          className="h-auto w-full" // Tailwind CSS 样式（可根据需要调整）
        />
      );
    }
  };

  // 使用 html-react-parser 将 HTML 字符串转换为 React 元素，并替换 img 标签
  const modifiedContent = parse(content, {
    replace: replaceImgTag,
  });

  return <div className="rich-text">{modifiedContent}</div>;
};

export default HtmlRichText;
