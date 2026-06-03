# 智慧校园管理系统

基于 React + TypeScript + Vite 构建的现代化校园管理系统前端应用。

# 预览地址
## https://mark-maker006.github.io/School-management-platform/

## 技术栈

- **框架**: React 18
- **语言**: TypeScript
- **构建工具**: Vite 5
- **样式**: TailwindCSS 3
- **图标**: Lucide React
- **图表**: Recharts
- **路由**: React Router DOM

## 项目结构

```
src/
├── components/           # 组件目录
│   ├── common/          # 公共组件
│   │   ├── Button.tsx   # 按钮组件
│   │   ├── Modal.tsx    # 模态框组件
│   │   ├── SearchInput.tsx  # 搜索输入组件
│   │   ├── FilterDropdown.tsx  # 筛选下拉组件
│   │   └── StatCard.tsx # 统计卡片组件
│   ├── Header.tsx       # 头部组件
│   ├── Sidebar.tsx      # 侧边栏组件
│   └── Layout.tsx       # 布局组件
├── pages/               # 页面目录
│   ├── Dashboard.tsx    # 首页仪表盘
│   ├── StudentManagement.tsx   # 学生管理
│   ├── TeacherManagement.tsx   # 教师管理
│   ├── CourseManagement.tsx    # 课程管理
│   ├── AttendanceManagement.tsx # 考勤管理
│   └── GradeManagement.tsx     # 成绩管理
├── data/                # 数据目录
│   └── mockData.ts      # Mock数据
├── hooks/               # 自定义Hooks
│   └── useSearch.ts     # 搜索Hook
├── types/               # 类型定义
│   └── index.ts         # 全局类型
├── utils/               # 工具函数
│   └── format.ts        # 格式化工具
├── App.tsx              # 根组件
├── main.tsx             # 入口文件
└── index.css            # 全局样式
```

## 功能模块

1. **仪表盘** - 数据概览、统计图表、待办事项
2. **学生管理** - 学生信息列表、搜索筛选、详情查看
3. **教师管理** - 教师信息管理、卡片展示
4. **课程管理** - 课程安排、课表预览
5. **考勤管理** - 出勤记录、异常预警
6. **成绩管理** - 成绩录入、统计分析

## 开发指南

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 代码检查

```bash
npm run lint
```

### 预览生产版本

```bash
npm run preview
```

## 代码规范

- 使用 TypeScript 严格模式
- 组件使用函数式编程，配合 React Hooks
- 遵循 ESLint + Prettier 编码规范
- 组件命名采用 PascalCase
- 文件命名采用 PascalCase（组件）/ camelCase（工具函数）

## 样式规范

- 使用 TailwindCSS 进行样式开发
- 颜色使用 Tailwind 主题色（primary, success, warning, danger）
- 布局采用 Flexbox / Grid 布局
- 响应式设计支持移动端、平板、桌面端

## 提交规范

- `feat`: 新增功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试用例
- `chore`: 构建/工具更新
