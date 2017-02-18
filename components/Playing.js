import React from 'react';


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
    },

    img: {
        height: '50px',
        width: '50px',
        float: 'left',
        margin: '5px 30px 5px 10px',
        borderRadius: '3px',
        boxShadow: 'rgba(34, 34, 34, 0.3) 0px 0px 5px 2px'
    },

    detail: {
        float: 'left',
        color: 'black',
        height: '100%',
        marginTop: '5px',
        fontSize: '1.1em'
    },

    detailName: {
        fontSize: '1.3em',
        lineHeight: '30px'
    },

    controller: {
        float: 'right',
        color: 'gray',
        marginRight: '50px',
        position: 'relative',
    },

    playButton: {
        position: 'relative',
        top: '-20px',
        width: '50px',
        height: 'auto',
        left: '80px',
    }

};


class Playing extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div style={style.div}>
                <img src={this.props.cover || '../static/pic/cover.jpg'} style={style.img}/>

                <div style={style.detail}>
                    <p style={style.detailName}>{this.props.name || 'Loading...'}</p>
                    <p>
                        <span>{this.props.album || 'Album'}</span>
                        <span> - </span>
                        <span>{this.props.artist || 'Artist'}</span>
                    </p>
                </div>

                <div style={style.controller}>
                    <img src="../static/pic/play.svg" style={style.playButton}/>
                    <span>{this.props.playedTime || '00:00'}</span>
                    <span> / </span>
                    <span>{this.props.totalTime || '00:00'}</span>
                </div>
            </div>
        )
    }
}


export default Playing;