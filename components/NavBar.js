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
                <img style={this.style().logoImg} src="../pic/logo_black.png"/>
                <p style={this.style().logoText}>Luoo.qy</p>
            </div>
            <div style={this.style().button}>
                <img
                    onClick={this.toggle.bind(null, 'vol')}
                    style={this.style().buttonImg}
                    src={this.props.menu === 'vol' ?
                        "../pic/acd.svg" :
                        "../pic/cd.svg"}
                />
                <img
                    onClick={this.toggle.bind(null, 'single')}
                    style={this.style().buttonImg}
                    src={this.props.menu === 'single' ?
                        "../pic/alink.svg" :
                        "../pic/link.svg"}
                />
                <img
                    onClick={this.toggle.bind(null, 'user')}
                    style={this.style().buttonImg}
                    src={this.props.menu === 'user' ?
                        "../pic/astar.svg" :
                        "../pic/star.svg"}
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
                        src="../pic/volum.svg"
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
                height: 'calc(100% - 20px)',
                paddingTop: '20px',
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
                opacity: 0.85
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
                fontWeight: 'normal',
                color: 'rgba(35, 31, 31, 0.9)'
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
                margin: '20px 0 10px 0'
            },
            logoText: {
                fontSize: '1.6em',
                fontWeight: 'normal',
                letterSpacing: '1px',
                fontFamily: 'SavoyeLetPlain',
                position: 'relative',
                top: '-6px',
                color: 'black'
            }
        }
    }, this.props, this.state))}
}

