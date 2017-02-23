import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';


const style = {
    div: {
        width: '100%',
        height: '50px',
        margin: '15px 0',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-center',
        alignItems: 'center',
        fontWeight: 'bold',
        boxShadow: 'rgba(34, 34, 34, 0.3) 0px 0px 5px 2px',
        cursor: 'pointer',
        color: 'rgb(125, 125, 125)',
        whiteSpace: 'nowrap',
        overflow: 'auto'
    },

    img: {
        height: '90%',
        width: 'auto',
        margin: '0 25px 0 4px',
        boxShadow: 'rgba(34, 34, 34, 0.3) 0px 0px 5px 2px'
    },

    name: {
        display: 'inline-block',
        fontSize: '1.2em',
        fontWeight: 'bold',
        marginRight: '30px',
        position: 'relative',
        top: '-2px',
        color: '#E06979'
    }
};


class Track extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return(
            <div style={style.div} onClick={this.props.play.bind(null, this.props.index, this.props.volData)}>
                <img src={this.props.data.cover || '../static/pic/cover.jpg'} style={style.img}/>
                <span style={style.name}>{this.props.data.name || 'Loading...'}</span>
                <span>{this.props.data.album || 'Album'}</span>
                <span> - </span>
                <span>{this.props.data.artist || 'Artist'}</span>
            </div>
        )
    }
}


export default Track;