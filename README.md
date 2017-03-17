# Luoo.qy
一个基于 Electron 与 React 的落网第三方客户端


## 关于 / About
[落网 ( luoo.net )](http://www.luoo.net/) 一直是我很喜欢的一个音乐社区, 其中大量优质的独立音乐推荐很合我的口味, 他们十多年对音乐的坚持也让我充满敬意。落网是我手机上使用频率仅次于网易云的音乐软件, 但是电脑端却只能使用网页来听落网, 因此便想给落网写电脑客户端。

* 客户端可以在[luoo.huqingyang.top](http://luoo.huqingyang.top)下载
* 后端项目地址为[Luoo(GitHub)](https://github.com/HuQingyang/Luoo)


## 预览 / Preview
![preview-1](http://ojt6rsn4s.bkt.clouddn.com/screenShot01.png)
![preview-2](http://ojt6rsn4s.bkt.clouddn.com/screenShot02.png)
![preview-3](http://ojt6rsn4s.bkt.clouddn.com/screenShot03.png)


## 开发 / Development
* 设计工具: Sketch
* 开发平台: macOS
* 开发工具: WebStorm、PyCharm、SublimeText
* 前端技术栈: Electron、React、NeDB、ES6、Webpack、reactCSS 等
* 后端技术栈: Python、Flask、MondoDB、Urllib、BeautifulSoup 等

前端项目结构:
```
———/
	main.js		(主进程)
	package.json		(项目信息)
	README.md		(README 文件)
	webpack.config.js		(Webpack 配置文件)
	/components		(React 组件目录)
	/db			(客户端本地化数据库目录)
	/static		(项目静态文件)
		/css		(CSS 文件目录)
		/fonts		(字体文件目录)
		/html		(HTML 文件目录)
		/js			(渲染进程引入的 js 文件目录)
		/lib		(主进程引入的 js 文件目录)
			/autoUpdater.js		(自动更新)
			/base.js		(基本的功能)
			/db.js			(数据库操作)
		/pic		(图片资源文件目录)
```


## 一些问题 / Some Issues
这是我第一次写 Electron, 整个项目的 0.0.1 版本是在我寒假开学之前花了大概一个星期写出来的。其中花了一个下午设计好了原型, 然后花了一天时间用 Python 写好了爬虫与后台 API, 之后剩下的时间一直在折腾 Electron。

其中遇到了一些问题及解决方案:

* 为了提高软件的加载速度, 软件打包时将数据库文件一起打包; 软件启动时, 首先载入本地数据库中的数据, 同时向服务器请求更新数据, 然后将更新的数据存入数据库, 这样提高了加载速度同时减少了服务器请求次数;

* 最初的客户端数据库采用了 LevelDB, 但是 LevelDB 在 Windows 上执行 electron-rebuild 一直失败, 可能是因为 LevelDB 依赖了 C 语言模块; 于是使用由纯 JavaScript 编写的 NeDB 重写了数据库;

* 为了提高 React 的渲染效率, 对于遵循了 React 纯函数思想的组件 (传入同样的 props, 一定能得到同样的渲染结果), 可以在定义组件时加入 `this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)` 钩子; 

* Electron 打包出的文件太大, node_modules 文件夹占了接近100M空间, 因此将渲染进程依赖的所有模块用 webpack 打包后删除, 这样只留下主进程需要的模块, 打包出的文件大小在 MacOS 上可以控制在 70M, 在 Windows 上可以控制在 40M+;

* 每次更新都需要重新下载整个安装文件, 即不够方便也不够优雅; 于是后来增加了自动更新模块: 每次启动软件后, 从服务器获取最新的版本号, 如果有更新则下载更新文件然后解压后热替换, 重启软件更新生效。这样每次都只需要下载极小的更新文件后台静默更新;

* Electron 在 Windows 上打包出的是一个文件夹而不是单个的 exe 文件, Google 之后找到了一个解决方案: 使用 Inno Script Studio 将打包出的 exe 文件和所有的依赖项一起打包为单个 exe 安装文件; (但是 Inno Script Studio 打包出的安装向导不支持中文, 谁有更好的解决方案请告诉我☺️十分感谢~)

* Windows 上 exe 如果安装到 Program Files 目录下会导致没有权限无法读取数据库文件, 除非以管理员身份运行, 暂时没有找到更合适的解决方法, 只能将默认安装目录设置为根目录; (谁有更好的解决方案请告诉我☺️再次感谢~)


## 总结 / Summary
到目前为止, Luoo.qy 已经更新到 0.0.6 版本, 实现了期刊和单曲功能。未来计划加入用户登录与收藏等更多功能。喜欢的朋友欢迎下载体验, 因为是早期版本, 难免有 Bug, 欢迎大家给我提 issue 或建议~

开学之后因为课比较多, 只能晚上抽时间写, 可能会更新比较慢, 但是 Luoo.qy 不会短时间内停止更新。因为内心对音乐与编程的热爱, 让我对生活充满热情, 就算码到深夜也感到很开心~ 就酱


### #EOF

















