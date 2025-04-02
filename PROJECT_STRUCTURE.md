# 项目结构说明

本项目使用Next.js 14 + App Router架构，并采用src目录模式组织代码。以下是主要目录结构及其用途说明。

## 顶级目录

- `src/` - 应用源代码
- `public/` - 静态资源
- `.next/` - Next.js构建输出
- `node_modules/` - 项目依赖

## src目录结构

- `app/` - Next.js App Router入口
  - `[locale]/` - 国际化路由
    - `page.tsx` - 首页
    - `layout.tsx` - 全局布局
    - 其他页面和路由
- `components/` - 组件库
  - `ui/` - 通用UI组件
  - `layout/` - 布局组件
  - `product/` - 产品详情相关组件
  - `products/` - 产品列表相关组件
  - 其他业务组件
- `hooks/` - 自定义React Hooks
- `lib/` - 工具库和辅助函数
  - `utils/` - 通用工具函数
- `services/` - API服务和数据获取
- `store/` - 状态管理
- `styles/` - 全局样式
- `types/` - TypeScript类型定义
  - `api/` - API相关类型
  - `stores/` - 状态管理相关类型
- `config/` - 配置文件
- `i18n/` - 国际化配置
- `middleware.ts` - Next.js中间件

## 代码组织原则

1. **按功能组织** - 组件和代码按功能或业务领域组织
2. **组件分类** - UI组件与业务组件分离
3. **类型安全** - 使用TypeScript确保类型安全
4. **国际化支持** - 使用next-intl实现多语言支持
5. **响应式设计** - 使用Tailwind CSS实现响应式设计

## 样式方案

- 使用Tailwind CSS进行样式管理
- 全局样式在`src/styles`目录下
- 组件局部样式使用Tailwind类名

## 状态管理

- 使用Zustand进行状态管理
- 状态存储在`src/store`目录下

## 代码规范

- 使用ESLint确保代码质量
- 使用Prettier格式化代码
- 使用Husky和lint-staged确保提交前的代码检查
