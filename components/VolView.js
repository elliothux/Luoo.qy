import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './Logo';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PureRenderMixin from 'react-addons-pure-render-mixin';


const style = {
    div: {
        zIndex: 3,
        position: 'fixed',
        width: '100%',
        height: '100%',
        overflow: 'auto',
    },

    container: {
        position: 'absolute'
    },

    logo: {
        marginLeft: '4%'
    },

    cover: {
        width: '50%',
        height: 'auto',
        display: 'inline-block',
        marginLeft: '4%',
        marginRight: '2%',
        boxShadow: 'rgba(34, 34, 34, 0.3) 0px 0px 5px 2px',
        borderRadius: '4px',
    },

    backgroundContainer: {
        width: '100%',
        height: '100%',
        position: 'fixed',
        zIndex: -1,
        overflow: 'hidden'
    },

    background: {
        width: '100%',
        height: '100%',

        transform: 'scale(1.2)',
        filter: 'blur(10px)',
    },

    detail: {
        container: {
            color: 'white',
            width: '40%',
            overflow: 'auto',
            display: 'inline-block',
            marginRight: '4%',
            height: 0,
            paddingBottom: '35%',
            letterSpacing: '0.2em',
            lineHeight: '1.2em',
            textShadow: '0px 0px 5px rgba(34, 34, 34, 0.3)'
},

        tag: {
            display: 'inline-block',
            float: 'right'
        },

        title: {
            fontSize: '2em',
            marginTop: '20px',
            fontWeight: 'bold',
            lineHeight: '1.3em'
        },

        description: {
            fontSize: '0.8em',
            margin: '30px 0',
            fontWeight: 'bold'
        },

        time: {
            display: 'block',
            fontSize: '0.8em',
            fontStyle: 'italic'
        }
    },

    tracks: {
        width: '92%',
        marginLeft: '4%',
        marginBottom: '80px'
    }
};


class VolView extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidUpdate() {
        ReactDOM.findDOMNode(this.detail).scrollTop = 0;
    }

    render() {
        return(
            <div style={style.div} className={`volView ${this.props.show ? ' volViewActivated' : ' volViewUnactivated'}`}>
                <div style={style.backgroundContainer}>
                    <img src={this.props.data ? this.props.data.cover : '../static/pic/5877de4c96b3d.jpg'} style={style.background}/>
                </div>

                <div style={style.container}>
                    <div style={style.logo} onClick={this.props.hiddenVolView}><Logo/></div>

                    <img
                        className="volViewCover"
                        ref={(cover) => {this.cover = cover}}
                        src={this.props.data ? this.props.data.cover : '../static/pic/5877de4c96b3d.jpg'}
                        style={style.cover}
                    />
                    <div className="volViewDetail" ref={(detail) => {this.detail = detail}} style={style.detail.container}>
                        <span>{this.props.data ? `Vol.${this.props.data.vol}` : 'Vol.000'}</span>
                        <span style={style.detail.tag}>{this.props.data ? this.props.data.tag : '#...'}</span>
                        <p style={style.detail.title}>{this.props.data ? this.props.data.title  : 'Title'}</p>
                        <p style={style.detail.description}>
                            {this.props.data ? this.props.data.description : '......'}
                        </p>
                        <span style={style.detail.time}>{this.props.data ? this.props.data.time : '1995 / 10 / 05'}</span>
                    </div>

                    <div className="volViewTracks" style={style.tracks}>
                        {this.props.tracks}
                    </div>
                </div>
            </div>
        )
    }
}


export default VolView;