import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';


const style = {
    div: {
        width: '100%',
        height: '60px',
        position: 'fixed',
        top: 'calc(100% - 60px)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        lineHeight: '100%',
        fontFamily: 'Arial',
        fontWeight: 'bold',
        zIndex: 5
    },

    img: {
        height: '50px',
        width: '50px',
        float: 'left',
        margin: '5px 30px 5px 10px',
        borderRadius: '3px',
        boxShadow: 'rgba(34, 34, 34, 0.3) 0px 0px 5px 2px',
        cursor: 'pointer'
    },

    detail: {
        float: 'left',
        color: 'black',
        height: '100%',
        marginTop: '2px',
        fontSize: '1em'
    },

    detailName: {
        fontSize: '1.3em',
        lineHeight: '35px'
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
                <img src={this.props.data ? this.props.data.cover : '../static/pic/cover.jpg'}
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
                    <img src="../static/pic/Play.svg" style={style.playButton} onClick={this.props.togglePlay}/>
                    <img src="../static/pic/Next.svg" style={style.nextButton} onClick={this.props.next}/>
                </div>
            </div>
        )
    }
}


export default Playing;