# 存档：备用的样式和动画

这个文件夹里的东西**不会出现在网站上**（Jekyll 不发布以下划线开头的文件夹），只是存着备用。
网站当前用的是简洁版（A），样式在 `assets/css/main.css`。

所有存档都是"叠加在 main.css 上面"的：不需要改 main.css，只要额外加载对应文件即可。
下面的路径都相对于网站根目录。

---

## 1. 暗色科技（`dark-tech/`）

整站换成深色背景：淡网格、单一青色发光、大写发光名字和偶尔的故障闪动（青色 + 琥珀色，没有紫色）、
左上角名字后面跳动的光标 `_`、头像周围发光的网络图、子页面标题上方的 `~/qinyangyu/research $` 路径。

启用方法：

1. 把 `dark-tech/dark.css` 复制到 `assets/css/dark.css`，把 `dark-tech/dark.js` 复制到 `assets/js/dark.js`。
2. 在 `_includes/head.html` 里、`main.css` 那一行**下面**加：
   ```html
   <link rel="stylesheet" href="{{ '/assets/css/dark.css' | relative_url }}">
   ```
3. 在 `_layouts/default.html` 里、`slider.js` 那一行下面加：
   ```html
   <script src="{{ '/assets/js/dark.js' | relative_url }}" defer></script>
   ```

想换回简洁版，删掉这两行即可。

---

## 2. 心智与 AI 动画（`mind-and-ai/`）

左边是人脑侧脸（琥珀色，大脑是想法连成的网），右边是机器人（蓝绿色，有电路），
想法沿着弧线在两者之间流动、变色。鼠标移过去附近的想法会连向鼠标，点一下会有一串想法射向另一边。
同一个脚本 `mind.js`，配两种样式：

| 样式文件 | 效果 |
| --- | --- |
| `mind-homepage-dark.css` | 首页顶部变成深色横幅，两个头在名字两侧（之前预览里的 D） |
| `mind-banner-white.css` | 白色背景的独立横幅，放在某个页面最上方，不压任何文字（之前预览里的 F） |

### 用法 A：放在某个页面顶部（白色横幅）

适合以后给某个项目单独做展示页。

1. 复制 `mind.js` → `assets/js/mind.js`，`mind-banner-white.css` → `assets/css/mind-banner.css`。
2. 在那个页面（比如 `research.md` 或新的项目页）的 front matter 下面、正文最前面加：
   ```html
   <link rel="stylesheet" href="{{ '/assets/css/mind-banner.css' | relative_url }}">
   <div class="mind-banner" aria-hidden="true"></div>
   <script src="{{ '/assets/js/mind.js' | relative_url }}" defer></script>
   ```

### 用法 B：首页顶部深色横幅

1. 复制 `mind.js` → `assets/js/mind.js`，`mind-homepage-dark.css` → `assets/css/mind-homepage.css`。
2. 在 `_layouts/homepage.html` 最上面（`---` 下面）加：
   ```html
   <link rel="stylesheet" href="{{ '/assets/css/mind-homepage.css' | relative_url }}">
   <script src="{{ '/assets/js/mind.js' | relative_url }}" defer></script>
   ```

### 调颜色

动画的颜色和发光强度都由样式文件最上面的变量控制，不用改脚本：

- `--mind-human`：人这一侧的颜色（琥珀色）
- `--mind-ai`：AI 这一侧的颜色（蓝绿色）
- `--mind-glow`：发光强度，`1` 是霓虹感（适合深色背景），`0.35` 是白底上的柔和效果
- `--mind-target: banner`：只画在横幅里，不会出现在首页

如果以后要为某个项目定制动画内容（比如换成该项目的模型或数据），可以在 `mind.js` 的基础上改。
