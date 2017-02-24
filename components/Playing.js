import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';


const style = {
    div: {
        width: '100%',
        height: '60px',
        position: 'fixed',
        top: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        lineHeight: '100%',
        fontFamily: 'Arial',
        fontWeight: 'bold',
        borderRadius: '4px',
        zIndex: 5
    },

    img: {
        height: '50px',
        width: '50px',
        float: 'left',
        margin: '5px 30px 5px 10px',
        borderRadius: '4px',
        cursor: 'pointer'
    },

    detail: {
        float: 'left',
        color: 'rgb(125, 125, 125)',
        height: '100%',
        marginTop: '2px',
        fontSize: '1em'
    },

    detailName: {
        fontSize: '1.3em',
        lineHeight: '35px',
        color: '#E06979'
    },

    controller: {
        float: 'right',
        color: 'gray',
        marginRight: '20px',
        position: 'relative',
    },

    playButton: {
        position: 'relative',
        top: '5px',
        width: '48px',
        height: 'auto',
        cursor: 'pointer',
        margin: '0 20px'
    },

    nextButton: {
        width: '35px',
        height: 'auto',
        cursor: 'pointer'
    },

    prevButton: {
        width: '35px',
        height: 'auto',
        cursor: 'pointer'
    }

};


class Playing extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return(
            <div style={style.div}>
                <img
                    className="playingCover"
                    src={this.props.data ? this.props.data.cover : '../static/pic/cover.jpg'}
                    style={style.img}
                    onClick={this.props.showPlayingVolView}
                />

                <div style={style.detail}>
                    <p style={style.detailName}>{this.props.data ? this.props.data.name : 'Loading...'}</p>
                    <p>
                        <span>{this.props.data ? this.props.data.album : 'Album'}</span>
                        <span>  -  </span>
                        <span>{this.props.data ? this.props.data.artist : 'Artist'}</span>
                    </p>
                </div>

                <div style={style.controller}>
                    <img src="../static/pic/Previous.svg" style={style.prevButton} onClick={this.props.prev}/>
                    <img
                        src={!this.props.isPlaying ? "../static/pic/Play.svg" : "../static/pic/Pause.svg"}
                        style={style.playButton}
                        onClick={this.props.togglePlay}
                    />
                    <img src="../static/pic/Next.svg" style={style.nextButton} onClick={this.props.next}/>
                </div>
            </div>
        )
    }
}


export default Playing;