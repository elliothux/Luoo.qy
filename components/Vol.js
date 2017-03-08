import React from 'react';
import reactCSS from 'reactcss';
import PureRenderMixin from 'react-addons-pure-render-mixin';



export default class Vol extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.style = this.style.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.showVolView(this.props.data);
        this.props.setBackground(this.props.data.cover)
    }

    render() {return(
        <div
            className={`vol vol${this.props.index}`}
            style={this.style().vol}
            onClick={this.handleClick}
        >
            <div style={this.style().desc}>
                <p style={this.style().volNum}>
                    Vol.{this.props.data ? this.props.data.vol : 'Loading...'}
                </p>
                <p>
                    {this.props.data ? this.props.data.title : 'Loading...'}
                </p>
            </div>
        </div>
    )}

    style() {return(reactCSS({
        default: {
            vol: {
                width: '47%',
                height: 0,
                paddingBottom: '30%',
                backgroundImage: `url(${this.props.data ? 
                    this.props.data.cover : 
                    '../static/pic/bg.jpg'})`,
                backgroundSize: 'cover',
                marginBottom: '20px',
                borderRadius: '8px',
                cursor: 'pointer',
                position: 'relative',
            },
            desc: {
                position: 'absolute',
                left: '15px',
                bottom: '10px',
                color: 'white',
                textShadow: '0 5px 5px rgba(0, 0, 0, 0.4)'
            },
            volNum: {
                fontSize: '1.6em',
                letterSpacing: '1px',
                fontFamily: 'Savoye LET',
                lineHeight: '0.5em',
            }
        }
    }, this.props, this.state))}
}