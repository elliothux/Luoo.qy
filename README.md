# Luoo.qy v1.0
### 一个基于 Electron 与 Vue 的落网第三方客户端  
![Alt text](build/screenShoot/preview.jpg?raw=true "Preview")

## 1. 关于 / About
[落网 ( luoo.net )](http://www.luoo.net/) 一直是我很喜欢的一个音乐社区, 其中大量优质的独立音乐推荐很合我的口味, 他们十多年对音乐的坚持也让我充满敬意。落网是我手机上使用频率仅次于网易云的音乐软件, 但是电脑端却只能使用网页来听落网, 因此便决定给落网写电脑客户端。  

新的 Luoo.qy v1.0 版本经过了接近两个月的开发, 每一处 UI 都经过精心地重新设计, 同时还增加了用户登录、同步收藏与歌词显示(Working)等大量的功能, 内部的代码也经过完全的重构, 进行了大量的优化; 更多功能请下载后体验:
* 客户端可以在 [http://l.page.中国](http://l.page.中国) 下载
* 后端项目地址为 [Luoo(GitHub)](https://github.com/HuQingyang/Luoo)


## 2. 预览 / Preview
### 设计稿
![Alt text](build/screenShoot/design.png?raw=true "Preview")

### 期刊列表:
![Alt text](build/screenShoot/vols.png?raw=true "Preview")

### 期刊:
![Alt text](build/screenShoot/vol.png?raw=true "Preview")

### 单曲列表:
![Alt text](build/screenShoot/singles.png?raw=true "Preview")

### 正在播放:
![Alt text](build/screenShoot/playing.png?raw=true "Preview")

### 音乐类型:
![Alt text](build/screenShoot/types.png?raw=true "Preview")

### 设置:
![Alt text](build/screenShoot/setting.png?raw=true "Preview")

### 登录:
![Alt text](build/screenShoot/login.png?raw=true "Preview")

### 收藏期刊:
![Alt text](build/screenShoot/collectionVols.png?raw=true "Preview")

### 收藏期刊歌曲:
![Alt text](build/screenShoot/collectionTracks.png?raw=true "Preview")

### 收藏单曲:
![Alt text](build/screenShoot/collectionSingles.png?raw=true "Preview")


## 3. 开发 / Development
* 设计工具: Sketch
* 开发平台: macOS Sierra、Windows 10
* 开发工具: WebStorm、PyCharm、SublimeText
* 客户端技术栈: Electron、Vue、Vuex、NeDB、Webpack 等
* 后端技术栈: Node、Koa、Python、MongoDB、Urllib、BeautifulSoup 等

客户端项目结构:
```
├── README.md
├── build (打包所需文件)
├── db (数据库文件)
├── main.js (主进程文件)
├── package.json (项目信息文件)
├── src (渲染进程代码目录)
│   ├── components (组件目录)
│   │   ├── App.vue (Root 组件)
│   │   ├── Common (通用组件库)
│   │   │   └── Toggle.vue
│   │   ├── HeadBar.vue (导航栏)
│   │   ├── Playing.vue (控制栏)
│   │   ├── PlayingTrack.vue (正在播放)
│   │   ├── Singles (单曲)
│   │   │   ├── Single.vue
│   │   │   └── Singles.vue
│   │   ├── Types.vue (云月类型选择)
│   │   ├── User (用户)
│   │   │   ├── Login.vue (登录)
│   │   │   ├── User.vue (用户入口)
│   │   │   ├── UserCollection.vue (用户收藏)
│   │   │   └── UserSetting.vue (设置)
│   │   ├── VolView (期刊内容)
│   │   │   ├── VolTrack.vue
│   │   │   └── VolView.vue
│   │   └── Vols (期刊)
│   │       ├── Vol.vue
│   │       └── Vols.vue
│   ├── index.js (渲染进程入口)
│   └── store (状态管理)
│       ├── actions.js
│       ├── getters.js
│       ├── index.js
│       ├── mutations.js
│       └── state.js
├── static (客户端引入的静态文件)
│   ├── dist (渲染进程打包)
│   │   └── index.build.js
│   ├── fonts (字体)
│   ├── html (渲染进程入口文件)
│   ├── js (主进程所需文件)
│   │   ├── autoUpdate.js (自动热更新)
│   │   ├── config.js (处理用户配置)
│   │   ├── db.js (处理数据库操作)
│   │   ├── menuTemplate.js (载入菜单栏)
│   │   ├── sync.js (同步数据)
│   │   └── user.js (用户功能)
│   ├── pic (图片)
│   └── style (CSS 文件)
├── upgrade (热更新自动下载文件)
├── user (用户目录)
│   └── config.json (用户配置)
└── webpack.config.js (webpack 配置)
```


## 4. 技术实现 / Technology
### 技术栈
整个 Luoo.qy v1.0 项目采用了 MVVM 模式, 实现了前后端完全分离, 后端只负责响应前端的 API 请求;  

整个前端技术栈由 v0.0 版本的 React 转向了 Vue; 后端技术栈也全面拥抱 JavaScript 生态, 由 Python + Flask 转为 Node + Koa (提供 API 接口) 和 Python + Urllib + Beautiful (爬取数据) 与 MongoDB (存储数据);  

由于 V0.0 版本未使用状态管理, 使得某些功能的实现略显繁琐, 也造成了一些问题, 于是新版本理所当然的使用了 Vue + Vuex 组合, 实现前端的状态管理;  

### 用户功能的实现
为了实现用户功能, 研究了落网的用户登录机制: 第一次访问网站的时候服务器会返回一个 key 为 "LUOOSESS" 的 Cookie, 当用户登录的时候, 带着这个 Cookie 与用户的账号和密码数据以 POST 方法向 "http://www.luoo.net/login/" 发送请求, 如果登陆成功, 服务端将会返回一段包含用户信息的 JSON 数据, 同时返回另一个 key 为 "lult" 的 Cookie;   
当用户进行收藏 / 取消收藏时, 带着 key 为 "lult" 的 Cookie 向响应的 API 发送 POST 请求, 成功后服务端将返回一段 JSON 数据表示操作成功;  
为了获取用户收藏, 采用爬虫的思路, 用 Node 的 request 模块访问用户收藏页面并解析 DOM 从而获取用户收藏列表;  
更多细节请访问 static/js/user.js 文件;

### 自动更新与热更新
Electron 有很多自动更新的模块可用, 但是都感觉过于繁琐, 于是采用了我在另一个项目 [Page.qy](https://github.com/HuQingyang/Page.qy) 中实现的一个轻量级的自动更新模块来实现了增量更新与热更新;  
采用文件热替换原理, 如果只更新了渲染进程, 更新完毕后只需要执行 webContents.reload() 甚至可以在不重启软件的情况下实现无痛更新!

### 一些问题与解决方案
另外, Luoo.qy 在开发过程中出现过性能等方面问题, 因此做了一些工作来进行优化:

* 每次 Store 载入新的数据时都会造成严重的卡顿, 了解了 Vue 背后的原理后, 知道这是由于 Vue 为了实现数据到视图的响应式变化, 会对 Store 中的每个对象添加 setter 和 getter 方法以实现数据监听, 但当有大量的数据存入 Store 时, 为每个对象都做这些操作会消耗大量的时间, 因此便会造成卡顿; 于是, 采用 Object.freeze 方法冻结对象避免 Vue 对其进行添加 getter 和 setter 的操作, 同时不直接访问 State 里的数据, 而是采用只改变 index, 使用 Vuex 的 getters 来间接访问数据;

* 最初打算使用路由管理来实现视图的切换, 但是因为 Luoo.qy 的数据量较大且视图关系比较复杂, 每次切换视图会进行 DOM 的重绘, 使得视图无法实现"无缝切换"的感觉, 遂弃用路由管理, 然后自己手动实现视图切换: 在启动时直接把所有的需要的组件渲染进 DOM, 然后动态设置 CSS 的 transform、transition、z-index 和 opacity, 由于这样不会引起 DOM 的重绘, 且 CSS 动画可以使用硬件加速, 因此便实现了流畅的"无缝切换"的视图; 这样牺牲一些启动时间也是值得的; 

* 最初搜索期刊是使用 Array.filter 方法来实现的, 会对一个包含上千个对象的数组进行遍历, 每次操作时都会感觉到有一些延迟, 于是在主进程中暴露一个直接在本地数据库中进行查找的方法, 在渲染进程中使用 Remote 模块来访问这个方法, 大大减少了查找的时间;

* 期刊与单曲等的背景颜色是根据封面图片的 RGB 值取平均色求得的, 最初使用 Canvas 实现, 因此每载入一张图片都会新建一个 Canvas 对象, 造成了大量的内存占用, 于是将这个任务交给后端的爬虫: 爬取数据时下载封面图片并使用 Python 的图形库 Pillow 来计算图片的 RGB 平均値, 这样使得客户端内存占用量大大较少;

* 为了提高软件的加载速度, 软件打包时将数据库文件一起打包; 软件启动时, 首先载入本地数据库中的数据, 同时向服务器请求更新数据, 然后将更新的数据存入数据库, 这样提高了加载速度同时减少了服务器请求次数;

* 上个版本中每更新一次数据就会向服务端发送一次 HTTP 请求, 如果有大量的数据需要更新, 将会消耗大量的时间用于建立/断开连接; 新版本中对服务端 API 进行了完全的重新设计, 对多次请求进行合并, 大大减少了建立连接的次数与更新数据所需的时间, 同时也意味着得服务器能够更有效率地响应更多请求;

* 使用 CSS 规则 "transform: transale3d(0, 0, 0)" 来强行启用硬件加速提高页面滚定体验 

* Electron 在 Windows 上打包出的是一个文件夹而不是单个的 exe 文件, 使用 NSIS 可以将所有文件打包为单个安装文件


## 5. Q & A
##### 为什么从 React 转向 Vue ?
无其他原因, 因为暑期实习的公司要用 Vue, 于是边学 Vue 边写完了 Luoo.qy v1.0;

##### 为什么从 Flask 转向 Koa ?
It's cool! 😎

##### 未来的新功能 ?
因为落网官方的歌词很不全而且大多不支持歌词滚动, 因此正在找合适的第三方 API 来获取歌词, 实在不行上爬虫, 但是一定会有的! 另外**可能会**加入自动同步收藏到网易云等功能, 敬请期待...

##### 怎样给我反馈 Bug 或提建议?
直接在 GitHub 上开 ISSUE 或者关注 [我的知乎](https://www.zhihu.com/people/hu-qing-yang-67/activities) 向我发私信, 你也可以给我发邮件 [hqy841440305@gmail.com](mailto://hqy841440305@gmail.com);

## 总结 / Summary
特别感谢我的好基友 [kylewh @GitHub](https://github.com/kylewh) 在 UI 和 HTTP 请求分析等方面给我提供的宝贵的指导和建议! 欢迎前端的同学特别是 React 技术栈的关注他的 GitHub !  

到目前为止, Luoo.qy v1.0 才算是实现了所有的基本功能, 因为马上要开始暑期实习了, 可能会更新地较慢, 但是Luoo.qy 短期内不会停止更新, 敬请期待 ❤️  

落 · 在低处 (2017/07/01)

### #EOF