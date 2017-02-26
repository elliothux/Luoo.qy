import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';


const style = {
    div: {
        width: '100%',
        height: '50px',
        margin: '15px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-center',
        alignItems: 'center',
        fontWeight: 'bold',
        boxShadow: 'rgba(34, 34, 34, 0.3) 0px 0px 5px 2px',
        borderRadius: '4px',
        cursor: 'pointer',
        color: 'rgb(125, 125, 125)',
    },

    coverContainer: {
        width: '45px',
        height: '45px',
        margin: '0 25px 0 4px',
        overflow: 'hidden',
        borderRadius: '4px',
        boxShadow: 'rgba(34, 34, 34, 0.3) 0px 0px 5px 2px',
    },

    cover: {
        height: '100%',
        width: '100%',
    },

    detailContainer: {
        width: 'calc(100% - 100px)',
        position: 'relative',
        top: '-1px',
    },

    name: {
        display: 'inline-block',
        fontSize: '1.2em',
        fontWeight: 'bold',
        marginRight: '30px',
        color: '#E06979'
    },

    album: {
        display: 'inline-block',
    }
};


class Track extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.play = this.play.bind(this);
    }

    play() {
        const track = ReactDOM.findDOMNode(this.track);
        track.className = 'volViewTrack volViewTrackClicked';
        setTimeout(() => {
            track.className = 'volViewTrack'
        }, 600);

        this.props.getPlayList(this.props.trackListData, this.props.volData);
        this.props.play(this.props.index);
        setTimeout(function () {
            this.props.play(this.props.index);
        }.bind(this), 1)
    }

    render() {
        return(
            <div
                ref={(track) => {this.track = track}}
                style={style.div}
                onClick={this.play}
                className="volViewTrack"
            >
                <div style={style.coverContainer}>
                    <img src={this.props.data.cover || '../static/pic/cover.jpg'} style={style.cover}/>
                </div>
                <div style={style.detailContainer}>
                    <span style={style.name}>{this.props.data.name || 'Loading...'}</span>
                    <div style={style.album}>
                        <span>{this.props.data.album || 'Album'}</span>
                        <span> - </span>
                        <span>{this.props.data.artist || 'Artist'}</span>
                    </div>
                </div>
            </div>
        )
    }
}


export default Track;