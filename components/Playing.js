import React from 'react';
import ReactDOM from 'react-dom';
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
        width: 'calc(100% - 280px)',
        marginTop: '2px',
        fontSize: '1em'
    },

    detailName: {
        fontSize: '1.3em',
        margin: '10px 0 5px 0',
        color: '#E06979'
    },

    detailAlbum: {
        lineHeight: '1.5em'
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
        margin: '0 20px',
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
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    next() {
        const detailContainer = ReactDOM.findDOMNode(this.detailContainer);
        const nextButton = ReactDOM.findDOMNode(this.nextButton);

        detailContainer.className = 'detailContainer next';
        nextButton.className = 'nextButton clicked';

        setTimeout(() => {
            detailContainer.className = 'detailContainer';
            nextButton.className = 'nextButton';
        }, 600);
        this.props.next();
    }

    prev() {
        const detailContainer = ReactDOM.findDOMNode(this.detailContainer);
        const prevButton = ReactDOM.findDOMNode(this.prevButton);

        detailContainer.className = 'detailContainer prev';
        prevButton.className = 'prevButton clicked';

        setTimeout(() => {
            detailContainer.className = 'detailContainer';
            prevButton.className = 'prevButton';
        }, 600);
        this.props.prev();
    }

    toggle() {
        const detailContainer = ReactDOM.findDOMNode(this.detailContainer);
        const toggleButton = ReactDOM.findDOMNode(this.toggleButton);

        detailContainer.className = 'detailContainer toggle';
        toggleButton.className = 'toggleButton clicked';

        setTimeout(() => {
            detailContainer.className = 'detailContainer';
            toggleButton.className = 'toggleButton';
        }, 600);
        this.props.togglePlay();
    }

    render() {
        return(
            <div style={style.div}>
                <div
                    className="detailContainer"
                    ref={(detailContainer) => {this.detailContainer = detailContainer}}
                >
                    <img
                        className="playingCover"
                        src={this.props.data ? this.props.data.cover : '../static/pic/cover.jpg'}
                        style={style.img}
                        onClick={this.props.showPlayingVolView}
                    />

                    <div style={style.detail}>
                        <p style={style.detailName}>{this.props.data ? this.props.data.name : 'Loading...'}</p>
                        <p style={style.detailAlbum}>
                            <span>{this.props.data ? this.props.data.album : 'Album'}</span>
                            <span>  -  </span>
                            <span>{this.props.data ? this.props.data.artist : 'Artist'}</span>
                        </p>
                    </div>
                </div>

                <div style={style.controller}>
                    <img
                        className="prevButton"
                        ref={(prevButton) => {this.prevButton = prevButton}}
                        src="../static/pic/Previous.svg"
                        style={style.prevButton}
                        onClick={this.prev}
                    />
                    <img
                        className="toggleButton"
                        ref={(toggleButton) => {this.toggleButton = toggleButton}}
                        src={!this.props.isPlaying ? "../static/pic/Play.svg" : "../static/pic/Pause.svg"}
                        style={style.playButton}
                        onClick={this.toggle}
                    />
                    <img
                        className="nextButton"
                        ref={(nextButton) => {this.nextButton = nextButton}}
                        src="../static/pic/Next.svg"
                        style={style.nextButton}
                        onClick={this.next}
                    />
                </div>
            </div>
        )
    }
}


export default Playing;