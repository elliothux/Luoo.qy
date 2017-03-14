import React from 'react';
import reactCSS from 'reactcss';
import PureRenderMixin from 'react-addons-pure-render-mixin';


export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.style = this.style.bind(this);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        this.state = {
            background: '../pic/bg1.jpg'
        }
    }

    componentDidMount() {
        setInterval(setBackground.bind(this), 15000);

        function setBackground() {
            this.setState((prevState, props) => ({
                background: prevState.background === '../pic/bg1.jpg' ?
                    '../pic/bg3.jpg' : '../pic/bg1.jpg'
            }))
        }
    }

    render() {return(
        <div style={this.style().user}>
            <div id="aboutBackground" style={this.style().background}></div>
            <div style={this.style().content}>
                <img style={this.style().logoImg} src="../pic/logo_white.png"/>
                <p style={this.style().logoText}>Luoo.qy</p>
                <p style={this.style().versionText}>
                    V0.0.3 (2017/03/10)<br/><br/>
                    本版块正在开发中<br/>
                    欢迎通过以下渠道关注我或者提交Bug与建议
                </p>

                <div
                    style={this.style().button}
                    className="aboutButton"
                    onClick={this.props.openExternal.bind(null, 'https://github.com/HuQingyang/Luoo.qy')}
                >
                    GitHub
                </div>
                <div
                    style={this.style().button}
                    className="aboutButton"
                    onClick={this.props.openExternal.bind(null, 'https://www.zhihu.com/people/hu-qing-yang-67')}
                >
                    知乎
                </div>
                <div
                    style={this.style().button}
                    className="aboutButton"
                    onClick={this.props.openExternal.bind(null, 'http://weibo.com/p/1005053554774517')}
                >
                    微博
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
                zIndex: 3,
                backgroundColor: 'black',
            },
            background: {
                width: '100%',
                height: '100%',
                position: 'fixed',
                backgroundImage: `url('${this.state.background}')`,
                backgroundSize: 'cover',
                transition: 'all ease-out 3s',
                zIndex: 1
            },
            content: {
                width: '100%',
                height: '100%',
                position: 'fixed',
                overflow: 'auto',
                textAlign: 'center',
                color: 'white',
                zIndex: 2,
            },
            logoImg: {
                width: '8%',
                marginTop: '5%',
            },
            logoText: {
                fontSize: '3em',
                fontWeight: 'normal',
                letterSpacing: '1px',
                fontFamily: 'SavoyeLetPlain',
                marginTop: '2%'
            },
            versionText: {
                marginTop: '10px',
                opacity: 0.8,
                marginBottom: '7%',
                fontSize: '1em',
                fontWeight: 'lighter',
                letterSpacing: '1px',
            },
            button: {
                display: 'block',
                margin: '30px auto',
                width: '80px',
                height: '30px',
                borderRadius: '20px',
                lineHeight: '30px',
                fontSize: '1em',
                cursor: 'pointer',
                transition: 'all 300ms ease-out',
                zIndex: 3,
                letterSpacing: '2px',
                fontWeight: 'lighter',
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