import React from 'react';
import reactCSS from 'reactcss';


export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);

        this.state = {
            background: '../pic/singleCover.jpg'
        }
    }

    render() {return(
        <div style={this.style().user}>
            <line type="text/css" src="../css/about.css"/>
            <div id="background"></div>
            <div id="content">
                <div id="logo" className="unloaded" >
                    <img id="logoImg" src="http://ojt6rsn4s.bkt.clouddn.com/logo.png"/>
                        <p id="versionText">V0.0.3 (2017/03/10)</p>
                </div>
                <div id="button" className="unloaded">
                    <a className="button" id="github">
                        GitHub
                    </a>
                    <a className="button" id="download">下载</a>
                    <div className="download">
                        <a className="button downloadLinux hide" id="linux">Linux</a>
                        <a className="button downloadMac hide" id="mac">macOS</a>
                        <a className="button downloadWin hide" id="win">Windows</a>
                    </div>
                </div>
                <div className="unloaded" id="desc">
                    该软件内的所有内容均来自
                    <a href="http://www.luoo.net/" target="_blank">落网</a>
                    , 本版本将持续开发, 欢迎关注我的
                    <a href="http://weibo.com/u/6166194900" target="_blank">微博</a>
                    <span> / </span>
                    <a href="https://www.zhihu.com/people/hu-qing-yang-67" target="_blank">知乎</a>
                </div>
            </div>
        </div>
    )}

    style() {return(reactCSS({
        default: {
            user: {
                width: '100%',
                height: '100%',
                position: 'absolute',
                overflow: 'hidden',
                top: 0,
                transition: 'all ease-out 400ms',
                zIndex: 3
            }
        },
        'menu-vol': {
            user: {
                transform: 'translateY(100%)',
            },
        },
        'menu-single': {
            user: {
                transform: 'translateY(100%)',
            },
        },
        'menu-user': {
            user: {
                transform: 'translateY(0)',
            },
        }
    }, this.props, this.state))}
}