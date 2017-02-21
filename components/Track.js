import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';


const style = {
    div: {
        width: '100%',
        height: '50px',
        margin: '15px 0',
        backgroundColor: 'white',
        borderRadius: '15px'
    },
    img: {
        height: '90%',
        width: 'auto'
    }
};


class Track extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return(
            <div style={style.div}>
                <img src={this.props.cover || '../static/pic/cover.jpg'} style={style.img}/>
                <span>{this.props.name || 'Loading...'}</span>
                <span>{this.props.album || 'Album'}</span>
                <span> - </span>
                <span>{this.props.artist || 'Artist'}</span>
            </div>
        )
    }
}


export default Track;