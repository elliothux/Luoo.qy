import React from 'react';
import reactCSS from 'reactcss';
import PureRenderMixin from 'react-addons-pure-render-mixin';


export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.style = this.style.bind(this);
    }

    render() {return(
        <div style={this.style().navContainer}>
            <div style={this.style().logo}>
                <img style={this.style().logoImg} src="../static/pic/logo_black.png"/>
                <p style={this.style().logoText}>Luoo.qy</p>
            </div>
            <div style={this.style().button}>
                <img
                    style={this.style().buttonImg}
                    src="../static/pic/cd.svg"
                    onClick={this.props.hideVolView}
                />
                <img style={this.style().buttonImg} src="../static/pic/link.svg"/>
                <img style={this.style().buttonImg}  src="../static/pic/star.svg"/>
            </div>
            <div style={this.style().volume}>
                <p>+</p>
                <img style={this.style().volumeImg} src="../static/pic/volum.svg"/>
                <p>-</p>
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
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
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
                cursor: 'pointer'
            },

            volume: {
                width: '100%',
                height: '100px',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center'
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
            },

            buttonImg: {
                width: '30px',
                height: 'auto',
                alignItems: 'center'
            },

            volumeImg: {
                width: '30px',
                height: 'auto',

            }
        }
    }, this.props, this.state))}
}

