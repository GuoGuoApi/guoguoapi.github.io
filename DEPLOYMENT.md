# GitHub Pages 部署教程

本教程将详细指导您如何将个人网站部署到 GitHub Pages，以便通过 `your-username.github.io` 域名访问您的网站。

## 前提条件

1. 已安装 Git 并配置好 Git 环境
2. 已创建 GitHub 账号
3. 本地项目已完成开发并准备好部署

## 部署步骤

### 步骤 1：在 GitHub 上创建新仓库

1. 登录您的 GitHub 账号
2. 点击页面右上角的 `+` 图标，选择 `New repository`
3. 在仓库创建页面填写以下信息：
   - **Repository name**：输入 `your-username.github.io`（将 `your-username` 替换为您的 GitHub 用户名）
   - **Description**：可选，输入仓库描述
   - **Repository type**：选择 `Public`（GitHub Pages 需要公开仓库）
   - **Initialize this repository with**：不勾选任何选项（我们将从本地推送项目）
4. 点击 `Create repository` 按钮创建仓库

### 步骤 2：（可选）删除已有的 Git 初始化

如果您的项目已经初始化了 Git，但想重新开始（例如更换仓库），需要先删除已有的 Git 初始化：

1. **检查项目是否已初始化 Git**：
   ```bash
   ls -la
   ```
   如果看到 `.git` 目录，说明项目已经初始化了 Git。

2. **删除已有的 Git 初始化**：
   - **在 CMD 中**：
     ```bash
     rd /s /q .git
     ```
   - **在 Git Bash 中**：
     ```bash
     rm -rf .git
     ```
   - **在 Linux/Mac 终端中**：
     ```bash
     rm -rf .git
     ```

### 步骤 3：在本地项目中初始化 Git

1. 打开命令行终端（CMD或Git Bash）
2. 导航到您的项目目录：
   - **在CMD中**：
     ```bash
     cd d:\Download\github\my-personal-site
     ```
   - **在Git Bash中**：
     ```bash
     cd /d/Download/github/my-personal-site
     ```
3. 初始化 Git 仓库：
   ```bash
   git init
   ```
4. 将所有文件添加到暂存区：
   ```bash
   git add .
   ```
5. 提交文件：
   ```bash
   git commit -m "Initial commit"
   ```

### 步骤 3：将本地项目推送到 GitHub 仓库

1. 在 GitHub 仓库页面复制仓库的 HTTPS 或 SSH URL
2. 在本地终端添加远程仓库：
   ```bash
   git remote add origin https://github.com/your-username/your-username.github.io.git
   ```
3. 将本地代码推送到远程仓库的 main 分支：
   ```bash
   git push -u origin main
   ```
4. 输入您的 GitHub 用户名和密码（或个人访问令牌）进行身份验证

### 步骤 4：检查当前分支名称

在配置 GitHub Pages 之前，需要检查您的本地 Git 分支名称。GitHub 之前的默认分支名是 `master`，现在已改为 `main`，但有些旧版本的 Git 或仓库可能仍然使用 `master`。

1. 检查当前分支名称：
   ```bash
   git branch
   ```

2. 如果输出为 `master` 而不是 `main`，您有两种选择：
   - **选项 1：将本地分支重命名为 main**
     ```bash
     # 重命名当前分支
     git branch -M main
     
     # 将重命名后的分支推送到远程仓库
     git push -u origin main
     ```
   - **选项 2：保持分支名为 master**
     - 您可以继续使用 `master` 作为分支名，后续步骤中相应地选择 `master` 而不是 `main`

### 步骤 5：配置 GitHub Pages

1. 在 GitHub 仓库页面点击 `Settings` 选项卡
2. 向下滚动到 `GitHub Pages` 部分
3. 在 `Source` 下拉菜单中选择：
   - **Branch**：选择您的主分支（`main` 或 `master`）
   - **Folder**：选择 `/ (root)`（根目录）
4. 点击 `Save` 按钮
5. 页面会自动刷新，您将看到 GitHub Pages 的配置信息，包括访问 URL

### 步骤 7：（可选）在 GitHub 上更改默认分支名

如果您希望 GitHub 仓库的默认分支名与 GitHub 的新默认（`main`）保持一致，可以执行以下操作：

1. 在 GitHub 仓库页面点击 `Settings` 选项卡
2. 点击左侧菜单中的 `Branches`
3. 在 `Default branch` 部分，点击下拉菜单选择 `main`
4. 点击 `Update` 按钮
5. 确认更改默认分支

这将使 GitHub 仓库的默认分支名变为 `main`，与新创建的仓库保持一致。

### 步骤 8：建立 SSH 连接（可选但推荐）

使用 SSH 连接到 GitHub 可以避免每次推送都需要输入密码或个人访问令牌，提高工作效率。

#### 1. 检查是否已经有 SSH 密钥

```bash
# 列出已有的 SSH 密钥
ls -la ~/.ssh
```

如果您看到 `id_rsa` 和 `id_rsa.pub` 文件，说明您已经有 SSH 密钥。

#### 2. 生成新的 SSH 密钥（如果没有）

```bash
# 生成新的 SSH 密钥（使用您的 GitHub 邮箱）
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

- 按 Enter 键使用默认保存位置
- 可以选择设置密码短语（推荐，增加安全性），或直接按 Enter 键跳过

#### 3. 将 SSH 密钥添加到 ssh-agent

```bash
# 启动 ssh-agent
eval "$(ssh-agent -s)"

# 添加 SSH 私钥
ssh-add ~/.ssh/id_rsa
```

#### 4. 将 SSH 公钥添加到 GitHub 账户

1. 查看 SSH 公钥内容：
   ```bash
   cat ~/.ssh/id_rsa.pub
   ```

2. 复制输出的公钥内容（从 `ssh-rsa` 开始到您的邮箱结束）

3. 登录 GitHub 账户，进入 "Settings" → "SSH and GPG keys"

4. 点击 "New SSH key" 按钮

5. 在 "Title" 字段中输入一个描述性名称（如 "My Laptop"）

6. 在 "Key" 字段中粘贴您的 SSH 公钥

7. 点击 "Add SSH key" 按钮

#### 5. 测试 SSH 连接

```bash
ssh -T git@github.com
```

如果成功，您会看到类似以下的输出：
```
Hi your-username! You've successfully authenticated, but GitHub does not provide shell access.
```

#### 6. 使用 SSH URL 连接远程仓库

如果您使用 SSH 连接，需要确保远程仓库 URL 也是 SSH 格式：

```bash
# 查看当前远程仓库 URL
git remote -v

# 如果 URL 是 HTTPS 格式，可以更改为 SSH 格式
# git remote set-url origin git@github.com:your-username/your-username.github.io.git
```

使用 SSH 连接后，您可以直接使用 `git push` 和 `git pull` 命令，无需每次输入密码或个人访问令牌。

### 步骤 9：验证部署结果

1. 等待几分钟（GitHub Pages 部署可能需要一些时间）
2. 在浏览器中访问 `https://your-username.github.io`
3. 如果部署成功，您将看到您的个人网站

## 注意事项

### 密码保护功能

由于您的网站实现了密码保护功能，请确保：
- 密码验证逻辑正常工作
- 所有页面都正确引用了 `password-redirect.js` 脚本
- 默认密码已修改为您想要的密码

### 静态资源路径

确保所有静态资源（图片、CSS、JavaScript 文件）的路径都是相对路径，避免使用绝对路径。例如：

```html
<!-- 正确的相对路径 -->
<link rel="stylesheet" href="css/style.css?v=20251119">
<script src="js/main.js?v=20251119" defer></script>

<!-- 错误的绝对路径 -->
<link rel="stylesheet" href="/css/style.css">
<script src="/js/main.js"></script>
```

### 自定义域名（可选）

如果您有自己的域名，可以将其配置为 GitHub Pages 的自定义域名：

1. 在 GitHub Pages 设置中，在 `Custom domain` 输入框中输入您的域名（例如 `yourdomain.com`）
2. 点击 `Save` 按钮
3. 在您的域名注册商处，添加以下 DNS 记录：
   - **A 记录**：指向 GitHub Pages 的 IP 地址（185.199.108.153、185.199.109.153、185.199.110.153、185.199.111.153）
   - **CNAME 记录**：将 `www.yourdomain.com` 指向 `your-username.github.io`
4. 等待 DNS 记录生效（可能需要几个小时）
5. 勾选 `Enforce HTTPS` 选项以启用 HTTPS

### 更新网站内容

当您需要更新网站内容时：

1. 在本地修改项目文件

2. 将修改添加到暂存区：
   - **拉取最新更改(使用 git pull 命令从远程仓库获取最新的文件版本并合并到当前分支)**：
      ```bash
      git pull origin main
      ```
   - **更新所有修改过的文件**：
     ```bash
     git add .
     ```
   - **只更新一个特定文件**：
     ```bash
     git add 文件路径
     ```
     例如：
     ```bash
     git add index.html
     git add css/style.css
     ```
   - **只更新几个特定文件**：
     ```bash
     git add 文件路径1 文件路径2 文件路径3
     ```
     例如：
     ```bash
     git add index.html css/style.css js/main.js
     ```

3. 提交修改：
   ```bash
   git commit -m "Update content"
   ```
   （建议使用更具描述性的提交信息，例如："Update homepage content" 或 "Fix CSS styling issue"）

4. 推送到远程仓库：
   ```bash
   git push origin main
   ```
   （如果您的分支名是 master，请使用 `git push origin master`）

5. 等待几分钟，GitHub Pages 会自动重新部署您的网站

## 常见问题

### 1. 访问网站时显示 404 错误

- 检查仓库名称是否正确（必须是 `your-username.github.io`）
- 检查 GitHub Pages 配置是否正确（分支和文件夹选择）
- 等待几分钟后再次尝试访问（部署可能需要时间）
- 检查是否有 CNAME 文件冲突（如果配置了自定义域名）

### 2. 静态资源无法加载

- 检查资源路径是否为相对路径
- 检查资源文件名的大小写是否正确（GitHub Pages 区分大小写）
- 清除浏览器缓存后再次尝试访问

### 3. 密码保护功能不工作

- 检查 `password.html` 中的密码是否正确设置
- 检查 `password-redirect.js` 是否在所有页面中正确引用
- 检查浏览器控制台是否有 JavaScript 错误
- 确保浏览器支持 `sessionStorage`（现代浏览器都支持）

### 4. 部署后内容没有更新

- 清除浏览器缓存后再次尝试访问
- 检查是否已经将最新修改推送到远程仓库
- 等待几分钟，GitHub Pages 可能正在重新部署

## 高级配置

### 站点地图

如果您想要生成站点地图，可以使用项目中的 `scripts/generate_sitemap.py` 脚本：

```bash
python scripts/generate_sitemap.py --base https://your-username.github.io
```

这将生成 `sitemap.xml` 文件，有助于搜索引擎索引您的网站。

### 自定义 404 页面

您可以在项目根目录创建 `404.html` 文件来自定义 404 页面。GitHub Pages 会自动使用这个文件作为 404 错误页面。

### SEO 优化

- 为每个页面添加适当的 `meta` 标签和 `title`
- 使用语义化的 HTML 标签
- 确保页面加载速度快
- 提供清晰的导航结构

## 总结

通过本教程，您已经成功将个人网站部署到 GitHub Pages，并可以通过 `https://your-username.github.io` 访问。如果遇到任何问题，请参考常见问题部分或 GitHub Pages 官方文档。

祝您部署顺利！
