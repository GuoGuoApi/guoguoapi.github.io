# 个人网站使用教程
```
author: GuoGuo
data: 2026-01-15
Developed based on the Trae tool
```

## 项目简介

这是一个个人网站模板，包含了简历展示、最新动态、博客学习记录和资料展示分享等功能模块。本教程将向您展示如何更新网站上的各种内容！仅作者本人个人使用，不涉及任何商业用途。

## 主要功能特点

- **个人简历展示**：基于 Markdown 格式的简历数据，自动渲染为美观的简历页面
- **最新动态发布**：支持通过 Markdown 格式发布和展示网站更新日志
- **博客学习记录**：支持创建、分类和展示各类学习笔记和文章
- **资料展示与筛选**：提供多维度的资料筛选功能，包括栏目分类、资料类型、时间和大小筛选
- **联系方式模态框**：提供邮箱、GitHub 和微信联系方式，通过模态框优雅展示
- **响应式设计**：适配不同屏幕尺寸，提供良好的移动端体验

## 目录结构

```
my-personal-site/
├── about.html       # 个人简历页面
├── blog.html        # 学习记录页面
├── blog-detail.html # 学习记录详情页面
├── css/             # 样式文件目录
│   └── style.css    # 主要样式文件
├── assets/          # 数据文件目录
│   ├── resources.json # 资源配置文件
│   ├── resume.md    # 简历数据文件
│   └── updates.md   # 最新动态数据文件
├── index.html       # 网站首页
├── js/              # JavaScript文件目录
│   ├── main.js      # 主要JavaScript文件
│   └── password-redirect.js # 密码保护重定向脚本
├── lib/             # 第三方库
│   └── marked.min.js # Markdown渲染库
├── notes/           # 学习记录文件目录
│   └── [文章].md    # 学习记录Markdown文件
├── password.html    # 密码验证页面
├── resources.html   # 资料展示页面
├── storage/         # 存储目录（可用于存放图片、文档等）
│   ├── archives/    # 归档文件
│   ├── documents/   # 文档文件
│   ├── images/      # 图片文件
│   └── media/       # 媒体文件
└── updates.html     # 最新动态页面
```

## 如何更新个人简历

个人简历内容存储在 `assets/resume.md` 文件中，您只需要修改这个文件即可更新简历内容。

### 步骤 1：打开简历数据文件

使用任何文本编辑器（如记事本、VS Code 等）打开 `assets/resume.md` 文件。

### 步骤 2：更新基本信息

找到文件开头的基本信息部分，修改为您自己的信息。请注意，简历文件使用 Markdown 格式，包含以下结构：

```markdown
---
title: 个人简历
author: 您的姓名
contact: 您的邮箱
updated: 更新日期（格式：YYYY-MM-DD）
---

# 个人简历

## 基本信息
- **姓名**：您的姓名
- **求职意向**：您的求职意向
- **出生日期**：您的出生日期（格式：YYYY-MM）
- **手机号**：您的手机号码
- **邮箱**：您的邮箱

## 教育经历

### 学校名称 | 学院名称
**专业名称** 起始年份.月份 – 结束年份.月份
- 成绩排名：XX%
- 其他教育相关信息

## 实习经历

### 公司名称 | 部门名称
**职位名称** 起始年份.月份 – 结束年份.月份
- 职责描述1
- 职责描述2
- 职责描述3

## 项目经历

### 项目名称
**时间**：起始年份.月份 – 结束年份.月份
**角色**：您在项目中的角色
- 项目背景：描述项目背景和目标
- 核心算法开发/技术实现：描述您的技术贡献
- 系统集成与验证：描述系统集成和验证过程

## 专业技能

- **技能类别1**：技能描述1，技能描述2
- **技能类别2**：技能描述1，技能描述2

## 荣誉奖励

- 奖励名称1（获得次数）
- 奖励名称2

## 个人评价

您的个人评价内容
```

### 步骤 3：保存文件

修改完成后，保存文件。网站会自动解析 Markdown 格式并将您的简历内容渲染到个人简历页面。

### 注意事项

- 请严格按照上述 Markdown 格式编写简历内容，特别是标题层级和分隔符
- 文件开头的 `YAML` 元数据部分（---包围的内容）包含简历的基本信息，也需要更新
- 您可以根据需要添加或删除各个部分，但建议保留主要结构以便网站正确解析

## 如何更新最新动态

最新动态内容存储在 `assets/updates.md` 文件中。

### 步骤 1：打开最新动态数据文件

使用文本编辑器打开 `assets/updates.md` 文件。

### 步骤 2：添加新动态

在文件中按照以下格式添加新的动态信息（新动态应添加在文件顶部，紧跟在 `# 网站更新日志` 标题后面，以便最新的动态显示在最前面）：

```markdown
---
title: 新动态标题
date: 2023-12-01
description: 简短描述
---

详细内容描述，这里可以写更多关于这个动态的信息。

---
title: 第二条动态标题
date: 2023-11-15
description: 简短描述
---

详细内容描述。
```

每条动态的格式为：
1. 分隔符 `---`
2. YAML 元数据（包含 title、date 和 description）
3. 分隔符 `---`
4. 详细内容描述

### 步骤 3：保存文件

保存文件后，网站会自动解析 Markdown 格式并将您的最新动态渲染到网站上。

## 如何添加新的学习记录文章

### 步骤 1：创建 Markdown 文件

在 `notes/` 目录下创建一个新的 Markdown 文件，文件名格式为：`YYYY-MM-DD-文章标题.md`。例如：`2023-12-10-学习JavaScript的心得.md`。

### 步骤 2：编写博客内容

#### 元数据管理（重要）
系统会优先从 `assets/posts.json` 文件获取文章的元数据（标题、日期、分类、标签等）用于文章列表展示。而文章详情页会直接从Markdown文件解析元数据。

**最佳实践：** 为避免重复定义和维护困难，建议您：
1. 在 `assets/posts.json` 中定义完整的元数据
2. 在Markdown文件中可以只保留内容部分，或者也可以保留元数据（系统会自动读取）

如果您选择在Markdown文件中保留元数据，格式如下：

**注意：** category 字段必须从以下范围内选择：
- `tech` - 技术类文章
- `life` - 生活类文章
- `note` - 笔记类文章
- 其他类型可以使用任意值，将显示为 "其他" 类别

```markdown
---
title: 学习JavaScript的心得
date: 2023-12-10
category: tech
tags: [JavaScript, 学习笔记]
description: 分享学习JavaScript过程中的一些心得和技巧。
---

# JavaScript学习心得

## 前言
本文将分享我在学习JavaScript过程中的一些心得和技巧。

## 变量声明

在JavaScript中，有三种声明变量的方式：

- `var`：函数作用域
- `let`：块级作用域
- `const`：常量，块级作用域

## 函数定义

可以使用函数声明或函数表达式定义函数：

``` javascript
// 函数声明
function add(a, b) {
    return a + b;
}

// 函数表达式
const multiply = function(a, b) {
    return a * b;
};
```

## 总结
持续学习和实践是掌握JavaScript的关键。
```

### 步骤 3：更新文章清单（推荐）

为便于维护与排序，建议在 `assets/posts.json` 中添加该文章的条目。示例：

```json
[
  {
    "file": "notes/2023-12-10-学习JavaScript的心得.md",
    "title": "学习JavaScript的心得",
    "date": "2023-12-10",
    "category": "tech",
    "tags": ["JavaScript", "学习笔记"],
    "summary": "分享学习JavaScript过程中的一些心得和技巧。"
  }
]
```

系统会优先使用 `assets/posts.json` 生成文章列表；如果该文件不存在或加载失败，才会回退为按文件名解析的方式。

### 步骤 4：保存文件并刷新

保存后刷新浏览器即可看到文章出现在列表中。

## 资料展示模块

资料展示页面(resources.html)提供了多维度的筛选功能，帮助用户快速找到所需资料。

### 配置说明

资源信息存储在网站根目录下的 `resources.json` 文件中。该文件包含两个主要部分：配置（config）和资源列表（resources）。

#### 配置部分（config）

配置部分用于自定义学习栏目和资源类型，这些配置会动态生成页面上的筛选器。

```json
{
  "config": {
    "sections": [
      {"id": "algorithm", "name": "算法学习", "icon": "🧮"},
      {"id": "office", "name": "办公工具", "icon": "💼"},
      {"id": "programming", "name": "编程开发", "icon": "💻"},
      {"id": "design", "name": "设计创意", "icon": "🎨"},
      {"id": "language", "name": "语言学习", "icon": "🌐"}
    ],
    "types": [
      {"id": "documents", "name": "文档", "icon": "📄", "extensions": ["pdf", "doc", "docx", "txt", "md"]},
      {"id": "images", "name": "图片", "icon": "🖼️", "extensions": ["jpg", "jpeg", "png", "gif", "svg"]},
      {"id": "videos", "name": "视频", "icon": "🎬", "extensions": ["mp4", "avi", "mov"]},
      {"id": "audios", "name": "音频", "icon": "🎵", "extensions": ["mp3", "wav", "flac"]},
      {"id": "others", "name": "其他", "icon": "📦", "extensions": []}
    ]
  }
}
```

**栏目配置项说明：**
| 字段名 | 类型 | 必填 | 描述 |
|-------|------|------|------|
| id | String | 是 | 栏目的唯一标识符（在资源中引用） |
| name | String | 是 | 栏目的显示名称 |
| icon | String | 否 | 栏目的图标（可以使用 emoji 或 HTML 标签） |

**资料类型配置项说明：**
| 字段名 | 类型 | 必填 | 描述 |
|-------|------|------|------|
| id | String | 是 | 类型的唯一标识符（在资源中引用） |
| name | String | 是 | 类型的显示名称 |
| icon | String | 否 | 类型的图标（可以使用 emoji 或 HTML 标签） |
| extensions | Array | 否 | 该类型支持的文件扩展名列表 |

#### 资源列表部分（resources）

每个资源项包含以下字段：

| 字段名 | 类型 | 必填 | 描述 |
|-------|------|------|------|
| id | String | 是 | 资源的唯一标识符 |
| name | String | 是 | 资源的名称 |
| file | String | 是 | 资源文件的路径 |
| type | String | 否 | 资源类型（对应 config.types 中的 id） |
| description | String | 否 | 资源描述 |
| date | String | 否 | 添加日期（格式：YYYY-MM-DD） |
| size | String | 否 | 文件大小 |
| tags | Array | 否 | 资源标签数组 |
| section | String | 否 | 所属学习栏目（对应 config.sections 中的 id） |
| author | String | 否 | 资源作者 |
| format | String | 否 | 文件格式 |
| categories | Array | 否 | 资源分类数组 |
| thumbnail | String | 否 | 缩略图路径（图片资源可使用） |
| download_count | Number | 否 | 下载次数 |

### 如何添加资源

#### 步骤 1：打开资源数据文件

使用文本编辑器打开网站根目录下的 `resources.json` 文件。

#### 步骤 2：添加新资源

在 `resources` 数组中添加新的资源信息：

```json
{
  "resources": [
    {
      "id": "1",
      "name": "灵官力扣题目.pdf",
      "file": "storage/documents/灵官力扣题目.pdf",
      "type": "documents",
      "description": "力扣算法题目解析与答案，包含详细的解题思路和代码实现。",
      "date": "2023-10-21",
      "size": "2.5MB",
      "tags": ["算法", "编程", "力扣", "LeetCode"],
      "section": "algorithm",
      "author": "张三",
      "format": "PDF",
      "categories": ["技术文档", "算法学习"],
      "thumbnail": null,
      "download_count": 0
    }
  ]
}
```

#### 步骤 3：上传资源文件（如果需要）

如果资源是本地文件（如 PDF、文档等），您可以将文件上传到以下目录中：
- 文档文件 -> `storage/documents/`
- 图片文件 -> `storage/images/`
- 视频/音频文件 -> `storage/media/`
- 归档文件 -> `storage/archives/`

#### 步骤 4：保存文件

保存 `resources.json` 文件后，您的新资源将显示在网站的资源页面上。

### 筛选功能使用说明

资料展示页面提供了四种筛选功能，帮助用户快速找到所需资料：

1. **学习栏目筛选**：页面顶部的第一个筛选组包含 "全部栏目" 和各种学习栏目（如算法学习、办公工具等）。点击不同的栏目按钮可以筛选对应类别的资料。

2. **资料类型筛选**：第二个筛选组包含 "全部" 和不同资料类型（如文档、图片等）。点击不同的类型按钮可以筛选对应类型的资料。

3. **时间筛选**：提供对资料按时间范围进行筛选的功能。

4. **大小筛选**：提供对资料按文件大小进行筛选的功能。

### 选中状态显示

筛选按钮在选中时会显示以下视觉效果：
- 背景颜色变为深蓝色(#3498db)
- 文字颜色变为白色
- 文字加粗显示

这些视觉变化清晰地指示当前激活的筛选条件，帮助用户了解当前的筛选状态。

### 筛选逻辑

所有筛选条件（栏目、类型、时间、大小）将同时生效，只有同时满足所有筛选条件的资料才会显示。点击 "全部" 或 "全部栏目" 按钮可以清除对应类别的筛选条件。

## 如何修改网站基本信息

### 修改网站标题和描述

打开 `index.html` 文件，找到以下部分并修改：

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>个人网站 - 首页</title> <!-- 修改为您的网站标题 -->
    <meta name="description" content="个人简历、学习记录和资料展示"> <!-- 修改为您的网站描述 -->
    <!-- 其他代码保持不变 -->
</head>
```

### 修改联系方式

网站底部联系方式通过模态框展示，提供了邮箱、GitHub 和微信三种联系方式。

打开 `index.html` 文件，找到页脚部分（footer）的联系方式代码并修改：

```html
<div class="footer-column">
    <h3>联系方式</h3>
    <ul>
        <li><a href="mailto:your-email@example.com"><i class="fas fa-envelope"></i> 邮箱</a></li>
        <li><a href="#"><i class="fab fa-github"></i> GitHub</a></li>
        <li><a href="#" onclick="showWechatQRCode()"><i class="fab fa-weixin"></i> 微信</a></li>
    </ul>
</div>
```

**重要说明：** 
- 邮箱链接必须以 `mailto:` 开头，否则将无法正确打开邮件客户端
- GitHub 链接设置为 `#` 以避免直接跳转，系统会通过模态框展示 GitHub 信息
- 微信链接需要包含 `onclick="showWechatQRCode()"` 以显示二维码

修改步骤：
1. **邮箱**：将 `your-email@example.com` 替换为您的实际邮箱地址
2. **GitHub**：在 JavaScript 代码中自动从页脚链接获取 GitHub 地址，或在 `js/main.js` 中的 `initContactInfo` 函数中直接设置
3. **微信二维码设置**：
   - 将您的微信二维码图片保存为 `wechat-qrcode.jpg`
   - 上传图片到 `storage/images/` 文件夹
   - 系统会自动在点击微信图标时显示二维码

### 修改导航栏链接

如果需要修改导航栏的链接文本，可以在 `index.html` 文件中找到以下部分并修改：

```html
<ul class="nav-links">
    <li><a href="index.html"><i class="fas fa-home"></i> 首页</a></li>
    <li><a href="about.html"><i class="fas fa-user"></i> 个人简历</a></li>
    <li><a href="blog.html"><i class="fas fa-book"></i> 学习记录</a></li>
    <li><a href="resources.html"><i class="fas fa-folder"></i> 资料展示</a></li>
</ul>
```

您也可以在这里添加对最新动态页面的链接：

```html
<li><a href="updates.html"><i class="fas fa-newspaper"></i> 最新动态</a></li>
```

## 如何在本地预览网站

### Windows 系统

1. 确保您的电脑上安装了 Python（如果没有，请先安装）
2. 打开命令提示符（按 Win+R，输入 cmd，回车）
3. 导航到网站文件夹：
```
cd d:\Download\github\my-personal-site
```
4. 启动本地服务器：
   ```
   python -m http.server 8000
   ```
5. 打开浏览器，访问：`http://localhost:8000`

## 常见问题解答

**Q: 我修改了内容，但是网站没有更新怎么办？**
A: 尝试刷新浏览器页面，有时候浏览器会缓存旧内容。如果还是没有更新，请确保文件已经正确保存，并且路径引用正确。

**Q: 如何添加图片到我的博客或简历中？**
A: 将图片文件上传到 `storage/images/` 文件夹，然后在 Markdown 中使用以下语法引用：
   ```markdown
   ![图片描述](storage/images/图片文件名.jpg)
   ```

**Q: 如何修改网站的颜色主题？**
A: 可以修改 `css/style.css` 文件中的颜色变量：
   ```css
   :root {
       --primary: #4361ee; /* 主色调 */
       --secondary: #3a0ca3; /* 次要颜色 */
       --accent: #f72585; /* 强调色 */
       /* 其他颜色变量 */
   }
   ```

**Q: 我的资源文件无法访问怎么办？**
A: 请检查文件路径是否正确，确保文件名大小写与路径中一致。同时，确保资源文件已正确上传到指定的存储目录中。

**Q: 联系方式模态框不显示怎么办？**
A: 请检查以下几点：
   1. `js/main.js` 文件是否正确加载
   2. 确保页面底部的脚本能够正常执行
   3. 浏览器控制台是否有错误信息

## 部署到线上服务器

如果您想将网站发布到互联网上，可以考虑以下方式：

1. **GitHub Pages**：免费托管静态网站，集成 GitHub 仓库
2. **Netlify**：提供免费的静态网站托管，支持自动部署
3. **Vercel**：专为前端项目设计的部署平台，提供免费计划
4. **阿里云/腾讯云等国内云服务器**：自行配置 Web 服务器

每种部署方式都有详细的官方教程，您可以根据自己的需求选择合适的平台。

## 技术栈说明

- **前端框架**：原生 HTML/CSS/JavaScript
- **Markdown 渲染**：使用 marked.js 库
- **图标库**：Font Awesome (通过 CDN 引入)
- **样式**：使用 CSS3，支持响应式设计
- **本地开发**：Python http.server

## 安全注意事项

### 密码保护功能

为了保护网站内容不被未授权访问，项目实现了基于JavaScript的密码保护功能。

#### 功能说明
- 访问任何页面都会被重定向到密码验证页面
- 密码验证基于sessionStorage，关闭浏览器窗口后需要重新验证
- 密码验证成功后，可以访问所有页面

#### 如何修改密码

1. 打开 `password.html` 文件
2. 找到 `CORRECT_PASSWORD` 变量，修改为您想要的密码

```javascript
// 密码配置
const CORRECT_PASSWORD = '******'; // 将******修改为您的密码
```

#### 密码验证流程

1. 用户访问网站的任何页面（如index.html、about.html等）
2. 系统检查用户是否已经通过验证
3. 如果没有通过验证，用户会被重定向到 `password.html` 页面
4. 用户输入密码并提交
5. 密码验证成功后，用户会被重定向到 `index.html` 页面
6. 用户可以正常访问所有页面

#### 相关文件

- `password.html`：密码验证页面，包含密码输入表单和验证逻辑
- `js/password-redirect.js`：密码保护重定向脚本，在所有页面中引用，用于检查用户是否已经通过验证

## 阶段 3-6 升级摘要与使用说明

- 交互与动效优化（阶段 1）：统一模态框、移动端导航、滚动性能优化
- 布局与美化（阶段 2）：英雄区使用紧凑类（`hero--compact`/`hero--tight`），筛选样式迁移到全局CSS
- 内容加载与数据结构（阶段 3）：引入 `assets/posts.json`；全局 `parseFrontMatter` 解析器；动态页支持 `tags`
- 性能优化（阶段 4）：图片统一 `loading="lazy"` 与 `decoding="async"`；主脚本 `defer`；CDN `preconnect`
- 可访问性与 SEO（阶段 5）：`skip-link`、`main` 语义分区、ARIA/键盘支持、可见焦点样式；各页补充 `meta description/og/twitter`
- 质量与发布（阶段 6）：为静态资源添加版本指纹参数（`?v=YYYYMMDD`）；提供站点地图生成脚本

### 资源缓存与版本指纹

为减少浏览器旧缓存的影响，需在“所有引用到站点主样式与脚本的页面”添加版本参数，而不是只修改某一个文件。当前项目已在以下页面完成设置：

```html
<link rel="stylesheet" href="css/style.css?v=20251119">
<script src="js/main.js?v=20251119" defer></script>
```

需要更新的位置（页面与具体行）：

- `index.html:12` 与 `index.html:254`
- `about.html:12`、`about.html:448-449`
- `blog.html:12`、`blog.html:113-114`
- `blog-detail.html:12`、`blog-detail.html:106-107`
- `resources.html:12`
- `updates.html:12`、`updates.html:198`

说明：
- 若新增页面，也应在该页面的 `<link rel="stylesheet" href="css/style.css?...">` 与 `<script src="js/main.js?...">` 添加相同版本参数
- 某些页面同时引用 `lib/marked.min.js`，已同样附加版本参数，位置：`about.html:448`、`blog.html:113`、`blog-detail.html:106`
- 版本参数的值不必强制为日期，但使用 `YYYYMMDD` 便于维护；强制刷新缓存时，将上述位置中的 `20251119` 更新为当前日期即可

### 生成站点地图

站点根目录提供 `scripts/generate_sitemap.py`，可根据 `assets/posts.json` 自动生成 `sitemap.xml`。使用方法：

```bash
cd d:\Download\github\my-personal-site
python scripts/generate_sitemap.py --base https://guoguoapi.github.io/my-personal-site
```

执行成功后会在项目根目录生成/覆盖 `sitemap.xml`。如部署域名不同，请将 `--base` 参数改为你的实际域名。

### 图片与可访问性建议

- 博客与Markdown内容中的图片已默认懒加载与异步解码，建议为大图提供合适的尺寸与比例，减少布局抖动
- 键盘用户可使用页面顶部的“跳到内容”链接快速进入主内容区域


- 请勿在网站中存储敏感个人信息
- 文件上传时请注意文件类型和大小限制
- 如有数据库操作，请确保进行适当的输入验证和安全防护
- 定期更新依赖库，修复可能存在的安全漏洞

---

希望这个教程对您有所帮助！如果有任何问题，请随时查阅相关文档或寻求帮助。
 
## 完整使用指南（2025-11-20 更新）

### 项目总览

- 项目类型：纯静态站点（原生 `HTML/CSS/JavaScript`）
- 主要模块：`首页`、`个人简历`、`学习记录（列表/详情）`、`最新动态`、`资料展示`
- 数据来源：`assets/` 目录（`resume.md`、`updates.md`、`posts.json`、`resources.json`）与 `notes/`
- 预览与部署：本地使用 `python -m http.server`，线上可用 GitHub Pages/Netlify/Vercel

### 快速开始

- 安装与预览
  - 打开终端进入项目目录：`cd d:\Download\github\my-personal-site`
  - 启动本地服务器：`python -m http.server 8000`
  - 访问：`http://localhost:8000`
- 常用入口
  - 个人简历：`about.html`
  - 学习记录：`blog.html`（列表）与 `blog-detail.html`（详情）
  - 资料展示：`resources.html`
  - 最新动态：`updates.html`

### 内容管理详解

- 简历（`assets/resume.md`）
  - 使用 Markdown + YAML 元数据（`title/author/contact/updated`）
  - 保存后刷新页面自动渲染到 `about.html`
- 最新动态（`assets/updates.md`）
  - 以 `---` 分隔的 YAML 元数据块 + 正文，最新条目置顶
  - 页面：`index.html` 的“最新动态”板块与 `updates.html`
- 学习记录（`notes/*.md` + 可选 `assets/posts.json`）
  - 推荐在 `assets/posts.json` 维护文章清单与元数据，便于排序与筛选
  - `category` 建议使用枚举：`tech`/`life`/`note`，其他值将显示为“其他”
  - 页面：`blog.html` 自动加载列表，点击进入 `blog-detail.html`
- 资料展示（`assets/resources.json`）
  - `config.sections` 与 `config.types` 动态生成筛选器
  - `resources` 数组为资料清单，字段含 `id/name/file/type/description/...`
  - 页面：`resources.html`，支持类型/栏目/时间/大小四维筛选与预览/下载

### 资源文件组织与规范

- 推荐路径
  - 文档：`storage/documents/`
  - 图片：`storage/images/`
  - 媒体：`storage/media/`
  - 归档：`storage/archives/`
- 命名建议
  - 使用描述性文件名（示例：`2023-算法题解-第1版.pdf`）
  - 避免空格，优先使用半角破折号或下划线

### 样式系统与设计令牌

- 全局设计令牌（位于 `css/style.css` 的 `:root`）
  - 颜色：`--primary`、`--secondary`、`--accent`、`--neutral-*`、`--success/--warning/--danger`
  - 圆角：`--radius-sm/md/lg/pill`
  - 阴影：`--shadow-sm/md/lg`
  - 间距：`--space-8/16/24/32/48` 等
  - 版心宽度：`--content-max`
- 组件与交互要点
  - 英雄区：`hero--compact/hero--tight` 控制内边距，移动端字体与权重已优化
  - 卡片：悬停抬升与阴影；卡片内语义标签高饱和度（`tech/life/note` 强制白字）
    - 位置：`css/style.css:1781–1795`
  - 卡片链接：悬停统一为下划线、移除位移（`css/style.css:511–515`）
  - Markdown 引用：弱化对比度与背景（`css/style.css:657–665`）
  - 代码块：增强可读性与标识（顶部 `code` 标记：`css/style.css:1772–1780`）
  - 资源缩略图：固定 `16/9` 比例、裁剪与轻动效（`css/style.css:1476–1490`）
  - 资源按钮：悬停统一采用亮度增强（`css/style.css:1389–1423`）
  - 不支持预览提示：图标圆形容器、居中堆叠（`css/style.css:1641–1650`）
- 响应式断点
  - 主要断点：`600px` 与 `768px`，在各组件下有针对性调整
- 无障碍与焦点
  - 可见焦点样式：`outline: 3px solid var(--accent)`（示例：`css/style.css:210` 一组）
  - 键盘导航：`skip-link`、ARIA 标签与 `focus-visible` 支持

### 模态框与预览行为

- 预览模态框（`resources.html` 内联脚本负责初始化与事件）
  - 支持图片/PDF/文本预览；其他类型显示“不支持预览”提示
  - `modal-body` 居中栈布局，提示与控件居中对齐（`css/style.css:1557–1561`）
- 不支持预览样式与居中
  - 容器：`#unsupportedPreview` 使用 `flex` 垂直居中堆叠（`css/style.css:1647–1650`）
  - 图标：`.unsupported-icon` 圆形背景承载 `i` 图标（`css/style.css:1641–1646`）

### 浏览器缓存与版本指纹

- 为避免旧样式缓存，所有页面的 `css`/`js` 引用均附加版本参数（示例：`?v=20251119`）
- 更新缓存时需同步修改所有页面的版本参数（详细位置见上文“资源缓存与版本指纹”章节）

### 部署建议

- GitHub Pages
  - 推送至仓库后在仓库设置中开启 Pages，选择 `root` 作为站点目录
- Netlify/Vercel
  - 连接仓库后设静态根目录为项目根；构建命令为空
- 自建服务器
  - 将整个目录上传至 Web 根目录；确保静态资源路径一致

### 常见问题与排查

- 页面未更新
  - 清除浏览器缓存或更新版本参数；确认文件已保存到正确位置
- 资源无法访问
  - 检查 `resources.json` 与文件路径大小写；本地路径是否位于 `storage/`
- 预览弹窗异常
  - 检查控制台报错；确认 CDN（`pdf.js`、`font-awesome`）可访问
- 样式不一致
  - 确认页面已引入最新 `style.css`；避免页面内联样式覆盖（已在 CSS 中针对联系弹窗做作用域限定）

### 安全与隐私

- 不存储敏感个人信息；公开资源避免包含隐私数据
- 引入外部脚本与样式时使用可信源；定期更新版本

### 近期优化摘要（3–6 阶段）

- 样式一致性：统一按钮与链接悬停、语义标签高饱和度、引用与代码块可读性
- 响应式与动效：移动端英雄区、卡片阴影与交互简化、图片懒加载与异步解码
- 可访问性：键盘导航、ARIA 标签、可见焦点
- 质量与发布：版本指纹、站点地图脚本

### 维护建议

- 定期整理 `assets/` 与 `notes/`，保持结构清晰
- 新增页面时同步添加版本参数与必要的 `meta`/`og`/`twitter` 标签
- 为大图与视频提供合理尺寸与比例，降低 CLS 与流量消耗