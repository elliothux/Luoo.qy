import React from 'react';
import reactCSS from 'reactcss';
import PureRenderMixin from 'react-addons-pure-render-mixin';


export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.style = this.style.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle(menu) {
        if (this.props.menu === 'vol' && this.props.menu === menu)
            this.props.hideVolView();
        if (this.props.menu !== menu)
            this.props.toggle(menu);
    }

    render() {return(
        <div style={this.style().navContainer}>
            <div style={this.style().logo}>
                <img style={this.style().logoImg} src="../static/pic/logo_black.png"/>
                <p style={this.style().logoText}>Luoo.qy</p>
            </div>
            <div style={this.style().button}>
                <img
                    onClick={this.toggle.bind(null, 'vol')}
                    style={this.style().buttonImg}
                    src={this.props.menu === 'vol' ?
                        "../static/pic/acd.svg" :
                        "../static/pic/cd.svg"}
                />
                <img
                    onClick={this.toggle.bind(null, 'single')}
                    style={this.style().buttonImg}
                    src={this.props.menu === 'single' ?
                        "../static/pic/alink.svg" :
                        "../static/pic/link.svg"}
                />
                <img
                    onClick={this.toggle.bind(null, 'user')}
                    style={this.style().buttonImg}
                    src={this.props.menu === 'user' ?
                        "../static/pic/astar.svg" :
                        "../static/pic/star.svg"}
                />
            </div>
            <div style={this.style().volume}>
                <p
                    onClick={this.props.up}
                    style={this.style().volumeUp}
                >+</p>
                <div>
                    <img
                        style={this.style().volumeImg}
                        src="../static/pic/volum.svg"
                    />
                    <span style={this.style().volumeNum}>{this.props.volume}</span>
                </div>
                <p
                    onClick={this.props.down}
                    style={this.style().volumeDown}
                >-</p>
            </div>
        </div>
    )}

    style() {return(reactCSS({
        'default': {
            navContainer: {
                width: '80px',
                height: '100%',
                position: 'fixed',
                top: 0,
                left: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                justifyContent: 'space-between'
            },
            logo: {
                width: '100%',
                height: '100px',
                textAlign: 'center'
            },
            button: {
                width: '100%',
                height: '250px',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
            },
            buttonImg: {
                width: '30px',
                height: 'auto',
                alignItems: 'center',
                cursor: 'pointer'
            },
            volume: {
                width: '100%',
                height: '100px',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '1.2em',
                fontWeight: 'bold'
            },
            volumeDown: {
                cursor: 'pointer',
                position: 'relative',
                top: '-8px'
            },
            volumeUp: {
                cursor: 'pointer',
            },
            volumeNum: {
                marginLeft: '8px',
                position: 'relative',
                top: '-6px'
            },
            volumeImg: {
                width: '30px',
                height: 'auto',
            },
            logoImg: {
                width: '35px',
                height: 'auto',
                margin: '30px 0 10px 0'
            },
            logoText: {
                fontSize: '1.3em',
                fontWeight: 'normal',
                letterSpacing: '1px',
                fontFamily: 'Savoye LET',
                position: 'relative',
                top: '-6px',
                color: 'black'
            }
        }
    }, this.props, this.state))}
}

