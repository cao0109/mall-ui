# HiDoo Mall UI

基于 Next.js 15 和 Medusa.js 构建的现代化电商前端项目。

## 技术栈

- **框架**: Next.js 15
- **电商后端**: Medusa.js
- **UI 组件**: Radix UI
- **样式**: Tailwind CSS
- **状态管理**: Zustand
- **数据获取**: TanStack Query
- **表单处理**: React Hook Form + Zod
- **国际化**: next-intl
- **主题**: next-themes
- **动画**: Framer Motion
- **类型**: TypeScript

## 代码规范

本项目使用以下工具和规范来保证代码质量：

- **ESLint**: 代码检查
- **Prettier**: 代码格式化
- **TypeScript**: 类型检查
- **Husky**: Git 钩子
- **lint-staged**: 暂存文件的 lint
- **commitizen**: 规范的 Git 提交信息

### 开发流程

1. 安装依赖：
```bash
npm install
```

2. 开发时：
- 使用 `npm run dev` 启动开发服务器
- 使用 `npm run lint` 检查代码
- 使用 `npm run format` 格式化代码
- 使用 `npm run commit` 提交代码（会引导你填写规范的提交信息）

注意：Git 钩子会在 `npm install` 时自动安装，无需手动运行 prepare 命令。

### 代码规范要点

- 使用 TypeScript 严格模式
- 遵循 ESLint 和 Prettier 规则
- 使用 Conventional Commits 规范提交信息
- 组件使用函数式组件和 Hooks
- 使用 Tailwind CSS 进行样式管理
- 保持代码简洁，遵循 DRY 原则

## 项目结构

```
src/
├── app/                    # Next.js 应用路由
│   └── [locale]/          # 国际化路由
│       ├── policies/      # 政策页面
│       └── layout.tsx     # 根布局
├── components/            # React 组件
│   ├── auth/             # 认证相关组件
│   ├── cookie/           # Cookie 相关组件
│   ├── home/             # 首页相关组件
│   ├── layout/           # 布局组件
│   ├── product/          # 产品相关组件
│   ├── providers/        # 上下文提供者
│   └── ui/               # UI 基础组件
├── hooks/                # 自定义 Hooks
├── i18n/                 # 国际化配置
├── lib/                  # 工具函数和配置
├── store/                # Zustand 状态管理
└── types/                # TypeScript 类型定义
```

## 主要功能

- 🌐 多语言支持
- 🌓 深色/浅色主题切换
- 🛒 购物车功能
- 🔐 用户认证
- 🍪 Cookie 管理
- 📱 响应式设计
- 🎨 现代化 UI 设计
- ⚡ 高性能和优化

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

## 环境变量

创建 `.env.local` 文件并添加以下变量：

```env
NEXT_PUBLIC_MEDUSA_BACKEND_URL=your_medusa_backend_url
```

## 部署

项目已配置 Vercel 部署。每次推送到主分支都会自动触发部署。

## 贡献

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

[MIT](LICENSE)
