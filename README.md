# 罗辑个人主页（luoji-home）

软件工程方向个人博客与作品集 —— 基于 **React 18 + Vite 6 + TypeScript + Tailwind CSS v4** 的纯前端单页应用。

站点以「个人数字名片」为定位：用一段 Hero 介绍自己，用文章沉淀技术笔记，用项目卡片展示软件作品，并支持明 / 暗主题与全站响应式布局。
数据默认保存在浏览器本地，配置 Supabase 后自动切换为**云端存储**（换电脑 / 换浏览器数据通用）。

## 功能特性

- **首页**：Hero 自我介绍 + 数据驱动的站点概览（文章数 / 项目数），大屏自动双栏布局
- **博客**：文章列表管理，支持 **新增 / 编辑 / 删除 / 批量删除**、**即时搜索**（标题 / 摘要 / 标签 / 正文）
- **阅读器**：Markdown 全文渲染，支持 GFM（表格、任务列表、删除线）、**代码块语法高亮**、阅读时长估算，明暗主题自适应
- **项目**：项目卡片网格，可为每个项目添加多条外链（GitHub / Demo 等，`target="_blank"` + `rel="noopener"`），可增删改
- **关于**：个人名片（自我介绍、技能栈、联系方式），邮箱支持**一键复制**
- **主题**：浅色为基调、支持深色，跟随系统并可手动切换（记忆在 `localStorage`）
- **响应式**：桌面（1366 / 1440 / 1920 / 2560+）流体布局，平板 / 手机自动回退单列，无横向滚动
- **视觉**：克制的中性配色 + 单一强调色，lucide 线性图标（无 emoji 冒充图标），极淡网格装饰

## 技术栈

| 分类 | 选型 |
| --- | --- |
| 框架 | React 18 · TypeScript 5 |
| 构建 | Vite 6（`@vitejs/plugin-react`） |
| 样式 | Tailwind CSS v4（`@tailwindcss/vite`）+ 设计 Token（CSS 变量驱动主题） |
| 数据 | Supabase（可选）+ localStorage 离线缓存 |
| Markdown | `react-markdown` + `remark-gfm` + `rehype-highlight` |
| 图标 | `lucide-react` |
| 状态 | React Hooks（`useReducer` + Context）；无状态库、无路由库 |

## 目录结构

```
luoji-home/
├── index.html                        # HTML 入口（含主题防闪烁初始化脚本）
├── vite.config.ts                    # Vite + Tailwind 配置（dev 端口 5173）
├── tsconfig.json
├── package.json
├── .env.example                      # 环境变量模板（复制为 .env.local 使用）
├── .nvmrc                            # Node 版本声明（供云端构建环境使用）
├── wrangler.toml                     # Cloudflare Workers 部署配置（发布 dist/ 到线上）
├── .github/workflows/
│   └── supabase-keep-alive.yml       # 每 5 天 ping 一次 Supabase，防免费项目被暂停
├── docs/
│   ├── REQUIREMENTS.md               # 初始需求与设计基线
│   ├── ADMIN-PANEL-HANDOFF.md        # 后台管理系统开发交接信息
│   └── 文案修改指南.md                # 站内文案的修改位置索引
└── src/
    ├── main.tsx                      # 应用入口（StoreProvider + ToastProvider）
    ├── App.tsx                       # 布局（Header / Main / Footer）与视图切换、主题切换
    ├── styles.css                    # 设计 Token、根字号阶梯、Markdown 排版、语法高亮
    ├── types.ts                      # 领域类型（Post / Project / ProjectLink / View）
    ├── store.tsx                     # 数据仓库（内存状态 + 云端同步 + localStorage 缓存）
    ├── toast.tsx                     # 轻提示（useToast）
    ├── utils.ts                      # uid / todayISO / fmtDate / isValidHttpUrl / readingMinutes
    ├── vite-env.d.ts                 # Vite 环境变量类型声明
    ├── lib/
    │   ├── site.ts                   # ★ 站点个人资料配置
    │   ├── cloud.ts                   # Supabase 数据访问层（未配置时自动降级为本地模式）
    │   └── markdown.tsx              # Markdown 渲染管线
    ├── components/
    │   ├── Header.tsx                # 顶部导航 + 底部 Footer（含云端同步状态）
    │   ├── ui.tsx                    # Button / Input / Chip / Field / EmptyState / PageHead 等
    │   ├── Dialog.tsx                # 通用弹窗 + 危险操作确认框
    │   ├── TagInput.tsx              # 标签输入
    │   ├── LinkRowsEditor.tsx        # 项目外链多行编辑器
    │   └── icons.tsx                 # 品牌图标（GitHub mark、站点 Logo）
    └── pages/
        ├── HomePage.tsx              # 首页（Hero + 站点数据）
        ├── BlogPage.tsx              # 文章列表
        ├── PostReader.tsx            # Markdown 阅读页
        ├── ProjectsPage.tsx          # 项目网格
        ├── AboutPage.tsx             # 关于
        ├── PostFormDialog.tsx        # 文章新增 / 编辑表单
        └── ProjectFormDialog.tsx     # 项目新增 / 编辑表单
```

## 快速开始

环境要求：Node.js ≥ 18、npm（或 pnpm / yarn）。

```bash
npm install       # 安装依赖
npm run dev       # 开发服务器 → http://localhost:5173（HMR）
```

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 启动开发服务器（HMR） |
| `npm run build` | 类型检查 + 生产构建（输出 `dist/`） |
| `npm run preview` | 本地预览构建产物 → http://localhost:4173 |
| `npm run typecheck` | 仅做 TypeScript 类型检查 |

## 数据存储

两种模式，由是否配置环境变量自动决定，**界面无需任何改动**：

| 模式 | 触发条件 | 行为 |
| --- | --- | --- |
| **本地模式** | 未配置 Supabase | 数据存 `localStorage`（键 `luoji.store.v1`），仅当前浏览器有效；首次访问载入 1 条内置示例文章 |
| **云端模式** | 已配置 Supabase | 云数据库为权威数据源，`localStorage` 仅作离线缓存；页脚显示「云端同步正常 / 同步中 / 同步失败」 |

云端模式的细节：

- 启动时从云端拉取，以云端数据为准；**首次启用**且云端为空时，会自动把本地已有数据迁移上传，避免丢失；
- 新增 / 编辑 / 删除先在本地即时生效（乐观更新），再异步写入云端；写入失败时回退本地缓存并在页脚提示；
- 云端不可用不影响站点可用性。

### 接入 Supabase（免费）

1. 注册 [supabase.com](https://supabase.com) → **New project** 新建项目（区域选离你较近的，如 Singapore）
2. 打开 **SQL Editor**，执行下面这段 SQL（建两张表 + 开放匿名读写）：

```sql
-- 文章表
create table if not exists public.posts (
  id text primary key,
  title text not null default '',
  date text default '',
  category text default '',
  tags jsonb not null default '[]'::jsonb,
  description text default '',
  content text default '',
  "isSample" boolean not null default false
);

-- 项目表
create table if not exists public.projects (
  id text primary key,
  name text not null default '',
  tagline text default '',
  tech jsonb not null default '[]'::jsonb,
  links jsonb not null default '[]'::jsonb,
  "isSample" boolean not null default false
);

-- 开启行级安全（RLS）并允许匿名读写（个人站点可用；多人 / 生产环境请收紧）
alter table public.posts enable row level security;
alter table public.projects enable row level security;

create policy "posts anon all" on public.posts
  for all to anon using (true) with check (true);
create policy "projects anon all" on public.projects
  for all to anon using (true) with check (true);
```

3. 打开 **Project Settings → API**，复制 **Project URL** 与 **anon public key**
4. 复制 `.env.example` 为 `.env.local`，填入这两项，重启 `npm run dev`：

```dotenv
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon / publishable key>
```

> ⚠️ `VITE_SUPABASE_URL` 必须是 **base 地址**：不要带 `/rest/v1/`、不要有结尾斜杠（`supabase-js` 会自行拼接路径）。
> `.env.local` 已被 `.gitignore` 忽略，**切勿提交到仓库**。

5. 页脚显示「云端同步正常」即接入成功。

> **免费版保活**：Supabase 免费项目 7 天无请求会被暂停。仓库已内置
> [`.github/workflows/supabase-keep-alive.yml`](.github/workflows/supabase-keep-alive.yml) 每 5 天自动请求一次。
> 启用前需在 GitHub 仓库 → Settings → Secrets and variables → Actions 添加 `SUPABASE_URL` 与 `SUPABASE_ANON_KEY` 两个 Secret。

> 想恢复出厂示例数据（本地模式）：DevTools → Application → Local Storage → 删除 `luoji.store.v1` 后刷新。

## 个性化配置

编辑 `src/lib/site.ts` 替换为你的真实信息：

```ts
export const SITE = {
  name: '罗辑',                        // 显示名称
  en: 'LUOJI',                         // 英文标识
  role: 'Software Engineer · 软件工程',
  headline: '写代码，也写文章。',
  intro: '一句话介绍……',
  github: 'https://github.com/…',       // 留空则不展示 GitHub 入口
  email: 'you@example.com',             // 留空则不展示邮箱入口
  tech: ['TypeScript', 'React', '…'],   // 关于页技能栈
  startYear: 2026,                      // 页脚版权起始年份
}
```

文章与项目数据不在这里配置 —— 它们在站点内直接新增 / 编辑（见「数据存储」）。

## 部署

纯静态站点，构建产物为 `dist/`：

```bash
npm run build
```

### 当前线上部署状态（Cloudflare Workers）

| 项 | 值 |
| --- | --- |
| 平台 | Cloudflare Workers（仅静态资源） |
| Worker 名称 | `personal-homepage` |
| 线上地址 | `https://personal-homepage.1431634649.workers.dev` |
| 部署方式 | 本地 `npm run build` + `npx wrangler deploy`（配置见仓库内 `wrangler.toml`）；首次需 `npx wrangler login` 授权一次 |
| 环境变量 | **无需在平台配置**：构建在本地完成，Supabase 配置从本地 `.env.local` 内嵌进产物 |

> ⚠️ **国内访问限制**：`*.workers.dev` 与 `*.pages.dev` 域名在国内被 **DNS 污染 + IP 阻断**
> （实测解析到 Twitter / Facebook 的 IP 段，改用 Cloudflare 真实 IP 直连同样超时），**必须挂代理才能打开**。
> 若需国内免代理访问，应改用国内节点的静态托管（如腾讯云 EdgeOne Pages / CloudBase），或绑定自有域名。

> 🔄 **更新线上版本**：仓库内已配置 `wrangler.toml`，改完代码执行两条命令即可发布（更新的是同一个 Worker）：
>
> ```bash
> npm run build
> npx wrangler deploy
> ```
>
> **首次使用需先授权**：执行 `npx wrangler login`，浏览器会自动打开 Cloudflare 授权页，登录后点「Allow」即可
> （凭据保存在 `%APPDATA%\xdg.config\.wrangler\config\default.toml`，之后无需重复授权）。
>
> **为什么本地构建**：Supabase 配置来自本地 `.env.local` 并内嵌进构建产物，因此 Cloudflare 侧无需配置任何环境变量。
> 若改用 Git 集成（推送即自动构建部署），则必须在 Cloudflare 控制台补上 `VITE_SUPABASE_URL` 与 `VITE_SUPABASE_ANON_KEY`。

### 部署到其他平台

- **Vercel / Netlify / Cloudflare Pages / CloudBase**：导入仓库，构建命令 `npm run build`，输出目录 `dist`；
  ⚠️ 需在平台的环境变量设置里配置 `VITE_SUPABASE_URL` 与 `VITE_SUPABASE_ANON_KEY`（否则线上会是本地模式）
- **GitHub Pages**：若部署在 `https://<user>.github.io/<repo>/` 子路径，需先在 `vite.config.ts` 中设置 `base: '/<repo>/'` 再构建
- 本地验证部署结果：`npm run preview`

## 设计说明

- **设计 Token** 集中在 `src/styles.css`：`--canvas` / `--surface` / `--line` / `--ink` / `--brand` 等，
  `.dark` 下覆盖为深色值，`@theme inline` 映射为 Tailwind 颜色（`bg-canvas`、`text-ink`、`border-line` 等）
- **根字号阶梯**：`rem` 基准随视口放大（≥1024px 起 17px → ≥1366px 19px → ≥1536px 21px → ≥1920px 24px → ≥2560px 28px），
  所有字号与间距使用 rem 单位，保证大屏下的可读密度
- **响应式**：页面级容器流体铺满（`w-full` + 分级 `px`），仅在真正需要限宽的正文区保留 `max-w-*`
- **字重**：正文 500（不使用细体），标题 700，保证层级对比

## 相关项目与文档

| 名称 | 说明 |
| --- | --- |
| [`docs/REQUIREMENTS.md`](docs/REQUIREMENTS.md) | 初始需求与设计基线 |
| [`docs/ADMIN-PANEL-HANDOFF.md`](docs/ADMIN-PANEL-HANDOFF.md) | 后台管理系统的开发交接信息（数据模型 / Supabase / 可复用组件 / 设计系统） |
| [`docs/文案修改指南.md`](docs/文案修改指南.md) | 站内各处文案的修改位置索引 |
| `luoji-admin` | 后台管理系统，**独立仓库**，由本项目复制后开发，与本项目共用同一 Supabase 数据库 |

## License

私有项目，版权所有。
