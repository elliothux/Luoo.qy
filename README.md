# Luoo.qy V1.0
### 一个基于 Electron 与 Vue 的落网第三方客户端  
![Alt text](build/screenShoot/preview.jpg?raw=true "Preview")

## 1. 关于 / About
[落网 ( luoo.net )](http://www.luoo.net/) 一直是我很喜欢的一个音乐社区, 其中大量优质的独立音乐推荐很合我的口味, 他们十多年对音乐的坚持也让我充满敬意。落网是我手机上使用频率仅次于网易云的音乐软件, 但是电脑端却只能使用网页来听落网, 因此便决定给落网写电脑客户端。  

新的 Luoo.qy v1.0 版本经过了接近两个月的开发, 每一处 UI 都经过精心地重新设计, 同时还增加了用户登录、同步收藏与歌词显示(Working)等大量的功能, 内部的代码也经过完全的重构, 进行了大量的优化...  

更多功能请下载后体验:
* 客户端可以在[http://l.page.中国](http://l.page.中国)下载
* 后端项目地址为[Luoo(GitHub)](https://github.com/HuQingyang/Luoo)


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
整个 Luoo.qy V1.0 项目采用了 MVVM 模式, 实现了前后端完全分离, 后端只负责响应前端的 API 请求;  
整个前端技术栈由 React 转向了 Vue; 后端技术栈也全面拥抱 JavaScript 生态, 由 Python + Flask 转为 Node + Koa (提供 API 接口) 和 Python + Urllib + Beautiful (爬取数据) 与 MongoDB (存储数据);  

由于 V0.0 版本未使用状态管理, 使得某些功能的实现略显繁琐, 也造成了一些问题, 于是新版本理所当然的使用了 Vue + Vuex 组合, 实现前端的状态管理;  
另外, Luoo.qy 在开发过程中出现过严重的性能问题, 因此做了一些工作来优化性能:
* 每次 Store 载入新的数据时都会造成严重的卡顿, 了解了 Vue 背后的原理后, 知道这是由于 Vue 为了实现数据到视图的响应式变化, 会对 Store 中的每个对象添加 setter 和 getter 方法以实现数据监听, 但当有大量的数据存入 Store 时, 为每个对象都做这些操作会消耗大量的时间, 因此便会造成卡顿; 于是, 采用 Object.freeze 方法冻结对象避免 Vue 对其进行添加 getter 和 setter 的操作, 同时不直接访问 State 里的数据, 而是采用只改变 index, 使用 Vuex 的 getters 来间接访问数据;
* 最初打算使用路由管理来实现视图的切换, 但是因为 Luoo.qy 的数据量较大且视图关系比较复杂, 每次切换视图会进行 DOM 的重绘, 使得视图无法实现"无缝切换"的感觉, 遂弃用路由管理, 然后自己手动实现视图切换: 在启动时直接把所有的需要的组件渲染进 DOM, 然后动态设置 CSS 的 transform、transition、z-index 和 opacity, 由于这样不会引起 DOM 的重绘, 且 CSS 动画可以使用硬件加速, 因此便实现了流畅的"无缝切换"的视图; 这样牺牲一些启动时间也是值得的; 
* 最初搜索期刊是使用 Array.filter 方法来实现的, 会对一个包含上千个对象的数组进行遍历, 每次操作时都会感觉到有一些延迟, 于是在主进程中暴露一个直接在本地数据库中进行查找的方法, 在渲染进程中使用 Remote 模块来访问这个方法, 大大减少了查找的时间;
* 

其中遇到了一些问题及解决方案:

* 为了提高软件的加载速度, 软件打包时将数据库文件一起打包; 软件启动时, 首先载入本地数据库中的数据, 同时向服务器请求更新数据, 然后将更新的数据存入数据库, 这样提高了加载速度同时减少了服务器请求次数;

* 最初的客户端数据库采用了 LevelDB, 但是 LevelDB 在 Windows 上执行 electron-rebuild 一直失败, 可能是因为 LevelDB 依赖了 C 语言模块; 于是使用由纯 JavaScript 编写的 NeDB 重写了数据库;

* 为了提高 React 的渲染效率, 对于遵循了 React 纯函数思想的组件 (传入同样的 props, 一定能得到同样的渲染结果), 可以在定义组件时加入 `this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)` 钩子; 

* Electron 打包出的文件太大, node_modules 文件夹占了接近100M空间, 因此将渲染进程依赖的所有模块用 webpack 打包后删除, 这样只留下主进程需要的模块, 打包出的文件大小在 MacOS 上可以控制在 70M, 在 Windows 上可以控制在 40M+;

* 每次更新都需要重新下载整个安装文件, 即不够方便也不够优雅; 于是后来增加了自动更新模块: 每次启动软件后, 从服务器获取最新的版本号, 如果有更新则下载更新文件然后解压后热替换, 重启软件更新生效。这样每次都只需要下载极小的更新文件后台静默更新;

* Electron 在 Windows 上打包出的是一个文件夹而不是单个的 exe 文件, Google 之后找到了一个解决方案: 使用 Inno Script Studio 将打包出的 exe 文件和所有的依赖项一起打包为单个 exe 安装文件; (但是 Inno Script Studio 打包出的安装向导不支持中文, 谁有更好的解决方案请告诉我☺️十分感谢~)

* Windows 上 exe 如果安装到 Program Files 目录下会导致没有权限无法读取数据库文件, 除非以管理员身份运行, 暂时没有找到更合适的解决方法, 只能将默认安装目录设置为根目录; (谁有更好的解决方案请告诉我☺️再次感谢~)


## 5. 总结 / Summary
到目前为止, Luoo.qy 已经更新到 0.0.6 版本, 实现了期刊和单曲功能。未来计划加入用户登录与收藏等更多功能。喜欢的朋友欢迎下载体验, 因为是早期版本, 难免有 Bug, 欢迎大家给我提 issue 或建议~

开学之后因为课比较多, 只能晚上抽时间写, 可能会更新比较慢, 但是 Luoo.qy 不会短时间内停止更新。因为内心对音乐与编程的热爱, 让我对生活充满热情, 就算码到深夜也感到很开心~ 就酱


### #EOF